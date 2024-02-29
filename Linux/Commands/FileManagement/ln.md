Linux ln(英文全拼: link files)命令是一个非常重要的命令, 它的功能是为某一个文件在另外一个位置建立一个同步的链接. 当我们需要在不同的目录, 用到相同的文件时, 我们不需要在每一个需要的目录下都放一个必须相同的文件, 我们只要在某个固定的目录, 放上该文件, 然后在其它的目录下用ln命令链接(link)它就可以, 不必重复的占用磁盘空间.

**语法**

---

```
ln [参数][源文件或目录][目标文件或目录]
```

其中参数的格式为

```
[-bdfinsvF] [-S backup-suffix] [-V {numbered,existing,simple}]
[--help] [--version] [--]
```

命令功能:

Linux文件系统中, 有所谓的链接(link), 我们可以将其视为档案的别名, 而链接又可以分为两种: 硬链接(hard link)与软链接(symbolic link), 硬链接的意思是一个档案可以有多个名称, 而软链接的方式则是产生一个特俗的文档, 该文档的内容是指向另一个文档的位置. 硬链接是存在同一个文件系统中, 而软链接却可以跨越不同的文件系统.

不论是硬链接还是软链接都不会将原来的档案复制一份, 只会占用非常少量的磁盘空间.

软链接:

1. 以路径的形式存在. 类似于Windows操作系统中的快捷方式.
2. 软链接可以跨文件系统, 硬链接不可以.
3. 软链接可以对一个不存在的文件名进行链接.
4. 软链接可以对目录进行链接

硬链接:

1. 硬链接, 以文件副本的形式存在, 但不占用实际空间.
2. 不允许给目录创建硬链接.
3. 硬链接只有在用一个文件系统中才能创建.

**必要参数**：

- --backup[=CONTROL] 备份已存在的目标文件
- -b 类似 **--backup** ，但不接受参数
- -d 允许超级用户制作目录的硬链接
- -f 强制执行
- -i 交互模式，文件存在则提示用户是否覆盖
- -n 把符号链接视为一般目录
- -s 软链接(符号链接)
- -v 显示详细的处理过程

**选择参数**：

- -S "-S<字尾备份字符串> "或 "--suffix=<字尾备份字符串>"
- -V "-V<备份方式>"或"--version-control=<备份方式>"
- --help 显示帮助信息
- --version 显示版本信息



#### 实例

---

给文件创建软链接, 为log2013.log文件创建软链接link2013，如果log2013.log丢失，link2013将失效

```
ln -s log2013.log link2013
```

给文件创建硬链接，为log2013.log创建硬链接ln2013，log2013.log与ln2013的各项属性相同

```
ln log2013.log ln2013
```
