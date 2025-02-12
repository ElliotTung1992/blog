#### 限流场景

---

##### 粗颗粒度

1. 全局请求限流

##### 细颗粒度 - 接口维度

1. 租户/渠道
2. 用户
3. 接口

##### 业务场景

1. 查证接口设置租户每日查证上限
1. 每人每天参与活动抽奖上限



#### 限流

---

##### 什么是QPS:

每秒查询率（QPS, Queries-per-second）, 即单位时间单位计算资源处理的请求数据量.

在大模型场景下, QPS的提升意味着模型推理速度的提高, 这能够为更多用户提供服务或降低模型推理的成本.

##### 什么是TPS:

TPS: Transactions Per Second的缩写, 也就是事务数/秒.

客户机在发送请求时开始计时, 收到服务器响应后结束计时, 以此来计算使用的时间和完成的事务个数.

##### 什么是并发量:

系统能同时处理请求数/事务数

##### 响应时间:

一般取平均响应时间

##### 常见的解决方案

1. 固定窗口算法 - [开始时间和结束时间]
2. 滑动窗口算法 - [List, Queue]
3. 滑动日志算法 - [TreeMap]
4. 信号量
5. 漏桶算法
6. 令牌流算法

##### 常见的解决方案比较

窗口算法: 

1. 算法实现简单
2. 逻辑清晰
3. 可以直观地了解当前的QPS情况
4. 有时间窗口的临界突变问题
5. 不像桶一样有队列可以缓冲

桶算法:

1. 主要使用生产者和消费者模型
2. 不好统计QPS情况
3. 漏桶模式 - 消费速率恒定, 可以很好地保护自身系统, 面对突发流量不能快速响应.
4. 令牌桶模式 - 可以面对突发流量, 但是启动会有缓慢加速过程.

信号量:

1. 信号量可以保证并行处理的线程总数



#### 限流算法

---

##### 固定窗口算法:

问题: 时间窗口的临界突变

##### 滑动窗口算法:

问题: 解决了时间窗口的临界突变, 但是逻辑比较复杂

##### 滑动日志算法:

问题: 逻辑比较简单, 但是比价占内存

##### 漏桶算法:

问题: 适用于异步场景，当桶未满时可以把请求任务存放进桶里，当桶满时则无法将请求任务存放进桶里

​          处理任务的线程则会匀速地从桶里拉取任务执行

![image-20240924160445333](/Users/ganendong/Library/Application Support/typora-user-images/image-20240924160445333.png)

##### 令牌桶算法:

令牌桶算法是网络流量整形和速率限制中最常使用的一种算法。

典型情况下，令牌桶算法用来控制发送到网络上的数据的数目，并允许突发数据的发送。

![image-20240924160525303](/Users/ganendong/Library/Application Support/typora-user-images/image-20240924160525303.png)



#### 限流算法实现

---

##### Redis分布式限流 - 固定窗口算法

使用Redis的`incr`和设置key的过期时间 

##### Redis分布式限流 - 滑动窗口算法

Redis的`ZSet`是有序集合, 通过`removeRage`删除过期的时间, 再判断`Zset`对应Key的长度.

使用Redis的`ZSET`命令实现Redis的滑动窗口算法



#### 令牌桶算法原理

---

##### 1. 单机版限流 - Guava中的限流工具类RateLimiter

使用令牌桶算法实现

源码分析:

```

// 当前令牌桶中令牌的数量   
double storedPermits;

// 令牌桶的最大容量  
double maxPermits;

// 多少时间往令牌桶中添加一个令牌  
double stableIntervalMicros;

// 下一个授权请求通过的时间  
private long nextFreeTicketMicros = 0L; 

// 获取令牌
@CanIgnoreReturnValue
public double acquire(int permits) {
	// 预定本次请求所需要的Token数需要等待的时间
  long microsToWait = reserve(permits);
  // 进行等待
  stopwatch.sleepMicrosUninterruptibly(microsToWait);
  // 返回等待的秒数
  return 1.0 * microsToWait / SECONDS.toMicros(1L);
}

// 预定本次请求所需要的Token数需要等待的时间
final long reserve(int permits) {
	// 校验申请通行证数量的合法性
  checkPermits(permits);
  // 并发访问所以需要加锁处理
  synchronized (mutex()) {
    return reserveAndGetWaitLength(permits, stopwatch.readMicros());
  }
}

final long reserveAndGetWaitLength(int permits, long nowMicros) {
  // 本次请求预定到Token的时间
  long momentAvailable = reserveEarliestAvailable(permits, nowMicros);
  // 计算等待时长
  return max(momentAvailable - nowMicros, 0);
}

@Override
final long reserveEarliestAvailable(int requiredPermits, long nowMicros) {
  // 更新令牌桶的Token数, 补充令牌
  resync(nowMicros);
  long returnValue = nextFreeTicketMicros;
  double storedPermitsToSpend = min(requiredPermits, this.storedPermits);
  // 需要预付的令牌数, 并且计算下次发放Token的时间
  double freshPermits = requiredPermits - storedPermitsToSpend;
  long waitMicros =
      storedPermitsToWaitTime(this.storedPermits, storedPermitsToSpend)
          + (long) (freshPermits * stableIntervalMicros);
  this.nextFreeTicketMicros = LongMath.saturatedAdd(nextFreeTicketMicros, waitMicros);
  // 扣减本次请求所需的Token数
  this.storedPermits -= storedPermitsToSpend;
  // 返回本次发放Token的时间
  return returnValue;
}

// 同步
void resync(long nowMicros) {
  // if nextFreeTicket is in the past, resync to now
  // 如果当前时间大于下一次获取Token的时间, 则需要增加token数
  if (nowMicros > nextFreeTicketMicros) {
    // 计算需要填充的令牌数
    double newPermits = (nowMicros - nextFreeTicketMicros) / coolDownIntervalMicros();
    storedPermits = min(maxPermits, storedPermits + newPermits);
    // 更新时间
    nextFreeTicketMicros = nowMicros;
  }
}
```

SmoothRateLimiter的两个实现:

1. SmoothBursty
2. SmoothWarmingUp

##### 2. 分布式版限流 - SpringBootGateway限流方案

该算法的基本原理是: 有一个容量为X的令牌桶, 每Y单位时间将Z个令牌放入桶中, 如果令牌桶中的数量超过X, 那么它将被丢弃.

处理请求时, 需要先从桶中获取令牌, 如果拿到请求则处理请求, 如果拿不到令牌则拒绝请求.

org.springframework.cloud.gateway.filter.factory.RequestRateLimiterGatewayFilterFactory#apply

org.springframework.cloud.gateway.config.GatewayRedisAutoConfiguration

org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter#isAllowed

```
// 存储token的key名
local tokens_key = KEYS[1]
// 存储获取token时间的key名
local timestamp_key = KEYS[2]

// 往令牌桶存放令牌的速率
local rate = tonumber(ARGV[1])
// 令牌桶的最大容量
local capacity = tonumber(ARGV[2])
// 当前时间
local now = tonumber(ARGV[3])
// 每个请求消耗的令牌数
local requested = tonumber(ARGV[4])

// 填充满令牌桶所需的时间
local fill_time = capacity/rate
// redis对应key的失效时间
local ttl = math.floor(fill_time*2)

// 获取当前令牌桶
local last_tokens = tonumber(redis.call("get", tokens_key))
// 如果当前令牌桶是空的
// 情况一: 第一次访问
// 情况二: 有一段时间未访问, token_key
if last_tokens == nil then
  last_tokens = capacity
end

// 获取最近获取令牌的时间
local last_refreshed = tonumber(redis.call("get", timestamp_key))
// 如果最近获取令牌的时间为空, 则设置为0
if last_refreshed == nil then
  last_refreshed = 0
end

// 计算最近获取令牌的时间间隔, 有最小限制
local delta = math.max(0, now-last_refreshed)
// 计算出这段时间需要往令牌桶填充的令牌数, 有最大限制
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
// 判断是否允许访问
local allowed = filled_tokens >= requested
// 刷新令牌桶的数量
local new_tokens = filled_tokens

// 如果允许访问, 则消耗对应的令牌数
local allowed_num = 0
if allowed then
  new_tokens = filled_tokens - requested
  allowed_num = 1
end

// 刷新redis-key的失效时间
if ttl > 0 then
  redis.call("setex", tokens_key, ttl, new_tokens)
  redis.call("setex", timestamp_key, ttl, now)
end

return { allowed_num, new_tokens }

```















































