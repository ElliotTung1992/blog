#### 分布式锁

##### 什么是分布式锁

分布式锁, 是控制分布式系统之间同步访问共享资源的一种方式. 在分布式系统中, 常常需要协调他们的动作. 如果不同的系统或是同一个系统的不同主机之间共享了一个或一组资源, 那么访问这些资源的时候, 往往需要互斥来阻止彼此干扰来保证一致性, 在这种情况下, 便需要使用到分布式锁.

#### 分布式锁实现方式

##### 基于Redis实现

**实现原理**: Redis的setNX(key, value);命令 - set value for key only if key does not exist. 

boolean isLock = redisClient.setNX(key, value);

try{

​	// 执行业务逻辑

}finally{

​	unlock();

}

**死锁问题**: 

boolean isLock = redisClient.setNX(key, value);

try{

​	// 执行业务逻辑

​	// 程序崩溃

}finally{

​	unlock();

}

当程序在执行业务代码时, 无法再执行到下面的解锁指令, 从而导致出现死锁问题.

**解决方案:** 引入过期时间的概念, 过期时间时给当前这个key设置一定的存活时间, 当存活时间到期后, Redis就会自动删除这个过期的key, 即使在执行业务逻辑程序崩溃也能到期自动释放锁.

boolean isLock = redisClient.setNX(key, value);

redisClient.expire(key, timeout);

try{

​	// 执行业务逻辑

​	// 程序崩溃

}finally{

​	unlock();

}

**解锁原理:** 删除key

**错误删除锁问题:** 加入锁标识

**引入Lua脚本实现原子操作:**

**自动续租功能:**

**可重入锁:**



##### 基于Zookeeper实现

**实现原理:**

