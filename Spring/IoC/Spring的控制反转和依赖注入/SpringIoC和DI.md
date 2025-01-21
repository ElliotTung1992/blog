#### 什么是IoC(控制反转)

---

Ioc(Inversion of control)的意思的控制反转, 它是Spring最核心的点, IoC并不是一门技术, 而是一种设计思想.

在Spring框架中实现控制反转的是Spring IoC容器, 其具体就是由容器来管理对象的生命周期和对象之间的依赖关系, 而不是像传统方式通过(new 对象)中自己来创建对象.

##### SpringIoC容器是如何创建对象的

Spring通过反射机制, 根据配置文件在运行时动态地去创建对象以及管理对象之间的依赖关系.



#### 什么是DI(依赖注入)

---

DI(Dependency Injection)的意思是"依赖注入", 它是IoC(控制反转)的一个别名. 

什么是依赖注入: 即应用程序在运行时依赖IoC容器动态注入需要的依赖对象.



#### Bean定义的方式和依赖定义的方式有哪几种

---

1. 直接编码的方式

2. 配置文件的方式

3.  注解的方式



#### Spring注解@Component、@Respository、@Service、@Controller的区别

---

Spring框架一开始使用xml的定义bean的配置, 查找和维护起来非常不方便.

Spring 2.5为我们引入了自动扫描机制, 它可以在类路径下寻找标注了这些注解的类, 并将这些类纳入Spring容器管理.



#### Spring中Bean的作用域

---

##### 1. singleton

在Spring容器中仅存在一个Bean实例, Bean是以单例的方式存在的, 也是Bean默认的作用域.

##### 2. prototype

每次向容器获取Bean, 都会返回一个新的实例.



以下作用域只在Web应用中适用:

##### 3. request

每一次HTTP请求都会产生一个新的Bean, 该Bean仅在当前HTTP Request内有效.

##### 4. session

同一个HTTP Session共享一个Bean, 不同的HTTP Session使用不同的Bean

##### 5. globle-session

同一个全局Session共享一个Bean



#### SpringIoC的三种注入方式

---

##### 1. 构造函数注入

构造方法注入: 就是被注入的对象可以通过在其构造方法中声明依赖对象的参数列表, 让IoC容器知道它需要哪些依赖对象.

##### 2. set方法注入

set方法注入: 就是通过setter方法将相应的依赖对象设置到被注入的对象中.

##### 3. 工厂方法注入

a. 静态工厂注入: 通过调用静态工厂的方法来获取自己需要的对象

b. 非静态工厂注入: 也成为实例工厂



#### SpringIoC的自动装配

---

当Spring装配Bean属性的时候, 有时候非常明确, 就是需要将某个Bean的引用装配给指定属性.

为了应对这种明确的装配场景, Spring提供了自动装配.

##### byName

把与Bean的属性具有相同名称的其它Bean自动装配到Bean对应的属性中

##### byType

把与Bean的属性具有相同类型的其它Bean自动装配到Bean对应的属性中

##### constructor

把与Bean的构造器入参具有相同类型的Bean自动装配到Bean的构造器对应的入参中.

还是通过入参的类型来确定.



#### SpringIoC注解形式的自动装配

---

从Spring2.5开始支持使用注解来自动装配Bean的属性.

Spring支持各种不同的框架用于自动装配的注解:

1. Spring框架自带的@Autowired注解
2. JSR-330的@Inject注解
3. JSR-250的@Resource注解

##### 1. 强制性

默认情况下, 它具有强制契约特性, 其所标注的属性必须是可装配的.

##### 2. 装配策略

1. 默认根据类型装配
2. 如果存在多个类型相同的对象, 查看Bean上是否包含@Primary注解
3. 如果存在多个类型相同的对象, 查看Bean上是否配置@Priority注解, 数字越小优先级越高
4. 如果存在多个类型相同的对象, 再根据名称装配



#### SpringIoC带来的好处

---

1. 资源集中管理, 实现资源的可配置和易管理.
2. 降低了对象之间的依赖程度, 从而实现节耦合.

