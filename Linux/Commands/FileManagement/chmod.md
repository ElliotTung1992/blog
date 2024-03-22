Linux chmod（英文全拼: change mode）命令是控制用户对文件的权限的命令.

Linux/Unix的文件调用权限分为三级: 文件所有者(Owner)、用户组(Group)、其它用户(Other Users).

![image-20240322123504110](/Users/ganendong/Library/Application Support/typora-user-images/image-20240322123504110.png)

只有文件所有者和超级用户可以修改文件或目录的权限. 可以使用绝对模式(八进制数字模式), 符号模式指定文件的权限.



![image-20240322123731998](/Users/ganendong/Library/Application Support/typora-user-images/image-20240322123731998.png)

**语法：**

```
chmod [-cfvR] [--help] [--version] mode file...
```

**参数说明:**

mode : 权限设定字串，格式如下 :

```
[ugoa...][[+-=][rwxX]...][,...]
```

- u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是
- \+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限
- r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行

其他参数说明：

- -c : 若该文件权限确实已经更改，才显示其更改动作
- -f : 若该文件权限无法被更改也不要显示错误讯息
- -v : 显示权限变更的详细资料
- -R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递归的方式逐个变更)
- --help : 显示辅助说明
- --version : 显示版本

**实例：**

将文件file1.txt设为所有人皆可读取:

```
chmod ugo+r file1.txt
chmod a+r file1.txt
```

将文件file1.txt与file2.txt设为该文件拥有者和其所属同一群体可写入, 但其他人不可写入:

```
chmod ug+w,o-w file1.txt file2.txt
```

为ex1.py文件拥有者增加可执行权限:

```
chmod u+x ex1.py
```

将当前目录下的所有文件及子文件都设置为任何人可读取:

```
chmod -R a+r *
```

使用八进制模式：

```
chmod 777 file
chmod a=rwx file

chmod 771 file
chmod ug=rwx,o=x file
```































