#### 1. 理论

##### 1.1 CAS

cpu硬件同步原语(compare and swap)

CAS是支持并发的第一个处理器提供原子的测试并设置操作, 通常在单位上运行这项操作.操作数为V,A,B.

CAS 操作包含三个操作数 —— 内存位置（V）、预期原值（A）和新值(B)。如果内存位置的值与预期原值相匹配，那么处理器会自动将该位置值更新为新值。否则，处理器不做任何操作。无论哪种情况，它都会在 CAS 指令之前返回该位置的值。



#### 2. Java中常见的锁

##### 2.1 JUC下的锁

2.1.1 AtomicInteger

AtomicInteger的使用: 线程池状态的控制

##### 2.2 synchronized关键字

2.2.1 synchronized的使用

1. 一把锁只能被一个线程占用, 未获取到锁的线程只能等待
2. synchronized锁分对象锁和类锁, 对象锁:不同实例之间互不影响;类锁: 所有对象共用一把锁.
3. synchronized修饰的方法, 无论方法执行完毕还是抛出异常都会释放锁.

2.2.2 对象锁

1. 方法锁(锁对象默认为this)
2. 同步代码块锁(手动指定锁对象)

2.2.2 类锁

1. 修饰静态方法
2. 同步代码块锁(指定锁对象为Class对象)

##### 2.3 LockSupport



#### 3. 数据库锁

##### 3.1 数据库锁分类 - 颗粒度分类

1. 全局锁 - 锁定数据库中所有的表
   1. 读锁
2. 表级锁  - 锁定整张表
   1. 读锁
   2. 写锁

3. 行级锁 - 锁定对应的行数据

##### 3.2 全局锁实现

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

##### 3.3 表级锁

表级锁分类

1. 表锁
2. 元数据锁
3. 意向锁

##### 3.3.1 表级锁 - 表锁

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

##### 3.3.2 表级锁 - 元数据锁

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

##### 3.3.3 表级锁 - 意向锁

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

#### 4. 分布式锁

