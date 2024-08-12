#### Spring Bean生命周期

---

https://juejin.cn/post/7075168883744718856

AbstractAutowireCapableBeanFactory#doCreateBean

##### Bean生命周期

1. 实例化
2. 属性赋值
3. 初始化
4. 使用中
5. 销毁

##### Bean详细生命周期

1. 实例化 - 实例化Bean
2. 设置属性 - 设置对象属性
3. 初始化 - 检查Aware的相关接口并设置相关依赖
4. 初始化 - BeanPostProcessor前置处理
5. 初始化 - InitalizinBean接口
6. 初始化 - 是否配置自定义的init-method
7. 初始化 - BeanPostProcessor后置处理
8. 注册Destruction相关回调接口
9. 使用中
10. 销毁 - 是否实现Disposablebean接口
11. 销毁 - 是否配置自定义的destory-method



#### Bean的实例化方式

---

1. 通过构造方法实例化
2. 通过简单工厂模式实例化
3. 通过工厂方法模式实例化
4. 通过FactoryBean接口实例化

##### a. 通过构造方法实例化

在默认情况下, 会调用Bean的无参构造方法.

在Spring配置文件中直接配置类的全路径, Spring会自动调用该类的无参构造来实例化Bean.

##### b. 通过简单工厂模式实例化

注意点: 获取Bean的方法必须是静态的

代码实现:

```
public class SpringBeanSimpleFactory {
    public static SpringBean getSpringbean(){ 
        return new SpringBean();
    }
}

<bean id="getSpirngBean1" class="com.qiuye.beanInstance.factory.SpringBeanSimpleFactory" factory-method="getSpringbean"/>
```

##### c. 通过工厂方法模式实例化

代码实现:

```
public class SpringBeanFactory {
    public SpringBean getSpringBean(){
        return new SpringBean();
    }
}

<bean id="springBeanFactory" class="com.qiuye.beanInstance.factory.SpringBeanFactory"></bean>
<bean id="getSpirngBean2" factory-bean="springBeanFactory" factory-method="getSpringBean"/>
```

##### d. 通过FactoryBean接口实例化

在Spring中, 提供了`FactoryBean`接口, 实现该接口之后无需指定`factory-bean`和`factory-method`方法.

`factory-bean`会自动指向实现了`factoryBean`接口的类, `factory-method`会自动指向`getObject()`方法

代码实现:

```
public class TestConfiguration {

    public TestConfiguration() {
        System.out.println("执行默认的构造方法");
    }
}

public class SimpleFactoryBean implements FactoryBean<TestConfiguration> {

    @Override
    public TestConfiguration getObject() throws Exception {
        return new TestConfiguration();
    }

    @Override
    public Class<?> getObjectType() {
        return TestConfiguration.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}

@Configuration
public class SimpleFactoryBeanConfiguration {

    @Bean
    public SimpleFactoryBean simpleFactoryBean(){
        return new SimpleFactoryBean();
    }

    @Bean
    public TestConfiguration testConfiguration(SimpleFactoryBean simpleFactoryBean) throws Exception {
        return simpleFactoryBean.getObject();
    }
}
```

##### BeanFactory和FactoryBean的区别

BeanFactory: Spring IoC容器的顶级对象, BeanFactory被译为Bean工厂. 在SpringIoC容器中, Bean工厂负责创建Bean对象

FactoryBean: 是一个Bean, 是一个能辅助Spring实例化其它Bean对象的一个Bean.



#### Bean属性赋值

---

https://blog.csdn.net/qq_51601665/article/details/138578197

处理`Bean`的属性值, 包括自动装配和依赖检查

自动装配模式:

1. 自动装配按名称
2. 自动装配按类型



#### Bean的初始化

---

Bean初始化方式：

1. 方法实现`@PostConstruct`注解 - 生命周期方法中的执行`BeanPostProcessor`实现, 实例类为`InitDestroyAnnotationBeanPostProcessor`
2. 类实现`InitializingBean`接口 - 生命周期方法`invokeInitMethods()`方法
3. 对象实例使用`Bean`注解, 并指定注解的`initMethod`方法 - 生命周期方法`invokeInitMethods()`方法

Bean初始化执行顺序:

1 > 2 > 3



#### Aware接口

---

##### Aware接口的作用:

因为我们在实际开发过程中, 有些Bean可以需要用到Spring容器本身的功能资源.

所以Spring容器中的Bean此时就要意识到Spring容器的存在才能调用Spring所提供的资源.

我们可以通过Spring提供的一系列Spring Aware来实现具体的功能.

##### Aware接口的执行时机:

1. Bean生命周期方法`doCreateBean()` - Bean的实例化方法`initializeBean()`中的`invokeAwareMethods()`方法
2. Bean生命周期方法`doCreateBean()` - Bean的实例化方法`initializeBean()`中的`BeanPostProcessor`接口的Bean的Bean的实例化前置方法 - `ApplicationContextAwareProcessor`是其中的实现类之一



#### BeanPostProcessor接口

---



##### 





































