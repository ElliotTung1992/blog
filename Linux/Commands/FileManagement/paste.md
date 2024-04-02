Linux paste命令用于合并文件的列.

paste指令会把每个文件以列对列的方式, 一列列地加以合并.

**语法:**

```
paste [-s][-d <间隔字符>][--help][--version][文件...]
```

**参数:**

- -d<间隔字符>或--delimiters=<间隔字符> 　用指定的间隔字符取代跳格字符。
- -s或--serial 　串列进行而非平行处理。
- --help 　在线帮助。
- --version 　显示帮助信息。
- [文件…] 指定操作的文件路径

**实例:**

使用paste指令将文件file、file1、file2进行合并:

```
paste file file1 file2
```

将一个文件的多行数据合并为一行再进行显示:

```
paste -s file file1 file2
```

