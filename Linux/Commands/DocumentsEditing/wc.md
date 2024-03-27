Linux wc命令用于计算字数.

利用wc指令我们可以计算文件的Byte数、字数、或是列数, 若不指定文件名称、或是所给予的文件名为“-”, 则wc指令会从标准输入设备读取数据.

**语法:**

```
wc [-clw][--help][--version][文件...]
```

**参数:**

- -c或--bytes或--chars 只显示Bytes数。
- -l或--lines 显示行数。
- -w或--words 只显示字数。
- --help 在线帮助。
- --version 显示版本信息。

**实例:**

wc计算指定文件的行数、字数, 以及字节数.

```
wc testfile
```

如果同时统计多个文件信息, 例如同时统计testfile、testfile1、testfile2

```
wc testfile testfile1 testfile2
```































