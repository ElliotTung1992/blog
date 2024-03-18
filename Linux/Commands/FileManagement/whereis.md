Linux whereis命令用于查找文件.

该指令会在特定目录中查找符合条件的文件.这些文件属于原始代码、二进制文件或是帮助文件.

该指令只能用于查找二进制文件、源代码文件和man手册页, 一般文件的定位需使用locate命令.

**语法**

```
whereis [-bfmsu][-B <目录>...][-M <目录>...][-S <目录>...][文件...]
```

**Options:**

-b 　只查找二进制文件。

-B<目录> 　只在设置的目录下查找二进制文件。

-f 　不显示文件名前的路径名称。

-m 　只查找说明文件。

-M<目录> 　只在设置的目录下查找说明文件。

-s 　只查找原始代码文件。

-S<目录> 　只在设置的目录下查找原始代码文件。

-u 　查找不包含指定类型的文件。

**实例**

使用指令whereis查看指令bash的位置

```
whereis bash
```












