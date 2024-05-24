Linux adduser命令用于新增使用者账号或更新预设的使用者资料.

adduser和useradd指令为统一指令(经由符号连结 symbolic link).

使用权限: 系统管理员

**语法:**

```
adduser [-c comment] [-d home_dir] [-e expire_date] [-f inactive_time] [-g initial_group] [-G group[,...]] [-m [-k skeleton_dir] | -M] [-p passwd] [-s shell] [-u uid [ -o]] [-n] [-r] loginid

adduser -D [-g default_group] [-b default_home] [-f default_inactive] [-e default_expire_date] [-s default_shell]
```

参数说明:

- -c comment 新使用者位于密码档（通常是 /etc/passwd）的注解资料
- -d home_dir 设定使用者的家目录为 home_dir ，预设值为预设的 home 后面加上使用者帐号 loginid
- -e expire_date 设定此帐号的使用期限（格式为 YYYY-MM-DD），预设值为永久有效
- -f inactive_time 范例：

**实例:**

添加一个一般用户:

```
adduser kk
```

为添加的用户指定相应的用户组:

```
adduser -g root kk
```

创建一个系统用户:

```
adduser -r kk
```

为新添加的用户指定/home目录:

```
adduser -d /home/myf kk
```

可为hadoop用户增加管理员权限:

```
adduser hadoop sudo
```

