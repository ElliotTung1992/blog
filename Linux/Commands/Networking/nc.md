Linux nc命令用于设置路由器.

执行本指令可设置路由器的相关参数.

**语法:**

```
nc [-hlnruz][-g<网关...>][-G<指向器数目>][-i<延迟秒数>][-o<输出文件>][-p<通信端口>][-s<来源位址>][-v...][-w<超时秒数>][主机名称][通信端口...]
```

**参数说明:**

- -g<网关> 设置路由器跃程通信网关，最多可设置8个。
- -G<指向器数目> 设置来源路由指向器，其数值为4的倍数。
- -h 在线帮助。
- -i<延迟秒数> 设置时间间隔，以便传送信息及扫描通信端口。
- -l 使用监听模式，管控传入的资料。
- -n 直接使用IP地址，而不通过域名服务器。
- -o<输出文件> 指定文件名称，把往来传输的数据以16进制字码倾倒成该文件保存。
- -p<通信端口> 设置本地主机使用的通信端口。
- -r 乱数指定本地与远端主机的通信端口。
- -s<来源位址> 设置本地主机送出数据包的IP地址。
- -u 使用UDP传输协议。
- -v 显示指令执行过程。
- -w<超时秒数> 设置等待连线的时间。
- -z 使用0输入/输出模式，只在扫描通信端口时使用
- -k<通信端口>强制 nc 待命链接.当客户端从服务端断开连接后，过一段时间服务端也会停止监听。 但通过选项 -k 我们可以强制服务器保持连接并继续监听端口

**实例:**

TCP端口扫描

```
nc -v -z -w2 192.168.0.3 1-100
```

UDP端口扫描

```
nc -u -z -w2 192.168.0.3 1-100
```

扫描指定端口:

```
nc -nvv 192.168.0.3 80
```

临时监听TCP端口:

```
nc -l <port>
```

永久监听TCP端口:

```
nc -lk <port>
```



