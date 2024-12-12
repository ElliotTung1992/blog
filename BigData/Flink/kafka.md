# kafka info
port: 9092
u:mquser p:mquser g:mquser
# zookeeper
zookeeper-server-start.sh /opt/model/kafka_2.12-3.6.2/config/zookeeper.properties &
# kafka cammand
kafka-server-start.sh /opt/model/kafka_2.12-3.6.2/config/server.properties &

kafka-console-producer.sh --broker-list localhost:9092 --topic test
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic ws
