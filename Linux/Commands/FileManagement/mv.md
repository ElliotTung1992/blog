Linux mv（英文全拼: move file）命令用来为文件或目录改名、或将文件或目录移入其它位置.

**语法**

```
mv [options] source dest
mv [options] source... directory
```

参数说明:

- **-b**: 当目标文件或目录存在时，在执行覆盖前，会为其创建一个备份。
- **-i**: 如果指定移动的源目录或文件与目标的目录或文件同名，则会先询问是否覆盖旧文件，输入 y 表示直接覆盖，输入 n 表示取消该操作。
- **-f**: 如果指定移动的源目录或文件与目标的目录或文件同名，不会询问，直接覆盖旧文件。
- **-n**: 不要覆盖任何已存在的文件或目录。
- **-u**：当源文件比目标文件新或者目标文件不存在时，才执行移动操作。

**实例**

将文件aaa改名为bbb:

```
mv aaa bbb
```

将info目录放入logs目录中. 注意, 如果logs目录不存在, 则该命令将info改名为logs

```
mv info/ logs
```

将/usr/runoob下的所有文件和目录移到当前目录下, 命令行为:

```
mv /usr/runoob/* .
```





























