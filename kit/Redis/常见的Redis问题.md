##### lettuce间接性发生RedisCommandTimeoutException的问题

原因: 客户端拿一个已经断开的Redis连接, 所以一直会超时，而且lettuce也没有去自动连接

解决方案:

	1. 使用jedis替换lettuce
	1. 写定时任务不断请求redis

##### 单体Redis迁移到Reids集群redissson解锁报错

原因: 在redis集群中, key中的特俗字符存在特俗的含义，导致key未能找到真正的redis集群节点抛错

解决方案: 对项目中redis的key命名按官方要求进行规范

