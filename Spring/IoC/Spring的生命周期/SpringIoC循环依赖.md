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



#### 源码分析

---

##### 第三级缓存为什么可以解决循环依赖

```

// 创建Bean方法
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
			throws BeanCreationException {

		// Instantiate the bean.
		BeanWrapper instanceWrapper = null;
		if (mbd.isSingleton()) {
			instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
		}
		if (instanceWrapper == null) {
		  // 1.实例化Bean对象
			instanceWrapper = createBeanInstance(beanName, mbd, args);
		}
		Object bean = instanceWrapper.getWrappedInstance();
		Class<?> beanType = instanceWrapper.getWrappedClass();
		if (beanType != NullBean.class) {
			mbd.resolvedTargetType = beanType;
		}

		// Allow post-processors to modify the merged bean definition.
		synchronized (mbd.postProcessingLock) {
			if (!mbd.postProcessed) {
				try {
					applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
				}
				catch (Throwable ex) {
					throw new BeanCreationException(mbd.getResourceDescription(), beanName,
							"Post-processing of merged bean definition failed", ex);
				}
				mbd.postProcessed = true;
			}
		}
		// 在创建Bean的时候, 设置属性之前通过三级缓存解决循环依赖的问题
		// Eagerly cache singletons to be able to resolve circular references
		// even when triggered by lifecycle interfaces like BeanFactoryAware.
		// Bean是否是单例Bean, 是否允许使用三级缓存, 当前Bean是否正在被创建中
		boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
				isSingletonCurrentlyInCreation(beanName));
		if (earlySingletonExposure) {
			if (logger.isTraceEnabled()) {
				logger.trace("Eagerly caching bean '" + beanName +
						"' to allow for resolving potential circular references");
			}
			// 把当前对象加入到三级缓存中
			addSingletonFactory(beanName, () -> getEarlyBeanReference(beanName, mbd, bean));
		}

		// Initialize the bean instance.
		Object exposedObject = bean;
		try {
		  // 2. 属性赋值
			populateBean(beanName, mbd, instanceWrapper);
			// 3. 实例化Bean
			exposedObject = initializeBean(beanName, exposedObject, mbd);
		}
		catch (Throwable ex) {
			if (ex instanceof BeanCreationException && beanName.equals(((BeanCreationException) ex).getBeanName())) {
				throw (BeanCreationException) ex;
			}
			else {
				throw new BeanCreationException(
						mbd.getResourceDescription(), beanName, "Initialization of bean failed", ex);
			}
		}

		if (earlySingletonExposure) {
			Object earlySingletonReference = getSingleton(beanName, false);
			if (earlySingletonReference != null) {
				if (exposedObject == bean) {
					exposedObject = earlySingletonReference;
				}
				else if (!this.allowRawInjectionDespiteWrapping && hasDependentBean(beanName)) {
					String[] dependentBeans = getDependentBeans(beanName);
					Set<String> actualDependentBeans = new LinkedHashSet<>(dependentBeans.length);
					for (String dependentBean : dependentBeans) {
						if (!removeSingletonIfCreatedForTypeCheckOnly(dependentBean)) {
							actualDependentBeans.add(dependentBean);
						}
					}
					if (!actualDependentBeans.isEmpty()) {
						throw new BeanCurrentlyInCreationException(beanName,
								"Bean with name '" + beanName + "' has been injected into other beans [" +
								StringUtils.collectionToCommaDelimitedString(actualDependentBeans) +
								"] in its raw version as part of a circular reference, but has eventually been " +
								"wrapped. This means that said other beans do not use the final version of the " +
								"bean. This is often the result of over-eager type matching - consider using " +
								"'getBeanNamesForType' with the 'allowEagerInit' flag turned off, for example.");
					}
				}
			}
		}

		// Register bean as disposable.
		try {
			registerDisposableBeanIfNecessary(beanName, bean, mbd);
		}
		catch (BeanDefinitionValidationException ex) {
			throw new BeanCreationException(
					mbd.getResourceDescription(), beanName, "Invalid destruction signature", ex);
		}

		return exposedObject;
	}
```

##### 添加当前对象至三级缓存

```
protected void addSingletonFactory(String beanName, ObjectFactory<?> singletonFactory) {
   Assert.notNull(singletonFactory, "Singleton factory must not be null");
   synchronized (this.singletonObjects) {
   		// 判断以及缓存中是否已经存在该对象
      if (!this.singletonObjects.containsKey(beanName)) {
      	 // 添加当前对象至三级缓存
         this.singletonFactories.put(beanName, singletonFactory);
         // 删除二级缓存的当前对象
         this.earlySingletonObjects.remove(beanName);
         this.registeredSingletons.add(beanName);
      }
   }
}
```

##### getSingleton方法中三级缓存的使用

```
protected Object getSingleton(String beanName, boolean allowEarlyReference) {
		// Quick check for existing instance without full singleton lock
		// 首先从一级缓存获取对象
		Object singletonObject = this.singletonObjects.get(beanName);
		// 如果对象不存在于一级缓存且对象正在创建
		if (singletonObject == null && isSingletonCurrentlyInCreation(beanName)) {
			// 从二级缓存获取对象
			singletonObject = this.earlySingletonObjects.get(beanName);
			// 如果二级缓存不存在且允许从三级缓存获取对象
			if (singletonObject == null && allowEarlyReference) {
				synchronized (this.singletonObjects) {
					// Consistent creation of early reference within full singleton lock
					singletonObject = this.singletonObjects.get(beanName);
					if (singletonObject == null) {
						singletonObject = this.earlySingletonObjects.get(beanName);
						if (singletonObject == null) {
							// 从三级缓存获取对象
							ObjectFactory<?> singletonFactory = this.singletonFactories.get(beanName);
							if (singletonFactory != null) {
							  // 从三级缓存获取对象
								singletonObject = singletonFactory.getObject();
								// 把对象放入二级缓存
								this.earlySingletonObjects.put(beanName, singletonObject);
								// 把对象从三级缓存删除
								this.singletonFactories.remove(beanName);
							}
						}
					}
				}
			}
		}
		return singletonObject;
	}
```



#### Spring的三级缓存无法解决循环依赖的场景

---

1. Spring不能解决构造器的循环依赖
2. Spring不能解决`prototype`作用域的循环依赖
3. Spring不能解决多例的循环依赖

##### Spring不能解决构造器的循环依赖

对象是先实例化, 再把已经实例化但还未进行属性设置的对象放进三级缓存, 在设置属性的时候可以从三级缓存获取目标对象

但是构造器进行属性设置的场景, 在放入三级缓存之前所以无法解决.

##### Spring不能解决`prototype`作用域的循环依赖

Spring IoC容器只会管理单例Bean的生命周期, 并将单例Bean存放到三级缓存中. 

Spring并不会管理`prototype`的作用域的Bean, 也不会缓存该作用域的Bean.

##### Spring不能解决多例的循环依赖

多实例对象的每次调用getBean都会创建一个新的Bean对象, 该 Bean 对象并不能缓存。而 Spring 中循环依赖的解决正是通过缓存来实现的。

##### 三级缓存无法解决的方案

1. 可以使用`@Lazy`注解, 延迟加载



#### 为什么一定要三级缓存

---

##### 三级缓存的意义

如果Spring选择二级缓存来解决循环依赖的话, 那么就意味着所有的Bean都需要在实例化完成之后立马为其

创建代理, 而Spring的设计原则是在Bean初始化完成之后再为其创建代理.

使用三级缓存而非二级缓存并不是因为只有三级缓存才能解决循环依赖问题, 其实二级缓存也能解决循环引用的问题.

使用三级缓存而非二级缓存并不是出于IoC的考虑, 而是处于AOP的考虑.

即若使用二级缓存, 在AOP情况下注入到其它Bean的, 不是最终的代理对象, 而是原始对象.















































