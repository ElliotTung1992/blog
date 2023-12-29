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





