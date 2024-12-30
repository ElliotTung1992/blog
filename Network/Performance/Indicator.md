##### RTT

RTT(Round-Trip Time): 往返时延

在计算机网络中它是一个重要的指标, 表示从发送端发送数据开始, 到发送端收到来自接受端的确认, 总共经历的时延.

往返时延由三个部分决定:

1. 即链路的传播时长
2. 末端系统的处理时间
3. 路由器的缓存中的排队和处理时间

##### TPS

TPS(Transaction Per Sencond): 每秒事务处理量

##### QPS

QPS(Queries Per Sencond): 每秒查询率

##### CPU密集型(CPU-Bound):

CPU密集型也叫计算密集型, 指的是系统的硬盘、内存性能相对CPU要好很多, 此时, 系统运作大部分的情况是CPU Loading 100%, CPU要读/写I/O(硬盘/内存), I/O在很短的时间就可以完成, 而CPU还有很多运算要处理, CPU Loading很高.

##### IO密集型(IO-Bound):

IO密集型指的是系统的CPU性能相对于硬盘、内存要好很多, 此时, 系统运作, 大部分的情况是CPU在等I/O(硬盘/内存)的读/写操作, 此时CPU的Loading并不高.



























