#### 常见的数据安全问题

#### 1 数据加密

---

##### 1.1 jasypt

jasypt实现yml文件中敏感信息的加密处理



#### 2 数据脱敏

---

##### 2.1 数据库数据脱敏

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



#### 3 数据编码解码

---

##### 3.1 Base64实现编码解码

Java实现Base64

```
    public static String encode(String blankText){
        return  Base64.getEncoder().encodeToString(blankText.getBytes(StandardCharsets.UTF_8));
    }
    public static String encode(byte[] blankByte){
        return Base64.getEncoder().encodeToString(blankByte);
    }
    public static String decode(String encodeText){
        byte[] byte1 = Base64.getDecoder().decode(encodeText);
        return new String(byte1,StandardCharsets.UTF_8);
    }
    public static String decode(byte[] encodeByte){
        return new String(encodeByte,StandardCharsets.UTF_8);
    }
```



#### 4 SQL注入

---

##### 4.1 SQL注入案例

select * from QRTZ_LOCKS where SCHED_NAME = 'clusteredScheduler' and LOCK_NAME = 'STATE_ACCESS';

select * from QRTZ_LOCKS where SCHED_NAME = 'clusteredScheduler' or 1=1 --'  and LOCK_NAME=123456';

##### 4.2 什么是SQL注入

SQL注入(英文: SQL injection), 也称SQL注入或SQL注码, 是发生于应用程序和数据库层的安全漏洞. 简而言之, 是在输入的字符串之中注入了sql指令, 在设计不良的程序当中忽视了字符串检查, 那么这些注入进去的恶意指令就会被数据库服务器误认为是正常的SQL指令而执行, 因此遭到破坏或是入侵.

##### 4.2 防止SQL注入的方法

1. 使用RreparedStatement
2. 使用正则表达式或字符串过滤器对入参进行校验
3. 如果使用Mybatis框架不是特殊情况使用#{}而不是${}























