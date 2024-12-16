学会从官方文档学习Flink Connector:

```
https://nightlies.apache.org/flink/flink-docs-release-1.20/docs/connectors/table/kafka/
```

Kafka Connector:

```
CREATE TABLE t1(
  `event_time` TIMESTAMP(3) METADATA FROM 'timestamp',
  `partition` BIGINT METADATA VIRTUAL,
  `offset` BIGINT METADATA VIRTUAL,
  id int,
  ts bigint,
  vc int)
WITH (
  'connector' = 'kafka',
  'properties.bootstrap.servers' = '10.211.55.4:9092',
  'properties.group.id' = 'bruce',
  'scan.startup.mode' = 'earliest-offset',
  'sink.partitioner' = 'fixed',
  'topic' = 'source',
  'format' = 'json'
);

insert into t1(id, vc) select id, sum(vc) sumVC from source group by id;

CREATE TABLE source (
    id INT,
    ts BIGINT,
    vc INT
) WITH (
    'connector' = 'datagen',
    'rows-per-second'='1',
    'fields.id.kind'='random',
    'fields.id.min'='1',
    'fields.id.max'='10',
    'fields.ts.kind'='sequence',
    'fields.ts.start'='1',
    'fields.ts.end'='1000000',
    'fields.vc.kind'='random',
    'fields.vc.min'='1',
    'fields.vc.max'='100'
);

insert into t1(id,ts,vc) select * from source;

select * from t1;
```

Kafka Connector - upset-kafka:

```
CREATE TABLE t2(
    id int ,
    sumVC int ,
    primary key (id) NOT ENFORCED 
)
WITH (
  'connector' = 'upsert-kafka',
  'properties.bootstrap.servers' = '10.211.55.4:9092',
  'topic' = 'source2',
  'key.format' = 'json',
  'value.format' = 'json'
);

insert into t2 select id, sum(vc) sumVC from source group by id;
```

File:

```
CREATE TABLE t3( id int, ts bigint , vc int )
WITH (
  'connector' = 'filesystem',
  'path' = 'hdfs://10.211.55.4:8020/data/t3',
  'format' = 'csv'
);

insert into t3 select * from source;
insert into t3 values(1,1,1);

select * from t3 where id = '1';
```

JDBC(Mysql):

```
-- Mysql创建表:
CREATE TABLE `ws2` (
  `id` int(11) NOT NULL,
  `ts` bigint(20) DEFAULT NULL,
  `vc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 创建JDBC映射表:
CREATE TABLE t4
(
    id                     INT,
    ts                     BIGINT,
    vc                     INT,
PRIMARY KEY (id) NOT ENFORCED
) WITH (
    'connector'='jdbc',
    'url' = 'jdbc:mysql://10.211.55.2:3306/elliot?useUnicode=true&characterEncoding=utf8',
    'username' = 'root',
    'password' = 'dge_1992@163.com',
    'connection.max-retry-timeout' = '60s',
    'table-name' = 'ws2',
    'sink.buffer-flush.max-rows' = '500',
    'sink.buffer-flush.interval' = '5s',
    'sink.max-retries' = '3',
    'sink.parallelism' = '1'
);
```

