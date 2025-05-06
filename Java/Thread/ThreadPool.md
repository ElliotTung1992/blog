#### 线程池

---

##### Runnable接口和Runable接口的区别

1. Runnable接口run方法无返回值; Callable接口call方法有返回值, 是个范性, 和Future和FutureTask配合可以用来获取异步执行的结果
2. Runnable接口的run方法只能抛出运行时异常且无法捕获异常. Callable接口call方法允许抛出异常, 可以获取异常信息.



#### ThreadPoolExecutor

---

##### 7大核心参数

```
/**
     * Creates a new {@code ThreadPoolExecutor} with the given initial
     * parameters.
     *
     * @param corePoolSize the number of threads to keep in the pool, even
     *        if they are idle, unless {@code allowCoreThreadTimeOut} is set
     * @param maximumPoolSize the maximum number of threads to allow in the
     *        pool
     * @param keepAliveTime when the number of threads is greater than
     *        the core, this is the maximum time that excess idle threads
     *        will wait for new tasks before terminating.
     * @param unit the time unit for the {@code keepAliveTime} argument
     * @param workQueue the queue to use for holding tasks before they are
     *        executed.  This queue will hold only the {@code Runnable}
     *        tasks submitted by the {@code execute} method.
     * @param threadFactory the factory to use when the executor
     *        creates a new thread
     * @param handler the handler to use when execution is blocked
     *        because the thread bounds and queue capacities are reached
     * @throws IllegalArgumentException if one of the following holds:<br>
     *         {@code corePoolSize < 0}<br>
     *         {@code keepAliveTime < 0}<br>
     *         {@code maximumPoolSize <= 0}<br>
     *         {@code maximumPoolSize < corePoolSize}
     * @throws NullPointerException if {@code workQueue}
     *         or {@code threadFactory} or {@code handler} is null
     */
    public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue<Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler) {
        if (corePoolSize < 0 ||
            maximumPoolSize <= 0 ||
            maximumPoolSize < corePoolSize ||
            keepAliveTime < 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
```

@param corePoolSize: 核心线程池大小; 保留在线程池中的线程数, 即使他们是闲置的, 除非设置允许核心线程池过期

@param maximumPoolSize: 最大线程池大小; 线程池允许的最大线程数

@param keepAliveTime: 保持存活时间; 当线程的数量超过了核心线程池大小, 过量的闲置线程在结束前等待新任务的最长时间

@param unit: @code keepAliveTime的时间单位

@param workQueue: 工作队列; 任务执行前保存任务的队列, 队列只会保存方法execute()提交的任务.

@param threadFactory: 线程工厂; executor执行器创建新线程时使用的工厂

@param handler: 处理器; 当处理被阻塞时使用的处理器, 因为达到了线程的边界和队列的容量



#### RejectedExecutionHandler

---

##### CallerRunsPolicy

直接让提交任务的调用者线程(如主线程)执行该任务, 而非丢弃或抛出异常.

1. 调用者线程会阻塞并亲自运行被拒绝的任务
2. 通过让调用者参与执行, 间接降低了新任务的提交速度, 给线程池喘息的时间
3. 适用不允许任务丢失但能容忍任务短暂阻塞的场景

缺点: 如果调用线程执行的任务是一个耗时任务则会导致调用线程被阻塞, 则可能造成其它严重影响.

##### CustomRejectedExecutionHandler

自定义拒绝策略逻辑可能超时, 影响整个线程池.

例子: 比如在自定义拒绝策略中对异常任务进行数据库归档, 但可能数据库阻塞等异常导致响应缓慢

可能拖慢整个线程池

解决方案: 

1. 只进行简单的日志打印
2. 把错误信息存入可靠的消息队列



#### Executors

---

##### FixedThreadPool 

创建一个线程数固定的线程池, 超出的任务会在工作队列中等待空闲线程, 可以控制程序的最大并发数

创建一个固定线程数的线程池. 

线程池的corepoolSize = maximumPoolSize

空闲线程的存活时间是0毫秒

使用的工作队列是链表实现的阻塞队列 - 长度是Intege的最大值



##### CachedThreadPool

创建一个短时间内处理大量工作的线程池, 会根据任务数量创建对应的线程, 并试图缓存线程以便重复使用, 如果线程60秒没有被使用, 则从缓存中移除.

corePoolSize的长度是0

maximumPoolSize的长度是Integer的最大值

线程的存活时间是60秒

工作队列是同步队列



##### SingleThreadExecutor

创建一个单线程线程池

corePoolSize = maximumPoolSize

线程的存活时间是0毫秒

工作队列是链表实现的阻塞队列 - 长度是Intege的最大值



##### ScheduledThreadPool

创建一个数量固定的线程池, 支持执行定时性或周期性任务

corePoolsize = 用户指定

maximumPoolsize = Integer的最大值

空闲线程存活时间是10毫秒

工作队列是延迟工作队列



##### WorkStealingPool

创建时不需要设备任何参数, 则以当前机器的处理器个数作为线程个数, 此线程池会并行处理任务, 不能保证执行顺序.



#### 使用线程池的规范

---

##### 1. 创建线程或线程池时请指定有意义的线程名称, 方便出错时回溯

自定义线程工厂, 并根据外部特征进行分组, 比如来自同一机房的调用, 把机房编号赋值给whatFeatureOfGroup

```
public class UserThreadFactory implements ThreadFactory {
    private final String namePrefix;
    private final AtomicInteger nextId = new AtomicInteger(1);
    // 定义线程组名称，在利用 jstack 来排查问题时，非常有帮助
		UserThreadFactory(String whatFeatureOfGroup) {
				namePrefix = "FromUserThreadFactory's" + whatFeatureOfGroup + "-Worker-";
		}
    @Override
    public Thread newThread(Runnable task) {
        String name = namePrefix + nextId.getAndIncrement();
        Thread thread = new Thread(null, task, name, 0, false);
        System.out.println(thread.getName());
        return thread;
    }
}
```



##### 2. 线程资源必须通过线程池提供, 不允许在应用中自行显示创建线程

线程池的好处是减少在创建和销毁线程上所消耗的时间以及系统资源的开销, 解决资源不足的问题.

如果不使用线程池, 有可能造成系统创建大量同类线程而导致消耗完内存或者"过度切换的问题"



##### 3. 线程池不允许使用Executors去创建, 而是通过ThreadPoolExecutor的方式, 这样的处理方式让创建者更加明确线程池的运行规则, 规避资源耗尽的风险

1. FixedThreadPool和SingleThreadPool - 允许的工作队列长度为Integer的最大值, 很可能堆积大量的请求, 从而导致OOM.
2. CachedThreadPool和ScheduledThreadPool - 允许创建的线程数是Integer的最大值, 从而造成OOM.

##### 资源监控:

```
// 查看队列长度
threadPoolExecutor.getQueue().size();
// 查看线程活跃数
threadPoolExecutor.getActiveCount();
```



#### 线程泄露

---

现象一: 线程池中的线程调用一个静态的Map对象

现象二: 线程池中的线程调用外部资源, 比如数据库连接等, 但为正确关闭对应的资源

解决方案: 在使用线程池执行任务确保对应的资源被释放



#### 线程池中执行任务的坑

---

##### 1. 阻塞任务

现象: 如果任务涉及到外部系统, 可能访问外部接口超时或执行时间过长, 造成线程一直卡在哪里

可能导致后续大量的任务失败

解决的方案: 提交任务改用Callable接口, 并设置超时时间, 并对超时的任务进行兜底处理



##### 2. 任务执行异常

线程执行的任务抛异常导致导致线程被销毁

解决的方案: 必须对执行的任务进行捕获操作, 并且如果捕获到异常需要对异常情况进行兜底处理



#### 思考: 如何设置任务不丢失

---

1. 普通业务系统: CallerRunsPolicy或者无界队列
2. 金融交易系统: 持久化到DB + 定时任务
3. 高吞吐异步处理: 消息队列中间件
4. 大数据处理: 本地磁盘暂存 + 批量恢复



#### 调试工具

---

1. jstack
2. VisualVM
3. Arthas



#### 使用场景

---

##### 框架中的使用场景

1. Spring中的任务调度
1. Spring中的异步任务