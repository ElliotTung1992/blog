Linux declare命令用于声明shell变量.

declare为shell指令, 在第一种语法中可用来声明变量并设置变量的属性([rix]即为变量的属性), 在第二种语法中可用来显示shell函数. 若不加上任何参数, 则会显示全部的shell变量与函数.

##### 语法

```
declare [+/-][rxi][变量名称＝设置值] 或 declare -f
```

##### 参数说明

- +/- 　"-"可用来指定变量的属性，"+"则是取消变量所设的属性。
- -f 　仅显示函数。
- r 　将变量设置为只读。
- x 　指定的变量会成为环境变量，可供shell以外的程序来使用。
- i 　[设置值]可以是数值，字符串或运算式。

##### 实例

声明整数型变量

```
declare -i ab
ab=56
echo ${ab}
```

改变变量属性

```
declare -i ef
ef=1
echo ${ef}
ef="wer"
echo ${ef}
declare +i ef
ef="wer"
echo ${ef}
```

设置变量只读

```
ab=56
declare -r ab
ab=88
echo ${ab}
```

声明数组变量

```
declare -a site=(["google"]="www.google.com" ["baidu"]="www.baidu.com")
echo ${site["google"]}
```







