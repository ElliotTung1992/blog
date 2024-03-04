Linux ps(英文全称: process status)命令用于显示当前进程的状态, 类似于Windows的任务管理器

**语法:** 

```
ps [options] [--help]
```

**Options：**

-e: 显示所有进程, 显示每个进程所使用的环境变量

-f: 全格式, 显示UID,PPIP,C与STIME栏位

-u: 以用户为主的格式来显示进程状况

**-x**   When displaying processes matched by other options, include

​       processes which do not have a controlling terminal.

​       显示没有控制终端的进程.

**Cases:**

```
查找指定进程格式: 
ps -ef | grep 进程关键字

显示指定用户信息:
ps -u root
```

