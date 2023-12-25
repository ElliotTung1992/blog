#### 1. ThreadPoolExecutor

##### 1.1 核心7大参数

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



#### 2. ScheduledThreadPoolExecutor



#### 3. 应用场景

##### 3. 1 框架

1. Spring中的调度实现