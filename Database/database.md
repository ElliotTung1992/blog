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

##### 3.1 主键约束

##### 3.2 非空约束

##### 3.3 唯一约束

##### 3.4 检查性约束

##### 3.5 外键约束

















