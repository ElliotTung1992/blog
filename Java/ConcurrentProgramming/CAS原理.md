#### Java中的CAS原理

---

CAS（Compare And Swap）是一种乐观锁的实现方式, 全称为“比较并交换”, 是一种无锁的原子操作.

##### 如何保证原子性?

在Java中, 我们可以使用`synchronized`关键字和`CAS`来实现加锁操作.

`synchronized`是悲观锁, 尽管随着JDK版本的升级, `synchronized`关键字轻量级了很多, 但依然是悲观锁.

线程开始第一步就是获取锁, 一旦获得锁, 其它的线程进入后就会阻塞并等待.

`CAS`是乐观锁, 线程执行的时候不会加锁, 它会假设此时没有冲突, 然后完成某项操作. 如果因为冲突失败了就重试, 直到成功为止.



#### 什么是CAS

---

在CAS中, 有这样三个值:

1. V: 需要新的变量(var)
2. E: 预期值(Expected)
3. N: 新值(New)

比较并交换的过程如下:

判断V的值是否等于E, 如果等于则将V的值设置为N. 如果不相等, 说明已经有其它线程更新了V, 于是当前线程发起再次重试或者放弃更新, 什么都不做.



#### CAS的原理

---

CAS是一种原子操作, 那么Java是如何来使用CAS的呢? 我们知道，在 Java 中，如果一个[方法是 native 的](https://javabetter.cn/oo/native-method.html)，那 Java 就不负责具体实现它，而是交给底层的 JVM 使用 C 语言 或者 C++ 去实现。

Unsafe 对 CAS 的实现是通过 C++ 实现的，它的具体实现和操作系统、CPU 都有关系。



#### CAS如何实现原子操作

---

Java8源码:

```
// Object var1: 操作的对象
// long var2: 你想要操作的对象中的某个字段的偏移量
// int var4: 你想要增加的值
public final int getAndAddInt(Object var1, long var2, int var4) {
    int var5;
    do {
    		// 获取当前对象指定字段的值, 存放在临时变量var5中
        var5 = this.getIntVolatile(var1, var2);
    }
    // 进行CAS操作
    // 如果对象var1在内存地址var2处的值等于预期值var5
    // 则该位置的值更新为: var5 + var4
    while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));
    // 返回原始值
    return var5;
}
```



#### CAS的三大问题

---

尽管CAS提供了一种有效的同步手段, 但还是会出现一些问题:

1. ABA问题
2. 长时间自旋
3. 多个共享变量的原子操作

##### ABA问题

> ABA问题

所谓的ABA问题, 就是一个值原来是A, 然后变成了B, 再变回A, 这个时候使用CAS是检测不出来变化的, 但实际已经被修改了两次了.

解决思路: 就是在变量前面追加版本号或者时间戳. 在JDK1.5开始, 提供了`java.util.concurrent.atomic.AtomicStampedReference#compareAndSet`来解决这个问题

```
/**
 * Atomically sets the value of both the reference and stamp
 * to the given update values if the
 * current reference is {@code ==} to the expected reference
 * and the current stamp is equal to the expected stamp.
 * // 预期引用
 * @param expectedReference the expected value of the reference
 * // 新引用
 * @param newReference the new value for the reference
 * // 预期标记
 * @param expectedStamp the expected value of the stamp
 * // 新标记
 * @param newStamp the new value for the stamp
 * @return {@code true} if successful
 */
public boolean compareAndSet(V   expectedReference,
                             V   newReference,
                             int expectedStamp,
                             int newStamp) {
    // 获取当前Pair对象                         
    Pair<V> current = pair;
    // 第一层逻辑: 判断当前的引用及标记是否和预期的引用和标记是否相同
    // 第二层逻辑: 判断如果当前引用及标记与新引用和标记是否相同
    // 第三层逻辑: 如果新的引用或者标记与当前的不同, 则调用casPair方法尝试更新pair对象
    return
        expectedReference == current.reference &&
        expectedStamp == current.stamp &&
        ((newReference == current.reference &&
          newStamp == current.stamp) ||
         casPair(current, Pair.of(newReference, newStamp)));
}
```

##### 长时间自旋问题

CAS多于自旋结合, 如果CAS自旋长时间不成功, 会占用大量的CPU资源.

解决思路: 让JVM支持处理器提供的pause执行.

pause 指令能让自旋失败时 cpu 睡眠一小段时间再继续自旋，从而使得读操作的频率降低很多，为解决内存顺序冲突而导致的 CPU 流水线重排的代价也会小很多。

##### 多个共享变量的原子操作

当对一个共享变量进行操作时, CAS能够保证变量的原子性.

但是对于多个共享变量, CAS无法保证操作的原子性.

解决方案:

1. 使用`AtomicReference`类保证对象之间的原子性, 把多个变量放到一个对象里进行CAS操作.
2. 使用锁. 锁内的临界代码可以保证只有当前线程能操作.

































