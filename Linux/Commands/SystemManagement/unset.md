Linux unset命令用于删除变量或函数.

unset为shell内建指令, 可删除变量或函数.

**语法:**

```
unset [-fv][变量或函数名称]
```

参数：

- -f 　仅删除函数。
- -v 　仅删除变量。

**实例:**

删除环境变量:

```
# 设置环境变量
dge="Elliot";
# 查看环境变量
set|grep 'dge';
# 删除环境变量
unset dge;
```

