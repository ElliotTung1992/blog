Linux nice命令以更改过的优先序来执行程序, 如果未指定程序, 则会打印出目前的排程优先序, 内定的adjustment为10, 范围为 -20(最高优先序)到19(最低优先序).

**语法:**

```
nice [-n adjustment] [-adjustment] [--adjustment=adjustment] [--help] [--version] [command [arg...]]
```

**参数说明:**

- -n adjustment, -adjustment, --adjustment=adjustment 皆为将该原有优先序的增加 adjustment
- --help 显示求助讯息
- --version 显示版本资讯

**实例:**

将ls的优先序加1并执行:

```
nice -n 1 ls
```

将ls的优先序设置默认10并执行:

```
nice ls
```

