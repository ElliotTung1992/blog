# Hadoop 
u:hadoop p:hadoop
# YARN Page
http://localhost:9870
http://localhost:8088
# command
stop-dfs.sh
stop-yarn.sh
start-dfs.sh
start-yarn.sh
./bin/yarn-session.sh -d
hdfs dfsadmin -safemode leave
# init hadoop configuration
hdfs namenode -format
jps

