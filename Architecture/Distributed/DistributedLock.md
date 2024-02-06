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

---

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

---

**解锁原理:** 删除key

---

**错误删除锁问题:** 

线程一获取锁成功, 但是执行业务时间过长导致锁过期.

线程二获取锁成功.

线程一执行业务完毕释放锁 - 线程二的锁.

线程三获取锁成功.

线程二和线程三存在并发问题.

**解决方案:** 加入锁标识

为了解决这种错误删除其他线程线程的锁这个问题, 需要在value字段里加入当前线程唯一标识, 线程在删除锁的时候需要和锁对应的value值进行比对, 只有是自己对应的标识时才可以进行锁删除.

String uuid = getUUId();

boolean isLock = redisClient.setNX(key, uuid, timeout);

try{

​	// 执行业务逻辑

}finally{

​	if(redisClient.getKey(key) == uuid){

​		unlock();

​	}

}

**异常场景:**

线程一获取锁，并执行业务逻辑

线程一执行完业务，比较锁对应的标识为自己加的锁, 进行删除时异常(线程挂起等异常)

线程一对应的锁自动过期

线程二获取到对应的锁

线程一继续执行, 释放了锁

线程三同时获取到了锁

线程二和线程三存在并发问题

**解决方案:** 比较和删除锁修改为原子操作 

String uuid = getUUId();

boolean isLock = redisClient.setNX(key, uuid, timeout);

try{

​	// 执行业务逻辑

}finally{

​	redisClient.eval(delLuaScript, key, value);

}

---

**引入Lua脚本实现原子操作:**

lua脚本是一个非常轻量级的脚本语言, Redis底层天生支持lua脚本执行, 一个lua脚本中可以包含多条Redis命令, Redis会将整个lua脚本当作原子操作来执行, 从而实现聚合多条Redis指令的原子操作.

---

**自动续租功能:**

**现象：**

在执行业务代码时, 由于执行业务时间过长导致锁自动失效, 然后锁自动释放, 在这种情况下其他线程会成功获取锁，导致产生并发问题.

**原因:**

设置的过期时间太短或者业务执行时间过长

**解决思路:**

开启一个定时任务, 自动刷新Redis加锁的超时时间

String uuid = getUUId();

boolean isLock = redisClient.setNX(key, uuid, timeout);

// 设置定时器

new Scheduler(key, time, uuid, scheduleTime);

try{

​	// 执行业务逻辑

}finally{

​	redisClient.eval(delLuaScript, key, value);

​	// 取消定时器

​	cancelScheduler(uuid);

}

定时器的逻辑:

1. 判断Reids的锁是否是自己的
2. 如果存在的话重新刷新过期时间

---

**可重入锁:**

**实现原理:**

使用Redis中的Map数据结构*Map(key, uuid, lockcount);

在加锁的时候增加锁次数, 在释放锁的时候减少锁次数

**获取锁逻辑:**

1. 判断锁是否不存在, 不存在则获取锁, 并记录加锁次数1
2. 如果锁存在, 则判断锁是否已获取, 如果没有获取到锁则等待, 如果获取到锁则增加锁次数

**释放锁逻辑:**

1. 判断锁是否是当前线程的, 是则加锁次数-1, 如果次数为0则释放锁

---

##### 基于Zookeeper实现

**实现原理:**

