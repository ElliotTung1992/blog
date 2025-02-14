#### 服务器cpu过高如何排查和解决

---

线上系统突然运行缓慢, cpu飙升到100%, 以及Full GC次数过多, 接着就是各种报警.

##### 常见能够引起cpu异常的情况有哪些？

1. Java内存不够或者溢出导致GC overhead limit exceeded.
2. 代码中相互竞争导致的死锁
3. 特别耗费计算资源的操作, 例如正则匹配, Java中的正则匹配默认有回溯问题, 复杂的正则匹配会引起CPU异常
4. 死循环引起的CPU高密度计算

根据Oracle官方资料, GC overhead limit exceeded表示JVM一直在GC导致应用程序变慢，具体量化指标就是JVM执行垃圾回收花费超过98%的时间，但释放出的可用堆内存却少于2%，连续多次（一般5次）GC回收的内存都不足2%的情况下就会抛出此异常。

##### 服务器CPU使用率飙升异常, 黄金4步排查法

1. 找到占用CPU最高的Java进程PID: top
2. 根据PID找到占用CPU最高的线程: ps -mp <PID> -o THREAD,tid | sort -r
3. 将指定的线程ID输出为16进制格式: printf "%x\n" tid
4. 使用16进程格式的线程ID查找线程堆栈信息: jstack pid|grep tid -A 50

#### 什么场景会造成CPU低而负载很高?

---



#### 机器内存占有率居高不下, 如何进行优化？

---

1. 使用`top -p pid`查看指定的pid对应的进程的CPU和内存及负载情况.
2. `jmap -histo:live [pid]|more`, 查看存活对象
3. `jmap -dump:live,format=b,file=xxx.xxx [pid]`, 然后利用MAT工具分析是否存在内存泄露问题.
4. `jmap -heap [pid]`查看对应进程堆内存使用情况















































