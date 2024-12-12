
##### start job yarm-model:
./bin/flink run-application -d -t yarn-application -c com.github.elliot.flinkdemo.checkpoint.SavePointConfigDemo ./flink-demo-0.0.1-SNAPSHOT.jar
##### from save-point:
./bin/flink run-application -d -t yarn-application -s hdfs://10.211.55.4:8020/sp/savepoint-5529aa-bc7c96dd7515 -c com.github.elliot.flinkdemo.checkpoint.SavePointConfigDemo ./flink-demo-0.0.1-SNAPSHOT.jar
##### from checkout-point:
./bin/flink run-application -d -t yarn-application -s hdfs://10.211.55.4:8020/checkpoint/1bdd3475c741e04f2bee5bb05b02b578/chk-235 -Dstate.backend=rocksdb -c com.github.elliot.flinkdemo.checkpoint.SavePointConfigDemo ./flink-demo-0.0.1-SNAPSHOT.jar
##### set backend-state
./bin/flink run-application -d -t yarn-application -s hdfs://10.211.55.4:8020/sp/savepoint-5529aa-bc7c96dd7515 -Dstate.backend=rocksdb -c com.github.elliot.flinkdemo.checkpoint.SavePointConfigDemo ./flink-demo-0.0.1-SNAPSHOT.jar

##### gracefully shutdowm:
/bin/flink stop -p hdfs://10.211.55.4:8020/sp b02b317de77ce96ff5559a9575341bf9 -yid application_1732848508032_0001

##### immediately shutdown:
./bin/flink cancel -s hdfs://10.211.55.4:8020/sp 5529aa739ac5f26f12e9652b30bb92dc -yid application_1732848508032_0002

##### start flink yarn session 
./bin/yarn-session.sh -d
set sql-client.execution.result-mode=changelog/table/tableau; 











