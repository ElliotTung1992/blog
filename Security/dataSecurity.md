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

##### 1.3 数据编码解码

1.3.1 Base64实现编码解码

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



