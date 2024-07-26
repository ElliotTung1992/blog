#### 1. 线程

##### 1.1 线程状态流转图

![ThreadLifeCycle](/Users/ganendong/Documents/design/export/ThreadLifeCycle.png)



#### 2. 详情

##### 2.1 线程状态

```
public enum State {
    /**
     * Thread state for a thread which has not yet started.
     * 尚未启动线程的线程状态
     */
    NEW,

    /**
     * Thread state for a runnable thread.  A thread in the runnable
     * state is executing in the Java virtual machine but it may
     * be waiting for other resources from the operating system
     * such as processor.
     * 可运行线程的线程状态
     * 处于可运行状态的线程正在Java虚拟机里执行
     * 但是它也可能正在等待来自其他系统(例如执行器)的其他资源
     */
    RUNNABLE,

    /**
     * Thread state for a thread blocked waiting for a monitor lock.
     * A thread in the blocked state is waiting for a monitor lock
     * to enter a synchronized block/method or
     * reenter a synchronized block/method after calling
     * {@link Object#wait() Object.wait}.
     * 等待监视器锁定的线程被阻塞的线程状态.
     * 处于阻塞状态的线程等待监视器锁定.
     * 线程进入同步代码块/方法或调用后重新进入同步代码块/方法.
     */
    BLOCKED,

    /**
     * Thread state for a waiting thread.
     * A thread is in the waiting state due to calling one of the
     * following methods:
     * <ul>
     *   <li>{@link Object#wait() Object.wait} with no timeout</li>
     *   <li>{@link #join() Thread.join} with no timeout</li>
     *   <li>{@link LockSupport#park() LockSupport.park}</li>
     * </ul>
     *
     * <p>A thread in the waiting state is waiting for another thread to
     * perform a particular action.
     *
     * For example, a thread that has called {@code Object.wait()}
     * on an object is waiting for another thread to call
     * {@code Object.notify()} or {@code Object.notifyAll()} on
     * that object. A thread that has called {@code Thread.join()}
     * is waiting for a specified thread to terminate.
     * 等待线程的线程状态
     * 线程由于调用以下方法之一而处于等待状态:
     * Object.wait/Thread.join/LockSupport.park
     * 处于等待的线程正在等待另一个线程执行特定的操作
     * 例如: 举例一个已经调用Object.wait()的线程正在等待另一个线程用这个对象调用Object.notify()
     * 或Object.notifyAll()
     * 一个已经调用过Thread.join()的线程等待特定的线程结束.
     */
    WAITING,

    /**
     * Thread state for a waiting thread with a specified waiting time.
     * A thread is in the timed waiting state due to calling one of
     * the following methods with a specified positive waiting time:
     * <ul>
     *   <li>{@link #sleep Thread.sleep}</li>
     *   <li>{@link Object#wait(long) Object.wait} with timeout</li>
     *   <li>{@link #join(long) Thread.join} with timeout</li>
     *   <li>{@link LockSupport#parkNanos LockSupport.parkNanos}</li>
     *   <li>{@link LockSupport#parkUntil LockSupport.parkUntil}</li>
     * </ul>
     * 处于等待特定时间的线程的线程状态.
     * 线程处于计时等待状态由于调用了以下某个方法并使用了特定的正等待时间
     * Thread.sleep/Object.wait/Thread.join/LockSupport.parkNanos/LockSupport.parkUntil
     */
    TIMED_WAITING,

    /**
     * Thread state for a terminated thread.
     * The thread has completed execution.
     * 终止线程的线程状态. 线程已经完成执行.
     */
    TERMINATED;
}
```

##### 2.2 线程方法

java.lang.Object#wait(long, int): Causes the current thread to wait until it is awakened. Typically by being notified or interrupted.

会使线程进入等待状态并释放该对象锁.

java.lang.Object#notify: Wakes up a single thread that is waiting on this object's monitor.

唤醒正在等待这个对象锁的单个线程.

java.lang.Object#notifyAll: Wakes up all threads that are waiting on this object's monitor.

 唤醒那些正在等待这个对象锁的所有线程.



java.util.concurrent.locks.LockSupport#park(java.lang.Object): Disables the current thrad for thread scheduling purposes unless the permit is available.

锁当前线程除非允许操作.

java.util.concurrent.locks.LockSupport#parkNanos(java.lang.Object, long): Disable the current thread for thread scheduling purposes. for up to the specified waiting time, unless the permit is available.

锁定当前线程一段时间除非允许操作.

java.util.concurrent.locks.LockSupport#parkUntil(java.lang.Object, long): Disables the current thread for thread scheduling purpose, until the specified deadline, unless the permit is available.

锁定当前线程直到制定的截止时间除非允许操作.

java.util.concurrent.locks.LockSupport#unpark: Makes available the permit for the given thread.

使指定线程允许操作.



java.lang.Thread#join(long): Waits at most xxx milliseconds for this thread to die.

当前线程最多等待目标线程一段时间或执行完成操作(线程死亡).

java.lang.Thread#sleep(long): Causes the currently executing thread to sleep.

使当前正在执行的线程进入睡眠状态.



##### 2.3 线程局部变量

```
ThreadLocal.ThreadLocalMap threadLocals
```



##### 2.4 守护线程(Daemon Thread)

什么是守护线程?

守护线程是指为其它线程服务的线程. 在JVM中, 所有非守护线程都执行完毕后, 无论有没有守护线程, 虚拟机都会自动退出.

因此JVM退出时, 不必关心守护线程是否结束.

守护线程不能持有任何需要关闭的资源, 例如打开文件等;因为虚拟机退出时, 守护线程没有任何机会来关闭文件, 这会导致数据丢失.

常见的守护线程: 垃圾回收线程



#### 常见异常

```
java.lang.IllegalMonitorStateException: current thread is not owner
当前线程不是锁的拥有者
```

