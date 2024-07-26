#### FireWall

查看防火墙状态:

```
firewall-cmd --state
```

启动firewalld服务:

```
systemctl start firewalld
```

停止firewalld服务:

```
systemctl stop firewalld
```

列出所有打开的端口和服务:

```
firewall-cmd --list-ports
```

开放端口80:

```
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

重新加载防火墙使修改生效:

```
firewall-cmd --reload
```

查看防火墙开放的端口：

```
firewall-cmd --list-ports
```



#### iptables

查看防火墙状态:

```
systemctl status iptables
```







