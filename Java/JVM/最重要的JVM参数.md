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











































