Linux egrep命令用于在文件内查找指定的字符串.

egrep执行效果与"grep-E"相似, 使用的语法及参数可参照grep指令, 与grep的不同点在于解读字符串的方法.

egrep是用extended regular expression语法来解读的, 而grep则用basic regular expression 语法解读, extended regular expression比basic regular expression的表达更规范.

**语法：**

```
egrep [范本模式] [文件或目录] 
```

**参数说明:**

- [范本模式] ：查找的字符串规则。
- [文件或目录] ：查找的目标文件或目录。

**实例:**

显示文件中符合条件的字符

```
egrep Linux *
```

