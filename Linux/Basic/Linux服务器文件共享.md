#### 网络文件系统

---

网络文件系统, 英文: Network File System(NFS), 是由SUN公司研制的UNIX表示层协议, 能使使用者访问网络上别处的文件就像在使用自己的计算机一样.



#### 实现服务器之间文件共享

---

##### 1. nfs服务

```
# 查看nfs服务状态:
service nfs status
```

##### 2. 第一台服务器

使用root用户修改/etc/exports文件

```
vim /etc/exports

# 添加信息
/home/test/test_share <客户机ip>(rw,sync,no_root_squash)

配置的括号里，可添加的参数如下：
  ro：该主机对该共享目录有只读权限 
  rw：该主机对该共享目录有读写权限 
  root_squash：客户机用root用户访问该共享文件夹时，将root用户映射成匿名用户 ；
  no_root_squash：NFS服务器共享目录用户的属性，客户机用root访问该共享文件夹时，不映射root用户；
  all_squash 客户机上的任何用户访问该共享目录时都映射成匿名用户 
  anonuid 将客户机上的用户映射成指定的本地用户ID的用户 
  anongid 将客户机上的用户映射成属于指定的本地用户组ID 
  sync 资料同步写入到内存与硬盘中 
  async 资料会先暂存于内存中，而非直接写入硬盘 
  insecure 允许从这台机器过来的非授权访问 
  
使用root用户重启nfs服务
service nfs restart
```

##### 3. 客户机

使用test用户在/home/test文件创建共享目录:

```
cd /home/test
mkdir test_share
```

使用root用户, 执行挂载语句:

```
mount -t nfs 203.3.248.10:/home/test/test_share /home/test/test_share
```

使用root用户，将以上的挂载命令添加到/etc/rc.d/rc.local文件中

```
# 编辑文件
vim /etc/rc.d/rc.local
# 在文件中填下如下内容
mount -t nfs 203.3.248.10:/home/test/test_share /home/test/test_share
```

##### 4. 查看文件挂载

```
# 使用mount命令查看当前系统的挂载信息的例子：
mount

# 查看特定文件系统的挂载信息，可以使用-l选项来列出所有的分区，包括网络文件系统：
moutt -l

# 命令可以用来查看磁盘空间的使用情况，包括已挂载的文件系统：
df -h
```

##### 5. 取消挂载

```
umount -f <挂载点>
```











