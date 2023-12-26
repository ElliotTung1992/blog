#### 1. 常见的数据安全问题

##### 1.1 数据加密

1.1.1 jasypt

jasypt实现yml文件中敏感信息的加密处理

##### 1.2 数据脱敏

1.2.1 数据库数据脱敏

mysql实现方案:

```
使用concat(str1, str2,...), left(str, len), right(str, len)函数:
select concat(left('field', len), '***', right('field', len)) from 'table';

使用insert(str, pos, len, newstr)函数:
select insert('field', pos, len, newstr) from 'table';
```

oracle实现方案:

```
使用replace('field', 'str1', 'str2')函数和subStr(str, pos, len)函数
select replace('field', substr('field', pos, len), '***') from 'table';
```

