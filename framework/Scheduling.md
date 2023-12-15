#### 1. 主流的分布式调度框架

| 框架名称   | 特点 |
| ---------- | ---- |
| Quartz     |      |
| ElasticJob |      |
| XXL-JOB    |      |



#### 2. Quartz

##### 2.1 Job与JobDetail

Job是一个接口, 每个自定义的任务需要实现这个接口, 在接口的execute()方法编写具体业务逻辑

JobDetail封装Job接口实现也就是任务, 提供更多的属性

Job可分为无状态任务和有状态任务

无状态任务: 多次调用Job期间, 每次创建一个全新的上下文

有状态任务: 多次调用Job期间, 共用同一个上下文

##### 2.2 JobExecutionContext与JobDataMap

JobExecutionContext是运行时上下文

JobDataMap是JobExecutionContext运行时上下文存储数据的容器

##### 2.3 Trigger

常用触发器为: SimpleTrigger和CronTrigger

SimpleTrigger可以设置触发器开始时间和结束时间以及一个时间间隔执行几次

CronTrigger使用日历触发任务

##### 2.4 Scheduler

调度器的作用就是根据触发器触发规则执行指定的任务

##### 2.5 Listener

JobListener: 任务监听器

TriggerListener: 触发器监听器

Scheduler: 触发器监听器

##### 2.6 Quartz的配置文件

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

