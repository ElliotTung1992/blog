#### 1. 走进Maven

1.1.1 Maven的作用:

1. 对Java项目进行构建
2. 对Java项目进行依赖管理

1.1.2 Maven项目标准目录结构, 遵循约定大于配置原则

| 目录                               | 目的                                |
| ---------------------------------- | ----------------------------------- |
| ${basedir}                         | 存放pom.xml和所有的子目录           |
| ${basedir}/src/main/java           | 项目的Java源代码                    |
| ${basedir}/src/main/resources      | 项目的资源                          |
| ${basedir}/src/test/java           | 项目的测试类                        |
| ${basedir}/src/test/resources      | 测试用的资源                        |
| ${basedir}/src/main/webapp/WEB-INF | web应用文件目录                     |
| ${basedir}/target                  | 打包输出目录                        |
| ${basedir}/target/classes          | 编译输出目录                        |
| ${basedir}/target/test-classes     | 测试编译输出目录                    |
| Test.java                          | Maven只会运行符合该命名规则的测试类 |
| ～/.m2/repository                  | Maven默认的本地仓库目录地址         |

1.1.3 Maven的特点

1. 项目设置遵循统一的规则
2. 任意工程共享
3. 依赖管理 - 依赖自动更新

1.1.4 Maven的Snapshot版本和Release版本

1. Snapshot版本代表不稳定、尚在开发的版本(可以部署多次)
2. Release版本代表稳定的版本(只能部署一次)

1.1.5 Maven版本的作用

场景: 如果项目A引入B依赖, 由于B正在开发, 应该用Snapshop版本来标识自己.这种做法是有必要的.

1. 如果B不使用Snapshop版本, 每次更新都使用正式版本,可能一天会升很多版本, 这就会造成版本的滥用.
2. 不用Realease版本到处都使用Snapshop版本会如何? 可能会发生以下情况, 今天你引入的依赖还能正常运行, 可能明天就可能构建失败, 这样正确性就很难保证了.



#### 2. 项目对象模型POM(Project Object Model)

POM中可以指定以下配置:

1. 项目依赖
2. 插件
3. 执行目标
4. 项目构建profile
5. 项目版本
6. 项目开发者列表
7. 相关邮件列表信息

POM文件必要的标签:

| 节点         | 描述         |
| ------------ | ------------ |
| project      | 项目根节点   |
| modelVersion | 模型版本     |
| groupId      | 工程组的标识 |
| artifactId   | 工程的名称   |
| version      | 工程的版本号 |

groupId和artifactId一起定义了artifact在仓库中的位置.



#### 3. Maven构建生命周期

一个典型的Maven构建生命周期由以下几个阶段组成

| 阶段           | 处理     | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| 验证: validate | 验证项目 | 验证项目是否正确且所有必须信息是可用的                       |
| 编译: compile  | 执行编译 | 源代码编译在此阶段完成                                       |
| 测试: Test     | 测试     | 使用适当的单元测试框架(如: JUnit)运行测试                    |
| 包装: package  | 打包     | 将编译后的代码打包成可分发的格式: 例如Jar或者War             |
| 检查: verify   | 检查     | 对集成测试结果进行检测, 以保证质量达标                       |
| 安装: install  | 安装     | 安装打包的项目到本地仓库，以供其他项目使用                   |
| 部署: deploy   | 部署     | 拷贝最终的工程包到远程仓库中, 以共享给其他开发人员或工程使用 |

Maven有以下三个标准的生命周期:

(1): Clean生命周期

- clean: 删除目标目录中的编译输出文件. 这通常是在编译之前执行的, 以确保项目从一个干净的状态开始.

(2): Defaulf生命周期(也称为Build生命周期)

- validate: 验证项目的正确性
- compile: 编译项目的源代码
- test: 运行项目的单元测试
- package: 把编译后的代码打包成可分发的格式
- verify: 对项目进行额外的检查以确保质量
- install: 将项目的构建结构安装到本地Maven仓库中, 以供本地其它项目使用
- deploy: 将项目的构建结果部署到远程仓库, 以供其他开发人员使用

(3): Site生命周期

- site: 生成项目文档和站点信息
- deploy-site: 将生成的站点信息发布到远程服务器, 以便共享项目文档



在一个生命周期中, 运行某个阶段的时候, 它之前所有阶段都会被运行.

如执行mvn clean将运行以下两个生命周期阶段: pre-clean, clean

如执行mvn post-clean将运行以下三个生命周期阶段: pre-clean, clean, post-clean

##### Clean生命周期

1. pre-clean: 执行一些需要在clean之前完成的工作
2. clean: 移除所有上一次构建生成的文件
3. post-clean: 执行一些需要在clean之后立刻完成的工作 

##### Default(Build)生命周期

##### Site生命周期

Maven Site插件一般用来创建新的报告文档, 部署站点等.

1. pre-site: 执行一些需要在生成站点文档之前完成的工作
2. site: 生成项目的站点文档
3. post-site: 执行一些需要在站点文档之后完成的工作, 并且为部署做准备
4. Site-deploy: 将生成的站点文档部署到特定的服务器上



#### 4. Maven仓库

Maven仓库有三种类型:

1. 本地(Local)
2. 中央(Central)
3. 远程(Remote)

##### 本地仓库

运行Maven的时候, Maven所需要的任何构建都是直接从本地仓库获取.

如果本地仓库没有, 它会首先尝试从远程仓库下载构建至本地仓库, 然后再使用本地仓库的构建.

在setting.xml文件配置本地仓库标签

<localRepository>/path/to/local/repo</localRepository>

运行Maven命令, Maven将下载构建到指定的目录下.

##### 中央仓库

Maven中央仓库是由Maven社区提供的仓库, 其中包含了大量常用的库.

1. 这个仓库由Maven社区管理

2. 不需要配置

3. 需要通过网络才能访问

##### 远程仓库

如果Maven在中央仓库也找不到的依赖, 它会通知构建过程并输出错误信息到控制台.

##### Maven搜索依赖顺序

当我们执行Maven构建命令时, Maven开始按照以下顺序查找依赖的库:

步骤1: 在本地仓库中搜索, 如果找不到, 执行步骤2.

步骤2: 在中央仓库搜索, 如果找不到, 并且由一个或多个远程仓库已经设置, 则执行步骤4, 如果找到了则下载到本地仓库中以备将来使用.

步骤3: 如果远程仓库没有被设置, Maven将简单的停滞并抛出错误.

步骤4: 在一个或多个远程仓库中搜索依赖文件, 如果找到则下载到本地仓库以备将来引用, 否则Maven将停止处理并抛出错误.

##### Maven设置阿里云镜像

Maven仓库默认在海外, 国内使用很慢, 更换为阿里云的仓库

```
<mirrors>
	<mirror>
		<id>mirror</id>
		<mirrorOf>!rdc-releases,!rdc-snapshots</mirrorOf>
		<name>mirror</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
	</mirror>
<mirrors>
```

使用其它代理服务器

```
<repository>
  <id>spring</id>
  <url>https://maven.aliyun.com/repository/spring</url>
  <releases>
    <enabled>true</enabled>
  </releases>
  <snapshots>
    <enabled>true</enabled>
  </snapshots>
</repository>
```



#### Maven插件

Maven有以下三个标准的生命周期:

1. Clean: 项目清理的处理
2. default(或build): 项目部署的处理
3. Site: 项目站点文档创建的处理

每个生命周期都包含着一系列的阶段(phase).这些phase就相当于maven提供的统一的接口, 然后这些phase的实现由Maven插件来实现.

比如我输入命令: mvn clean; clean对应的就是Clean生命周期的clean阶段, 但是clean的具体操作是由maven-clean-plugin来实现的.

所以说Maven生命周期的每一个阶段的具体实现都是由Maven插件实现的.

Maven插件通常被用来:

1. 创建jar文件
2. 创建war文件
3. 编译代码文件
4. 代码单元测试
5. 创建工程文档
6. 创建工程报告

插件通常提供了一个目标的集合, 并且可以使用下面的语法执行:

```
mvn [plugin-name]:[goal-name]
```

例如: 一个Java工程可以使用maven-compiler-plugin的compile-goal编译, 使用以下命令:

```
mvn compiler:compile
```

##### 插件类型

| 类型              | 描述                                           |
| ----------------- | ---------------------------------------------- |
| Build plugins     | 在构建时执行, 并在pom.xml的元素中配置.         |
| Reporting plugins | 在网站生成过程中执行, 并在pom.xml的元素中配置. |

常用的插件:

Clean: 构建之后清理目标文件, 删除目标目录.

Compiler: 编译java源文件.

Surefile: 运行Junit单元测试, 创建测试报告.

Jar: 从当前工程中构建JAR文件.

War: 从当前文件中构建WAR文件.

Javadoc: 为工程生成Javadoc.

antrun: 从构建过程的任意一个阶段中运行一个ant任务的集合.



