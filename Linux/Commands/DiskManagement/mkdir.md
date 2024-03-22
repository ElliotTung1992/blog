Linux mkdir（英文全拼: make directory）命令用于创建目录.

**语法：**

```
mkdir [-p] dirName
```

**参数说明：**

- -p 确保目录名称存在，不存在的就建一个

**实例:**

在工作目录下, 创建一个名为runoob的子目录:

```
mkdir runoob
```

在工作目录下的runoob2目录中, 创建一个名为test的子目录. 若runoob2目录不存在, 则创建一个.

```
mkdir -p /runoob2/test
```

在工作目录下的test目录中, 创建两个名为aaa和bbb的子目录. 若test目录不存在, 则创建一个.

```
mkdir -p /test/{aaa,bbb}
```

