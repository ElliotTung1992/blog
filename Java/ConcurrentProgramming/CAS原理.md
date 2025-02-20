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





#### 小结

---



































