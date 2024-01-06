#### 1. 相关知识点

##### 1.1 序列化及反序列化

序列化(Serialization): 在计算机科学的资料处理中, 是指将数据结构和物件状态转换成可取用格式(例如存成文件, 存于缓存, 或经由网络中发送), 以留待后续在相同或另一台计算机环境中, 能恢复原先状态的过程.

反序列化: 把字节序列恢复为对象的过程, 即把可以存储或传输的数据转换为对象的过程.

##### 1.2 什么时候需要用到序列化和反序列化

1. 在网络传输前, 对象需要先被序列化, 接收到序列化的对象之后需要再进行反序列化.
2. 将对象存储到文件中的时候进行序列化, 将对象从文件中读取出来需要进行反序列化.
3. 将对象存储到缓存数据库需要进行序列化, 将对象从缓存数据库读取出来需要反序列化.

##### 1.3 实现方式

##### 1.3.1 Java

**Java是如何实现序列化和反序列化**

Java提供自动序列化, 需要实现java.io.Serializable接口的实例来标明对象.

**实现Serializable接口为什么还要指定serialVersionUid的值?**

保证安全.

如果不显示指定serialVersionUID, JVM在序列化时会根据属性自动生成一个serialVersionUID, 然后与属性一起序列化, 再进行持久化或网络传输. 在反序列化时, JVM会再根据属性自动生成一个新版serialVersionUID, 然后将这个新版serialVersionUID与序列化时生成的旧版serialVersionUID进行比较, 如果相同则反序列化成功, 否则报错.

如果显示指定了serialVersionUID, JVM在序列化和反序列化时仍然都会生成一个serialVersionUID, 但值为我们显示指定的值, 这样在反序列化时新旧版本的serialVersionUID就一致了.

在实际开发中, 不显示指定serialVersionUID的情况会导致什么问题? 如果我们的类写完后不再修改, 那当然不会有问题, 但这在实际开发中是不可能的, 我们的类会不断迭代, 一旦类被修改了, 那旧对象反序列化就会报错. 所以在实际开发中, 我们都会显示指定一个serialVersionUID, 值是多少无所谓, 只要不变就行. 

**static属性不会被序列化**

因为序列化是针对对象而言的, 而static属性优先于对象存在, 随着类的加载而加载, 所以不会被序列化.看到这个结论, 是不是有人会问, serialVersionUID也被static修饰, 为什么serialVersionUID会被序列化? 其实serialVersionUID属性并没有被序列化, JVM在序列化对象时会自动生成一个serialVersionUID, 然后将我们显示指定的serialVersionUID属性值赋给自动生成的serialVersionUID.

##### 1.3.2 Kryo

##### 1.3.3 Protobuf

##### 1.3.4 ProtoStuff

##### 1.3.5 Hession

