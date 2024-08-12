#### `@Import`注解的使用详解

---

##### `@Import`注解使用详解:

1. `@Import`导入普通类
2. `@Import`导入配置类
3. `@Import`导入实现`ImportSelector`接口的类
4. `@Import`导入实现`DeferredImportSelector`接口的类
5. `@Import`导入实现`ImportBeanDefinitionRegistrar`接口的类

a. `@Import`导入普通类和配置类的区别

被`@Configuration`标注的类会被CGLIB进行代理

##### 导入配置类:

使用场景: `@Configuration`标注的类引入另一个`@Configuration`标注的类

##### 实现`ImportSelector`和`DeferredImportSelector`接口的类:

允许根据条件动态地选择要导入的组件

案例: `@EnableAsync`

##### 实现`ImportBeanDefinitionRegistrar`接口的类

提供了一种以变成方式动态注册Bean的方法

案例: 自定义注解相关的bean注册到Spring容器中

#### 比较

---

##### `@Import`和`@ComponentScan`的区别:

相同点: 都可以用于注册Bean

不同点: `@ComponentScan`用于自动扫描和注册bean, 而`@Import`用于明确地导入其他配置类



