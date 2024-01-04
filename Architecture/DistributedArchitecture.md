#### 1. 分布式ID

##### 1.1 为什么要使用分布式ID

1.1.1 什么是分布式ID

全局唯一的ID就是分布式ID

使用场景: 数据库分表场景, 数据库自增ID已经无法区分数据.

正面案例: XXX系统费用数据导入到YYY系统的费用数据库表

反面案例: 互斥活动, A活动与B活动未在同一表, 但是可以相互互斥, 没有设置分布式ID, 只能通过活动ID加活动类型才能区分活动.

1.1.2 分布式ID需要满足哪些条件?

1. 全局唯一: 必须保证ID是全局唯一的
2. 高性能: ID生成响应要快, 不能成为业务性能瓶颈
3. 高可用: 保证接近100%可用性
4. 易接入: 秉承拿来即用的设计原则, 在系统设计和实现上尽可能简单.
5. 趋势递增: 最好趋势递增

##### 1.2 分布式ID有哪些实现方式

分布式ID实现方式

1. UUID
2. 数据库自增ID
3. 数据库多主模式
4. 号段模式
5. Redis
6. 雪花算法(SnowFlake)
7. 滴滴(TinyID)
8. 百度(Uidgenerator)
9. 美团(Leaf)

**1.2.1: UUID**

```
String uuid = UUID.randomUUID().toString().replaceAll("-","");
```

优点:

- 生成足够简单, 本地生成无网络消耗, 且全局唯一

缺点:

- 无序的字符串, 不具备递增趋势
- 没有具体的业务含义
- UUID是长度36位的字符串, 存储以及查询对Mysql的性能消耗大

**1.2.2: 数据库自增ID**

使用mysql数据库主键自增实现分布式ID

优点: 

- 实现简单, id单调自增

缺点:

- 数据库单点存在宕机分险, 无法抗住高并发场景

**1.2.3: 基于数据库集群模式**

单个数据库又单点分险, 那我们就采用双主数据库集群来解决单点问题, 但是两个数据库各自表主键自增还是会重复？

如何解决这个问题?

解决方案: 设置起始值和自增步长;

Mysql1

```
set @@auto_increment_offset = 1;     -- 起始值
set @@auto_increment_increment = 2;  -- 步长
```

Mysql2

```
set @@auto_increment_offset = 2;     -- 起始值
set @@auto_increment_increment = 2;  -- 步长
```

如果后期并发增加，当双主数据库无法抗住并发怎么办？

继续扩容增加到3台机器

Mysql1

```
set @@auto_increment_offset = 1;     -- 起始值
set @@auto_increment_increment = 3;  -- 步长
```

Mysql2

```
set @@auto_increment_offset = 2;     -- 起始值
set @@auto_increment_increment = 3;  -- 步长
```

Mysql3

```
set @@auto_increment_offset = 3;     -- 起始值
set @@auto_increment_increment = 3;  -- 步长
```

优点：

- 解决了单点问题

缺点:

- 不利于后期扩容, 且需要修改起始值, 必要时可能还要停机修改

**1.2.4: 基于号段模式**

号段模式是当下分布式ID生成器主流的实现方案, 号段模式可以理解成从数据库批量获取自增ID, 每次从数据库取出一个号段范围, 例如(1,1000]代表999个ID, 具体的业务将本号段加载到内存中.

表结构如下：

```
CREATE TABLE id_generator (
  id int(10) NOT NULL,
  max_id bigint(20) NOT NULL COMMENT '当前最大id',
  step int(20) NOT NULL COMMENT '号段的步长',
  biz_type	int(20) NOT NULL COMMENT '业务类型',
  version int(20) NOT NULL COMMENT '版本号',
  PRIMARY KEY (`id`)
) 
```

等这批号段ID用完, 再次向数据库申请号段, 对max_id做一次update操作

update id_generator max_id = max_id + step, version = version + 1 where version = #{version} and biz_type = #{biz_type}

由于多业务端可能同时操作, 所以采用版本号乐观锁方式更新, 这种分布式ID生成方式不强依赖数据库, 不会频繁操作数据库, 对数据库的压力相对来说很小.

**1.2.5: 基于Redis模式**

Redis也同样可以实现, 原理就是利用redis的incr命令实现ID的原子性自增.

```
127.0.0.1:6379> set seq_id 1     // 初始化自增ID为1
OK
127.0.0.1:6379> incr seq_id      // 增加1，并返回递增后的数值
(integer) 2
```

使用redis实现需要注意一点, 要考虑到redis持久化问题; Redis有两种持久化方式RDB和AOF.

- RDB会定时打一个快照进行持久化, 假如连续自增但redis没及时持久化, 而这个时候Redis挂了, 重启Redis后会出现ID重复的情况.
- AOF会对每条命令进行持久化, 即使Redis挂掉了也不会出现ID重复的情况, 但是由于incr命令的特殊性会导致R edis重启恢复的时间过长.

**1.2.6: 基于雪花算法(SnowFlake)**

Snowflake生成的是Long类型的ID, 一个Long类型的字段占8个字节, 每个字节占8个比特, 也就是说一个Long类型的字段占64个比特.
Snowflake组成的结构: 正位数(占1比特) + 时间戳(占41比特) + 机器ID(占5比特) + 数据中心(占5比特) + 自增值(占12比特), 总共64比特组成一个Long类型

1. 符号位(1bit): Java中Long的最高位是符号位, 正数是0, 负数是1, 一般生成的ID是正数, 所以默认是0. 
2. 时间戳部分(41bit): 毫秒级的时间, 不建议存当前的时间, 而是用当前(当前时间戳 - 固定时间戳)的差值, 这样使生成的ID从更小的值开始, 41bit的时间戳可以使用69年.
3. 工作机器ID(10bit): 也被叫做workid, 这个可以灵活配置
4. 序列号部分(12bit): 自增值仅支持同一毫秒内同一节点可以生成4096个ID. 

根据这个算法逻辑, 只需要将这个算法逻辑使用Java语言实现出来, 用Java工具类封装, 那么各个业务应用可以直接使用该工具方法来获取分布式ID，只需保证每个业务应用有自己的工作机器id即可，而不需要单独去搭建一个获取分布式ID的应用。

**1.2.7: 百度(uid-generator)**



**1.2.8: 美团(Leaf)**



**1.2.9: 滴滴(Tinyid)**





