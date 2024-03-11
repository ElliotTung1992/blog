nohup英文全称no hang up(不挂起), 用于在系统后台不挂断地运行命令, 退出终端不会影响程序的运行.

nohup命令, 在默认情况下(非重定向时), 会输出一个名为nohup.out的文件到当前目录下, 如果当前目录的nohup.out文件不可写, 输出重定向到$HOME/nohup.out文件中.

**语法**

```
 nohup Command [ Arg … ] [　& ]
```

**Options**

- command：要执行的命令

- arg：一些参数，可以指定输出文件

- &：让命令在后台执行，终端退出后命令仍旧执行

**实例**

以下命令在后台执行root目录下的runoot.sh脚本

```
nohup /root/runoot.sh &
```

以下命令在后台执行root目录下的runoob脚本, 并重定向输入到runoob.log

```
nohup /root/runoob.sh > runoob.sh 2>&1 &
```

2>&1 解释:

将标准错误2重定向到标准输出&1, 标准输出&1再被重定向输入到runoot.log文件

- 0 – stdin (standard input，标准输入)
- 1 – stdout (standard output，标准输出)
- 2 – stderr (standard error，标准错误输出)























