Linux time命令的用途, 在于量测特定指令时所需消耗的时间及系统资源等信息.

例如CPU时间,、记忆体、输入输出等等.

**语法:**

```
time [options] COMMAND [arguments]
```

**参数:**

- o 或 --output=FILE：设定结果输出档。这个选项会将 time 的输出写入 所指定的档案中。如果档案已经存在，系统将覆写其内容。
- -a 或 --append：配合 -o 使用，会将结果写到档案的末端，而不会覆盖掉原来的内容。
- -f FORMAT 或 --format=FORMAT：以 FORMAT 字串设定显示方式。当这个选项没有被设定的时候，会用系统预设的格式。不过你可以用环境变数 time 来设定这个格式，如此一来就不必每次登入系统都要设定一次。

**time指令可以显示的资源有四大项, 分别是：**

- Time resources
- Memory resources
- IO resources
- Command info

**实例:**

```
time date
Sun Mar 26 22:45:34 GMT-8 2006

real    0m0.136s
user    0m0.010s
sys     0m0.070s

real: 为实际时间
user: 用户CPU时间
sys: 系统CPU时间
```

