Linux du（英文全拼: disk usage）命令用于显示目录或文件的大小.

du会显示指定的目录或文件所占用的磁盘空间.

**语法：**

```
du [-abcDhHklmsSx][-L <符号连接>][-X <文件>][--block-size][--exclude=<目录或文件>][--max-depth=<目录层数>][--help][--version][目录或文件]
```

**参数说明:**

- -a或-all 显示目录中个别文件的大小。
- -b或-bytes 显示目录或文件大小时，以byte为单位。
- -c或--total 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
- -D或--dereference-args 显示指定符号连接的源文件大小。
- -h或--human-readable 以K，M，G为单位，提高信息的可读性。
- -H或--si 与-h参数相同，但是K，M，G是以1000为换算单位。
- -k或--kilobytes 以1024 bytes为单位。
- -l或--count-links 重复计算硬件连接的文件。
- -L<符号连接>或--dereference<符号连接> 显示选项中所指定符号连接的源文件大小。
- -m或--megabytes 以1MB为单位。
- -s或--summarize 仅显示指定目录或文件的总大小，而不显示其子目录的大小。
- -S或--separate-dirs 显示个别目录的大小时，并不含其子目录的大小。
- -x或--one-file-xystem 以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
- -X<文件>或--exclude-from=<文件> 在<文件>指定目录或文件。
- --exclude=<目录或文件> 略过指定的目录或文件。
- --max-depth=<目录层数> 超过指定层数的目录后，予以忽略。
- --help 显示帮助。
- --version 显示版本信息。

**实例：**

显示目录或者文件所占空间:

```
# du
0	./Microservices/SpringCloud
40	./Microservices
0	./Database/DatabaseDesignSoftware
56	./Database
32	./Framework
24	./Security
16	./Web/CSS
32	./Web
8	./Management
```

显示指定文件所占空间：

```
# du Nginx.md 
8	Nginx.md
```

方便阅读的格式显示test目录所占的空间：

```
# du -h 
```

方便阅读的格式展示指定目录所占空间情况：

```
# du -h Linux
 24K	Linux/Commands/SystemManagement
 16K	Linux/Commands/Networking
 72K	Linux/Commands/FileManagement
4.0K	Linux/Commands/SystemSettings
4.0K	Linux/Commands/PackagingTool
 20K	Linux/Commands/OtherCommands
8.0K	Linux/Commands/DocumentsEditing
 28K	Linux/Commands/DiskManagement
 16K	Linux/Commands/BackupCompression
204K	Linux/Commands
224K	Linux
```

查看当前目录每个文件夹的大小:

```
# du -sh *
84K	Architecture
 52K	Computer
 28K	Database
 16K	Framework
 36K	Java
 48K	Kit
224K	Linux
4.0K	Management
 20K	Microservices
4.0K	README.md
 12K	Security
4.0K	SoftwareTest
 28K	Spring
4.0K	SystemsDesign
 16K	Web
```





























