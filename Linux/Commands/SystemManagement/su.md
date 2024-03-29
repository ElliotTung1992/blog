Linux su(英文全拼: switch user)命令用于变更为其他使用者的身份, 除root外, 需要键入该使用者的密码.

使用权限: 所有使用者.

**语法:**

```
su [-fmp] [-c command] [-s shell] [--help] [--version] [-] [USER [ARG]]
```

**参数说明**：

- -f 或 --fast 不必读启动档（如 csh.cshrc 等），仅用于 csh 或 tcsh
- -m -p 或 --preserve-environment 执行 su 时不改变环境变数
- -c command 或 --command=command 变更为帐号为 USER 的使用者并执行指令（command）后再变回原来使用者
- -s shell 或 --shell=shell 指定要执行的 shell （bash csh tcsh 等），预设值为 /etc/passwd 内的该使用者（USER） shell
- --help 显示说明文件
- --version 显示版本资讯
- \- -l 或 --login 这个参数加了之后，就好像是重新 login 为该使用者一样，大部份环境变数（HOME SHELL USER等等）都是以该使用者（USER）为主，并且工作目录也会改变，如果没有指定 USER ，内定是 root
- USER 欲变更的使用者帐号
- ARG 传入新的 shell 参数

**实例:**

变更账号为root并在执行ls指令后退出变回原使用者.

```
su -c ls root.
```

变更账号为root并传入 -f 参数给新执行的shell.

```
su root -f
```

变更账号为clsung并改变工作目录至clsung的家目录

```
su - clsung.
```











