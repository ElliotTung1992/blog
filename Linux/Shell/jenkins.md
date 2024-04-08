stop.sh

```
#!/bin/bash
echo "Stop Procedure : eureka-center.jar" 
pid=`ps -ef|grep java |grep eureka|awk '{print $2}'`
echo 'old Procedure pid:'$pid 
if [ -n "$pid" ]
then
kill -9 $pid
fi
```

start.sh

```
#!/bin/bash

export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-arm64
echo ${JAVA_HOME} 

echo 'Start the program : eureka-center' 

chmod 777 /home/parallels/.jenkins/workspace/sc1-eureka/eureka-center/target/eureka-center-0.0.1-SNAPSHOT.jar

echo '-------Starting-------' 

cd /home/parallels/.jenkins/workspace/sc1-eureka/eureka-center/target

nohup ${JAVA_HOME}/bin/java -jar eureka-center-0.0.1-SNAPSHOT.jar > "/home/parallels/app/logs/eureka-center/$(date +%Y.%m.%d).log" 2>&1 &

echo 'start success'
```

