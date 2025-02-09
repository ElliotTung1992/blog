

##### Spring Boot和Spring的区别

Spring Boot是由Pivotal团队提供的全新框架, 其设计目的是用来简化新Spring应用的初始搭建以及开发过程. 该框架使用了特定的方式来进行配置, 从而使开发人员不不再需要样板化的配置. 通过这种方式, Spring Boot致力于在蓬勃发展的快速应用开发领域(Rapid application development)成为领导者.

convention-over-configuration: 约定大于配置

##### Spring Boot的特点(Features)

1. 可以创建独立的Spring应用程序, 并且基于其Maven或Gradle插件, 可以创建可执行的JARs和WARs;
2. 内嵌Tomcat或Jetty等Servlet容器; Embedded Tomcat,Jetty ot Undertow web application server.
3. 提供自动配置的"starter"项目对象模型(POMs)以简化Maven配置;Provide opinionated 'starter' Project Object Models(POMs) for the build tool.The only build tools supported are Maven and Gradle.
4. 尽可能使用Spring boot的自动配置；Automatic configuration of the Spring Application.
5. 提供准备好的特性, 如指标、健康检查和外部化配置; Provide production-ready functionality such as metrics, health checks and externalized configuration.
6. 无需代码或者xml配置: No code generation is required. No XML configuration is required.

##### Spring Boot自动配置原理

@SpringBootApplication注解 - 本质是一个组合注解



@SpringBootApplication注解包含下面三个注解

@SpringBootConfiguration注解 - 其实就是@Configuration, 标注当前类为配置类

@EnableAutoConfiguration注解 - 开启自动配置

@ComponentScan注解 - 扫描包



@EnableAutoConfiguration注解包含下面两个注解

@AutoConfigurationPackage注解 - 就是将主配置类所在的包下面所有的组件都扫描注册到Spring容器中

@AutoConfigurationImportSelector注解



##### Spring Boot常用的Conditional注解

在加载自动配置类的时候, Spring Boot并不是将spring.factories的配置全部加载进来, 而是通过Conditional等注解的判断进行动态加载

@Conditional是Spring的底层注解, 意思就是根据不同的条件进行判断, 如果满足指定的条件, 那么对应的配置才会生效.

常用的Conditional注解

1. @ConditionalOnClass: classpath存在该类时生效
2. @ConditionalOnMissingClass: classpath不存在该类时生效
3. @ConditionalOnBean: 容器中存在该类型的Bean时生效
4. @ConditionalOnMissingBean: 容器中不存在该类型的Bean时生效
5. @ConditionalOnSingleCandidate: 容器中该类型的bean只有一个或@Primary的只有一个时生效
6. @ConditionalOnExpression: SpEL表达式为true时
7. @ConditionalOnProperty: 参数设置或者值一致时生效
8. @ConditionalOnResource: 指定的文件存在时生效
9. @ConditionalOnJndi: 指定的JNDI存在时生效
10. @ConditionalOnJava: 指定Java版本存在时生效
11. @ConditionalOnWebApplication: Web应用环境下生效
12. @ConditionalOnNotWebApplication: 非Web应用环境下起效

##### Spring Boot相关的异常

错误信息: JSR-330 javax.inject.Inject

错误原因: 断点位置不合理



#### SpringBoot自动配置相关源码

---

SpringBoot核心思想: 约定优于配置(convention over configuration)

核心注解: EnableAutoConfiguration

```
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {

	String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

	/**
	 * Exclude specific auto-configuration classes such that they will never be applied.
	 * @return the classes to exclude
	 */
	Class<?>[] exclude() default {};

	/**
	 * Exclude specific auto-configuration class names such that they will never be
	 * applied.
	 * @return the class names to exclude
	 * @since 1.3.0
	 */
	String[] excludeName() default {};

}
```

核心类: AutoConfigurationImportSelector

```
  # org.springframework.boot.autoconfigure.AutoConfigurationImportSelector#selectImports
  
  @Override
	public String[] selectImports(AnnotationMetadata annotationMetadata) {
	  // 判断是否开启自定配置, 默认为开启, 也可以配置参数关闭
		if (!isEnabled(annotationMetadata)) {
			return NO_IMPORTS;
		}
		// 获取文件的属性: spring-autoconfigure-metadata.properties
		AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader
				.loadMetadata(this.beanClassLoader);
		// 获取注解EnableAutoConfiguration的属性值		
		AnnotationAttributes attributes = getAttributes(annotationMetadata);
		// 获取项目所有依赖下的spring.factorie中key为“spring.boot.enableautoconfiguration”的集合
		List<String> configurations = getCandidateConfigurations(annotationMetadata,
				attributes);
		// 对集合数据进行去重		
		configurations = removeDuplicates(configurations);
		// 获取注解剔除属性对应的数据
		Set<String> exclusions = getExclusions(annotationMetadata, attributes);
		checkExcludedClasses(configurations, exclusions);
		// 从集合中剔除所有剔除属性相关的数据
		configurations.removeAll(exclusions);
		// 对候选集合进行过滤, @Condition相关注解进行匹配校验
		configurations = filter(configurations, autoConfigurationMetadata);
		fireAutoConfigurationImportEvents(configurations, exclusions);
		// 返回真正需要自动配置的候选集合
		return StringUtils.toStringArray(configurations);
	}
	
	protected List<String> getCandidateConfigurations(AnnotationMetadata metadata,
			AnnotationAttributes attributes) {
		// 只获取"spring.boot.enableautoconfiguration"对应的集合	
		List<String> configurations = SpringFactoriesLoader.loadFactoryNames(
				getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());
		Assert.notEmpty(configurations,
				"No auto configuration classes found in META-INF/spring.factories. If you "
						+ "are using a custom packaging, make sure that file is correct.");
		return configurations;
	}
	
	private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
	  // 从缓存中获取项目所有依赖下的spring.factories中的属性
		MultiValueMap<String, String> result = cache.get(classLoader);
		if (result != null) {
			return result;
		}

		try {
			Enumeration<URL> urls = (classLoader != null ?
					classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
			result = new LinkedMultiValueMap<>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				UrlResource resource = new UrlResource(url);
				Properties properties = PropertiesLoaderUtils.loadProperties(resource);
				for (Map.Entry<?, ?> entry : properties.entrySet()) {
					List<String> factoryClassNames = Arrays.asList(
							StringUtils.commaDelimitedListToStringArray((String) entry.getValue()));
					result.addAll((String) entry.getKey(), factoryClassNames);
				}
			}
			cache.put(classLoader, result);
			return result;
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Unable to load factories from location [" +
					FACTORIES_RESOURCE_LOCATION + "]", ex);
		}
	}
	
	
	private List<String> filter(List<String> configurations,
			AutoConfigurationMetadata autoConfigurationMetadata) {
		long startTime = System.nanoTime();
		String[] candidates = StringUtils.toStringArray(configurations);
		boolean[] skip = new boolean[candidates.length];
		boolean skipped = false;
		// 获取自动配置导入过滤器 @Condition相关注解
		for (AutoConfigurationImportFilter filter : getAutoConfigurationImportFilters()) {
			invokeAwareMethods(filter);
			// 进行匹配判断
			boolean[] match = filter.match(candidates, autoConfigurationMetadata);
			for (int i = 0; i < match.length; i++) {
				if (!match[i]) {
					skip[i] = true;
					skipped = true;
				}
			}
		}
		if (!skipped) {
			return configurations;
		}
		// 过滤不需要自动配置的类
		List<String> result = new ArrayList<>(candidates.length);
		for (int i = 0; i < candidates.length; i++) {
			if (!skip[i]) {
				result.add(candidates[i]);
			}
		}
		if (logger.isTraceEnabled()) {
			int numberFiltered = configurations.size() - result.size();
			logger.trace("Filtered " + numberFiltered + " auto configuration class in "
					+ TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startTime)
					+ " ms");
		}
		return new ArrayList<>(result);
	}
```











