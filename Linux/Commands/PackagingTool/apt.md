apt（Advanced Packaging Tool）是一个在Debian和Ubuntu中的Shell前段软件包管理器.

apt命令提供了查找、安装、升级、删除某一个、一组甚至全部软件包的命令, 而且命令简介而有好记.

apt命令执行需要超级管理员权限(root).

**apt语法:**

```
apt [options] [command] [package ...]
```

- options: 可选, 选项包括-h（帮助）, -y（当安装过程提示选择全部为"yes"）, -q（不显示安装的过程）等等.

- command: 要进行的操作.
- package: 安装的包名

**apt常用命令:**

列出所有可更新的软件清单命令: sudo apt update

升级软件包: sudo apt upgrade

列出可更新的软件包及版本信息: apt list --upgradeable

升级软件包, 升级前先删除需要更新软件包: sudo apt full-upgrade

安装指定的软件命令: sudo apt install <package_name>

安装多个软件包: sudo apt install <package_1> <package_2> <package_3>

更新指定的软件命令: sudo apt update <package_name>

显示软件包具体信息 例如: 版本号, 安装大小, 依赖关系等等: sudo apt show <package_name>

删除软件包命令: sudo apt remove <package_name>

清理不再使用的依赖和库文件: sudo apt autoremove

移除软件包及配置文件: sudo apt purge <package_name>

查找软件命令: sudo apt search <keyword>

列出所有已安装的包: apt list --installed

列出所有已安装的包的版本信息: apt list --all-versions

**实例:**

查看一些可更新的包:

```
sudo apt update
```

升级安装包:

```
sudo apt upgrade
```

组合命令:

```
sudo apt update && sudo apt upgrade -y
```

安装Nginx包:

```
sudo apt install nginx
```

安装xxx包, 如果软件包已经存在, 则不升级:

```
sudo apt install <package_name> --no-upgrade
```

移除包可以使用remove命令:

```
sudo apt remove <package_name>
```

查找相关包:

```
sudo apt search <package_name>
```

查看包相关信息:

```
sudo apt show <package_name>
```

列出可更新的软件包:

```
sudo apt list --upgradeable
```

清除不再使用的依赖和库文件:

```
sudo apt autoremove
```









































