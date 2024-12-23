#### Flink常见的部署模式

---

常见部署模式分类:

1. Standalone模式

   > 独立部署, 不依赖外部的资源管理平台

2. Yarn模式

   > 

按集群的生命周期分类:

1. 会话模式
2. 单作业模式
3. 应用模式

常见部署模式组合:

1. Standalone模式 + 会话模式
2. Standalone模式 + 应用模式
3. Yarn模式 + 会话模式
4. Yarn模式 + 单作业模式
5. Yarn模式 + 应用模式



#### Standalone模式:

---

##### 单节点安装:

```
# 启动
./bin/start-cluster.sh
# 查看进程
jps
# 访问页面
http://<address>:8081
# 关闭
./bin/stop-cluster.sh
```

##### 集群安装:

```
略
```

##### 会话模式提交: 

1. 页面提交

```
略
```

2. 命令行提交

```
cd flink;
# 提交作业
./bin/flink run -m [jobManager主机和端口] -c [主程序类全类名] -p [并行度] [jar包的绝对路径] [其它参数]
# 查看作业
./bin/flink list [-a]
# 取消job
./bin/flink cancel [jobId]
```

##### 应用模式提交:

1. 不能使用`start-cluster.sh`命令启动集群

2. 将编译好的jar包, 并将jar包上传到flink安装目录下的lib目录

3. 启动JobManager

   ```
   ./bin/standalone-job.sh start --job-classname [主程序类全类名]
   ```

4. 启动TaskManager

   ```
   ./bin/taskmanager.sh start
   ```

5. 访问: `http://localhost:8081`查看flink监控页面的作业提交

6. 关闭

   ```
   cd flink
   ./bin/standalone-job.sh stop
   ./bin/taskmanager.sh stop
   ```

   

#### Yarn模式:

---

##### 前提提交:

1. 启动Hadoop集群

2. 向Yarn集群申请资源, 开启一个Yarn会话, 启动flink集群

   ```
   ./bin/yarn-session.sh -nm test
   ```

##### 会话模式作业提交

1. Web UI提交作业:

2. 命令行作业提交:

   ```
   ./bin/flink run -c [主程序类全类名] [jar包的绝对路径]
   ```

##### 单作业模式作业提交

提交作业:

```
./bin/flink run -d -t yarn-per-job -c [主程序类全类名] [jar包的绝对路径]
./bin/flink run -m yarn-cluster [主程序类全类名] [jar包的绝对路径]
```

取消作业:

```
./bin/flink list -t yarn-per-job -Dyarn.application.id=application_id
./bin/flink cancel -t yarn-per-job -Dyarn.application.id=application_id <job_id>
```

##### 应用模式作业提交

提交作业:

```
# 上传jar包到集群
./bin/flink run-application -t yarn-application -c [主程序类全类名] [jar包的绝对路径]

# 上传jar包到hdfs
bin/flink run-application -t yarn-application -Dyarn.provided.lib.dirs="hdfs://myhdfs/my-remote-flink-dist-dir"
[jar包的绝对路径]
```

取消作业: 

```
bin/flink list -t yarn-application -Dyarn.application.id=application_id
bin/flink cancel -t yarn-application -Dyarn.application.id=application_id <jobId>
```















































