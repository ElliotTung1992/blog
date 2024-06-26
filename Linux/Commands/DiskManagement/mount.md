linux mount命令是经常使用到的命令, 它用于挂载Linux系统外的文件.

**语法**

```
mount [-hV]
mount -a [-fFnrsvw] [-t vfstype]
mount [-fnrsvw] [-o options [,...]] device | dir
mount [-fnrsvw] [-t vfstype] [-o options] device dir

device: 指定要挂载的设备, 比如磁盘、光驱等
dir: 指定把文件系统挂载到哪个目录
```

**参数说明:**

- -V：显示程序版本
- -h：显示辅助讯息
- -v：显示较讯息，通常和 -f 用来除错。
- -a：将 /etc/fstab 中定义的所有档案系统挂上。
- -F：这个命令通常和 -a 一起使用，它会为每一个 mount 的动作产生一个行程负责执行。在系统需要挂上大量 NFS 档案系统时可以加快挂上的动作。
- -f：通常用在除错的用途。它会使 mount 并不执行实际挂上的动作，而是模拟整个挂上的过程。通常会和 -v 一起使用。
- -n：一般而言，mount 在挂上后会在 /etc/mtab 中写入一笔资料。但在系统中没有可写入档案系统存在的情况下可以用这个选项取消这个动作。
- -s-r：等于 -o ro
- -w：等于 -o rw
- -L：将含有特定标签的硬盘分割挂上。
- -U：将档案分割序号为 的档案系统挂下。-L 和 -U 必须在/proc/partition 这种档案存在时才有意义。
- -t：指定档案系统的型态，通常不必指定。mount 会自动选择正确的型态。
- -o async：打开非同步模式，所有的档案读写动作都会用非同步模式执行。
- -o sync：在同步模式下执行。
- -o atime、-o noatime：当 atime 打开时，系统会在每次读取档案时更新档案的『上一次调用时间』。当我们使用 flash 档案系统时可能会选项把这个选项关闭以减少写入的次数。
- -o auto、-o noauto：打开/关闭自动挂上模式。
- -o defaults:使用预设的选项 rw, suid, dev, exec, auto, nouser, and async.
- -o dev、-o nodev-o exec、-o noexec允许执行档被执行。
- -o suid、-o nosuid：
- 允许执行档在 root 权限下执行。
- -o user、-o nouser：使用者可以执行 mount/umount 的动作。
- -o remount：将一个已经挂下的档案系统重新用不同的方式挂上。例如原先是唯读的系统，现在用可读写的模式重新挂上。
- -o ro：用唯读模式挂上。
- -o rw：用可读写模式挂上。
- -o loop=：使用 loop 模式用来将一个档案当成硬盘分割挂上系统。



**实例:**

将/dev/hda1挂在/mnt下:

```
mount /dev/hda1 /mnt
```

将/dev/hda1用只读模式挂载到/mnt之下:

```
mount -o ro /dev/hda1 /mnt
```

挂载网络磁盘:

```
# 确保已经安装了nfs-common包
sudo apt-install nfs-common

# 创建一个挂载点
cd /
mkdir nas

# 挂载网络磁盘
sudo mount -t nfs <网络磁盘IP>:/<共享目录> /nas

# 异常: mount.nfs:access denied by server while mounting
# 表示在尝试通过网络文件系统(NFS)挂载共享存储时, 服务器端拒绝了客户端的挂载请求
# 在服务端进行配置:/etc/exports
/nas 192.168.1.0/24(rw,sync,no_root_squash)
- /nas 表示共享目录
- rw 表示读写权限
- ro 表示只读权限
- sync 表示同步写入到内存和磁盘
- no_root_squash 表示客户端以root用户访问时, 它将具有根目录的访问权限

# 使/etc/exports生效
exportfs -ra

# 确保服务端正确安装了NFS服务, 并且相关的端口未被防火墙阻

# 设置Linux启动自动挂载磁盘
修改服务端配置文件: /etc/fstab
/dev/sdb1 /mnt/mydisk ext4 defaults 0 2
- /dev/sdb1 要挂载的磁盘分区
- /mnt/mydisk 磁盘分区的挂载点
- etx4 文件系统类型: ext3 ext4 ntfs vfat
- defaults 挂载时使用的默认选项
- 0 转换标识, 通常为0
- 2 自检的优先级, 根分区组一般为1, 其他为2

# 查看挂载配置是否正确
mount -a

# 查看系统上的文件系统磁盘使用情况
cd /
df -H
```



























