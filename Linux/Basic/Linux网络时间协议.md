网络时间协议, 英文名称: Network Time Protocol(NTP)是用来使计算机时间同步化的一种协议, 它可以使计算机对其服务器或时钟源做同步化, 它可以提供高精准度的时间校正, 且可以由加密确认的方式来阻止恶毒的协议攻击. NTP的目的就是在无序的Internet环境中提供精确和健壮的时间服务.

配置文件地址: /etc/ntp.conf

##### /etc/ntp.conf

- restrict: 控制对NTP服务器的访问权限.
- server: 定义NTP服务器.

##### ntpq命令

- -p <NTP服务器地址>: 该命令将显示当前NTP服务器的状态, 包括每个服务器的地址、参考ID等信息。

##### ntpdate命令

- -u <NTP服务器地址>: 用于一次性设置本地系统时钟, 使其与服务器同步.

#### 重启ntp服务

---

```
systemctl restart ntpd
```

