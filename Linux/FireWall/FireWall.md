#### 服务器防火墙的作用

1. 设置访问策略 如: ssh http https
2. 限制IP访问
3. 设置访问端口

#### FireWall

##### firewalld的基本使用

启动firewalld服务:

```
systemctl start firewalld
```

停止firewalld服务:

```
systemctl stop firewalld
```

查看firewalld状态:

```
systemctl status firewalld
```

禁用firewalld服务:

```
systemctl disable firewalld
```

启用firewalld服务:

```
systemctl enable firewalld
```

##### firewall-cmd的基本使用

查看防火墙状态:

```
firewall-cmd --state
```

查看防火墙默认区域:

```
firwall-cmd --get-default-zone
```

更改防火墙的默认区域为public:

```
firewall-cmd --set-default-zone=public
```

列出所有的配置信息:

```
firewall-cmd --list-all
```

##### 设置防火墙端口访问策略:

开放端口80:

```
firewall-cmd --zone=public --add-port=80/tcp --permanent
```

重新加载防火墙使修改生效:

```
firewall-cmd --reload
```

列出所有打开的端口和服务:

```
firewall-cmd --list-ports
```

##### 设置防火墙访问策略:

开放httpd服务:

```
firewall-cmd --permanent --add-service=http --add-service=hppts
```

关闭httpd服务:

```
firewall-cmd --pernament -remove-service=https
```

查看所有的策略服务:

```
firewall-cmd --list-services
```

##### 防火墙富规则策略：

限制某个特定IP地址访问服务器:

```
firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" reject'
```

删除一条富规则策略:

```
firewall-cmd --permanent --remove-rich-rule='<RULE>'
```

查看指定区内所有的富规则:

```
firewall-cmd --list-rich-rules
```

#### iptables

查看防火墙状态:

```
systemctl status iptables
```







