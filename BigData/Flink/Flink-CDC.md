#### Flink-CDC

---

数据准备: 指定数据库表开启binlog:

```
# 配置文件参数设置
binlog-do-db=test1
binlog-do-db=test2

# 查看数据库binlog配置:
show master status;
```

Flink-CDC:

```
com.example.flinkcdc.mysql.MysqlDemo
```



