#### 重复提交问题描述:

---

##### 为什么会出现表单重复提交问题?

1. 网络延迟的情况下用户多次点击submit按钮导致表单重复提交
2. 用户提交表单后, 点击【刷新】按钮表单导致重复提交
3. 用户提交表单后, 点击【后退】按钮回退到表单页面后进行再次提交

#### 总结:

---

常见的方法有四种:

- 方法一: 在提交请求但未响应期间禁用掉"提交"按钮 
- 方法二: 采用页面重定向, 在用户点击提交按钮之后, 转向一个新的页面, 提示用户提交成功.
- 方法三: 采用标志. 当用户请求一个表单时, 服务器端在发送页面的时候可以生成一个一次性Token, 跟随页面同时发送给客户端, 当客户端填好表单后, 点击提交按钮, 再次把这个Token发回给服务器端, 服务器对Token进行校验比对. - (案例: 有资金安全相关的场景 -> 如: 提交订单)
- 方法四: 利用服务器端的数据库. 在特别的业务可以在提交数据对应的字段添加唯一性约束来防止重复提交, 但是这样会增加数据库的压力. - (案例: 用户注册: 可以对注册账号或者注册手机号在数据库对应的表字段加唯一约束)
- 方法五: 在服务器网关的拦截器在接受请求时对请求资源进行加锁处理, 在请求处理结束对请求资源进行解锁处理 防止请求重复的重复提交.