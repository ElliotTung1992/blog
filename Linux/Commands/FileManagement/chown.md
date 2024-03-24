Linux chown（英文全拼: change owner）命令用于设置文件所有者和文件关联组的命令.

Linux/Unix是多人多工操作系统, 所有的文件皆有拥有者. 利用chown将指定文件的拥有者为指定的用户和组, 用户可以是用户名或者用户ID, 组可以是组名或者组ID, 文件是以空格分开的要改变权限的文件列表, 支持通配符.

chown需要超级用户root的权限才能执行命令.

只有超级用户和属于组的文件所有者才能变更文件关联组. 非超级用户如需要设置关联组可能需要使用chgrp命令.

**语法：**

```
chown [-cfhvR] [--help] [--version] user[:group] file...
```

**参数:**

- user : 新的文件拥有者的使用者 ID
- group : 新的文件拥有者的使用者组(group)
- -c : 显示更改的部分的信息
- -f : 忽略错误信息
- -h :修复符号链接
- -v : 显示详细的处理信息
- -R : 处理指定目录以及其子目录下的所有文件
- --help : 显示辅助说明
- --version : 显示版本

**实例:**

把/var/run/httpd.pid的所有者设置root:

```
chown root /var/run/http.pid
```

将文件file.txt的拥有者设为runoob, 群体的使用者runoobgroup:

```
chown runoob:runoobgroup file1.txt
```

将当前目录下的所有文件与子目录的拥有者皆设为runoob, 群体的使用者runoobgroup:

```
chown -R runoob:runoobgroup *
```

把/home/runoob的关联组设置为512(关联组ID), 不改变所有者:

```
chown :512 /home/runoob
```















