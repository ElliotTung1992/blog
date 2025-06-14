#### Redis缓存常见的问题

---

1. 缓存穿透
2. 缓存击穿
3. 缓存雪崩
4. 缓存预热



#### 缓存穿透

---

##### 什么是缓存穿透:

缓存穿透是指用户请求的数据在数据库中不存在, 更不会在缓存中命中, 导致用户的这种请求都要去数据库中查询, 然后再返回空.

如果有恶意攻击者不断请求系统中不存在的数据, 会导致大量的请求都落在数据库上, 造成数据库压力过大, 甚至导致数据库宕机.

##### 缓存穿透的解决方案:

1. 使用布隆过滤器
2. 存储空对象至缓存

##### 布隆过滤器:

布隆过滤器过滤器(Bloom Filter) 由Burton Howard Bloom在1970年提出, 是一种空间效率高的概率型数据结构.

> 布隆过滤器的设计思想:

布隆过滤器由一个长度为m比特的位数组（bit array）与k个哈希函数（hash function）组成的数据结构。位数组初始化均为0，所有的哈希函数都可以分别把输入数据尽量均匀地散列。

当要向布隆过滤器中插入一个元素时，该元素经过k个哈希函数计算产生k个哈希值，以哈希值作为位数组中的下标，将所有k个对应的比特值由0置为1。

当要查询一个元素时，同样将其经过哈希函数计算产生哈希值，然后检查对应的k个比特值：如果有任意一个比特为0，表明该元素一定不在集合中；如果所有比特均为1，表明该集合有可能性在集合中。为什么不是一定在集合中呢？因为不同的元素计算的哈希值有可能一样，会出现哈希碰撞，导致一个不存在的元素有可能对应的比特位为1，这就是所谓“假阳性”（false positive）。相对地，“假阴性”（false negative）在BF中是绝不会出现的。

总结一下：布隆过滤器认为不在的，一定不会在集合中；布隆过滤器认为在的，可能在也可能不在集合中。

举个例子：下图是一个布隆过滤器，共有18个比特位，3个哈希函数。集合中三个元素x，y，z通过三个哈希函数散列到不同的比特位，并将比特位置为1。当查询元素w时，通过三个哈希函数计算，发现有一个比特位的值为0，可以肯定认为该元素不在集合中。

> 布隆过滤器的优缺点:

优点:

1. 节约数据空间: 不存储数据本身, 只需要存储数据对应的Hash值.
2. 时间复杂度低: 查询和插入的时间复杂度都为O(k), k为哈希函数的个数

缺点:

1. 存在假阳性: 布隆过滤器判断存在, 可能出现元素不存在集合中; 
2. 不能删除元素: 如果一个元素被删除, 却不能从布隆过滤器中删除对应的值.

##### 存储空对象至缓存:

当在缓存中未命中, 查询数据库也为空. 可以将返回的空对象存储在缓存中, 这样下次请求该key时直接从缓存中查询返回的空对象, 请求不会落在数据库. 为了避免存储过多的空对象, 通常会给空对象设置一个过期时间.

> 存在的问题:

1. 如果有大量的key穿透, 缓存空对象会占用宝贵的内存空间.
2. 空对象的key设置了过期时间, 在这段时间可能会出现缓存和数据库数据不一致的场景



 #### 缓存击穿

---

##### 什么是缓存击穿:

缓存击穿是指一个非常热的key, 扛着大量的请求并发, 当这个key失效的瞬间, 大量的并发请求击穿缓存直接落到数据库上. 导致数据库压力骤升, 造成大量的请求阻塞, 甚至导致数据库宕机.

##### 缓存击穿的解决方案:

1. 使用互斥锁
2. 热点数据永不过期

> 使用互斥锁

使用互斥锁, 保证同一时间只有一个线程查询数据库回写缓存, 其它线程都处于阻塞状态. 

> 热点数据永不过期

1. 物理不过期: 针对热点key不设置过期时间
2. 逻辑过期: 把key的过期时间存储在value中, 如果发现要过期了, 通过一个一步线程进行缓存的构建.



#### 缓存雪崩

---

##### 什么是缓存雪崩:

缓存雪崩是指缓存中的数据同一时间大批量同时过期, 导致并发请求落到数据库, 从而引起数据库宕机.

##### 缓存雪崩的解决方案:

1. 均匀过期 
1. 缓存数据永不过期

> 均匀过期

对缓存设置不同的过期时间, 让缓存失效的时间点尽量均匀. 通常我们会对缓存的过期时间再加一个随机值. 

> 缓存数据永不过期

根据具体的业务场景, 我们不对缓存数据设置过期时间.



#### 缓存预热

---

##### 什么是缓存预热:

缓存预热是指在系统启动前, 提前把程序需要的缓存数据加载好, 防止程序启动后因为缓存中没有任何数据导致并发请求都落到数据库, 可能有宕机的风险.

##### 缓存预热的实现方式:

1. 数据量不大的情况下: 工程启动的时候加载缓存
2. 数据量大的情况下: 实现一个定时任务脚本, 进行缓存刷新
3. 数据量非常大的情况下: 优先保证热点数据提前加载到缓存



#### 本地缓存

---

##### 主要特点:

1. 快速访问: 数据存储在本地, 无需网络请求
2. 减轻后端压力: 减少对数据库或远程服务的调用
3. 简单易用: 通常以键值对形式存储数据

##### 使用场景:

1. 频繁访问但很少变化的数据
2. 计算成本高的结果缓存
3. 会话数据存储
4. 临时数据存储

##### 优缺点：

优点:

1. 极快的访问速度
2. 实现简单
3. 不依赖外部服务

缺点:

1. 数据不一致风险
2. 内存限制 - 可以考虑配合软引用和弱引用结合使用, 防止内存过载的情况
3. 缓存失效管理复杂

##### 常用方案:

1. Caffeine

##### 使用场景:

1. 商城首页配置信息
2. 商城列表信息
3. 商城海报页
4. 商城类目信息
5. 商品详情 - 权重

##### 本地缓存对比分布式缓存的优势:

1. 无需序列化和反序列化, 对象直接存储在内存中
2. 减少网络带宽的占用



#### 多级缓存

---

##### 冷热数据分层

Caffeine负责存储最热的数据

Redis存储次热数据

##### 本地缓存(L1)

1. 进程内部

2. 实现: Caffeine

##### 分布式缓存(L2)

1. 独立的缓存服务集群

2. 实现: Redis集群

#### 多级缓存数据同步

---

##### 失效模式(cache-aside):

1. 读: 先查询一级缓存Caffeine, 没有再查询二级缓存Redis, 最后才查询数据库, 然后更新二级缓存
2. 写: 先更新数据库, 再删除Caffeine和Redis

##### 异步更新

在集群环境中, 当集群中的一台服务器接收到修改数据请求, 通过消息队列通知集群中的其他服务删除进程中的一级缓存.

#### 多级缓存优化策略

---

##### 分层TTL设置:

1. L1: 秒级别
2. L2: 分钟级别

##### 数据一致性策略:

1. 多级缓存同步
   1. Mq本地缓存失效通知
2. 写策略
   1. Cache Aside策略





















































