#### Spring Bean生命周期

---

AbstractAutowireCapableBeanFactory#doCreateBean

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
		  // 1.创建Bean实例
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

		// Eagerly cache singletons to be able to resolve circular references
		// even when triggered by lifecycle interfaces like BeanFactoryAware.
		boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&
				isSingletonCurrentlyInCreation(beanName));
		if (earlySingletonExposure) {
			if (logger.isTraceEnabled()) {
				logger.trace("Eagerly caching bean '" + beanName +
						"' to allow for resolving potential circular references");
			}
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



#### Bean的初始化

---

```
protected Object initializeBean(String beanName, Object bean, @Nullable RootBeanDefinition mbd) {
		if (System.getSecurityManager() != null) {
			AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
			  // 1. 调用部分实现Aware接口的方法
				invokeAwareMethods(beanName, bean);
				return null;
			}, getAccessControlContext());
		}
		else {
		  // 1. 调用部分实现Aware接口的方法
			invokeAwareMethods(beanName, bean);
		}

		Object wrappedBean = bean;
		if (mbd == null || !mbd.isSynthetic()) {
		  // 2. 执行BeanPostProcessor接口实现集合的初始化前后置处理方法
			wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
		}

		try {
		  // 3. 执行初始化方法
			invokeInitMethods(beanName, wrappedBean, mbd);
		}
		catch (Throwable ex) {
			throw new BeanCreationException(
					(mbd != null ? mbd.getResourceDescription() : null),
					beanName, "Invocation of init method failed", ex);
		}
		if (mbd == null || !mbd.isSynthetic()) {
		  // 4. 执行BeanPostProcessor接口实现集合的初始化后后置处理方法
			wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
		}

		return wrappedBean;
	}
```

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

`BeanPostProcessor`的设计目标主要是提供一种扩展机制, 让开发者可以在Spring Bean的初始化阶段进行自定义操作.

这种设计理念主要体现了Spring的一个重要的原则, 即"开放封闭原则".

“开放闭关原则”则强调软件实体(类、模块、函数等等)应该对于扩展是开发的, 对于修改是关闭的.

在这里, Spring容器对于Bean的创建、初始化、销毁等生命周期进行了管理, 但同时开放了`BeanPostProcessor`这种扩展点,

让开发者在不修改Spring源码的情况下, 实现对Spring Bean生命周期的自定义操作

这种设计理念大大提升了Spring的灵活性和可扩展性性.







































