

curl是常用的命令行工具, 用来请求Web服务器. 它的名字就是客户端(client)的URL工具的意思.

**参数说明:**

-d 参数用于发送POST请求的数据体

使用`-d`参数以后，HTTP 请求会自动加上标头`Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 POST 方法，因此可以省略`-X POST`

-G 参数用来构造URL的查询字符串

-H 参数添加HTTP请求头

-s 参数将不输出错误和进度信息

-X 参数指定HTTP请求方式

**实例:**

发送一个POST请求, 请求数据类型为JSON

```
curl -s -X POST -H "Content-Type: application/json" -d '{"orderId":"123"}' http://localhost:7002/settlement/insertSettlement

curl -s -H "Content-Type: application/json" -d '{"orderId":"123"}' http://localhost:7002/settlement/insertSettlement
```

发送一个GET请求

```
curl -G -d 'orderId=1' http://localhost:7002/settlement/queryByOrderId
```

