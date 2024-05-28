#### Flink

---

##### Flink的特点

1. 批流统一
2. 性能卓越
3. 规模计算
4. 生态兼容
5. 高容错

- 高吞吐和低延迟: 每秒处理数百万个事件, 毫秒级延迟
- 结果的准确性: Flink提供了事件时间(event-time)和处理时间(processing-time)语义.对于乱序事件流, 事件时间语义仍然能提供一致且准确的结果
- 精确一次: 状态一致性保证
- 可以连接到最常用的存储系统: 如Kafka、Hive、JDBC、HDFS
- 高可用: 本身高可用设置, 加上K8s, YARN和Mesos的紧密集成, 再加上从故障中快速恢复和动态扩展任务的能力.

##### 什么是Flink

Flink核心目标是: “数据流上的有状态计算”(Stateful Computations over Data Streams).

Apache Flink是一个框架和分布式处理引擎, 用于对无界和有界数据流进行有状态计算.

##### 无界数据流

1. 有定义流的开始, 但没有定义流的结束
2. 他们会无休止的生产数据
3. 无界流的数据必须持续处理, 即数据被摄取后需要立刻处理

##### 有界数据流

1. 有定义流的开始, 也有定义流的结束
2. 有界流可以在摄取所有数据后再进行计算
3. 有界流所有数据可以被排序, 所以并不需要有序摄取
4. 有界流处理通常被称为批处理

##### 有状态流处理

把流处理需要的额外数据保存成一个状态, 然后针对这条数据进行处理, 并且更新状态. 这就是所谓的“有状态的流处理”

状态在内存中:

优点: 速度快

缺点: 可靠性差

状态在分布式系统中:

优点: 速度慢

缺点: 可靠性差

##### Flink的应用场景

1. 电商和市场营销 - 实时数据报表、广告投放、实时推送
2. 物联网 - 传感器实时数据采集和显示、实时报警
3. 物流配送和服务业 - 订单状态实时更新、通知信息推送
4. 银行和金融业 - 实时结算和通知推送、实时检测异常行为

##### Flink分层API

最高层语言 - SQL

声明式领域专用语言 - Table API

核心APIs - DataStream/DataSet API

底层APIs(处理函数) - 有状态流处理

##### 集群角色

Flink提交作业和执行任务, 需要几个关键组件:

1. 客户端(Flink Client): 代码由客户端获取并做转换, 之后提交给JpbManger.
2. JobManager就是Flink集群里的"管事人", 对作业进行中央调度管理: 尔它获取到要执行的作业后, 会进一步处理转换, 然后分发任务给众多的TaskManager.
3. TaskManager, 就是真正"干活的人", 数据的处理操作都是它们来做的.

##### Flink集群搭建/启动

IDEA启动报错JDK9以后不兼容:

```
# IDEA启动设置VM参数
--illegal-access=deny --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.base/java.lang.invoke=ALL-UNNAMED --add-opens java.base/java.math=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED --add-opens java.base/java.util.concurrent=ALL-UNNAMED --add-opens java.base/java.net=ALL-UNNAMED --add-opens java.base/java.text=ALL-UNNAMED
```

修改配置文件：

```
taskmanager相关配置
jobmanager相关配置
rest相关配置
```

解决Flink不兼容JDK9之后的解决方案:

```
在Flink的配置文件添加如下配置
env.java.opts: --add-exports java.base/sun.net.util=ALL-UNNAMED
```

Flink启动命令

```
./bin/下的命令
```

##### 提交job的两种方式：

1. WebUI提交job
2. 命令行提交job

./bin/flink run -m localhost:8081 -c <ClassName> ./xx.jar

#### Flink的部署模式

---

Flink为各种场景提供了不同的部署模式:

它们主要的区别在于: 集群的生命周期以及资源的分配方式; 以及应用的main方法到底在哪里执行 - 客户端(Client)还是JobManager

1. 会话模式(Session mode)
2. 单作业模式(Per-Job Mode)
3. 应用模式(Application Mode)

##### Standalone运行模式

1. 会话模式部署
2. 应用模式部署

启动:

- 进入到Flink的安装路径下, 将应用程序的jar包放到lib/目录下

- 执行以下命令, 启动JobManager: ./standalone.sh start --job--classname <Class>
- 启动TaskManager: ./taskmanager.sh start

停止:

- 停止TaskManager: ./taskmanager.sh stop
- 停止JobManager: ./taskmanager.sh stop

##### YARN运行模式

前提: 安装Hadoop

##### 实现YARN运行模式 - 会话模式

动态分配资源

1. webUI提交任务
2. 命令行提交任务

```
./bin/flink run -c <ClassName> ./xx.jar
```

关闭会话模式

1. echo "stop" | ./bin/yarn-session.sh -id application_1716558971020_0007
2. web页面关闭

##### 实现YARN运行模式 - 单作业模式

启动单作业模式:

```
./bin/flink run -t yarn-per-job -c <ClassName> ./xx.jar
```

关闭单作业模式：

1. Web Cancel Job
2. 命令行关闭

```
bin/flink list -t yarn-per-job -Dyarn.application.id=<app_id>
bin/flink cancel -t yarn-per-job -Dyarn.application.id=<app_id>
```





















































