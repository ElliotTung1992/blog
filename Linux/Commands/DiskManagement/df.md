Linux df（英文全拼: disk free）命令用于显示目前在Linux系统上的文件系统磁盘使用情况情况.

**语法：**

```
df [选项]... [FILE]...
```

**选项:**

- 文件-a, --all 包含所有的具有 0 Blocks 的文件系统
- 文件--block-size={SIZE} 使用 {SIZE} 大小的 Blocks
- 文件-h, --human-readable 使用人类可读的格式(预设值是不加这个选项的...)
- 文件-H, --si 很像 -h, 但是用 1000 为单位而不是用 1024
- 文件-i, --inodes 列出 inode 资讯，不列出已使用 block
- 文件-k, --kilobytes 就像是 --block-size=1024
- 文件-l, --local 限制列出的文件结构
- 文件-m, --megabytes 就像 --block-size=1048576
- 文件--no-sync 取得资讯前不 sync (预设值)
- 文件-P, --portability 使用 POSIX 输出格式
- 文件--sync 在取得资讯前 sync
- 文件-t, --type=TYPE 限制列出文件系统的 TYPE
- 文件-T, --print-type 显示文件系统的形式
- 文件-x, --exclude-type=TYPE 限制列出文件系统不要显示 TYPE
- 文件-v (忽略)
- 文件--help 显示这个帮手并且离开
- 文件--version 输出版本资讯并且离开

**实例:**

显示文件系统的磁盘使用情况统计:

```
df
Filesystem     512-blocks      Used  Available Capacity iused      ifree %iused  Mounted on
/dev/disk3s1s1 1942700360  45658352 1342485496     4%  502068 4293830893    0%   /
devfs                 397       397          0   100%     688          0  100%   /dev
/dev/disk3s6   1942700360        40 1342485496     1%       0 6712427480    0%   /System/Volumes/VM
/dev/disk3s2   1942700360   1593328 1342485496     1%     978 6712427480    0%   /System/Volumes/Preboot
/dev/disk3s4   1942700360   1418896 1342485496     1%     270 6712427480    0%   /System/Volumes/Update
/dev/disk1s2      1024000     12328     981960     2%       1    4909800    0%   /System/Volumes/xarts
/dev/disk1s1      1024000     15152     981960     2%      41    4909800    0%   /System/Volumes/iSCPreboot
/dev/disk1s3      1024000      4840     981960     1%      51    4909800    0%   /System/Volumes/Hardware
/dev/disk3s5   1942700360 547907904 1342485496    29% 1626783 6712427480    0%   /System/Volumes/Data
map auto_home           0         0          0   100%       0          0  100%   /System/Volumes/Data/home
/dev/disk2s1     10485672   3412200    7034856    33%      60   35174280    0%   /System/Volumes/Update/SFR/mnt1
/dev/disk3s1   1942700360  45658352 1342485496     4%  502381 4292678718    0%   /System/Volumes/Update/mnt1

第一列指定文件系统的名称
```

显示磁盘使用的文件系统信息:

```
# df -h blog 
Filesystem     Size   Used  Avail Capacity iused      ifree %iused  Mounted on
/dev/disk3s5  926Gi  263Gi  638Gi    30% 1628525 6694078760    0%   /System/Volumes/Data
```

输出显示inode信息而非块使用量:

```
ganendong@ganendeMacBook-Pro ~ % df -i
Filesystem     512-blocks      Used  Available Capacity iused      ifree %iused  Mounted on
/dev/disk3s1s1 1942700360  45658360 1338838200     4%  502068 4293830893    0%   /
devfs                 397       397          0   100%     688          0  100%   /dev
/dev/disk3s6   1942700360        40 1338838200     1%       0 6694191000    0%   /System/Volumes/VM
/dev/disk3s2   1942700360   1593328 1338838200     1%     978 6694191000    0%   /System/Volumes/Preboot
/dev/disk3s4   1942700360   1418896 1338838200     1%     270 6694191000    0%   /System/Volumes/Update
/dev/disk1s2      1024000     12328     981960     2%       1    4909800    0%   /System/Volumes/xarts
/dev/disk1s1      1024000     15152     981960     2%      41    4909800    0%   /System/Volumes/iSCPreboot
/dev/disk1s3      1024000      4840     981960     1%      51    4909800    0%   /System/Volumes/Hardware
/dev/disk3s5   1942700360 551555192 1338838200    30% 1628645 6694191000    0%   /System/Volumes/Data
map auto_home           0         0          0   100%       0          0  100%   /System/Volumes/Data/home
/dev/disk2s1     10485672   3412200    7034856    33%      60   35174280    0%   /System/Volumes/Update/SFR/mnt1
/dev/disk3s1   1942700360  45658360 1338838200     4%  502381 4292678718    0%   /System/Volumes/Update/mnt1
```

输出可读的格式输出:

```
# df -h 
Filesystem      Size  Used   Avail Use% Mounted on 
/dev/sda6       29G   4.2G   23G   16%     / 
udev            1.5G  4.0K   1.5G   1%     /dev 
tmpfs           604M  892K   603M   1%     /run 
none            5.0M     0   5.0M   0%     /run/lock 
none            1.5G  156K   1.5G   1%     /run/shm 
```

























