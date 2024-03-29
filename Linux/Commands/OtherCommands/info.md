info命令用于阅读Linux下info格式的帮助文档.

就内容来说, info页面比man page编写得要更好和更容易理解, 但man page阅读起来更加方便.一个 man 手册只有一级标题，而 info 页面将内容组织成多级标题，每个标题称为节点，每个标题下可能存在子标题（称为子节点）.要理解 info 命令，不仅要学习如何在单个节点中浏览，还要学习如何在节点和子节点之间切换.

**语法：**

```
info [OPTION]... [MENU-ITEM...]
```

**Options:**

```
-k, --apropos=STRING
	在所有手册的所有索引中查找 STRING
-d, --directory=DIR
	添加包含 info 格式帮助文档的目录
--dribble=FILENAME
	将用户按键记录在指定的文件
-f, --file=FILENAME
	指定要读取的info格式的帮助文档
-h, --help
	显示帮助信息并退出
--index-search=STRING
	转到由索引项 STRING 指向的节点
-n, --node=NODENAME
	指定首先访问的 info 帮助文件的节点
-o, --output=FILENAME
	输出被选择的节点内容到指定的文件
-R, --raw-escapes
	输出原始 ANSI 转义字符(默认)
--no-raw-escapes
	转义字符输出为文本
--restore=FILENAME
	从文件 FILENAME 中读取初始击键
-O, --show-options, --usage
	转到命令行选项节点
--strict-node-location
	(用于调试)按原样使用 info 文件指针
--subnodes
	递归输出菜单项
--vi-keys
	使用类 vi 和类 less 的绑定键
--version
	显示版本并退出
-w, --where, --location
	显示 info 文件路径
```

**实例:**

查看ls的帮助文档:

```
info ls
```

查看info命令的帮助文档地址:

```
info -w info
```



