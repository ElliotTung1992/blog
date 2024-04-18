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

#### Shell变量

---

##### 定义变量

在Shell编程中, 变量是用于存储数据值的名称.

定义变量时, 变量名不加美元符号:

```
your_name="BruceLee"
```

变量的命名须遵循如下规则:

- **只包含字母、数字和下划线：** 变量名可以包含字母（大小写敏感）、数字和下划线 **_**，不能包含其他特殊字符。
- **不能以数字开头：** 变量名不能以数字开头，但可以包含数字。
- **避免使用 Shell 关键字：** 不要使用Shell的关键字（例如 if、then、else、fi、for、while 等）作为变量名，以免引起混淆。
- **使用大写字母表示常量：** 习惯上，常量的变量名通常使用大写字母，例如 **PI=3.14**。
- **避免使用特殊符号：** 尽量避免在变量名中使用特殊符号，因为它们可能与 Shell 的语法产生冲突。
- **避免使用空格：** 变量名中不应该包含空格，因为空格通常用于分隔命令和参数。

除了显式地直接赋值, 还可以用语句给变量赋值:

下列语句时将/etc下目录的文件名循环出来:

```
for file in `ls /etc`
或
for file in $(ls /etc)
```

##### 使用变量

使用一个定义过的变量, 只要在变量名前面加美元符号即可, 如:

```
your_name="BruceLee"
echo $your_name
echo ${your_name}

# 变量名外面的花括号是可选的, 加不加都行, 加花括号是为了帮助解释器识别变量的边界
```

已定义的变量, 可以重新被定义:

```
your_name="BruceLee"
echo ${your_name}
your_name="Elliot"
echo ${your_name}
```

##### 只读变量

使用readonly命令可以将变量定义为只读变量, 只读变量的值不能被改变:

```
my_name="Elliot"
readonly my_name
my_name="Mike"
```

##### 删除变量

使用unset可以删除变量:

```
unset variable_name

my_name="Elliot"
unset my_name
echo ${my_name}
```

##### 变量类型

Shell支持不同类型的变量, 其中一些主要的类型包括:

**变量类型 - 字符串变量**

你可以使用单引号'或者双引号"来定义变量

```
my_name='Mike'
your_name="Bruce"
```

**变量类型 - 整数变量**

在一些Shell中, 你可以使用declare或typeset命令来声明整数变量:

```
declare -i my_int=42
# 这样的声明告诉 Shell 将 my_integer 视为整数，如果尝试将非整数值赋给它，Shell会尝试将其转换为整数
```

**变量类型 - 数组变量**

Shell也支持数组, 允许你在一个变量中存储多个值:

```
my_array=(1 2 3 4)
```

**变量类型 - 环境变量**

这些是由操作系统或者用户设置的特殊变量, 用于配置Shell的行为和影响其执行环境.

例如: PATH变量包含了操作系统搜索可执行文件的路径:

```
echo $PATH
```

**变量类型 - 特殊变量**

有一些特俗变量在Shell中具有特俗含义, 例如$0表示脚本的名称, $1, $2等表示脚本的参数.

$#表示传递给脚本的参数数量, $?表示上一个命令的退出状态等.

#### Shell字符串

---

字符串是shell编程中最常用最有用的数据类型, 字符串可以用单引号, 也可以用双引号, 也可以不用引号.

##### 单引号

```
str='this is a string'
```

单引号字符串的限制:

- 单引号的任何自负都会原样输出, 单引号字符串中的变量是无效的.
- 单引号字符串中不能出现单独一个的单引号, 但可以成对出现, 作为字符串拼接使用.

##### 双引号

```
your_name="Mike"
str="hello, I know you are \"${your_name}\" \n"
```

双引号的优点：

- 双引号里可以有变量
- 双引号可以出现转译字符

##### 拼接字符串

```
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1

# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```

##### 获取字符串长度

```
string="abcd"
echo ${#string}
echo ${#string[0]}
```

##### 提取子字符串

提取字符串第2到第4之间的字符:

```
string="helloworld"
echo ${string:1:4}
```

##### 查找子字符串

查找字符i或o的位置

```
string="runoob is a great site"
echo `expr index "${string}" io`
```



























