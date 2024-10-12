#### MySQL分布式事务XA

---

MySQL分布式事务XA是基于上面的2PC框架实现的.

#### XA事务标准

---

![image-20241011093920252](/Users/ganendong/Library/Application Support/typora-user-images/image-20241011093920252.png)

##### XA规范中分布式事务由AP、RM、TM组成:

应用程序AP: 定义事务边界(定义事务开始和结束), 并访问事务边界内的资源

资源管理器RM: 管理共享的资源，也就是数据库实例

事务管理器TM: 负责管理全局事务，分配事务唯一标识，监控事务的执行进度，并负责事务的提交、回滚、失败恢复等

#### Mysql实现

---

##### Mysql XA语法:

`XA START xid`: 开启一个分布式事务xid

`XA END xid`: 将分布式事务xid置于IDLE状态，表示事务内的SQL操作完成

`XA PREPARE xid`: 事务xid本地提交，成功状态设置为PREPARED，失败则回滚

`XA COMMIT xid`: 事务最终提交，完成持久化

`XA ROLLBACK xid`: 事务回滚终止

`XA RECOVER`: 查看Mysql中存在的PREPARED状态的XA事务

##### Mysql XA事务二阶段流程:

1. 一阶段提交:
   1. 开始分布式事务: XA START xid
   2. 执行DML: 执行DML语句
   3. 将分布式事务xid置于IDLE状态: XA END xid
   4. 分布式事务本地提交: XA PREPARE xid
2. 二阶段提交:
   1. 事务最终提交: XA COMMIT xid
   2. 事务回滚: XA ROLLBACK xid

##### 残留XA事务处理:

XA事务不提交等价于长事务，一旦prepare成功就需要立即提交或者回滚，否则会带来很多问题。

但是数据库的crash或应用异常等原因都可能导致XA事务未能全部提交，如何处理这些残存的XA事务?

这就需要用到上面的XA RECOVER语句了，执行XA RECOVER查看未提交的XA事务，选择对应的进行rollback或commit.

##### 提交还是回滚的依据:

残留XA事务是提交还是回滚，必须由业务决定，谁开启XA事务，谁就必须对这个事务负责到底。

























































