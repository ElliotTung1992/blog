#### 分布式锁

---

##### 什么是分布式锁:

分布式锁, 是控制分布式系统之间同步访问共享资源的一种方式. 在分布式系统中, 常常需要协调他们的动作. 如果不同的系统或是同一个系统的不同主机之间共享了一个或一组资源, 那么访问这些资源的时候, 往往需要互斥来阻止彼此干扰来保证一致性, 在这种情况下, 便需要使用到分布式锁.

##### 使用场景:

1. 新增订单校验订单名字是否重复



####  阶段一

---

实现功能: 使用Redis实现分布式锁

第一步加锁: SETNX(key, value);

第二步对锁设置过期时间: EXPIRE(key, seconds);

存在的问题: 可能出现执行完加锁, 服务器挂了导致未执行设置锁过期时间, 出现死锁的情况.



#### 阶段二

---

需解决的问题: 可能出现执行完加锁, 服务器挂了导致未执行设置锁过期时间, 出现死锁的情况.

思路: 加锁指令和设置过期指令原子性操作, 要么全部成功, 要不全部失败

实现方案一: 使用Lua脚本

实现方案二: 使用`SET key value EX seconds`命令

存在的问题: 存在线程错误删除锁的现象

	1. 线程一加锁成功, 业务执行实现超长导致锁自动失效
	1. 线程二加锁成功
	1. 线程一业务执行结束, 释放锁(线程二加的锁)
	1. 线程三加锁成功
	1. 线程二和线程三存在并发场景



#### 阶段三

---

需解决的问题: 存在线程错误删除锁的现象

思路: 对锁添加锁标识

解决方案: 为了解决这种错误删除其它线程所加的锁, 需要在value字段设置当前线程的唯一标识, 线程在删除锁的时候需要和锁对应的value值进行比对, 只有相等才可以删除.

存在的问题: 

1. 线程一加锁成功, 执行相关的业务逻辑
2. 线程一释放锁, 执行到锁删除的时候异常挂起
3. 线程一的锁超时时间到, 自动释放
4. 线程二加锁成功
5. 线程一删除挂起的线程恢复删除锁(线程二的锁)
6. 线程三加锁成功
7. 线程二和线程三存在并发场景



#### 阶段四

---

需解决的问题: 存在线程错误删除锁的现象

思路: 释放锁中value比对操作和删除key操作保证原子性

解决方案: 使用Lua脚本实现值比对和删除

存在的问题: 锁的续租



#### 阶段五

---

需解决的问题: 锁的续租

解决方案: 我们可以让获得锁的线程开启一个守护线程, 用来给即将过期的锁进行自动续租.



#### Redisson看门狗分布式锁

---

Redisson中的分布式锁自带自动续租机制, 使用起来非常简单, 其提供了一个专门用来监控和续租锁的Watch Dog(看门狗),

如果执行业务的线程还未执行结束的话, Watch Dog会不断延长锁的过期时间, 来保证锁不会因为超时而自动释放.

##### 3.1 加锁机制

线程去获取锁, 获取成功: 执行lua脚本, 保存数据到redis数据库.

此时另外一个线程去获取锁, 可以一直通过while循环尝试获取锁, 如果在获取锁的最大等待时间内加锁成功, 则执行lua脚本, 保存数据到redis数据库. 如果失败, 则返回加锁失败.

##### 3.2 watch dog自动延长机制

Redisson在获取锁之后, 会维护一个看门狗线程, 在每一个锁设置的过期时间的1/3处, 如果线程还未执行完业务, 则不断延长锁的有效期. 默认的锁过期时间是30秒, 可以通过lockWatchdoyTimeout参数来修改.

每过10秒, 看门狗就会执行续租操作, 将锁的超时时间重置为30秒. 看门狗续租前也会先判断是否需要执行续租操作, 需要才会执行续租, 否则取消续租操作.

##### 3.3 redisson分布式锁的关键点

1. 如果对key不设置过期时间, 由Redisson在加锁成功后会维护一个watchdag看门狗, watchdog负责定时监听并处理, 在锁没有释放但快要过期的时候自动对锁进行续租, 保证解锁前不会自动失效.
2. 通过Lua脚本实现了加锁和解锁的原子操作, 底层使用setnx和lua脚本
3. 通过记录获取锁的客户端id, 每次加锁时判断是否当前客户端已经获得锁, 实现了可重入锁.

指定锁超时时间, 不会使用自动续租机制:

```
lock.trylock(10, 30, TimeUnit.SECONDS); // 设置锁释放时间, 不会使用自动续租操作
```

只有在未指定锁的超时时间, 才会用到Watch dog的自动续租机制:

```
lock.trylock(10, TimeUnit.SECONDS);
```

##### 3.4 Redisson的WatchDog相关源码

```
    @Override
    public void lock(long leaseTime, TimeUnit unit) {
        try {
        		// 进行加锁
            lock(leaseTime, unit, false);
        } catch (InterruptedException e) {
            throw new IllegalStateException();
        }
    }
    
    // 进行加锁
    private void lock(long leaseTime, TimeUnit unit, boolean interruptibly) throws InterruptedException {
    		// 获取当前线程的线程id
        long threadId = Thread.currentThread().getId();
        // 尝试获取锁
        Long ttl = tryAcquire(-1, leaseTime, unit, threadId);
        // lock acquired
        if (ttl == null) {
            return;
        }

        CompletableFuture<RedissonLockEntry> future = subscribe(threadId);
        pubSub.timeout(future);
        RedissonLockEntry entry;
        if (interruptibly) {
            entry = commandExecutor.getInterrupted(future);
        } else {
            entry = commandExecutor.get(future);
        }

        try {
        		// 如果一开始未获取到锁, 则再次尝试获取锁
            while (true) {
            		// 尝试获取锁
                ttl = tryAcquire(-1, leaseTime, unit, threadId);
                // lock acquired
                if (ttl == null) {
                    break;
                }

                // waiting for message
                if (ttl >= 0) {
                    try {
                        entry.getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);
                    } catch (InterruptedException e) {
                        if (interruptibly) {
                            throw e;
                        }
                        entry.getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);
                    }
                } else {
                    if (interruptibly) {
                        entry.getLatch().acquire();
                    } else {
                        entry.getLatch().acquireUninterruptibly();
                    }
                }
            }
        } finally {
            unsubscribe(entry, threadId);
        }
//        get(lockAsync(leaseTime, unit));
    }
    
    // 尝试异步获取锁
    private RFuture<Long> tryAcquireAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {
        RFuture<Long> ttlRemainingFuture;
        // 尝试异步加锁
        if (leaseTime > 0) {
            ttlRemainingFuture = tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_LONG);
        } else {
            ttlRemainingFuture = tryLockInnerAsync(waitTime, internalLockLeaseTime,
                    TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_LONG);
        }
        CompletionStage<Long> s = handleNoSync(threadId, ttlRemainingFuture);
        ttlRemainingFuture = new CompletableFutureWrapper<>(s);

        CompletionStage<Long> f = ttlRemainingFuture.thenApply(ttlRemaining -> {
            // lock acquired
            if (ttlRemaining == null) {
                if (leaseTime > 0) {
                    internalLockLeaseTime = unit.toMillis(leaseTime);
                } else {
                    scheduleExpirationRenewal(threadId);
                }
            }
            return ttlRemaining;
        });
        return new CompletableFutureWrapper<>(f);
    }
    
    // 刷新到期时间
    private void renewExpiration() {
        ExpirationEntry ee = EXPIRATION_RENEWAL_MAP.get(getEntryName());
        if (ee == null) {
            return;
        }
        // 创建定时任务, 超时时间是锁的租约时间/3
        Timeout task = getServiceManager().newTimeout(new TimerTask() {
            @Override
            public void run(Timeout timeout) throws Exception {
                ExpirationEntry ent = EXPIRATION_RENEWAL_MAP.get(getEntryName());
                if (ent == null) {
                    return;
                }
                Long threadId = ent.getFirstThreadId();
                if (threadId == null) {
                    return;
                }
                // 执行Lua脚本
                CompletionStage<Boolean> future = renewExpirationAsync(threadId);
                future.whenComplete((res, e) -> {
                    if (e != null) {
                        if (getServiceManager().isShuttingDown(e)) {
                            return;
                        }

                        log.error("Can't update lock {} expiration", getRawName(), e);
                        EXPIRATION_RENEWAL_MAP.remove(getEntryName());
                        return;
                    }
                    // 如果当前线程还持有锁则继续订阅
                    // 如果当前线程未持有锁则取消订阅
                    if (res) {
                        // reschedule itself
                        renewExpiration();
                    } else {
                        cancelExpirationRenewal(null, null);
                    }
                });
            }
        }, internalLockLeaseTime / 3, TimeUnit.MILLISECONDS);
        
        ee.setTimeout(task);
    }
    
    // 异步执行刷新到期时间
    // 如果在Redis Map中还存在指定的锁, 则刷新到期时间
    protected CompletionStage<Boolean> renewExpirationAsync(long threadId) {
        return evalWriteSyncedAsync(getRawName(), LongCodec.INSTANCE, RedisCommands.EVAL_BOOLEAN,
                "if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then " +
                        "redis.call('pexpire', KEYS[1], ARGV[1]); " +
                        "return 1; " +
                        "end; " +
                        "return 0;",
                Collections.singletonList(getRawName()),
                internalLockLeaseTime, getLockName(threadId));
    }
```

##### 3.5 Redisson实现可重入锁

可重入锁: 也叫递归锁, 是指一个线程可以多次获取同一把锁

Redisson实现可重入锁的原理: 

使用Redis的hash数据结构实现, 其中key是锁的名称, value是hash类型数据结构

Hash的key是线程Id, Hash的value是加锁次数



































