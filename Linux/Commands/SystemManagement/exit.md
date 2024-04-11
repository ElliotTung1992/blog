Linux exit命令用于退出目前的shell.

执行exit可使shell以指定的状态值退出. 若不设置状态值参数, 则shell以预设值退出.

状态0表示执行成功, 其它值代表执行失败.

exit也可以用在script, 离开正在执行的script, 回到shell.

**语法:**

```
exit [状态值]
```

**实例:**

退出终端:

```
exit
```

