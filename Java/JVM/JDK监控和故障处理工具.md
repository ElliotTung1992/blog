#### JDK监控和故障处理工具

---

##### JDK命令行工具

这些命令在JDK安装目录下的bin目录下:

1. `jps`(JVM Process Status): 类似UNIX的`ps`命令. 用于查看所有Java进程的启动类、传入参数和Java虚拟机参数等信息.
2. jstat
3. jinfo
4. jmap(Memory Map for Java): 生成堆转储快照.
5. jhat
6. `jstack` (Stack Trace for Java): 生成虚拟机当前时刻的线程快照, 线程快照就是当前虚拟机内每一条线程正在执行的方法堆栈信息集合.

##### jps: 查看所有Java进程

显示虚拟机执行主类名称以及这些进程的本地虚拟机唯一ID(Local Virtual Machine Identifier).

```
# 只输出进程的本地虚拟机唯一ID:
jps -q 
# 输出主类的全名, 如果是进程执行的是jar包, 输出jar路径：
jps -l
# 输出虚拟机进程启动时JVM参数
jps -v
# 输出传递给Java进程main()函数的参数
jps -m
```

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

##### jstack: 生成虚拟机当前时刻的线程快照

`jstack`(Stack Trace for Java)命令用于生成虚拟机当前时刻的线程快照. 线程快照就是当前虚拟机内每一条线程正在执行的方法堆栈的集合.

生成线程快照的目的主要是定位线程长时间出现停顿的原因, 如线程死锁、死循环、请求外部资源导致的长时间等待等都是导致线程长时间停顿的原因. 线程出现停顿的时候通过`jstack`来查看各个线程的调用堆栈, 就可以知道没有响应的线程到底在后台做些什么事情, 或者在等待什么资源.

```
jstack -l <PID>
jstack <PID> | grep <TID> -A 50
```

































