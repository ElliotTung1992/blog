groupadd命令用于创建一个新的工作组, 新工作组的信息将被添加到系统文件中.

相关文件：

- /etc/group 组账户信息。
- /etc/gshadow 安全组账户信息。
- /etc/login.defs Shadow密码套件配置。

**语法:**

```
groupadd [-g gid [-o]] [-r] [-f] group
```

**参数说明:**

- -g：指定新建工作组的 **id**；
- -r：创建系统工作组，系统工作组的组 ID 小于 500；
- -K：覆盖配置文件 **/etc/login.defs**；
- -o：允许添加组 ID 号不唯一的工作组。
- -f,--force: 如果指定的组已经存在，此选项将失明了仅以成功状态退出。当与 -g 一起使用，并且指定的 GID_MIN 已经存在时，选择另一个唯一的 GID（即 -g 关闭）。

**实例:**

创建一个新的组, 并添加组ID

```
groupadd -g 344 runoob

此时在/etc/group文件中产生一个组ID(GID)是344的组数据
```

查看系统所有的组:

```
cat /etc/group
```

