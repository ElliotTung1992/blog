

##### 源码分析

org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#doCreateBean

```
// Register bean as disposable.
// 把Bean注册为可丢弃的
try {
   registerDisposableBeanIfNecessary(beanName, bean, mbd);
}
catch (BeanDefinitionValidationException ex) {
   throw new BeanCreationException(
         mbd.getResourceDescription(), beanName, "Invalid destruction signature", ex);
}
```

org.springframework.beans.factory.support.AbstractBeanFactory#registerDisposableBeanIfNecessary

```
protected void registerDisposableBeanIfNecessary(String beanName, Object bean, RootBeanDefinition mbd) {
		AccessControlContext acc = (System.getSecurityManager() != null ? getAccessControlContext() : null);
		// 是否需要销毁
		if (!mbd.isPrototype() && requiresDestruction(bean, mbd)) {
			// 是否是单例
			if (mbd.isSingleton()) {
				// Register a DisposableBean implementation that performs all destruction
				// work for the given bean: DestructionAwareBeanPostProcessors,
				// DisposableBean interface, custom destroy method.
				// 把Bean注册进销毁集合
				registerDisposableBean(beanName,
						new DisposableBeanAdapter(bean, beanName, mbd, getBeanPostProcessors(), acc));
			}
			else {
				// A bean with a custom scope...
				Scope scope = this.scopes.get(mbd.getScope());
				if (scope == null) {
					throw new IllegalStateException("No Scope registered for scope name '" + mbd.getScope() + "'");
				}
				scope.registerDestructionCallback(beanName,
						new DisposableBeanAdapter(bean, beanName, mbd, getBeanPostProcessors(), acc));
			}
		}
	}
```

org.springframework.beans.factory.support.AbstractBeanFactory#requiresDestruction

```
  protected boolean requiresDestruction(Object bean, RootBeanDefinition mbd) {
    // 判断是否需要销毁
		return (bean.getClass() != NullBean.class &&
				(DisposableBeanAdapter.hasDestroyMethod(bean, mbd) || (hasDestructionAwareBeanPostProcessors() &&
						DisposableBeanAdapter.hasApplicableProcessors(bean, getBeanPostProcessors()))));
	}
	
	public static boolean hasDestroyMethod(Object bean, RootBeanDefinition beanDefinition) {
	  // 是否实现DisposableBean接口或者AutoCloseable接口
		if (bean instanceof DisposableBean || bean instanceof AutoCloseable) {
			return true;
		}
		return inferDestroyMethodIfNecessary(bean, beanDefinition) != null;
	}
```

org.springframework.beans.factory.support.DefaultSingletonBeanRegistry#registerDisposableBean

```
  // 把Bean添加进可抛弃的Bean集合
  public void registerDisposableBean(String beanName, DisposableBean bean) {
		synchronized (this.disposableBeans) {
			this.disposableBeans.put(beanName, bean);
		}
	}
```

#### 使用场景:

---

1. 资源释放
