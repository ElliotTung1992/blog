Linux alias 命令用于设置指令的别名, 用户可利用alise, 自定指令的别名.

它可以使您以一种更简单和易于记忆的方式执行命令, 而不是每次都输入完整的命令.

若仅输入alias, 则可列出目前所有别名设置.

alias的效果仅在该次登录的操作有效, 若想要每次登入都有效, 可在.profile或.cshrc中设定指令的别名.

**语法:**

```
alias[别名]=[指令名称]
```

**实例:**

创建别名:

```
alias ll = 'ls -alF'
```

显示别名:

```
alias
```

删除别名:

```
unalias ll
```

向历史记录中添加时间戳:

此命令将创建一个名为history的别名, 它会在您执行历史记录命令时添加时间戳.

```
alias history='history | awk '"'"'{CMD="date +\"[%Y-%m-%d %H:%M:%S]\""; print CMD " " $0 }'"'"' | cut -c 29-'
```

启用颜色输出:

```
alias ls = 'ls --color=auto'
```













