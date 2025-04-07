#### 1. 主流的分布式调度框架

| 框架名称        | 特点 |
| --------------- | ---- |
| Quartz          |      |
| ElasticJob      |      |
| XXL-JOB         |      |
| Spring-Schedule |      |



#### 2. Spring Schedule

##### 2.1 如何使用Spring定时任务

注解类使用@EnableScheduling注解开启定时任务

方法使用@Scheduled注解或实现SchedulingConfigurer接口

```
@Scheduled(cron = "0/3 * * * * ?")
public void sampleOne(){
    System.out.println(LocalDateTime.now() + "Hello Spring schedule");
}
```

```
@EnableScheduling
@Component
public class SpringScheduleConfigurer implements SchedulingConfigurer {

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        scheduledTaskRegistrar.addFixedDelayTask(() -> {
            System.out.println(LocalDateTime.now() + "hello Spring schedule two");
        }, 3000);
    }

    @Bean
    public TaskScheduler taskScheduler(){
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(50);
        return threadPoolTaskScheduler;
    }
}
```

##### 2.2 配置定时任务多线程非阻塞运行

阻塞原因: 默认情况下使用只有一个线程的线程池

```
### org.springframework.scheduling.config.ScheduledTaskRegistrar#scheduleTasks
if (this.taskScheduler == null) {
	 this.localExecutor = Executors.newSingleThreadScheduledExecutor();
	 this.taskScheduler = new ConcurrentTaskScheduler(this.localExecutor);
}
```

解决思路: 修改Spring调度任务调度器线程池大小

```
@Bean
public TaskScheduler taskScheduler(){
    ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
    threadPoolTaskScheduler.setPoolSize(5);
    return threadPoolTaskScheduler;
}
```

思考问题：

1. 假设现在线程池的大小增大到了5个, 如果有一个调度阻塞了，5个周期之后是不是所有的调度又被阻塞了

##### 2.3 源码解析

1. 利用Spring的BeanPostProcessor后置处理器, 扫描@Scheduled注解的方法, 然后交给调度器处理.

2. 利用Spring的ApplicationListener在项目启动完成后, 扫描所有的SchedulingConfigurer.class实现类, 然后交给调度器处理.



#### 3. Quartz

##### 3.1 Job与JobDetail

Job是一个接口, 每个自定义的任务需要实现这个接口, 在接口的execute()方法编写具体业务逻辑

JobDetail封装Job接口实现也就是任务, 提供更多的属性

Job可分为无状态任务和有状态任务

无状态任务: 多次调用Job期间, 每次创建一个全新的上下文

有状态任务: 多次调用Job期间, 共用同一个上下文

##### 3.2 JobExecutionContext与JobDataMap

JobExecutionContext是运行时上下文

JobDataMap是JobExecutionContext运行时上下文存储数据的容器

##### 3.3 Trigger

常用触发器为: SimpleTrigger和CronTrigger

SimpleTrigger可以设置触发器开始时间和结束时间以及一个时间间隔执行几次

CronTrigger使用日历触发任务

##### 3.4 Scheduler

调度器的作用就是根据触发器触发规则执行指定的任务

##### 3.5 Listener

JobListener: 任务监听器

TriggerListener: 触发器监听器

Scheduler: 触发器监听器

##### 3.6 Quartz的配置文件

```
# Default Properties file for use by StdSchedulerFactory
# to create a Quartz Scheduler Instance, if a different
# properties file is not explicitly specified.
#

# 实例名称
org.quartz.scheduler.instanceName: DefaultQuartzScheduler
org.quartz.scheduler.rmi.export: false
org.quartz.scheduler.rmi.proxy: false
org.quartz.scheduler.wrapJobExecutionInUserTransaction: false

# 线程池类名
org.quartz.threadPool.class: org.quartz.simpl.SimpleThreadPool
# 线程池线程最大数量
org.quartz.threadPool.threadCount: 10
# 线程池线程核心线程数
org.quartz.threadPool.threadPriority: 5
# 自创建父线程
org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true

# 容许的最大任务延长时间
org.quartz.jobStore.misfireThreshold: 60000

# 数据存储
org.quartz.jobStore.class: org.quartz.simpl.RAMJobStore
```

