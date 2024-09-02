### RabbitMQ架构

---

![image-20240902190510296](/Users/ganendong/Library/Application Support/typora-user-images/image-20240902190510296.png)

##### Broker:

表示消息队列服务器实体

##### Virtual Host 虚拟主机:

在RabbitMQ中叫vhost, 表示一批交换机、消息队列和相关对象.

##### Routing Key 路由主键: 

RabbitMQ中, Exchange(交换机)负责接收来自生产者的消息, 并根据Routing Key将消息到一个或多个队列中.

Exchange与队列之间的绑定关系是通过Binding Key来确定的. 

当生产者发送消息时, 需要指定一个Routing Key, Exchange根据Routing Key将消息发送到与之匹配的队列中.



























