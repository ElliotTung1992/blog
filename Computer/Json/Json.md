#### JSON

JSON(JavaScript Object Notation)是由美国程序员道格拉斯·克罗克福特构想和设计的一种轻量级资料交换格式. 

其内容由属性和值所构成, 因此也有易与阅读和处理的优势.

##### 应用领域

1. WEB开发
2. NoSQL数据库

##### 与其它格式的比较

XML:

JSON与XML最大的不同在于XML是一个完整的[标记语言](https://zh.wikipedia.org/wiki/標記語言)，而JSON不是。这使得XML在程序判读上需要比较多的功夫。主要的原因在于XML的设计理念与JSON不同。XML利用标记语言的特性提供了绝佳的延展性（如[XPath](https://zh.wikipedia.org/wiki/XPath)），在数据存储，扩展及高级检索方面具备对JSON的优势，而JSON则由于比XML更加小巧，以及浏览器的内置快速解析支持，使得其更适用于网络数据传输领域。

YAML:

在功能和语法上，JSON 都是 YAML 语言的一个子集。特别是，YAML 1.2规范指定“任何JSON格式的文件都是YAML格式的有效文件"。最常见的YAML解析器也能够处理JSON。版本 1.2 之前的 YAML 规范没有完全涵盖 JSON，主要是由于 YAML 中缺乏本机 UTF-32 支持，以及对逗号分隔空格的要求;此外，JSON 规范还包括 /* */ 样式的注释。YAML 最重要的区别是语法扩展集，它们在 JSON 中没有类似物：关系数据支持：在 YAML 文档中，可以引用以前在文件/流中找到的锚点;通过这种方式，您可以表达递归结构。支持除基元之外的可扩展数据类型，如字符串、数字、布尔值等。支持带缩进的块语法;它允许您在不使用不必要的符号的情况下描述结构化数据：各种括号、引号等。

##### 常见Java操作JSON工具比较

| Gson | FastJson | Jackson |
| ---- | -------- | ------- |
|      |          |         |
|      |          |         |
|      |          |         |

##### 使用场景:

1. SpringMVC中前端JSON和后端对象的交互
2. Redis的内存对象的持久化
