#### Spring AOP

在软件业, AOP为Aspect Oriented Programming的缩写, 意为: 面向切面编程, 通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术. AOP是OOP的延续, 是软件开发中的一个热点, 也是Spring框架中的一个重要内容, 是函数式编程的一种衍生范式. 利用AOP可以对业务逻辑的各个部分进行隔离, 从而使得业务逻辑各部分之间的耦合度降低, 提高程序的可重用性, 同时提高了开发的效率.



##### AOP的概念

1. 横切关注点(Crosscutting Concern): 指的是一些具有横越多个模块的行为.
2. 连接点(Jointpoint): 横切关注点在程序代码中的具体表现.
3. 切点(pointcut): Spring AOP通过切点来定位到哪些连接点.
4. 通知(Advice): 切面必须完成的具体工作.
5. 切面(Aspect): 切面是通知和切点的结合.
6. 目标(Target): 被通知的对象
7. 代理(Proxy): 由AOP框架创建的对象, 在Spring框架中, AOP代理对象分为两种: JDK动态代理和CGLIB代理
8. 织入(Weaving): 是指把增强应用到目标对象来创建新的代理对象的过程, 它可以时在编译时期, 加载时期或者运行时期完成.



##### Spring AOP中通知的类型

1. @Before: 前置通知
2. @After: 后置通知
3. @AfterRunning: 返回通知
4. @AfterThrowing: 异常通知
5. @Around: 环绕通知



##### Spring AOP配置步骤

1. 使用注解@Aspect 定义切面
2. 使用注解@Pointcut定义切点
3. 使用相关的注解定义通知Advice



##### 切点的表达式

| **表达式类型** | 作用                                                         | 匹配规则                                                     |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| execution      | 用于匹配方法执行的连接点                                     |                                                              |
| within         | 用于匹配指定类型内的方法执行                                 | within(x)匹配规则target.getClass().equals(x)                 |
| this           | 用于匹配当前AOP代理对象类型的执行方法，包含引入的接口类型匹配 | this(x)匹配规则：x.getClass.isAssingableFrom(proxy.getClass) |
| target         | 用于匹配当前目标对象类型的执行方法，不包括引入接口的类型匹配 | target(x)匹配规则：x.getClass().isAssignableFrom(target.getClass()); |
| args           | 用于匹配当前执行的方法传入的参数为指定类型的执行方法         | 传入的目标位置参数.getClass().equals(@args(对应的参数位置的注解类型))!= null |
| @target        | 用于匹配当前目标对象类型的执行方法，其中目标对象持有指定的注解 | target.class.getAnnotation(指定的注解类型) != null           |
| @args          | 用于匹配当前执行的方法传入的参数持有指定注解的执行           | 传入的目标位置参数.getClass().getAnnotation(@args(对应的参数位置的注解类型))!= null |
| @within        | 用于匹配所有持有指定注解类型内的方法                         | 被调用的目标方法Method对象.getDeclaringClass().getAnnotation(within中指定的注解类型) != null |
| @annotation    | 用于匹配当前执行方法持有指定注解的方法                       | target.getClass().getMethod("目标方法名").getDeclaredAnnotation(@annotation(目标注解))!=null |
| bean           | Spring AOP扩展的，AspectJ没有对应的指示符，用于匹配特定名称的Bean对象的执行方法 | ApplicationContext.getBean("bean表达式中指定的bean名称") != null |



##### Spring AOP中织入的三个时期

1. 编译期: 切面在目标类被编译时被织入, 这种方式需要特殊的编译器. AspectJ的织入编译器就是用这种方式织入切面.
2. 类加载期: 切面在目标类被加载到JVM时被织入, 这种方式需要特殊的类加载器, 它可以在目标类引入应用之前增强目标类的字节码.
3. 运行期: 切面在应用运行的某个时期被织入. 一般情况下, 在织入切面时, AOP容器会为目标对象动态创建一个代理对象, Spring AOP采用的就是这种织入方式.



##### AOP的两种实现方式

AOP采用了两种实现方式: 静态织入(AspectJ)和动态代理(Spring AOP).



##### Spring AOP使用代理的方式

1. 动态代理



##### Spring AOP的动态代理实现方式

1. jdk动态代理
2. cglib代理



##### AOP应用场景

1. 分布式锁
1. Spring事务: @Transaction
1. Spring异步操作: @Async
1. Spring缓存: @Cacheable
1. 公共日志记录
1. 统一异常拦截处理/Spring@RestControllerAdvice
1. 权限
1. 性能优化
1. 统一业务校验





















