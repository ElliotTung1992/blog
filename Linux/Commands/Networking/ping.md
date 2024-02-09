Linux ping命令用于检测与另一个主机之间的网络连接.

执行ping命令会使用ICMP(Internet Control Message Protocol)传输协议, 发出要求回应的信息, 若远端主机的网络功能没有问题, 就会回应该信息, 因而得知该主机运作正常.

**语法:**

```
ping [-dfnqrRv][-c<完成次数>][-i<间隔秒数>][-I<网络界面>][-l<前置载入>][-p<范本样式>][-s<数据包大小>][-t<存活数值>][主机名称或IP地址]
```

**参数说明**：

- -d 使用Socket的SO_DEBUG功能。
- -c <完成次数> 设置完成要求回应的次数。
- -f 极限检测。
- -i<间隔秒数> 指定收发信息的间隔时间。
- -I<网络界面> 使用指定的网络接口送出数据包。
- -l<前置载入> 设置在送出要求信息之前，先行发出的数据包。
- -n 只输出数值。
- -p<范本样式> 设置填满数据包的范本样式。
- -q 不显示指令执行过程，开头和结尾的相关信息除外。
- -r 忽略普通的Routing Table，直接将数据包送到远端主机上。
- -R 记录路由过程。
- -s<数据包大小> 设置数据包的大小。
- -t<存活数值> 设置存活数值TTL的大小。
- -v 详细显示指令的执行过程。
- -w <deadline> 在 deadline 毫秒后退出。
- -W <timeout> 在等待 timeout 毫秒后开始执行。

**实例:**

检测是否与主机连通:

```
ping www.baidu.com
PING www.baidu.com (36.155.132.3): 56 data bytes
64 bytes from 36.155.132.3: icmp_seq=0 ttl=52 time=21.167 ms
64 bytes from 36.155.132.3: icmp_seq=1 ttl=52 time=24.323 ms
64 bytes from 36.155.132.3: icmp_seq=2 ttl=52 time=23.786 ms
64 bytes from 36.155.132.3: icmp_seq=3 ttl=52 time=20.998 ms
64 bytes from 36.155.132.3: icmp_seq=4 ttl=52 time=24.093 ms
^C
--- www.baidu.com ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 20.998/22.873/24.323/1.473 ms
```

指定接收包的次数:

```
ping -c 2 www.baidu.com
```

多参数使用:

```
ping -i 3 -s 1024 -t 255 www.baidu.com
PING www.baidu.com (36.155.132.3): 1024 data bytes
1032 bytes from 36.155.132.3: icmp_seq=0 ttl=52 time=21.653 ms
1032 bytes from 36.155.132.3: icmp_seq=1 ttl=52 time=22.982 ms
^C
--- www.baidu.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 21.653/22.317/22.982/0.665 ms
```

你也可以使用IP地址作为目标主机:

```
ping -c 4 192.168.0.1
```

























