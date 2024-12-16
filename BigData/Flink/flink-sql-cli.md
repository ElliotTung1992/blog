
##### start sql-client: 
./bin/sql-client.sh embedded -s yarn-session
./bin/sql-client.sh embedded -s yarn-session -i conf/sql-client-init.sql
create database mydatabase;
create database [if not exists] mydatabase;
show datebases;
show current database;
drop database <database-name>;
use <database-name>;
quit;

##### table:
show tables;
desc <table-name>;
create table test(id int, ts bigint, vc int) with ('connector' = 'print');
create table test1(`value` string) like test;
create table test2 as select id, ts from test;
alter table test1 rename to test2;
drop table [if exists] <table-name>;
insert into sink select * from source;

**Jobs:**

show jobs;

stop job <jobId> with savepoint;



简单测试建表语句:
```
CREATE TABLE source1 (
dim STRING,
user_id BIGINT,
price BIGINT,
row_time AS cast(CURRENT_TIMESTAMP as timestamp(3)),
WATERMARK FOR row_time AS row_time - INTERVAL '5' SECOND
) WITH (
'connector' = 'datagen',
'rows-per-second' = '2',
'fields.dim.length' = '1',
'fields.user_id.min' = '1',
'fields.user_id.max' = '100000',
'fields.price.min' = '1',
'fields.price.max' = '100000'
);

CREATE TABLE sink1 (
dim STRING,
pv BIGINT,
sum_price BIGINT,
max_price BIGINT,
min_price BIGINT,
uv BIGINT,
window_start bigint
) WITH (
'connector' = 'print'
);
```

with语句：

```
WITH source_with_total AS (
    SELECT id, vc+10 AS total
    FROM source
)
SELECT id, SUM(total)
FROM source_with_total
GROUP BY id;
```

select & where:

```
select id, vc+10 from source;
SELECT id, price FROM (VALUES (1, 2.0), (2, 3.1)) AS t (id, price);
select * from source where id > 10;
select * from source where id % 2 = 0;
select distinct vc from source;
select count(*) from source;
select vc, count(*) from source group by vc;
```

group聚合案例:

```
CREATE TABLE source1 (
dim STRING,
user_id BIGINT,
price BIGINT,
row_time AS cast(CURRENT_TIMESTAMP as timestamp(3)),
WATERMARK FOR row_time AS row_time - INTERVAL '5' SECOND
) WITH (
'connector' = 'datagen',
'rows-per-second' = '10',
'fields.dim.length' = '1',
'fields.user_id.min' = '1',
'fields.user_id.max' = '100000',
'fields.price.min' = '1',
'fields.price.max' = '100000'
);

CREATE TABLE sink1 (
dim STRING,
pv BIGINT,
sum_price BIGINT,
max_price BIGINT,
min_price BIGINT,
uv BIGINT,
window_start bigint
) WITH (
'connector' = 'print'
);

insert into sink1
select dim,
count(*) as pv,
sum(price) as sum_price,
max(price) as max_price,
min(price) as min_price,
-- 计算 uv 数
count(distinct user_id) as uv,
cast((UNIX_TIMESTAMP(CAST(row_time AS STRING))) / 60 as bigint) as window_start
from source1
group by
dim,
-- UNIX_TIMESTAMP得到秒的时间戳，将秒级别时间戳 / 60 转化为 1min， 
cast((UNIX_TIMESTAMP(CAST(row_time AS STRING))) / 60 as bigint)
```

多维分析:

```
SELECT
  supplier_id,
  rating,
  product_id,
  COUNT(*)
FROM (
VALUES
  ('supplier1', 'product1', 4),
  ('supplier1', 'product2', 3),
  ('supplier2', 'product3', 3),
  ('supplier2', 'product4', 4)
)
-- 供应商id、产品id、评级
AS Products(supplier_id, product_id, rating)  
GROUP BY GROUPING SETS(
  (supplier_id, product_id, rating),
  (supplier_id, product_id),
  (supplier_id, rating),
  (supplier_id),
  (product_id, rating),
  (product_id),
  (rating),
  ()
);
```

分组窗口聚合 - 过时:

```
分组窗口聚合测试表:
CREATE TABLE ws (
  id INT,
  vc INT,
  pt AS PROCTIME(), --处理时间
  et AS cast(CURRENT_TIMESTAMP as timestamp(3)), --事件时间
  WATERMARK FOR et AS et - INTERVAL '5' SECOND   --watermark
) WITH (
  'connector' = 'datagen',
  'rows-per-second' = '10',
  'fields.id.min' = '1',
  'fields.id.max' = '3',
  'fields.vc.min' = '1',
  'fields.vc.max' = '100'
);

滚动窗口示例:
select  
id,
TUMBLE_START(et, INTERVAL '5' SECOND)  wstart,
TUMBLE_END(et, INTERVAL '5' SECOND)  wend,
sum(vc) sumVc
from ws
group by id, TUMBLE(et, INTERVAL '5' SECOND);

滑动窗口示例:
select  
id,
HOP_START(et, INTERVAL '3' SECOND,INTERVAL '5' SECOND) wstart,
HOP_END(et, INTERVAL '3' SECOND,INTERVAL '5' SECOND) wend,
sum(vc) sumVc
from ws
group by id, HOP(et, INTERVAL '3' SECOND,INTERVAL '5' SECOND);

会话窗口示例:
select  
id,
SESSION_START(et, INTERVAL '5' SECOND)  wstart,
SESSION_END(et, INTERVAL '5' SECOND)  wend,
sum(vc) sumVc
from ws
group by id, SESSION(et, INTERVAL '5' SECOND);
```

窗口表值函数(TVF)聚合:

```
滑动窗口:
SELECT
window_start,
window_end,
id, 
SUM(vc)sumVC
FROM TABLE(
  TUMBLE(TABLE ws, DESCRIPTOR(et), INTERVAL '5' SECONDS))
GROUP BY window_start, window_end, id;

滑动窗口:
窗口长度必须是滑动布长的整数倍
SELECT window_start, window_end, id , SUM(vc) sumVC
FROM TABLE(
  HOP(TABLE ws, DESCRIPTOR(et), INTERVAL '2' SECONDS , INTERVAL '6' SECONDS))
GROUP BY window_start, window_end, id;

累积窗口:
SELECT
window_start,
window_end,
id ,
SUM(vc) sumVC
FROM TABLE(
  CUMULATE(TABLE ws, DESCRIPTOR(et), INTERVAL '2' SECONDS , INTERVAL '6' SECONDS))
GROUP BY window_start, window_end, id;

多维分析:
SELECT
window_start,
window_end,
id,
SUM(vc) sumVC
FROM TABLE(
  TUMBLE(TABLE ws, DESCRIPTOR(et), INTERVAL '5' SECONDS))
GROUP BY window_start, window_end,
rollup( (id) )
--  cube( (id) )
--  grouping sets( (id),()  )
;
```

Over聚合:

```
按照时间区间聚合:
SELECT
    id,
    et,
    vc,
    count(vc) OVER (
        PARTITION BY id
        ORDER BY et
        RANGE BETWEEN INTERVAL '10' SECOND PRECEDING AND CURRENT ROW
  ) AS cnt
FROM ws;

重复定义窗口:
SELECT
    id,
    et,
    vc,
    count(vc) OVER w AS cnt,
    sum(vc) OVER w AS sumVC
FROM ws
WINDOW w AS (
    PARTITION BY id
    ORDER BY et
    RANGE BETWEEN INTERVAL '10' SECOND PRECEDING AND CURRENT ROW
);

按照行数聚合:
SELECT
    id,
    et,
    vc,
    avg(vc) OVER (
     PARTITION BY id
     ORDER BY et
     ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
) AS avgVC
FROM ws;

SELECT
    id,
    et,
    vc,
avg(vc) OVER w AS avgVC,
count(vc) OVER w AS cnt
FROM ws
WINDOW w AS (
    PARTITION BY id
    ORDER BY et
    ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
);
```

TOP-N

```
select
    id,
    et,
    vc,
    rownum
from
(
    select
        id,
        et,
        vc,
        row_number() over(
            partition by id
            order by vc desc
        ) as rownum
    from ws
)
where rownum<=3;
```

deduplicate

```
select
    id,
    et,
    vc,
    rownum
from
(
    select
        id,
        et,
        vc,
        row_number() over(
            partition by id,vc
            order by et 
        ) as rownum
    from ws
)
where rownum=1;
```

常规联结(regular join)查询:

1. Inner join: 两条流都join到才输出
2. left join: 左流到达无论有没有join到右流的数据都会输出, 如果右流后到则会发起回撤流再输出
3. right join: 同上相反
4. full join: 无论哪条流先到都先输出, 联结的流后到则先发起回撤流再输出

```
CREATE TABLE ws1 (
  id INT,
  vc INT,
  pt AS PROCTIME(), --处理时间
  et AS cast(CURRENT_TIMESTAMP as timestamp(3)), --事件时间
  WATERMARK FOR et AS et - INTERVAL '0.001' SECOND   --watermark
) WITH (
  'connector' = 'datagen',
  'rows-per-second' = '1',
  'fields.id.min' = '3',
  'fields.id.max' = '5',
  'fields.vc.min' = '1',
  'fields.vc.max' = '100'
);

-- 等值内联结
SELECT ws.id, ws.vc, ws1.id, ws1.vc
FROM ws
INNER JOIN ws1
ON ws.id = ws1.id;

-- 等值外联结
SELECT ws.id, ws.vc, ws1.id, ws1.vc
FROM ws
LEFT JOIN ws1
ON ws.id = ws1.id;

SELECT ws.id, ws.vc, ws1.id, ws1.vc
FROM ws
RIGHT JOIN ws1
ON ws.id = ws1.id;

SELECT ws.id, ws.vc, ws1.id, ws1.vc
FROM ws
FULL OUTER JOIN ws1
ON ws.id = ws1.id;
```

间隔联结查询:

```
SELECT ws.id, ws.et, ws1.id, ws1.et
FROM ws,ws1
WHERE ws.id = ws1. id
AND ws.et BETWEEN ws1.et - INTERVAL '2' SECOND AND ws1.et + INTERVAL '2' SECOND;
```

Order by和Limit:

```
SELECT * FROM ws ORDER BY et, id desc;
SELECT * FROM ws LIMIT 3;
```

SqlHints:

```
select * from ws1/*+ OPTIONS('rows-per-second'='10')*/;
```

集合操作:

``` 
union: 合并结果集且去重
union all: 合并结果集且不去重
select id from ws union select id from ws1;
select id from ws union all select id from ws1;

intersect: 交叉且去重
intersect all: 交叉且不去重
select id from ws intersect select id from ws1;
select id from ws intersect all select id from ws1;

except: 差集且去重
except all: 差集且不去重
select id from ws except select id from ws1;
select id from ws except all select id from ws1;
```

in子查询:

```
select * from ws where id in (select id from ws1);
```

系统内置函数:

```
todo: 官方文档查找使用系统内置函数
```

Module操作:

```
常规语法:
查看:
show modules;
show full modules;
更改模块顺序:
use modules hive,core;

load module hive with('hive-version'='2.3.9');
unload module hive;
```

**使用savepoint:**

```
建表语句:
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

CREATE TABLE sink (
    id INT,
    ts BIGINT,
    vc INT
) WITH (
'connector' = 'print'
);


提交作业:
insert into sink select * from source;

查看job列表:
show jobs;

停止作业触发savepoint:
SET state.checkpoints.dir='hdfs://10.211.55.4:8020/chk';
SET state.savepoints.dir='hdfs://10.211.55.4:8020/sp';
STOP JOB '228d70913eab60dda85c5e7f78b5782c' WITH SAVEPOINT;

从savepoint恢复:
SET execution.savepoint.path='hdfs://10.211.55.4:8020/sp/savepoint-dd0ed6-7074f0c090f0';
set 'execution.savepoint.ignore-unclaimed-state' = 'true';

恢复后重置路径:
RESET execution.savepoint.path;

```































