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
