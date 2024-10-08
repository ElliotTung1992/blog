#### Redis

---



#### Linux安装Redis单机版

---

##### apt安装Redis

```
# 安装
sudo apt update
sudo apt install redis-server
# 查看Redis服务状态
syetemctl status redis-server
# 停止Redis服务
systemctl stop redis-server
# 启动Redis服务
systemctl start redis-server
# 重启Redis服务
systemctl restart redis-server
```

##### 常规重启Redis服务

```
# 重启redis服务
systemctl restart redis

# 查看Redis进程
ps -ax|grep redis
```



#### 搭建Redis集群

---

Redis集群至少需要3个主节点, 不可能有4个节点, 每个主节点需要一个副本, 至少需要6个节点

```
# 创建Redis集群配置文件
mkdir /etc/redis/rediscluster
# 创建对应的节点配置文件目录
mkdir -p /etc/redis/rediscluster/nodes640{1,2,3,4,5,6}
# 为每个节点创建对应的配置文件

# 修改集群配置文件：
port 6401
# bind 127.0.0.1 --去除ip绑定限制
protected-mode no --关闭保护模式
dir /usr/local/rediscluster/node6401 --指定数据文件存放位置
cluster-enabled yes --开启集群模式
cluster-config-file nodes-8001.conf --集群节点配置文件
cluster-node-timeout 5000 --集群超时事件,节点超过这个时间没反应就断定是宕机
appendonly yes --开启AOF持久化

# 如果需要设置密码,需要增加如下配置:
requirepass 123456 --设置redis访问密码
masterauth 123456 --设置集群节点访问密码

# 启动Redis集群各个节点:
redis-server /xx/yy/redis.conf

# 查看redis进程
ps -ef|grep redis

# 创建集群 -a password, cluster-replicas 1:表示一个从节点
redis-cli -a 123456 --cluster create <ip>:<port> <ip>:<port> <ip>:<port> <ip>:<port> <ip>:<port> <ip>:<port> --cluster-replicas 1

# 集群模式连接redis客户端
redis-cli -c -a 123456 -p 6401

# 查看key的slot值
cluster keyslot key

# 查看slot信息
cluster slots

# 查看集群信息
cluster info
```

##### Redis集群key设置规范

1. 尽量使用短的key
2. 使用规范的key约束: 使用`:`而不是`.`作为分隔符
3. 使用统一的命名空间前缀
4. 避免使用复杂的数据结构
5. 使用有意义的key名



#### Redis相关命令

---

##### 配置远程访问

开启防火墙

```
远程访问命令：
redis-cli -h <Redis_IP_Address> ping
```



#### Redis配置文件

---

不允许远程访问

```
bind 127.0.0.1 ::1 
```

```
-DENIED Redis is running in protected mode because protected mode is enabled, no bind address was specified, no authentication password is requested to clients. In this mode connections are only accepted from the loopback interface. If you want to connect

protected-mode no
```



#### Redis客户端

---

```
# redis 客户端登陆
redis-cli -h 127.0.0.1 -p 6379

# 验证
auth <password>

# 切换database
select 1
```



#### Redis常见应用场景

---

1. 数据缓存 

   > a. 配置信息

2. 分布式锁

   > redisson

3. 限流方案

4. 活动/积分商城每日领取上线
