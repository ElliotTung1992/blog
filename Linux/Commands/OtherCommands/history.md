Linux history命令用于显示和管理命令历史记录.

**语法:**

```
history [-c] [-d 偏移量] [n] 或 history -anrw [文件名] 或 history -ps 参数 [参数...]    
```

参数选项：

| -a   | 写入命令记录               |
| ---- | -------------------------- |
| -c   | 清空命令记录               |
| -d   | 删除指定序号的命令记录     |
| -n   | 读取命令记录               |
| -r   | 读取命令记录到缓冲区       |
| -s   | 将指定的命令添加到缓冲区   |
| -w   | 将缓冲区信息写入到历史文件 |

**实例:**

显示历史记录:

```
history
```

显示3行历史记录：

```
history -3
```

将本次缓冲区信息写入到历史文件中:

```
history -w
```

将历史文件中的信息读取到当前缓冲区中:

```
history -r
```

将本次缓冲区信息写入到历史记录中:

```
history -a
```

清空本次缓冲区:

```
history -c
```

删除指定的历史记录:

```
history -d 3
```

查看history命令最多展示数量, 并重新设置:

```
echo $HISTSIZE
vim .bash_profile
tail -n1 .bash_profile
export HISTSIZE=3000
source .bash_profile
```

