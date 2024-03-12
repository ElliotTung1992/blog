Linux locate命令用于查找符合条件的文档, 他会去保存文档和目录名称的数据库内, 查找合适范本样式条件的文档或目录. 

一般情况我们只需要输入locate yourFileName即可查找指定文件.

**语法**

```
locate [-d][--help][--version][范本样式...]
```

**参数：**

- -b, --basename -- 仅匹配路径名的基本名称
- -c, --count -- 只输出找到的数量
- -d, --database DBPATH -- 使用 DBPATH 指定的数据库，而不是默认数据库 /var/lib/mlocate/mlocate.db
- -e, --existing -- 仅打印当前现有文件的条目
- -1 -- 如果 是 1．则启动安全模式。在安全模式下，使用者不会看到权限无法看到 的档案。这会始速度减慢，因为 locate 必须至实际的档案系统中取得档案的 权限资料。
- -0, --null -- 在输出上带有NUL的单独条目
- -S, --statistics -- 不搜索条目，打印有关每个数据库的统计信息
- -q -- 安静模式，不会显示任何错误讯息。
- -P, --nofollow, -H -- 检查文件存在时不要遵循尾随的符号链接
- -l, --limit, -n LIMIT -- 将输出（或计数）限制为LIMIT个条目
- -n -- 至多显示 n个输出。
- -m, --mmap -- 被忽略，为了向后兼容
- -r, --regexp REGEXP -- 使用基本正则表达式
- --regex -- 使用扩展正则表达式
- -q, --quiet -- 安静模式，不会显示任何错误讯息
- -s, --stdio -- 被忽略，为了向后兼容
- -o -- 指定资料库存的名称。
- -h, --help -- 显示帮助
- -i, --ignore-case -- 忽略大小写
- -V, --version -- 显示版本信息

**实例**

查找passwd文件, 输入以下命令：

```
locate passwd
```

查找etc目录下所有以sh开头的文件：

```
locate /etc/sh
```

忽略大小写搜索当前用户目录下所有以r开头的文件:

```
locate -i ~/r
```



**附加说明:**

locate与find不同: find是去硬盘找, locate只在/var/lib/slocate资料库中找.

locate的速度比find快, 他并不是真的查找, 而是查数据库, 一般文件数据库在/var/lib/slocate/slocate.db中, 所以locate的查找并不是实时的, 而是以数据库更新为准, 一般是系统自己维护, 也可以手工升级数据库, 命令为:

```
updatedb
```

默认情况下updatedb每天执行一次.































