#### 什么是循环依赖

---

##### Spring中的循环依赖

假设对象A, B, C, 对象A依赖对象B, 对象B依赖对象C, 对象C依赖对象A, 这种现象称为Spring的循环依赖

Spring的解决方案: 三级缓存



#### Spring IoC处理循环依赖的思路

---

##### 三级缓存

SpringIoC通过三级缓存来解决循环依赖的问题, 三级缓存指的是三个Map:

1. SingletonObjects: 一级缓存, key为BeanName, value为Bean, 日常获取Bean的地方
2. EarlySingletonObjects: 二级缓存, key为BeanName, value为Bean, 已经实例化但是还没有进行属性注入的Bean, 由三级缓存放入
3. SingletonFactories: 三级缓存, key为BeanName, key为对象工厂(ObjectFactory)

在实际使用中, 要获取一个Bean, 先从一级缓存查询到三级缓存

缓存Bean的时候从三级缓存到一级缓存的顺序缓存, 并且缓存Bean的过程中, 三个缓存都是互斥的, 只会保存Bean在一个缓存中, 而且, 最终都会在一级缓存中.

##### 解决循环依赖的思路

SpringIoC解决循环依赖的思路是依靠缓存, 同时引出概念就是早期暴露引用.

我们知道在IoC容器里Bean的初始化过程分为三个步骤: 实例化、填充属性、初始化

解决思路就是: 当我们在创建实例和填充属性这两个步骤之间. 我们引入缓存, 将这些已经实例化但是并没有进行属性填充的实例放到缓存中, 而这些放在缓存中但是没有进行属性填充的实例对象, 就是解决循环依赖的方法.



























