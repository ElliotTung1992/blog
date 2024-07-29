#### Linux dmesg命令

Linux dmesg（英文全称: display message）命令用于显示开机信息.

kernal会将开机信息存储在ring buffer中, 您若是开机时来不及查看信息, 可利用dmesg来查看.

开机信息亦保存在/var/log目录中, 名称为dmesg的文件里.

**语法:**

```
dmesg [-cn] [-s <缓冲区大小>]
```

**参数说明：**

- -c 　显示信息后，清除 ring buffer 中的内容。
- -s     <缓冲区大小> 　预设置为 8196，刚好等于 ring buffer 的大小。
- -n 　设置记录信息的层级。

**实例：**

显示开机信息:

```
dmesg | less
```

nfs服务挂了, 导致文件上传失败:

```
dmesg
nfs: server 12.103.58.21 not responding, time out
解决方案:
systemctl strat nfs
```



