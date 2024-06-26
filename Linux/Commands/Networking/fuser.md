#### Linux fuser

---

`fuser`是一个在`Linux`系统中用于识别进程使用的文件或网络套接字的命令行工具。它可以列出本地进程的进程号，这些进程使用了指定的文件或端口。`fuser` 显示每个进程号后跟随一个字母，指示进程如何使用文件或端口。

以下是 `fuser` 命令的一些常用选项：

- `-c` 或 `-m`：显示包含指定文件的文件系统中的所有进程。
- `-k`：杀死访问指定文件的所有进程。如果没有指定信号，将发送 `SIGKILL` 信号。
- `-i`：在杀死进程前询问用户确认。
- `-l`：列出所有已知的信号名称。
- `-m name`：指定一个挂载文件系统上的文件或被挂载的块设备（名称 `name`），列出所有访问该文件或文件系统的进程。
- `-n space`：指定一个不同的命名空间（例如文件名、TCP 端口、UDP 端口）。
- `-u`：在每个进程号后显示所属的用户名。
- `-v`：详细模式，输出类似 `ps` 命令的输出，包含 PID、USER、COMMAND 等域。
- `-s`：静默模式，此时 `-u` 和 `-v` 选项会被忽略，且 `-a` 不能和 `-s` 一起使用。
- `-a`：显示所有命令行中指定的文件，默认情况下只有被访问的文件才会被显示。

例如，要列出使用 `/etc/passwd` 文件的本地进程的进程号，可以使用命令 `fuser /etc/passwd`。要终止使用给定文件系统的所有进程，可以使用命令 `fuser -k -x -u -c /dev/vda1` 或 `fuser -kxuc /home`。这些命令会列出进程号和用户名，然后终止每个正在使用指定文件系统的进程。只有 root 用户能终止属于另一用户的进程。

##### 实例:

查看某个文件或某个目录被那个进程占用.对于网络端口，也可以使用fuser命令进行查询.

```
fuser 9000/tcp
```

