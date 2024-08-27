#### Linux最大进程数

---

1. 查看用户打开的最大进程数
2. 这个值怎么来的?
3. 如何修改这个值

##### 查看用户打开的最大进程数

```
ulimit -a
max user processes     (-u)#系统限制某用户下最多可以运行多少进程或线程
```

##### 这个值是怎么来的？

root账号下: ulimit -u 出现的max user processed的值 默认值是 /proc/sys/kernel/threads-max的值处以2, 即系统线程数的一半

普通账号下: ulimit -u 出现的max user processed的值 默认值是 /etc/security/limits.d/20-nproc.conf文件中

#### 怎么修改这个值？

---

##### /etc/security/limits.conf

修改这里, 普通用户max user process值是不生效的

```
* soft nproc 65535 
* hard nproc 65535
```

##### /etc/security/limits.d/20-nproc.conf

普通用户受这个文件影响:

```
* soft nproc 65535
```

##### 系统总限制

其实上面的max user processes 65535的值也只是表象, 普通用户最大进程数无法达到65535 ，因为用户的max  user processes的值，最后是受全局的kernel.pid_max的值限制。也就是说kernel.pid_max=1024  ，那么你用户的max user processes的值是127426 ，用户能打开的最大进程数还是1024。

>  查看全局的pid_max的方法: cat /proc/sys/kernel/pid_max

> 临时生效: echo 65535 > /proc/sys/kernel/pid_max

> 永久生效: vim /etc/sysctl.conf  添加: kernel.pid_max = 65535

#### 遇到的问题

---

> su: failed to execute /bin/bash: Resource temporarily unavailable

Linux系统会限制用户的最大进程数. 应用程序占满进程数后, 执行任何命令都会报这个错































