stop.sh

```
#!/bin/bash 
echo "Stop Procedure : Commudity-0.0.1-SNAPSHOT.jar" 
pid=`ps -ef |grep java|grep Commudity-0.0.1-SNAPSHOT.jar|awk '{print $2}'` 
echo 'old Procedure pid:'$pid 
if [ -n "$pid" ] 
then 
kill -9 $pid
fi
```

start.sh

```
#!/bin/bash
export JAVA_HOME=/usr/java/jdk1.8.0_131
export LOG_DIR="/var/log/my_service"
export LOG_FILE="my_service_$(date +%Y-%m-%d).log"
echo ${JAVA_HOME}
echo 'Start the program : Commudity-0.0.1-SNAPSHOT.jar'
chmod 777 /home/project/demo/Commudity-0.0.1-SNAPSHOT.jar
echo '-------Starting-------'
cd /home/project/demo/
nohup ${JAVA_HOME}/bin/java -jar demo2-0.0.1-SNAPSHOT.jar > "$LOG_DIR/$LOG_FILE" 2>&1 &
echo 'start success'
```

