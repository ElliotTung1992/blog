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

##### 实现YARN运行模式 - 应用模式

启动应用模式:

```
bin/flink run-application -t yarn-application -c <ClassName> ./xx.jar
```

关闭应用模式:

1. 网页取消Job
2. 命令行关闭

```
bin/flink list -t yarn-application -Dyarn.application.id=<app_id>

bin/flin cancel -t yarn-application -Dyarn.application.id=<app_id>
```

上传HDFS提交:

```
# 上传flink的lib和plugins到HDFS上
hadoop fs -mkdir /flink-disk
hadoop fs -put lib/ /flink-disk
hadoop fs -put plugins/ /flink-disk

# 上传自己的jar包到HDFS
hadoop fs -mkdir /flink-jars
hadoop fs -put xxx.jar /flink-jars
```

提交作业：

```
bin/flink run-application -t yarn-application -Dyarn.provided.lib.dirs="hdfs://localhost:9000/flink-disk" -c <ClassName> hdfs://localhost:9000/flink-jars/xx.jar
```

##### 历史服务器

创建存储目录:

```
hadoop fs -mkdir -p /logs/history-flink-job
```

在flink-config.yaml中添加如下配置:

![image-20240528215203395](/Users/ganendong/Library/Application Support/typora-user-images/image-20240528215203395.png)

启动历史服务器:

```
bin/historyserver.sh start
```

停止历史服务器:

```
bin/historyserver.sh stop
```

##### Flink系统架构

![image-20240529213305474](/Users/ganendong/Library/Application Support/typora-user-images/image-20240529213305474.png)

##### Flink运行时框架 - 并行度

并行度设置:

1. 代码算子设置
1. 测试环境 - 设置本地WebUI启动
1. 全局设置 - env
1. 并行度未设置默认为本机的CPU核心数
1. 提交Job - 设置并行度
1. 提交Job - 命令行指定 -p <并行度>

并行度优先级比较:

算子 > 全局 > -p > 配置文件

##### Flink运行时框架 - 算子(Operator Chain)

1. 一对一(One to One, forwarding): 不需要重新分区, 不需要调整数据的顺序
2. 充分区(Redistributing)
3. 合并算子链: 并行度相同的一对一(one to one)算子操作, 可以直接链接在一起形成一个大的任务.

禁用算子合并:

1. 全局配置 - env
2. 算子单独设置 - 影响该算子是否与前后的算子是否合并
3. 开启新链条 - 只与前面的算子不合并

什么时候禁用算子合并:

1. 相邻之间的算子计算非常重
2. 定位具体问题

##### Flink运行时框架 - 任务槽

Flink中每一个TaskManager都是一个JVM进程, 它可以启动多个独立的线程, 来并行执行多个子任务(subtask).

那么一个TaskManager到底能并发处理多少个任务呢?

为了控制并发量, 我们需要在TaskManager上对每个任务运行所占用的资源做出明确的划分, 这就是所谓的任务槽.

##### 任务对任务槽的共享

均分隔离内存, 不隔离cpu.

同一个job中, 不同算子的子任务, 就可以放到同一个slot上执行.

只有属于同一个slot共享组的子任务, 才会开启slot共享;

不同组之间的任务是完全隔离的, 必须分配到不同的slot上. 

##### slot和并行度

假设一共有3个TaskManager, 每一个TaskManager中的slot数据设置为3个, 那么一共有9个task slot, 表示集群最多能并行处理9个同一算子的子任务.

slot是一种静态的概念, 表示最大的并发上限.

并行度是一种动态的概念, 表示实际运行占用了几个.

slot数量 >= job并发度, job才能运行.

##### Standalone会话模式 - 提交流程

##### Yarn应用模式提交流程







































