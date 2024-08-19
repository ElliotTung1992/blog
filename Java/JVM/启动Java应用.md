运行Java应用程序时指定内存大小:

```
java -Xms1024M -Xmx2048M -jar xxx.jar
```



应用程序在运行期间如果发生内存溢出则触发堆转存

>- `-XX:+HeapDumpOnOutOfMemoryError` 当内存溢出时生成堆转储
>- `-XX:HeapDumpPath` 设置堆转储文件的路径

```
java -Xms32M -Xmx64M -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=<HeapDumpPath> -jar xxx.jar
```



GC日志记录:

> - `-XX:+PrintGC` 输出GC日志
> - `-XX:+PrintGCDetails` 输出GC的详细日志
> - `-XX:+PrintGCTimeStamps` 输出GC的时间戳(基准时间格式) -  JDK17 `-XX:+GCLogDateStamps` 替换
> - `-XX:+PrintGCDatestamps` 输出GC的时间戳(日期格式) 
> - `-XX:+PrintHeapAtGC` 在进行GC的前后打印出堆的信息
> - `-Xloggc:../logs/gc/log` 日志文件的输出路径
> - `-XX:+UseGCLogFileRotation` 开启日志文件分割
> - `-XX:NumberOfGCLogFiles=14` 最多分割多少个日志文件
> - `-XX:GCLogFileSize=50M` 每个GC日志文件大小上限 

```
java -Xms32M -Xmx64M -XX:+HeapDumpOnOutOfMemoryError -XX:+PrintGC -XX:+PrintGCDetails -XX:+PrintGCDatestamps -XX:+PrintHeapAtGC -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=50M -Xloggc:/Users/ganendong/Documents/workspace/springboot-demo/fish/target/gc/gc.log -XX:HeapDumpPath=/Users/ganendong/Documents/workspace/springboot-demo/fish/target/dump -jar xxx.jar
```





