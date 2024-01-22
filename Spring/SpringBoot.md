

##### Spring Boot和Spring的区别

Spring Boot是由Pivotal团队提供的全新框架, 其设计目的是用来简化新Spring应用的初始搭建以及开发过程. 该框架使用了特定的方式来进行配置, 从而使开发人员不不再需要样板化的配置. 通过这种方式, Spring Boot致力于在蓬勃发展的快速应用开发领域(Rapid application development)成为领导者.

convention-over-configuration: 约定大于配置

##### Spring Boot的特点(Features)

1. 可以创建独立的Spring应用程序, 并且基于其Maven或Gradle插件, 可以创建可执行的JARs和WARs;
2. 内嵌Tomcat或Jetty等Servlet容器; Embedded Tomcat,Jetty ot Undertow web application server.
3. 提供自动配置的"starter"项目对象模型(POMs)以简化Maven配置;Provide opinionated 'starter' Project Object Models(POMs) for the build tool.The only build tools supported are Maven and Gradle.
4. 尽可能使用Spring boot的自动配置；Automatic configuration of the Spring Application.
5. 提供准备好的特性, 如指标、健康检查和外部化配置; Provide production-ready functionality such as metrics, health checks and externalized configuration.
6. 无需代码或者xml配置: No code generation is required. No XML configuration is required.

##### Spring Boot自动配置原理

