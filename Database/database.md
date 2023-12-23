#### 1. 数据库字段长度

##### 1.1 Mysql相关

**Mysql为什么默认定义varchar(255)而不是varchar(256)**

官方的答案:

In contrast to CHAR, VARCHAR values are stored as a 1-byte or 2-byte length prefix plus data. The length prefix indicates the number of bytes in the value. A column uses one length byte if values require no more than 255 bytes, two length bytes if values may require more than 255 bytes.

与CHAR相反, VARCHAR值存储为1字节或2字节长度的前缀加数据.

长度前缀表示值中的字节数.

如果值要求不超过255个字节, 则列使用一个长度字节.

如果值可能要求超过255个字节, 则列使用两个长度字节.

**Mysql varcher类型的列最多可以存储的字符数是多少？**

mysql最大使用2个字节存储值需要的字节数

2个字节可以表示的最大值是65535

1. 编码类型若为gbk, 每个字符最多占2个字节, 最多能存储32767个字符
2. 编码类型若为utf8, 每个字符最多占3个字节, 最多能存储21845个字符
3. 编码类型若为utf8mb, 每个字符最多占4个字节, 最多能存储16383个字符



#### 2. 数据库的范式(Normal Form)

##### 2.1 1NF:第一范式

为了要排除**重复组**的出现, 要求数据库的每一列的论域都是由不可分割的原子值组成; 每个字段的值都只能是单一值.

**重复组现象:**

![image-20231220214101480](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20231220214101480.png)

**缺乏唯一标识符**：

![image-20231220214341808](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20231220214341808.png)

##### 2.2 2NF:第二范式

规则是要求资料表里的所有资料都要和该资料表的键(主键或候选键)有完全依赖关系: 每个非键属性必须独立于任意一个候选键的任意一部分属性.

![image-20231220215035189](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20231220215035189.png)

##### 2.3 3NF:第三范式

要求所有**非主键属性**都只和**候选键**有相关性, 也就是说非主键属性之间应该是独立无关的.

![image-20231220215604978](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20231220215604978.png)



#### 3. 数据库中的常见约束

##### 3.1 主键约束(Primary Key)

3.1.1 Mysql官方推荐不要使用uuid或者不连续不重复的雪花id, 而是推荐连续自增的主键id, 官方推荐的是auto_increament.

使用uuid和自增id索引结构对比：

1. 自增id索引

- 主键页就会近乎于顺序的记录填满, 提升了页的最大填充率, 不会有页的浪费.

- 新插入的行一定会在原有的最大数据行的下一行, mysql的定位和寻址很快, 不会为计算新行的位置做出额外的消耗.

- 减少页分裂和碎片的产生.

2. UUID索引

- 写入的目标页很可能已经刷新到磁盘上并且从缓存上移除，或者还没有被加载到缓存中，innodb在插入之前不得不先找到并从磁盘读取目标页到内存中，这将导致大量的随机IO
- 因为写入是乱序的,innodb不得不频繁的做页分裂操作,以便为新的行分配空间,页分裂导致移动大量的数据，一次插入最少需要修改三个页以上
- 由于频繁的页分裂，页会变得稀疏并被不规则的填充，最终会导致数据会有碎片

在把随机值（uuid和雪花id）载入到聚簇索引(innodb默认的索引类型)以后,有时候会需要做一次OPTIMEIZE TABLE来重建表并优化页的填充，这将又需要一定的时间消耗

使用自增id的缺点:

- 别人一旦爬取你的数据库,就可以根据数据库的自增id获取到你的业务增长信息，很容易分析出你的经营情况
- 对于高并发的负载，innodb在按主键进行插入的时候会造成明显的锁争用，主键的上界会成为争抢的热点，因为所有的插入都发生在这里，并发插入会导致间隙锁竞争
- Auto_Increment锁机制会造成自增锁的抢夺,有一定的性能损失

##### 3.2 非空约束(Not null)

指字段的值不能为null.

##### 3.3 唯一约束(Unique Key)

是指所有记录中字段的值不能重复出现.

##### 3.4 检查性约束(Check)

检查数数据库表中的字段值有效性的一种手段.

##### 3.5 外键约束(Foreign Key)

对于两张具有关联关系的表来说, 相关联字段中主键所在的表就是主表, 外键所在的表就是从表.

##### 3.6 区别

3.6.1 主键约束和唯一约束的区别

相同点: 都可以保证字段值的唯一性

不同点:

1. 一张表中有且只有一个主键约束, 但可以有多个唯一约束
2. 主键约束不允许字段值为null, 但是唯一约束允许字段值为null, 但是只能有一个null值 



















