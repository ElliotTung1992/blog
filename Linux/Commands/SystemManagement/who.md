Linux who命令用于显示系统中哪些使用者正在上面, 显示的数据包含了使用者ID、使用的终端机、从哪里连上来的、上线时间、停留时间、CPU使用量、动作等等.

**语法:**

```
who - [husfV] [user]
```

**参数说明:**

- -H 或 --heading：显示各栏位的标题信息列；
- -i 或 -u 或 --idle：显示闲置时间，若该用户在前一分钟之内有进行任何动作，将标示成"."号，如果该用户已超过24小时没有任何动作，则标示出"old"字符串；
- -m：此参数的效果和指定"am i"字符串相同；
- -q 或--count：只显示登入系统的帐号名称和总人数；
- -s：此参数将忽略不予处理，仅负责解决who指令其他版本的兼容性问题；
- -w 或-T或--mesg或--message或--writable：显示用户的信息状态栏；
- --help：在线帮助；
- --version：显示版本信息

**实例:**

显示当前登录系统的用户:

```
who
```

显示当前登录系统的用户并显示标题栏:

```
who -H
```

只显示当前用户:

```
who -m -h 
```
