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

#### Shell 数组

---

bash支持一维数组(不支持多维数组), 并且没有限定数组的大小.

类似于C语言, 数组元素的下标由0开始编号. 获取数组中的元素要利用下标, 下标可以是整数或算术表达式, 其值应大于或等于0.

##### 定义数组

在Shell中, 用括号来表示数组, 数组元素用"空格"符号分割开. 定义数组的一般形式为:

```
数组名=(值1 值2 值3)

array_name=(
value0
value1
value2
value3
)

array_name[0]=value0
array_name[1]=value1
array_name[2]=value2
```

##### 读取数组

读取数组元素值的一般格式是:

```
${数组名[下标]}

value=${array_name[n]}
```

使用@符号可以获取数组中所有的元素, 例如:

```
echo ${array_name[@]}
```

##### 获取数组的长度

获取数组长度的方法与获取字符串的方法相同, 例如:

```
# 获取数组元素的个数
length=${#array_name[@]}
length=${#array_name[*]}
# 获取数组单个元素的长度
length=${#array_name[n]]}
```

##### 关联数组

Bash支持关联数组, 可以使用任意的字符串、或者整数作为下标来访问数组元素

关联数组使用declare命令来声明, 语法格式如下：

```
declare -A array_name
```

-A 选项就是用来声明一个关联数组

关联数组的键是唯一的

实例:

```
declare -A site=(["google"]="www.google.com" ["baidu"]="www.baidu.com")

declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"
```

##### 获取数组中的所有元素

使用@和*可以获取数组中的所有元素:

```
my_array[0]=A
my_array[1]=B
my_array[2]=C
my_array[3]=D

echo "数组的元素为: ${my_array[*]}"
echo "数组的元素为: ${my_array[@]}"
```

在数组前面加一个感叹号!可以获取数组的所有键:

```
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"

echo "数组的键为: ${!site[*]}"
echo "数组的键为: ${!site[@]}"
```

##### 获取数组的长度

获取数组长度的方法和获取字符串长度的方法相同:

```
my_array[0]=A
my_array[1]=B
my_array[2]=C
my_array[3]=D

echo "数组元素个数为: ${#my_array[*]}"
echo "数组元素个数为: ${#my_array[@]}"
```

#### Shell注释

---

以#开头的行就是注释, 会被解释器忽略.

通过每一行加一个#号设置多行注释, 像这样:

```
#--------------------------------------------
# Hello World
#--------------------------------------------
```

##### 多行注释

使用Here文档

多行注释还可以使用以下格式:

```
:<<EOF
注释内容...
注释内容...
注释内容...
EOF

: <<'COMMENT'
这是注释的部分。
可以有多行内容。
COMMENT

:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!
```

**直接使用:号**

我们也可以使用:命令, 并用单引号'将多行内容括起来. 由于冒号是一个空命令, 这些内容不会被执行.

格式为: ": + 空格 + 单引号"

```
: '
这是注释的部分。
可以有多行内容。
'
```

#### Shell传递参数

---

我们可以在执行Shell脚本时, 向脚本传递参数, 脚本内获取参数的格式为$n, n代表一个数字, 1为执行脚本的第一个参数, 2为执行脚本的第二个参数.

**实例:**

以下实例我们向脚本传递三个参数, 并分别输出, 其中$0为执行的文件名(包含文件路径):

```
#!/bin/bash

echo "Shell传递参数实例"
echo "执行的文件名: $0"
echo "$1"
echo "$2"
```

##### 特殊字符用来处理参数:

- $#: 传递到脚本的参数个数

- $*: 以一个单字符串显示所有向脚本传递的参数

- $$: 脚本运行的当前进程ID号

- $@: 与$*相同, 但在使用时加引号, 并在引号中返回每个参数

- $-: 显示Shell使用的当前选项, 与set命令功能相同

- $?: 显示最后命令的退出状态

比较: '$*'和'$@'的区别:

- 相同点: 都是引用所有的参数
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数)





















































