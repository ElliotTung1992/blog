#### CAP理论

---

1. `C (Consistency)`: 一致性，即数据一致性，特指分布式系统中的数据一致性
2. `A (Availability)`: 可用性，即服务的高可用性，某个服务瘫痪不影响整个分布式系统的正常运行
3. `P (Partition Tolerance)`: 分区容错性，即网络故障，特指分布式系统中服务之间出现了网络故障，整个分布式仍然保持可用性或者一致性

##### 分区容错性：

分区相当于对通信的时限要求。系统如果不能在时限内达成数据一致性(网络中断)，就意味着发生了分区的情况，必须就当前情况在C和A之间做出选择。

##### AP和CP的区别

1. `AP`: 保证了数据的一致性。适用于一些强一致性要求高、可以容忍短暂的不可用性的应用场景，缺点就是在发生网络波动时，会导致服务不可用，需要等到数据一致后，才能让用户正常访问，会影响用户体验。
2. `CP`：对于一些对一致性要求较低，需要保证系统的高可用性和持续可用性的应用场景。如社交场景，AP不会影响用户体验，能保证系统正常运行；在面对网络分区时，AP系统会牺牲一致性，允许系统中的数据存在短暂的不一致。



#### 微服务架构中服务注册中心 - Zookeeper和Eureka的CAP原理

---

##### Zookeeper的CAP原理 - CP

Client1客户端向zk Server1注册，zk Server1同步信息给zk Server2，zk Server2是注册中心的leader节点，该节点负责把消息广播同步给其他follower的zk节点，为了保证数据的一致性，只有等到整个注册中心信息同步完成，Client1客户端才能收到注册成功的消息。

当注册中心leader重启会是出现网络故障的时候，这个zk集群重新选举leader节点，在选举期间，Client客户端无法注册，即此时zk服务不可用，牺牲了系统的可用性。

只有等到整个系统选举出leader节点，系统才能恢复注册，因此zookeeper为了保证数据的一致性，牺牲了系统的可用性。

##### Eureka的CAP原理 - AP

Eureka的数据同步的原理:

1. Client1客户端注册到Eureka Server1服务中
2. Eureka Server1直接告诉Client1注册成功
3. Eureka Server1把Client1的注册信息同步给Server2等其他服务，为了保证服务的可用性，Eureka Server之间是异步同步的



#### BASE理论

---

BASE理论是对CAP理论的延伸，核心思想是放弃强一致性，追求最终一致性。

BASE理论包含三个要素:

1. 基本可用（Basically Available）
2. 软状态（Soft State）
3. 最终一致性（Eventually Consistent）

基本可用（Basically Available）: 指的是系统在出现故障或数据损坏的情况下，依然能够保持核心功能的可用性，并尽可能

提供其他功能的可用性。这意味着系统不会因为部分故障而完全不可用。

软状态（Soft State）: 意味着系统中的数据可以没有时效性，即数据不需要一直保持一致，可以存在一段时间的不一致状态。

这种状态允许系统在数据同步过程中保持高可用和高性能。

最终一致性（Eventually Consistent）: 指的是系统不需要保证在每个节点上的数据都是实时一致的，但会确保所有节点上的

数据在经过一定时间的同步后最终达到一致状态。这通过引入副本冗余和数据失效机制来实现，采用异步复制的方式提高响应

速度和吞吐量。



















































