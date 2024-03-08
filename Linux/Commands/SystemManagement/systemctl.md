systemctl命令是来自英文词组system control的缩写, 其功能是管理系统服务. 从RHEL 7/CentOS 7版本起, 初始化进程服务init被替代为sytemd服务, systemd初始化进程服务的管理是通过systemctl命令完成的, 该命令涵盖了service、chkconfig、init、setup等多个命令的大部分功能.

**语法:**

```
systemctl [options] 动作 服务名
```

**常用参数：** 

-a 显示所有单位  

-q 静默执行模式 

-f 覆盖任何冲突的符号链接 

-r 显示本地容器的单位

-H 设置要连接的主机名 

-s 设置要发送的进程信号 

-M 设置要连接的容器名 

-t 设置单元类型 

-n 设置要显示的日志行数 

--help 显示帮助信息 

-o 设置要显示的日志格式 

--version 显示版本信息 

**常用动作：** 

start 启动服务  

disable 取消服务开机自启 

stop 停止服务 

status 查看服务状态 

restart 重启服务 

list 显示所有已启动服务 

enable 设置服务开机自启

















