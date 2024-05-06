#### Linux ss

---

ss命令是一个用于获取socket计信息的工具，它可以显示类似netstat的信息，但提供了更多关于TCP连接状态的详细信息，并且通常比netstat更快。

ss命令的优点在于它利用了TCP协议栈中的tcp_diag模块，这个模块提供了对Linux内核中socket信息的直接访问，因此ss命令能够更高效地运行。一些常用的选项包括：

- -t或--tcp。显示TCP协议的sockets。
- -u或--udp。显示UDP协议的sockets。
- -x或--unix。显示Unix domain sockets。
- -n或--numeric。不解析服务的名称，如显示端口号而不是服务名。
- -l或--listening。只显示处于监听状态的端口。
- -p或--processes。显示监听端口的进程。
- -a或--all。对TCP来说，包括监听端口和已建立的连接。
- -r或--resolve。把IP解释为域名，把端口号解释为协议名称。
- -s或--summary。显示socket使用摘要。
- -4或--[ipv4**](https://www.baidu.com/s?wd=ipv4&usm=3&ie=utf-8&rsv_pq=b259c4aa01763bcf&oq=ss命令详解&rsv_t=d447y0U4MrVevpMj8HIrWECKzUVxtFRnAaiIN%2Ft2%2B9aMqXK%2BHsnWaJzd%2ByY&sa=re_dqa_zy&icon=1)。仅显示IPv4的sockets。
- -6或--ipv6。仅显示IPv6的sockets。
- -o或--options。显示计时器信息。
- -e或--extended。显示详细的socket内存使用情况。
- -i或--info。显示TCP内部信息。
- -D或--diag=FILE。将原始TCP套接字信息转储到文件。
- -F或--filter=FILE。从文件中读取过滤信息。

例如，ss -t -a 显示所有TCP连接，ss -pl 显示每个进程具体打开的sockets，ss -l 列出所有打开的网络连接端口。这些选项可以结合使用，以满足不同的需求。

##### 案例：

查看端口正在运行的进程:

```
ss -tlnp | grep <port>
```

