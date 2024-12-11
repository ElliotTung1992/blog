#### 限流场景

---

##### 粗颗粒度

1. 全局请求限流

##### 细颗粒度 - 接口维度

1. 用户
2. 租户
3. 流量

##### 业务限流

1. 查证接口设置租户每日查证上限



#### 限流

---

##### 什么是QPS

每秒查询率（QPS, Queries-per-second）, 即单位时间单位计算资源处理的请求数据量.

在大模型场景下, QPS的提升意味着模型推理速度的提高, 这能够为更多用户提供服务或降低模型推理的成本.

##### 常见的解决方案

1. 固定窗口算法
2. 滑动窗口算法
3. 滑动日志算法
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

##### 单机版限流 - Guava中的限流工具类RateLimiter

使用令牌桶算法实现

##### Redis分布式限流 - 固定窗口算法

使用Redis的`incr`和设置key的过期时间 

##### Redis分布式限流 - 滑动窗口算法

使用Redis的`ZSET`命令实现Redis的滑动窗口算法

org.springframework.cloud.gateway.filter.factory.RequestRateLimiterGatewayFilterFactory#apply

org.springframework.cloud.gateway.config.GatewayRedisAutoConfiguration

org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter#isAllowed

```
--redis key名，用于保存限流维度下剩余令牌数量，request_rate_limiter.{id}.tokens
local tokens_key = KEYS[1]
--redis key名，用于保存限流维度下最近获取令牌时间，request_rate_limiter.{id}.timestamp
local timestamp_key = KEYS[2]
--redis.log(redis.LOG_WARNING, "tokens_key " .. tokens_key)

--生产速率，每秒生产多少个令牌
local rate = tonumber(ARGV[1])
--容量
local capacity = tonumber(ARGV[2])
--当前时间（秒级时间戳）
local now = tonumber(ARGV[3])
--每个请求消耗的令牌个数
local requested = tonumber(ARGV[4])

--填充时间=容量/生产速率
local fill_time = capacity/rate
--key过期时间设置为填充时间的2倍
local ttl = math.floor(fill_time*2)

--剩余令牌数量
local last_tokens = tonumber(redis.call("get", tokens_key))
--不存在key，则初始化令牌数量为最大容量
if last_tokens == nil then
  last_tokens = capacity
end

--最近获取令牌秒级时间戳
local last_refreshed = tonumber(redis.call("get", timestamp_key))
--不存在key，则last_refreshed = 0
if last_refreshed == nil then
  last_refreshed = 0
end

--距离上次获取令牌时间相差多少秒
local delta = math.max(0, now-last_refreshed)
--计算当前令牌数量（考虑delta时间内生成的令牌个数=delta*速率）
local filled_tokens = math.min(capacity, last_tokens+(delta*rate))
--当前令牌数量是否大于1
local allowed = filled_tokens >= requested
local new_tokens = filled_tokens

local allowed_num = 0
--允许访问，新令牌数量-1，allowed_num=1
if allowed then
  new_tokens = filled_tokens - requested
  allowed_num = 1
end


--保存令牌个数和最近获取令牌时间
if ttl > 0 then
  redis.call("setex", tokens_key, ttl, new_tokens)
  redis.call("setex", timestamp_key, ttl, now)
end

return { allowed_num, new_tokens }

```















































