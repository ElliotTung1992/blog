#### RocketMQ

---

##### Group

Consumer Group

Group用于标识一类Consumer, 这类Consumer通常消费同一类消息, 且消息订阅的逻辑一致.

消费模式:

- 集群模式: 当使用集群模式, 任意一条消息只需要被集群内的任意一个消费者处理即可.
- 广播模式: 当使用广播模式时, 每条消息会被推送给集群内所有注册过的消费者, 保证消息至少被每个消费者消费一次.

Producer Group

标识一类Producer的集合名称.这类Producer通常发送一类消息，且发送逻辑一致。应用自己保证ProducerGroup名字唯一，ProducerGroup这个概念发送普通的消息时，作用不大，但是发送分布式事务消息时比较关键，因为服务器会回查这个Group下的任意一个Producer
