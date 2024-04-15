#### Shell教程

---

Shell是一个用C语言编写的程序, 它是用户使用Linux的桥梁.

Shell即是一种命令语言, 也是一种程序设计语言.

Shell是指一种应用程序, 这个应用程序提供了一个界面访问操作系统内核的服务.

#### Shell 脚本

---

Shell脚本(shell script)是一种为shell编写的脚本程序.

业界所说的shell通常都是指shell脚本, shell和shell script是两个不同的概念.

#### Shell 脚本

---

Shell变成跟JavaScript、php变成一样, 只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了.

Linux的Shell种类众多, 常见的有:

- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh

.....

我们一般关注的是Bash, 也就是Bourne Again Shell, 由于是易用和免费, Bash 在日常工作中被广泛使用.

#### 第一个Shell脚本

---

实例:

```
#!/bin/bash
echo "hello world !"
```

#! 是一个约定的标记, 它告诉系统这个脚本需要什么解释器来执行, 即使用哪一种Shell.

##### 运行Shell脚本的两种方法

1. 作为可执行程序

将上面的代码保存为test.sh, 并cd到相应的目录:

```
chomd +x ./test.sh
./test.sh
```

注意一定要写成 ./test.sh 而不是 test.sh, 运行其它二进制的程序也一样, 直接写成test.sh, Linux系统会去 PATH里寻找有没有叫test.sh的, 而只有/bin, /sbin, /usr/bin, /usr/sbin等在PATH里, 你的当前目录通常不在PATH里, 所以写成test.sh是会找不到命令的, 要用 ./test.sh 告诉系统说，就在当前目录找.

2. 作为解释器参数

这种运行方式是, 直接运行解释器, 其参数就是shell脚本的文件名:

```
/bin/sh test.sh
```

这种方式运行的脚本, 不需要在第一行指定解释器的信息.

















