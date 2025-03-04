#### Hystrix执行原理

---

![image-20250218152249701](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20250218152249701.png)

总体流程:

1. 创建Hystrix请求命令
2. 执行Hystrix请求命令
3. 请求结果是否被缓存, 如果缓存, 则直接返回
4. 熔断器开关是否打开, 若打开, 直接执行步骤8
5. 信号量或者线程池资源请求, 若信号量或者线程池资源已满, 则请求失败, 直接执行步骤8
6. 执行请求, 若执行失败或者请求超时, 直接执行步骤8
7. 执行fallback方法, 并返回fallback处理结果
8. 返回成功响应



##### 1. 创建Hystrix请求命令 

Hystrix请求采用命令模式, HystrixCommand表示单个操作请求命令, HystrixObservableCommand表示多个操作请求命令.

##### 2. 执行Hystrix请求命令 

HystrixCommand执行:

​	execute: 同步执行

​	queue: 异步执行

HystrixObservableCommand执行:

​	observe: 返回observable对象, 它代表了多个操作结果, 是一个Hot observable.

​	toObservable: 同样返回observable对象，同样代表多个操作结果，但是它是一个Cold observable.

请求合并

##### 3. 请求缓存

从Hystrix处理流程中, Hystrix可以使用缓存来提高接口性能.

##### 4. 熔断器状态

熔断器状态说明:

1. 打开状态: 该状态下, 该接口请求会被拦截, 直接进行失败处理
2. 关闭状态: 该状态下, 该接口请求不会被拦截, 直接进行失败处理
3. 半打开状态: 当熔断器打开一段时间后(默认5秒), Hystrix会允许一次接口请求, 当请求成功, 关闭熔断器. 当请求失败, 则再等一段时间后, 再进行打开尝试.

熔断器打开条件:

1. 请求总量达到阀值
2. 错误率达到阀值

##### 5. 信号量和线程隔离

![image-20250218183749078](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/image-20250218183749078.png)

Hystrix的两种资源隔离策略

1. 线程池模式
2. 信号量模式

> 线程池模式

当用户请求服务A和服务I时候, Tomcat线程(图中蓝色箭头标注)会将请求的任务交给服务A和服务I的内部线程池里的线程(图中橘黄色箭头标注)来执行, Tomcat线程就去干别的事情了. 当服务A和服务I自己线程池里面的线程执行完任务之后, 就会将调用结果返回给Tomcat线程, 从而实现资源的隔离.

当有大量并发的时候, 服务内部的线程池的数量决定了整个服务的并发度. 

例如服务A德线程池大小是10个, 当同时有12个请求时, 只会允许10个任务在执行, 其他任务被放在线程队列中, 或者直接走降级逻辑, 此时, 如果服务A挂了, 就不会造成大量的线程被服务A拖死, 服务I依然能够提供服务, 整个系统不会受太大的影响.

> 信号量模式

信号量的资源隔离只是起到一个开关的作用, 例如: 服务X的信号量为10, 那么同时只允许10个Tomcat的线程(此处是Tomcat的线程, 而不是服务X的独立线程池里的线程)来访问服务X, 其他的请求就会被拒绝, 从而达到限流保护的作用.



#### Hystrix相关参数配置

---

相关配置参数:

```
hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 1000  # 设置超时时间
      circuitBreaker:
        requestVolumeThreshold: 20       # 设置请求量阈值
        errorThresholdPercentage: 50     # 设置错误百分比阈值
        sleepWindowInMilliseconds: 5000  # 设置睡眠窗口时间
```



















