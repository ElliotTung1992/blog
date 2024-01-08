#### 跨站伪造请求

挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方式

跨站请求伪造(Cross-site request forgery), 也被称为one-click attack或者session riding, 通常缩写为CSRF或者XSRF, 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法. 跟跨网站脚本(XSS)相比, XSS利用的是用户对指定网站的信任, CSRF利用的是网站对用户网页浏览器的信任.

##### 攻击细节

跨站请求攻击, 简单地说, 是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作(如发邮件, 发消息, 甚至财产操作如转账和购买商品). 由于浏览器曾经验证过, 所以被访问的网站会认为是真正的用户操作而去执行. 这利用了web中用户身份认证的一个漏洞: 简单的身份验证只能保证请求发自某个用户的浏览器, 却不能保证请求本身是用户自愿发出的.

##### 防御措施

1. 尽量使用POST
2. 假如验证码
3. 验证Referer
4. Anti CSRF Token