#### BeanFactoryPostProcessor

---

https://cloud.tencent.com/developer/article/2320756

##### 认识BeanFactoryPostProcessor

`BeanFactoryPostProcessor`位于`org.springframework.beans.factory.config`包中。与`BeanPostProcessor`有相似的核心逻辑，但它们之间的主要区别在于它们所操作的对象。`BeanFactoryPostProcessor`的主要目的是对`Bean`的配置元数据进行操作，这意味着它可以影响`Bean`的初始配置数据。

在`Spring IoC`容器实例化`beans`之前，特别是除了`BeanFactoryPostProcessor`之外的其`beans`，`BeanFactoryPostProcessor`有权利修改这些`beans`的配置。在`Spring`中，所有的`beans`在被完全实例化之前都是以`BeanDefinition`的形式存在的。`BeanFactoryPostProcessor`为我们提供了一个机会，使我们能够在`bean`完全实例化之前调整和修改这些`BeanDefinition`。对`BeanDefinition`的任何修改都会影响后续的`bean`实例化和初始化过程。

##### BeanFacotryPostProcessor重要的实现

1. BeanDefinitionRegistryPostProcessor
2. PropertySourcesPlaceholderConfigurer
3. ConfigurationClassPostProcessor

##### BeanFactoryPostProcessor和BeanPostProcessor的区别

`BeanFactoryPostProcessor` 和 `BeanPostProcessor` 都是 `Spring` 框架中为了增强容器的处理能力而提供的扩展点。它们都可以对 `Bean` 进行定制化处理，但它们的关注点和应用时机不同。

1. **BeanFactoryPostProcessor**:

- 功能: 允许我们在 `Spring` 容器实例化任何 `bean` 之前读取 `bean` 的定义(`bean` 的元数据)并进行修改。
- 作用时机: 它会在 `BeanFactory` 的标准初始化之后被调用，此时，所有的 `bean` 定义已经被加载到容器中，但还没有实例化任何 `bean`。此时我们可以添加、修改或移除某些 `bean` 的定义。
- 常见应用: 动态修改 `bean` 的属性、改变 `bean` 的作用域、动态注册新的 `bean` 等。
- 示例接口方法：`void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException`;

1. **BeanPostProcessor**:

- 功能: 允许我们在 `Spring` 容器实例化 `bean` 之后对 `bean` 进行处理，提供了一种机会在 `bean` 的初始化前后插入我们的自定义逻辑。
- 作用时机: 它在 `bean` 的生命周期中的两个时间点被调用，即在自定义初始化方法(如 `@PostConstruct`, `init-method`)之前和之后。
- 常见应用: 对特定的 `bean` 实例进行一些额外处理，如进行某种代理、修改 `bean` 的状态等。
- 示例接口方法：`Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException`; 和 `Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException`;

总结:

- `BeanFactoryPostProcessor` 主要关注于整个容器的配置，允许我们修改 `bean` 的定义或元数据。它是容器级别的。
- `BeanPostProcessor` 主要关注于 `bean` 的实例，允许我们在初始化前后对 `bean` 实例进行操作。它是 `bean` 级别的。

##### BeanFactoryPostProcessor和BeanDefinitionRegistrypostProcessor的区别

`BeanFactoryPostProcessor` 和 `BeanDefinitionRegistryPostProcessor` 都是 `Spring` 中提供的两个重要的扩展点，它们都允许我们在 `Spring` 容器启动过程中对 `Bean` 的定义进行定制处理。但它们的应用时机和功能上存在一些不同。

1. **BeanFactoryPostProcessor**:

- 功能: 允许我们在 `Spring` 容器实例化任何 `bean` 之前读取 `bean` 的定义 (`BeanDefinition`) 并进行修改。
- 作用时机: 在所有的 `bean` 定义都被加载、但 `bean` 实例还未创建的时候执行。
- 常见应用: 修改已加载到容器中的 `bean` 定义的属性，例如更改某个 `bean` 的作用域、属性值等。
- 主要方法: `void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException`;

1. **BeanDefinitionRegistryPostProcessor**:

- 功能: 扩展了 `BeanFactoryPostProcessor`，提供了一个新的方法来修改应用程序的上下文的 `bean` 定义。此外，还可以动态注册新的 `bean` 定义。
- 作用时机: 它也是在所有 `bean` 定义被加载后执行，但在 `BeanFactoryPostProcessor` 之前。
- 常见应用: 动态注册新的 `bean` 定义、修改或移除已有的 `bean` 定义。
- 主要方法: `void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException`;

总结：

- `BeanFactoryPostProcessor` 主要是用来修改已经定义的 `bean` 定义，而不是注册新的 `bean`。
- `BeanDefinitionRegistryPostProcessor` 是 `BeanFactoryPostProcessor` 的扩展，并提供了额外的能力来动态地注册、修改、移除 `bean` 定义。

在 `Spring` 容器的启动过程中，首先执行的是 `BeanDefinitionRegistryPostProcessor` 的方法，之后才是 `BeanFactoryPostProcessor` 的方法。