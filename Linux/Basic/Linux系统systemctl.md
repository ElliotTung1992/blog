#### Linux systemctl命令

---

Linux Systemctl是一个系统管理守护线程、工具和库的集合，用于取代System V、service和chconfig命令，初始进程主要负责控制systemd系统和服务管理器。

通过Systemctl Chelp可以看到该命令主要分为：查询或发送控制命令给systemd服务，管理单元服务的命令，服务文件的相关命令，任务、环境、快照相关命令，systemd服务的配置重载，系统开机关机相关的命令.

1. 列出所有可用的单元

```
systemctl list-unit-files
```

2. 列出所有运行中的单元

```
systemctl list-units
```

3. 检查某个服务是否是自启动的

```
systemctl is-enabled name.service
```

4. 设置服务开机启动

```
systemctl enable name.service
```

5. 关闭服务开机启动

```
systemctl disable name.service
```

6. Linux中启动、重启、停止、重载以及检查服务状态

```
systemctl start name.service
systemctl restart name.service
systemctl stop name.service
systemctl reload name.service
```





























