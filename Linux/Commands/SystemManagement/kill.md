Linux kill命令用于删除执行中的进程或工作.

语法:

```
kill [-s <信息名称或编号>][程序]　或　kill [-l <信息编号>]
-l <信息编号> 　若不加<信息编号>选项，则 -l 参数会列出全部的信息名称。
-s <信息名称或编号> 　指定要送出的信息。
[程序] 　[程序]可以是程序的PID或是PGID，也可以是工作编号。
```

常用的信号是：

-1(HUP): 通知进程重新加载配置文件

-9(KILL): 强制终止进程

-15(TERM): 正常终止进程

案例:

杀死指定用户(xxx)的所有线程:

```
方法一:
kill -9 $(ps -ef|grep xxx)
方法二:
kill -u xxx
```

显示信号:

```
kill -l 
```

强制终止进程:

```
kill -9 pid
```

通知进程重新加载配置文件:

```
kill -HUP pid
kill -s hup pid
```

正常终止进程:

```
kill -s term pid
kill -term pid
```

