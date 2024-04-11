Linux unalias命令用于删除别名.

unalias为shell内建指令, 可删除别名设置.

**语法:**

```
unalias [-a][别名]
```

参数:

- -a 　删除全部的别名

**实例:**

给命令设置别名:

```
alias lx=ls
```

删除别名:

```
# 显示别名
alias lx
# 删除别名
unalias lx
```

