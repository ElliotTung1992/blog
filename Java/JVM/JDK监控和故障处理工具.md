#### JDK监控和故障处理工具

---

##### JDK命令行工具

这些命令在JDK安装目录下的bin目录下:

1. `jps`(JVM Process Status): 类似UNIX的`ps`命令. 用于查看所有Java进程的启动类、传入参数和Java虚拟机参数等信息.
2. `jstat`(JVM Statistics Monitoring Tool): 用于收集HotSpot虚拟机各方面的运行数据.
3. `jinfo`(Configuration Info for Java): 显示虚拟机配置信息
4. `jmap`(Memory Map for Java): 生成堆转储快照.
5. `jhat`(JVM Heap Dump Browser): 用于分析heapdump文件, 它会建立一个HTTP/HTML服务器, 让用户可以在浏览器上查看分析结果. JDK9移除了jhat.
6. `jstack` (Stack Trace for Java): 生成虚拟机当前时刻的线程快照, 线程快照就是当前虚拟机内每一条线程正在执行的方法堆栈信息集合.

##### jps: 查看所有Java进程

jps的全称是java virtual machine process status tool

显示虚拟机执行主类名称以及这些进程的本地虚拟机唯一ID(Local Virtual Machine Identifier).

```
jps -q 只输出进程的本地虚拟机唯一ID
jps -l 输出主类的全名, 如果是进程执行的是jar包, 输出jar路径
jps -v 输出虚拟机进程启动时JVM参数
jps -m 输出传递给Java进程main()函数的参数
```

##### jstat: 监视虚拟机各种运行状态信息

jstat(JVM Statistics Monitoring Tool)用于监视虚拟机各种运行状态信息的命令行工具.

它可以显示本地或者远程虚拟机进程中的类信息、内存、垃圾收集、JIT编译等运行数据, 在没有GUI, 只提供纯文本控制台环境的服务器上, 它将是运行期间定位虚拟机性能问题的首选工具.

jstat命令使用格式:

```
jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

显示ClassLoader的相关信息: jstat -class vmid;
显示JIT编译的相关信息: jstat -compiler vmid;
显示与GC相关的堆信息: jstat -gc vmid;
显示各个代的容量及使用情况: jstat -gccapacity vmid;
显示新生代信息: jstat -gcnew vmid;
显示新生代大小与使用情况: jstat -gcnewcapacity vmid;
显示老年代和永久代的行为统计: jstat -gcold vmid;
显示老年代的大小: jstat -gcoldcapacity vmid;
显示永久代大小: jstat -gcpercapacity vmid;
显示垃圾收集信息: jstat -gcutil vmid;
```

##### jinfo: 实时查看和调整虚拟机各项参数

`jinfo -flags vmid`: 输出当前jvm进程的全部参数和系统属性(第一部分是系统的属性, 第二部分是JVM的参数)

##### jmap: 生成堆转储快照

`jmap`(Memory Map for Java)命令用于生成堆存储快照. 

`jmap`的作用并不仅仅是为了获取dump文件, 还可以查询finalizer执行队列、Java堆和永久代的详细信息, 如空间使用率、当前使用的是哪种收集器等. 

```
# 查看对应进程堆内存使用情况
jmap -heap [pid]
# 查看存活对象
jmap -histo:live [pid]|more 
# dump堆
jmap -dump:live,format=b,file=xxx.xxx [pid]
```

##### jhat: 分析heapdump文件

`jhat`用于分析heapdump文件, 它会建立一个HTTP/HTML服务器, 让用户在浏览器上查看分析结构.

```
C:\Users\SnailClimb>jhat C:\Users\SnailClimb\Desktop\heap.hprof
Reading from C:\Users\SnailClimb\Desktop\heap.hprof...
Dump file created Sat May 04 12:30:31 CST 2019
Snapshot read, resolving...
Resolving 131419 objects...
Chasing references, expect 26 dots..........................
Eliminating duplicate references..........................
Snapshot resolved.
Started HTTP server on port 7000
Server is ready.
```

##### jstack: 生成虚拟机当前时刻的线程快照

`jstack`(Stack Trace for Java)命令用于生成虚拟机当前时刻的线程快照. 线程快照就是当前虚拟机内每一条线程正在执行的方法堆栈的集合.

生成线程快照的目的主要是定位线程长时间出现停顿的原因, 如线程死锁、死循环、请求外部资源导致的长时间等待等都是导致线程长时间停顿的原因. 线程出现停顿的时候通过`jstack`来查看各个线程的调用堆栈, 就可以知道没有响应的线程到底在后台做些什么事情, 或者在等待什么资源.

```
-l: 长格式输出, 显示关于锁的详细信息. 这有助于诊断死锁和其他与锁相关的问题.
```

```
jstack -l <PID>
jstack <PID> | grep <TID> -A 50
```

































