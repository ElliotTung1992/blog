#### Redis

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

```
bind 127.0.0.1 ::1 #不允许远程访问
```

