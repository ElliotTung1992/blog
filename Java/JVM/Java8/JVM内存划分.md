#### Java 8 JVM内存划分

---

##### 按内存划分 - 堆内存和非堆内存

Java 8 JVM内存划分主要包括堆内存和非堆内存(Metaspace).

堆内存用来存储对象实例.

非堆内存(Metaspace)则用来存储类的元数据.

对内存:

>  堆内存(Heap): 存放Java对象的实例, 其大小可以通过-Xms和-Xmx参数来控制. 
>
>  -Xms指定JVM启动时的初始化堆大小
>
>  -Xmx指定最大堆内存

非堆内存(Metaspace):

> 非堆内存(Metaspace): 存放类的元数据.
>
> 在Java8中, 永久代被元空间取代
>
> 元空间的大小由-XX:MetaspaceSize和-XX:MaxMetaspaceSize参数来控制
>
> -XX:MetaspaceSize: 指定元空间初始大小
>
> -XX:MaxMetaspaceSize: 指定元空间的最大大小

##### 堆内存空间划分:

Java8 JVM 堆内存空间可以划分为以下几个区域：

1. 新生代(Young Generation)

   > Eden区和连个Survivor区(From和To)

2. 老年代(Old Generation): 进过多次新生代垃圾回收仍然存活的对象



### GC

---

查看JDK1.8使用的垃圾回收器:`jmap -heap pid` 可以发现当前默认使用的`Parallel GC`垃圾收集器

##### Parallel GC有两种组合:

1. 使用`-XX:UseParallelGC` 参数来启用 `Paraller Scavenge`和`PSMarkSweep(Serial Old)`收集器组合进行垃圾回收
2. 使用`-XX:UseParallelOldGC` 参数来启用 `Parallel Scavinge`和`Parallel Old`收集器组合进行垃圾回收

##### Parallel GC 垃圾回收类型:

1. Young GC 

   >  Parallel Scavenge垃圾回收器

2. Full GC

   > Serial Old垃圾回收器
   >
   > Parallel Old垃圾回收器

##### 

#### JVM什么时候触发GC

---

##### Young GC

1. 当Eden区满了的时候, 就会触发Young GC

##### Full GC

1. Young GC之前检查老年代
2. Young GC之后老年代空间不足
3. 老年代空间不足
4. 空间分配担保失败
5. 方法区空间不足
6. System.gc()等命令触发



#### 哪些对象会被垃圾回收器回收

---





#### 常见的垃圾回收器:

---

##### Parallel Scavenge垃圾回收器

> 使用的算法: 复制算法
>
> 特点: 吞吐量最大化为目标的收集器实现, 允许较长时间的STW换取吞吐量最大化

##### Serial Old垃圾回收器

> 使用的算法: 标记 - 整理算法

##### Parallel Old垃圾回收器

> 使用的算法: Mark-Summary-Conpaction算法



#### 常见的垃圾回收算法

---

##### 复制算法:

##### 标记 - 整理算法:

##### Mark - Summary - Conpaction算法:



#### 相关名词

---

##### 吞吐量:

>吞吐量=t1/(t1+t2)
>
>t1: 程序运行时长
>
>t2: 垃圾手机的总时长

##### STW(Stop-The-World):

Stop-The-World是JVM在执行GC时的一种状态, 即所有线程都暂停执行, 等待GC完成.

这是因为在GC过程中, 需要确保没有任何线程能够修改对象的引用关系, 否则GC可能

无法正确找到所有的垃圾对象, 从而导致内存泄露.

Stop-The-World的持续时间主要取决于GC的类型和堆中对象的数量.



















