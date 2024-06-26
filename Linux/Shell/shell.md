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

#### Shell基本运算符

---

Shell和其他编程语言一样, 支持多种运算符, 包括:

- 算术运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文本测试运算符

原生bash不支持简单的运算, 但是可以通过其他命令来实现, 例如awk和expr, expr最常用.

expr是一款表达式计算工具, 使用它能挽回吃呢哥表达式的求值操作.

例如: 两数相加(注意使用的是反引号`而不是单引号'):

```
#!/bin/bash
var=`expr 2 + 2`
echo "两数相加和为: ${var}"
```

##### 算术运算符

| 运算符 | 说明                                          | 举例                          |
| :----- | :-------------------------------------------- | :---------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| *      | 乘法                                          | `expr $a \* $b` 结果为  200。 |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=$b 把变量 b 的值赋给 a。    |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

注意:

- 乘号(*)前边必须加反斜杠\才能实现乘法运算
- if...then...fi 是条件语句
- 在 MAC 中 shell 的 expr 语法是：**$((表达式))**，此处表达式中的 "*" 不需要转义符号 "\" 

##### 关系运算符

关系运算符只支持数字, 不支持字符串, 除非字符串的值是数字.

| 运算符 | 说明                                                  | 举例                     |
| :----- | :---------------------------------------------------- | :----------------------- |
| -eq    | 检测两个数是否相等，相等返回 true。                   | [ $a -eq $b ] 返回 false |
| -ne    | 检测两个数是否不相等，不相等返回 true。               | [ $a -ne $b ] 返回 true  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true。     | [ $a -gt $b ] 返回 false |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true。     | [ $a -lt $b ] 返回 true  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true。 | [ $a -ge $b ] 返回 false |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true。 | [ $a -le $b ] 返回 true  |

##### 布尔运算符

| 运算符 | 说明                                                | 举例                                     |
| :----- | :-------------------------------------------------- | :--------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a     | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

##### 逻辑运算符

| 运算符 | 说明       | 举例                                       |
| :----- | :--------- | :----------------------------------------- |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

##### 字符串运算符

| 运算符 | 说明                                         | 举例                     |
| :----- | :------------------------------------------- | :----------------------- |
| =      | 检测两个字符串是否相等，相等返回 true。      | [ $a = $b ] 返回 false。 |
| !=     | 检测两个字符串是否不相等，不相等返回 true。  | [ $a != $b ] 返回 true。 |
| -z     | 检测字符串长度是否为0，为0返回 true。        | [ -z $a ] 返回 false。   |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 true。 | [ -n "$a" ] 返回 true。  |
| $      | 检测字符串是否不为空，不为空返回 true。      | [ $a ] 返回 true。       |

##### 文件测试运算符

| 操作符  | 说明                                                         | 举例                      |
| :------ | :----------------------------------------------------------- | :------------------------ |
| -b file | 检测文件是否是块设备文件，如果是，则返回 true。              | [ -b $file ] 返回 false。 |
| -c file | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false。 |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false。 |
| -k file | 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  | [ -k $file ] 返回 false。 |
| -p file | 检测文件是否是有名管道，如果是，则返回 true。                | [ -p $file ] 返回 false。 |
| -u file | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false。 |
| -r file | 检测文件是否可读，如果是，则返回 true。                      | [ -r $file ] 返回 true。  |
| -w file | 检测文件是否可写，如果是，则返回 true。                      | [ -w $file ] 返回 true。  |
| -x file | 检测文件是否可执行，如果是，则返回 true。                    | [ -x $file ] 返回 true。  |
| -s file | 检测文件是否为空（文件大小是否大于0），不为空返回 true。     | [ -s $file ] 返回 true。  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true。          | [ -e $file ] 返回 true。  |

#### Shell test

---

Shell中的 test 命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试

##### 数值测试

| 参数 | 说明           |
| :--- | :------------- |
| -eq  | 等于则为真     |
| -ne  | 不等于则为真   |
| -gt  | 大于则为真     |
| -ge  | 大于等于则为真 |
| -lt  | 小于则为真     |
| -le  | 小于等于则为真 |

案例:

```
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi
```

##### 字符串测试

| 参数      | 说明                     |
| :-------- | :----------------------- |
| =         | 等于则为真               |
| !=        | 不相等则为真             |
| -z 字符串 | 字符串的长度为零则为真   |
| -n 字符串 | 字符串的长度不为零则为真 |

案例:

```
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo '两个字符串相等!'
else
    echo '两个字符串不相等!'
fi
```

##### 文件测试

| 参数      | 说明                                 |
| :-------- | :----------------------------------- |
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

案例:

```
cd /bin
if test -e ./bash
then
    echo '文件已存在!'
else
    echo '文件不存在!'
fi
```

#### 输入/输出重定向

---

大多数UNIX系统命令从你的终端接收输入并将所产生的输出发送回到您的终端.一个命令通常从一个叫标准输入的地方读取输入, 默认情况下, 这恰好是你的终端. 同样, 一个命令通常将其输出写入到标准输出, 默认情况下, 这也是你的终端.

| 命令            | 说明                                               |
| :-------------- | :------------------------------------------------- |
| command > file  | 将输出重定向到 file。                              |
| command < file  | 将输入重定向到 file。                              |
| command >> file | 将输出以追加的方式重定向到 file。                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m          | 将输出文件 m 和 n 合并。                           |
| n <& m          | 将输入文件 m 和 n 合并。                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |

需要注意的是文件描述符0通常是标准输入(STDIN), 1是标准输出(STDOUT), 2是标准错误输出(STDERR).

##### 输出重定向

重定向一般通过在命令间插入特定的符号来实现. 特别的, 这些符号的语法如下所示:

```
command1 > file1
```

上面这个命令执行command1然后将输出的内容存入file1.

注意任何file1内的已经存在的内容将被新内容替代. 如果要将新内容添加在文件末尾, 请使用>>操作符.

实例:

执行下面的who命令, 它将命令的完整的输出重定向在用户文件中users:

```
who > users
```

##### 输入重定向

和输出重定向一样, Unix命令也可以从文件获取输入, 语法为:

```
command1 < file
```

实例:

接着以上实例, 我们需要统计users文件的行数, 执行以下命令:

```
wc -l users

wc -l < users
```

##### 重定向深入讲解:

一般情况下, 每个Unix/Linux命令运行时都会打开三个文件:

- 标准输入文件(stdin): stdin的文件描述符为0, Unix程序默认从stdin读取数据
- 标准输出文件(stdout): stdout的文件描述符为1, Unix程序默认向stdout输出数据
- 标准错误文件(stderr): stderr的文件描述符为2, Unix程序会向stderr流中写入错误数据

默认情况下, command > file 将stdout重定向到file, command < file 将stdin重定向到file

如果希望stderr重定向到file, 可以这样写:

```
command 2>file
```

如果希望stderr追加到file文件末尾, 可以这样写:

```
command 2>>file
```

如果希望将stdout和stderr合并重定向到file, 可以这样写:

```
command > file 2>&1
command >> file 2>&1
```

如果希望对stdin和stdout都重定向, 可以这么写:

```
command < file1 > file2
```

command命令将stdin重定向到file1, 将stdout重定向到file2:

```
command < file1 > file2
```

##### Here Document

Here Document是Shell中的一种特殊的重定向方式, 用来将输入重定向到一个交互式Shell脚本或程序:

它的基本的形式如下:

```
command << delimiter
		document
delimiter
```

它的作用是将菱格delimiter之间的内容(document)作为输入传递给command.

实例:

在命令行中通过**wc -l**命令计算Here Document的行数:

```
wc -l << EOF
		hello world
		Hi, Elliot
EOF
```

我们也可以将Here Document用在脚本中, 例如:

```
cat << EOF
		hello world
		Hi, Elliot
		Good Morning
EOF
```

##### /dev/null文件

如果希望执行某个命令, 但又不希望在屏幕上显示输出结果, 那么我们将输出重定向到/dev/null:

```
command > /dev/null
```

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。

如果希望屏蔽 stdout 和 stderr，可以这样写：

```
command > /dev/null 2>&1
```

#### Shell文件包含

---

和其他语言一样, Shell也可以包含外部脚本. 这样可以很方便的封装一些公用的代码作为一个独立的文件.

Shell文件包含的语法格式如下:

```
. filename #注意点号(.)和文件名中间有一空格
或
source filename
```

实例:

test1.sh代码如下:

```
url="www.baidu.com"
```

test2.sh代码如下:

```
. ./test1.sh

echo "output url: ${url}"
```



















































