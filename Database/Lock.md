#### 1. 数据库锁

##### 1.1 数据库锁分类 - 颗粒度分类

1. 全局锁 - 锁定数据库中所有的表
2. 表级锁  - 锁定整张表
3. 行级锁 - 锁定对应的行数据

##### 1.2 全局锁实现

```
# 添加全局锁
flush tables WITH READ LOCK;

# DQL
select * from points;

# DDL
update points set points = 102 where id = '1801497529808982016';

# 数据备份
mysqldump -h192.168.200.202 -uroot -p1234 db01 > D:/db01.sql

# 释放全局锁
UNLOCK TABLES;
```

使用场景:

1. 数据备份

在开始数据库数据备份前进行加锁 - 全局读锁

在加锁期间只能执行DQL, 无法执行DDL、DML保证数据的一致性

数据库数据备份结束, 释放全局锁

##### 1.3 表级锁

表级锁分类

1. 表锁
2. 元数据锁
3. 意向锁

##### 1.3.1 表级锁 - 表锁

- 表锁 - 读锁

```
# 客户端A
# 添加读锁
LOCK TABLES points read;

# 查询
select * from points;

# DML 抛错
update points set points = 104 where id = '1801497529808982016';

# 释放读锁
UNLOCK TABLES;
```

```
# 客户端B
# 在客户端A加锁期间 DML 阻塞 在客户端A释放锁执行操作
update points set points = 104 where id = '1801497529808982016';
```

- 表锁 - 写锁

```
# 客户端A
# 添加写锁
LOCK TABLES points write;

# DML 
update points set points = 103 where id = '1801497529808982016';

# 释放锁
UNLOCK TABLES;
```

```
# 客户端B
# 在客户端写锁期间阻塞, 客户端A释放锁后查询结果
select * from points;
```

##### 1.3.2 表级锁 - 元数据锁

- 元数据锁(meta data lock), 该锁是系统自动控制的, 在访问一张表是自动上锁.

- 元数据可以理解为数据库表结构, 元数据锁的作用是维护表结构的数据一致性, 避免DDL和DML之间发生冲突, 保证读写一致性.

- Mysql引入了MDL, 当对一张表进行增删改查时, 加MDL共享读锁和共享写锁; 对表结构进行变更操作时加MDL排他锁
- 共享锁之间相互兼容, 表示可边读边写; 共享锁和排他锁互斥, 在对表进行增删改查时, 无法对表进行变更.

案例:

```
# 客户端A
begin
select * from points;
commit;
```

```
# 客户端B
# 当客户端A的锁未释放, 客户端B的DDL语句一直处于阻塞阶段
alter table points add column age int;
```

查看元数据锁：

```
select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
```

##### 1.3.3 表级锁 - 意向锁

- 为了避免在执行DML时, 客户端A加的行锁和客户端B加的表锁的冲突, Mysql引入了意向锁
- 意向锁使得客户端B在尝试加表锁时不用检查每行数据是否加了行锁, 直接根据是否有意向锁以及意向锁的类型来决定表锁是否添加成功, 减少了添加表锁的检查.

意向锁分类:

1. 意向共享锁(IS): 与表锁共享锁兼容, 与表锁排他锁互斥; 由语句`select * from lock in share mode.`添加
2. 意向排他锁(IX): 与表锁共享锁和排他锁都互斥; 由语句`insert update delete select...for update`添加

意向锁之间不会互斥

```
# 客户端A
begin // 开启事务
select * from user where id = 1 lock in share mode. // 添加意向共享锁

# 客户端B
lock tables user read; // 加锁成功
lock tables user write; // 阻塞直到客户端A释放锁
```

```
# 客户端A
begin // 开启事务
update user set age = 11 where name = 'Bruce' // 自动意向排他锁

# 客户端B
lock tables user read; // 阻塞直到客户端A释放锁
```

```
# 查看意向锁是否添加成功
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

##### 1.4 行级锁

- 行级锁分类：

1. 行锁
2. 间隙锁 - 锁定的是数据对应的索引数据(主键)
3. 临键锁 - 行锁和间隙锁的组合

- 行锁类型分类:

1. 共享锁(S)
2. 排他锁(X)

- SQL语句对应加的行锁:

| SQL                                    | 行锁类型 | 说明     |
| -------------------------------------- | -------- | -------- |
| insert                                 | 排他锁   | 自动加锁 |
| update                                 | 排他锁   | 自动加锁 |
| delete                                 | 排他锁   | 自动加锁 |
| select * from table                    | 无锁     |          |
| select * from table lock in share mode | 共享锁   | 手动加锁 |
| select * from table for update         | 排他锁   | 手动加锁 |

##### 1.4.1 Mysql行锁

MySQL中的行锁是在事务隔离级别为可重复读(REPEATABLE READ)或以上级别时自动实现的。当一个事务在读取某行数据时，会立即获取该行的行锁。在事务完成数据修改之前，其他事务不能对这行数据进行修改。

在MySQL中，行锁的工作方式如下：

1. 当执行事务时，InnoDB存储引擎会自动获取必要的行锁。
2. 当事务尝试对某行数据进行写操作时（例如UPDATE或DELETE），将获取该行的X锁。
3. 当事务读取某行数据时，会获取该行的S锁，但在事务结束前，其他事务可以读取该行，不过不能修改。
4. 行锁在事务结束时自动释放。

##### 1.4.2 Mysql间隙锁

MySQL中的间隙锁（Gap Lock）是一种针对InnoDB存储引擎的锁定机制，用于锁定一个范围，但不包括记录本身，主要用于防止幻读。间隙锁只在事务隔离级别为可重复读（REPEATABLE READ）时才会起作用。

间隙锁不能直接操作，它是在背后自动使用的。间隙锁的目的是确保在事务A读取一定范围内的数据，而另一个事务B在这个范围内进行插入时，不会产生幻读的问题。

例如，假设有一个表`t`，其中有两条记录的值分别是10和20。如果事务A在范围`(10, 20)`内进行查询，而事务B在同一个范围内插入一个值15，那么在事务A再次进行相同查询时，它应该看到事务B的插入结果，这就是幻读。为了防止这种情况，InnoDB会在行之间的间隙中放置间隙锁。

```
-- 设置隔离级别为可重复读
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
 
-- 开启一个事务
START TRANSACTION;
 
-- 查询一个范围，但不包括具体的行
SELECT * FROM t WHERE v BETWEEN 10 AND 20 FOR UPDATE;
 
-- 提交事务
COMMIT;
```

在这个例子中，`FOR UPDATE`子句告诉MySQL需要锁定查询到的所有行，以防止其他事务在这个范围内进行插入。间隙锁会在后台自动应用，确保当事务B尝试在事务A锁定的范围内插入数据时，会发生锁等待，直到事务A完成并释放锁。

请注意，间隙锁通常对数据库性能有负面影响，因此应该只在必要时使用，并且在设计数据库时尽量避免使用可能导致间隙锁的操作，例如范围查询与`FOR UPDATE`。



间隙锁退化问题?

InnoDB行锁是针对于索引加的锁, 如果某字段没有创建索引, 即不能通过索引条件检索该字段的数据, 此时如果通过该字段操作数据, 此时就会升级为表锁.

##### 1.4.3Mysql临键锁

MySQL中的临键锁（Next-Key Locking）是实现事务隔离性的一种方式，它通过锁定一个范围来防止幻读。当MySQL执行事务时，它会在行级别上加上锁，但是在某些情况下，需要锁定一个范围（一个行之间的间隙）来防止幻读。

临键锁是索引记录的锁，它是行锁和间隙锁的组合，同时锁定了一个索引记录和它前面的间隙。这样既能保证数据的一致性，也能防止幻读。

以下是一个简单的例子，演示了如何在MySQL中使用临键锁来防止幻读：

```
-- 设置事务隔离级别为可重复读
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
 
-- 开启一个事务
START TRANSACTION;
 
-- 查询操作，因为有临键锁，所以这里会锁定范围，防止幻读
SELECT * FROM your_table WHERE your_column = 'some_value' FOR UPDATE;
 
-- 提交或回滚事务
COMMIT;
```

在这个例子中，`SELECT` 语句使用了 `FOR UPDATE` 来锁定查询到的记录，并且由于使用了索引，MySQL会在行之间放置临键锁，防止其他事务在这个范围内进行插入操作，从而防止幻读。

##### 查看锁是否添加成功sql

```
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```



#### 2. 数据库锁

##### 2.1 数据库锁分类 - 加锁策略分类

1. 悲观锁
2. 乐观锁

##### 2.2 悲观锁

悲观锁通常使用数据库锁机制来实现. 如: select * from table for update;

当事务执行到这一步时, 会获取锁直到事务结束. 如果有其它事务试图修改这些行, 他们将会等待或者报错, 这取决于锁定策略.

##### 2.3 乐观锁

乐观锁通常使用版本号或者时间戳来实现.

在修改数据时, 会检查版本号或者时间戳是否发生变化.

如果没有变化则修改成功.

如果发生变化则修改失败且事务回滚.



#### 3. 数据库锁

##### 3.1 数据库锁分类 - 按类型分类

1. 共享锁(share locks)
2. 排他锁(exclusive locks)
3. 意向共享锁(intension shared lock)
4. 意向排他锁(intension exclusive lock)

##### 3.2 共享锁

共享锁(S锁)又称为读锁, 若事务T对数据对象A加上S锁, 则事务T只能对读A, 其它事务只能再对A加S锁, 而不能加X锁, 直到T释放A上的S锁. 这就保证了其他事务可以读取A, 但在T释放A上的S锁之前不能对A做任何修改.

```
# 加表级读锁
lock tables <table> read;
# 加行级读锁
select * from <table> lock in share mode.
```

##### 3.3 排他锁

排他锁(X锁), 又称写锁、独占锁, 在数据库管理上, 是锁的基本类型之一. 若事务T对数据对象A加上X锁, 只允许事务T修改数据A, 其他事务不能对数据A加任何类型的锁, 知道事务T释放了锁. 这就保证了其他事务在事务T释放锁之前不能再读取和修改A.

```
# 表级写锁
lock tables <table> write.
# 加行级写锁
select * from <table> where ... for update
# mysql自动加锁
DML语句
```

##### 3.4 意向锁

意向锁是由数据库引擎自己维护的, 用户无法手动操作意向锁, 在对数据行加共享锁/排他锁之前, InnoDB会先获取该数据对应表的对应的意向锁.

意向锁存在的意义:

如果一个事务在该表加共享锁或者排他锁, 则受到前一个事务控制的表级别意向锁的阻碍. 第二个事务在锁定表之前不需要检查这个表的页锁和行锁, 只需要检查表上的意向锁.

##### 3.5 意向共享锁

```
# 事务要获取数据行的S锁, 必须先获取表的IS锁
select * from <table> where ... lock in share mode.
```

##### 3.6 意向排他锁

```
# 事务要获取数据行的X锁, 必须先获取表的IX锁
select * from <table> for update
```































