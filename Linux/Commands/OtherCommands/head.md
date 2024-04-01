head命令可用于查看文件的开头部分的内容, 有一个常用的参数-n用于显示行数, 默认为10, 即显示10行的内容.

**语法:**

```
head [参数] [文件]  
```

**参数：**

- -q 隐藏文件名
- -v 显示文件名
- -c<数目> 显示的字节数。
- -n<行数> 显示的行数。

**实例:**

显示runnoob_notes.log文件的开头10行:

```
head runoob_rutes.log
head -n 10 runoob_rutes.log
```

显示文件前20个字节:

```
head -c 20 runoob_rutes.log
```

