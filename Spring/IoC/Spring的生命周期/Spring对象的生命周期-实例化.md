#### Bean的实例化方式

---

```
protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {
		// Make sure bean class is actually resolved at this point.
		Class<?> beanClass = resolveBeanClass(mbd, beanName);

		if (beanClass != null && !Modifier.isPublic(beanClass.getModifiers()) && !mbd.isNonPublicAccessAllowed()) {
			throw new BeanCreationException(mbd.getResourceDescription(), beanName,
					"Bean class isn't public, and non-public access not allowed: " + beanClass.getName());
		}

		Supplier<?> instanceSupplier = mbd.getInstanceSupplier();
		if (instanceSupplier != null) {
			return obtainFromSupplier(instanceSupplier, beanName);
		}
    // 实例中创建其它实例
		if (mbd.getFactoryMethodName() != null) {
			return instantiateUsingFactoryMethod(beanName, mbd, args);
		}

		// Shortcut when re-creating the same bean...
		boolean resolved = false;
		boolean autowireNecessary = false;
		if (args == null) {
			synchronized (mbd.constructorArgumentLock) {
				if (mbd.resolvedConstructorOrFactoryMethod != null) {
					resolved = true;
					autowireNecessary = mbd.constructorArgumentsResolved;
				}
			}
		}
		if (resolved) {
			if (autowireNecessary) {
				return autowireConstructor(beanName, mbd, null, null);
			}
			else {
				return instantiateBean(beanName, mbd);
			}
		}

		// Candidate constructors for autowiring?
		Constructor<?>[] ctors = determineConstructorsFromBeanPostProcessors(beanClass, beanName);
		if (ctors != null || mbd.getResolvedAutowireMode() == AUTOWIRE_CONSTRUCTOR ||
				mbd.hasConstructorArgumentValues() || !ObjectUtils.isEmpty(args)) {
			return autowireConstructor(beanName, mbd, ctors, args);
		}

		// Preferred constructors for default construction?
		ctors = mbd.getPreferredConstructors();
		if (ctors != null) {
			// 使用对象的有参构造方法
			return autowireConstructor(beanName, mbd, ctors, null);
		}
    // 使用对象的默认无参构造方法
		// No special handling: simply use no-arg constructor.
		return instantiateBean(beanName, mbd);
	}
```

1. 通过构造方法实例化

   > 1. 无参构造
   > 2. 有参构造

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

@Component
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
```

##### BeanFactory和FactoryBean的区别

`BeanFactory`: Spring IoC容器的顶级对象, BeanFactory被译为Bean工厂. 在SpringIoC容器中, Bean工厂负责创建Bean对象

`FactoryBean`: 是一个Bean, 是一个能辅助Spring实例化其它Bean对象的一个Bean.

##### Spring FactoryBean的使用场景：

`FactoryBean`是Spring框架中的一种特殊的工厂模式, 用于创建复杂的对象.

当你需要控制Bean的创建或者需要以某种方式修改返回的对象, 可以使用`FactoryBean`接口.

##### Spring FactoryBean的使用案例:

1. `Mybatis`框架中的`SqlSessionFactoryBean`对象



















