#### Spring Cloud Eureka原理分析

---



#### Eureka架构

---

Eureka由Eureka Server和Eureka Client两部分组成.

Eureka Server是服务注册中心, 负责维护集群中服务实例信息和状态, 以及给Eureka Client返回服务列表. 在分布式环境一般会多实例部署达到高可用, 比如在多个可用区上均部署Eureka Server.

Eureka Client是集群中的某个服务, 负责与Eureka Server交互, 包括发送注册请求, 维持心跳, 拉取服务列表等



#### Eureka Server

---

1. Eureka Server负责创建和管理整个集群的服务实例信息
2. 把当前Eureka Server中的服务实例信息同步给集群中其它的Eureka Server
3. 当有Eureka Client需要获取服务列表时, 需要从Eureka Server中获取

##### Lease 

1. Eureka Client向Eureka Server注册时, 会为其创建一个Lease, 默认有效期是90秒.
2. Eureka Client发送心跳会更新Leanse的时间, 有效期内未更新的Lease会被认为过期.
3. Eureka Server会定时执行一个EvictionTask, 将Lease过期的Client删除, 默认执行周期是60秒.

##### 自我保护模式

自我保护模式的作用是防止当出现网络分隔，服务虽然正常运行但无法与 Eureka Server 保持心跳的情况下，Eureka Server 把这些服务实例当作过期实例而删除。如下图，服务本身是正常的，但服务发送心跳的网络发生异常。如果没有自我保护模式，那么这些服务实例会被过期删除，此时服务调用方将无法从 Eureka Server 获取到这些服务.

自我保护模式的作用是防止当出现网络分隔，服务虽然正常运行但无法与 Eureka Server 保持心跳的情况下，Eureka Server 把这些服务实例当作过期实例而删除。如下图，服务本身是正常的，但服务发送心跳的网络发生异常。如果没有自我保护模式，那么这些服务实例会被过期删除，此时服务调用方将无法从 Eureka Server 获取到这些服务.



#### Eureka Client

---

1. 启动服务时注册服务
2. 定时发送心跳更新Lease
3. 服务下线时取消注册
4. 获取和定时更新已注册的服务列表













































