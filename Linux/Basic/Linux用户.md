**Linux用户类型:**

1. 管理员用户
2. 系统用户
3. 普通用户

**用户类型解释:**

管理员用户: 权限最大, 限制最小

系统用户: 默认情况下不能登录服务器, 只能去调用某个服务程序

普通用户: 用来日常完成工作的用户

**系统用户和普通用户的区别:**

系统用户和普通用户登录终端不同

普通用户的登录终端是/bin/bash, 能够正常使用这个账号登录服务器

系统用户的登录终端是/sbin/nologin, 不能够正常登录到服务器



#### Linux创建用户组并添加用户

##### 1. 创建用户组

```
sudo groupadd [groupname]
```

##### 2. 添加用户并添加到用户组

```
sudo useradd -g [groupname] [username]
```

##### 3. 设置用户密码

```
sudo passwd [username]
```

##### 4. 验证用户组和用户

```
cat /etc/group
cat /etc/passwd

su [username]
```















