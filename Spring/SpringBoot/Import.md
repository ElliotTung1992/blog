#### SpringBoot中@Import三种使用方式

---

1. 引入普通类
2. 引入ImportSelector的实现类
3. 引入ImportDeanDefinitionRegister的实现类



#### 引入普通类

---

使用@Import注解引入一个普通类, 就会把该类注入到IOC容器中



#### 引入ImportSelector的实现类

---

代码:

selectImports方法的返回值是一个字符串数组, 这里返回的字符串数组类名就会被创建然后注入到IOC容器中.

```
public interface ImportSelector {

	/**
	 * Select and return the names of which class(es) should be imported based on
	 * the {@link AnnotationMetadata} of the importing @{@link Configuration} class.
	 */
	String[] selectImports(AnnotationMetadata importingClassMetadata);

}
```

##### 静态Import场景:

1. SpringBoot自动配置: AutoConfigurationImportSelector类

##### 动态Import场景:

1. Spring框架@EnableAsync
2. Spring框架@EnableCatching



#### 引入ImportBeanDefinitionRegistrar接口的实现类

---

当配置类实现了ImportBeanDefinitionRegistrar接口, 就可以往容器注入自定义的Bean对象.

这个接口相比于ImportSelector接口, ImportSelector接口是返回类名集合, 但是你不能对这些类进行任何操作。

但是ImportBeanDefinitionRegistrar接口, 是可以注入自定义的BeanDefinition,可以对Bean的属性进行操作.

##### 框架源码实现:

1.  Mybatis框架中的@MapperScan注解

























































