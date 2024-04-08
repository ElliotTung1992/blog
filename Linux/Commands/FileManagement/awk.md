awk是一种处理文本文件的语言, 是一个强大的文本分析工具.

之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符

**语法:**

```
awk [选项参数] 'script' var=value file(s)
或
awk [选项参数] -f scriptfile var=value file(s)
```

**实例:**

每行按空格或TAB分割, 输出文本的1、4列:

```
awk '{print $1,$4}' log.txt
```

查询某个java进程的PID:

```
pa -ef|grep 'jave'|grep 'eureka'|awk '{print $2}'
```

