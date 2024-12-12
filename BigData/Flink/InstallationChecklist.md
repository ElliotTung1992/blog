
##### Jenkins port:9000 elliot 123456
##### Nginx
##### Java
##### Flink port:8081
##### rocketmq console:9090
##### kafka 9092
##### arthas parallels



##### Redis
u:root
port:6379

##### RocketMQ
u:mquser p:mquser g:mquser
nohup mqnamesrv > /dev/null 2>&1 &
cat ~/logs/rocketmqlogs/namesrv.log 
nohup mqbroker -n localhost:9876 --enable-proxy > /dev/null 2>&1 &
cat ~/logs/rocketmqlogs/proxy.log 

nohup java -jar target/rocketmq-console-ng-1.0.0.jar --server.port=9090 &

