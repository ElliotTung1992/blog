

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

@SpringBootApplication注解 - 本质是一个组合注解



@SpringBootApplication注解包含下面三个注解

@SpringBootConfiguration注解 - 其实就是@Configuration, 标注当前类为配置类

@EnableAutoConfiguration注解 - 开启自动配置

@ComponentScan注解 - 扫描包



@EnableAutoConfiguration注解包含下面两个注解

@AutoConfigurationPackage注解 - 就是将主配置类所在的包下面所有的组件都扫描注册到Spring容器中

@AutoConfigurationImportSelector注解



##### Spring Boot常用的Conditional注解

在加载自动配置类的时候, Spring Boot并不是将spring.factories的配置全部加载进来, 而是通过Conditional等注解的判断进行动态加载

@Conditional是Spring的底层注解, 意思就是根据不同的条件进行判断, 如果满足指定的条件, 那么对应的配置才会生效.

常用的Conditional注解

1. @ConditionalOnClass: classpath存在该类时生效
2. @ConditionalOnMissingClass: classpath不存在该类时生效
3. @ConditionalOnBean: 容器中存在该类型的Bean时生效
4. @ConditionalOnMissingBean: 容器中不存在该类型的Bean时生效
5. @ConditionalOnSingleCandidate: 容器中该类型的bean只有一个或@Primary的只有一个时生效
6. @ConditionalOnExpression: SpEL表达式为true时
7. @ConditionalOnProperty: 参数设置或者值一致时生效
8. @ConditionalOnResource: 指定的文件存在时生效
9. @ConditionalOnJndi: 指定的JNDI存在时生效
10. @ConditionalOnJava: 指定Java版本存在时生效
11. @ConditionalOnWebApplication: Web应用环境下生效
12. @ConditionalOnNotWebApplication: 非Web应用环境下起效

##### Spring Boot相关的异常

错误信息: JSR-330 javax.inject.Inject

错误原因: 断点位置不合理













