Linux which命令用于查找文件.

which指令会在环境变量$PATH设置的目录里查找符合条件的文件.

**语法:**

```
which [文件...]
```

**Options:**

- -n<文件名长度> 　指定文件名长度，指定的长度必须大于或等于所有文件中最长的文件名。
- -p<文件名长度> 　与-n参数相同，但此处的<文件名长度>包括了文件的路径。
- -w 　指定输出时栏位的宽度。
- -V 　显示版本信息。

**实例:**

使用指令which查看指令bash的绝对路径

```
which bash
/usr/bin/bash
```

