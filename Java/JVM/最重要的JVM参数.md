#### 最重要的JVM参数

---

##### 堆内存相关

![image-20240521164648226](/Users/ganendong/Library/Application Support/typora-user-images/image-20240521164648226.png)

##### 显示指定堆内存`-Xms -Xmx`

根据应用程序要求初始化堆内存. 

```
-Xms<heap size>[unit]
-Xms<heap size>[unit]
<heap size>:表示要初始化内存的具体大小
[unit]:表示要初始化内存的单位. g(GB)、m(MB)、k(kb)
```

案例: 要为JVM分配最小2GB和最大5GB的堆内存大小

```
-Xms2G -Xmx5G
```

##### 显式指定新生代内存(Young Generation)

在堆总内存配置完成后, 第二大影响因素是为`Young Generation`在堆内存所占的比例. 

默认情况下, YG的最小大小为1310MB, 最大大小为无限制.

一共有两种方式指定新生代内存(Young Generation)的大小:

通过`-XX:NewSize`和`-XX:MaxNewSize`指定

```
-XX:NewSize=<Young size>[unit]
-XX:MaxNewSize=<Young size>[unit]
-XX:NewSize=256M
-XX:MaxNewSize=1024M
```

通过`-Xmn<Young size>[unit]`指定:

如果我们为新生代分配256M的内存(NewSize与MaxNewSize设为一致), 我们的参数可以这么写.

```
-Xmn256M
```

将新对象留在新生代, 由于Full GC的成本远高于Minor GC, 因此尽可能将对象分配在新生代是明智的做法, 实际项目中根据GC日志分析新生代空间大小分配是否合理, 适当通过“-Xmn”命令调节新生代大小, 最大限度降低新对象直接进入老年代的情况.

通过`-XX:NewRatio=<>int`来设置老年代和新生代内存的比例.

设置老年代与新生代内存的比值为 1, 新生代占整个堆栈的 1/2.

```
-XX:NewRatio=1
```

##### 显示指定永久代/元空间的大小

JDK1.8之前永久代还没有被彻底移除的时候通常通过下面的参数来调节方法区的大小:

```
-XX:PermSize=N
-XX:MaxPermSize=N
```

JDK1.8的时候, 方法区(HotSpot的永久代)被彻底移除了, 取而代之的是元空间, 元空间使用的是本地内存.

```
-XX:MetaspaceSize=N
-XX:MaxMetaspaceSize=N
```

Metaspace的初始值量并不是`-XX:MetaspaceSize`设置, 无论`-XX:MetaspqceSize`配置什么值, 对于64位JVM来说, Metaspace的初始容量是21807104.

Metaspace由于使用不断扩容到`-XX:MetaspaceSize`参数指定的量, 就会发生FGC, 且之后每次Metaspace扩容都会发生Fill GC.

也就是说, MetaspaceSize表示Metaspace使用过程中触发Full GC的阀值, 只对触发起作用.

##### 垃圾回收器

为了提高应用程序的稳定性, 选择正确的垃圾收集算法至关重要.

JVM四种类型的GC实现:

```
串行垃圾收集器
-XX:+UseSerialGC
并行垃圾收集器
-XX:+UseParallelGC
CMS垃圾收集器
-XX:+UseConcMarkSweepGC
G1垃圾收集器
-XX:+UseG1GC
```

##### GC日志记录

在生产环境上一定会配置答应GC日志的参数

```
# 必须
# 打印基本GC信息
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
# 打印对象分布
-XX:+PrintTenuringDistribution
# 打印堆数据
-XX:+PrintHeapAtGC
# 打印Reference处理信息
# 强引用/弱引用/软引用/虚引用/finalize相关方法
-XX:+PrintReferenceGC
# 打印STW时间
-XX:+PrintGCApplicationStoppedTime

# 可选
# 打印safepoint信息, 进入STW阶段之前, 需要找到一个合适的safepoint
-XX:+PrintSafepointStatistics
-XX:PrintSafepointStatisticsCount=1

# GC日志输出的文件路径
-Xloggc:/path/to/gc-%t.log
# 开启日志文件分割
-XX:+UseGCLogFileRotation
# 最多分割几个文件, 超过之后从头文件开始写
-XX:NumberOfGCLogFiles=14
# 每个文件上线大小, 超过就出发分割
-XX:GCLogFileSize=50M
```

##### 处理OOM

对于大型应用程序来说, 面对内存不足错误是非常常见的, 这反过来就会导致应用程序崩溃. 这是一个非常关键的场景, 很难通过复制来解决这个问题.

JVM提供了一些参数, 这些参数将堆内存存储到一个物理文件中, 以后可以用来查找泄露:

```
# JVM在遇到OutOfMemoryError错误时将heap存储到物理文件中
-XX:+HeapDumpOnOutOfMemoryError
# 表示要写入文件的路径;可以给出任何文件名;但是，如果 JVM 在名称中找到一个 <pid> 标记，则当前进程的进程 id 将附加到文件名中，并使用.hprof格式
-XX:HeapDumpPath=./java_pid<pid>.hprof
# 用于发出紧急命令，以便在内存不足的情况下执行; 应该在 cmd args 空间中使用适当的命令。例如，如果我们想在内存不足时重启服务器，我们可以设置参数
-XX:OnOutOfMemoryError="< cmd args >;< cmd args >"
-XX:OnOutOfMemoryError="shutdown -r"
# 限制在抛出 OutOfMemory 错误之前在 GC 中花费的 VM 时间的比例
-XX:+UseGCOverheadLimit
```











































