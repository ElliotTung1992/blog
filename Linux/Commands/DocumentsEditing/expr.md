expr命令是一个手工命令行计数器, 用于在UNIX/LINUX下求表达式变量的值, 一般用于整数值, 也可以用于字符串.

##### 语法

```
expr 表达式
```

表达式说明:

- 用空格隔开每个项
- 用反斜杠\放在shell特定的字符面前
- 对包含空格或其他特殊字符的字符串要用引号扩起来

##### 实例

计算字符串长度

```
expr length "hello world"
```

截取字符串

```
expr substr "abcdefghijklmn" 2 3 
```

抓取第一个字符数字串出现的位置

```
expr index "hello" o
```

整数运算

```
expr 14 % 9
expr 10 + 10
expr 30 / 3 / 2
expr 30 \* 3
```

