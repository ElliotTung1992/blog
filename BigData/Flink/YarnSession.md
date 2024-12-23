#### Yarn Session模式

---

查看地址:

```
 https://<node_address>:8088
```

启动Yarn Session集群:

```
--detached，Yarn Session集群启动后在后台独立运行，退出客户端，也可不指定，则客户端不推出 -d
--name，自定义在YARN上运行Application应用的名字 -nm
--slots,指定每个TaskManager上Slot的个数 -s

./bin/yarn-session.sh -d 
./bin/yarn-session.sh -s 3 -d 
./bin/yarn-session.sh -s 3 -nm lansonjy -d; 
```

向Yarn Session集群提交作业:

```
./bin/flink run -s <savepoint_path> -c com.lanson.flinkjava.code.chapter3.FlinkAppWithMultiJob /root/FlinkJavaCode-1.0-SNAPSHOT-jar-with-dependencies.jar 

./bin/flink run -t yarn-session -Dyarn.application.id=application_1671607810626_0001 -c com.lanson.flinkjava.code.chapter3.FlinkAppWithMultiJob /root/FlinkJavaCode-1.0-SNAPSHOT-jar-with-dependencies.jar
```

给当前的Flink程序创建Savepoint:

```
./bin/flink savepoint <JobId> hdfs://10.211.55.4:8020/flinkCDC/sp;
```

停止Yarn Session集群:

```
yarn application -kill application_1671607810626_0001
```



./bin/flink run -s hdfs://10.211.55.4:8020/flinkCDC/sp/savepoint-78a373-c0811ea845f1 -c com.example.flinkcdc.mysql.MysqlDemo /opt/model/flink-1.17.2/flink-cdc-demo.jar









