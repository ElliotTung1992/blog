#### 登录认证

---

##### 互联网中常见的认证方式

1. 用户名和密码认证
2. 邮箱发送登录链接
3. 手机号接收验证码

#### Cookie-Session

---

##### Cookie

HTTP Cookie, 简称cookie, 是浏览网站时由网络服务器创建并由网页浏览器存放在用户计算机或其他设备的小本文件.

Cookie使Web服务器能在用户的设备存储状态信息或跟踪用户的浏览活动(如点击特定按钮、登录或记录历史);

##### Session

在计算机中, 尤其是在网络应用中, 成为"会话控制". Session对象存储特定用户会话所需的属性及配置信息. 

这样, 当用户在应用程序的Web页之间跳转时, 存储在Session对象中的变量将不会丢失, 而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web页时，如果该用户还没有会话，则Web服务器将自动创建一个 Session对象。当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。

##### Cookie - Session认证流程

![Cookie-Session](/Users/ganendong/Documents/design/export/Cookie-Session.png)

##### Cookie的特点

1. 存储位置: Cookie存储在浏览器端, 通常以文本文件的形式存储在本地文件系统中
2. 存储数据: 包含用户和网站的信息等, 以key-value的形式存储数据. 单个Cookie保存的数据不能超过4K
3. 用途: 用于实现用户身份验证, 跟踪用户行为, 存储用户偏好设置等
4. 生命周期: Cookie可以设置相对较长的生命周期, 比如记住密码.
5. 安全性: 因为Cookie存储在浏览器端, 存在恶意攻击和盗取的风险, 如果我们要在Cookie中存储机密数据必须加密处理

##### Session的特点

1. 存储位置: Session存储在服务端, 通常在内存中
2. 创建机制: 当用户第一次登录的时候, 服务器会为其创建一个唯一的会话标识(SessionID), 并将存储该信息的C ookie发送给浏览器端
3. 生命周期: Session的生命周期时间会比较短, 浏览器关闭或者Session超时都会失效
4. 安全性: Session相对安全, 因为存储在服务器端, 客户端服务篡改Session数据
5. 存储数据: 会话中通常用于存储用户的各种信息: 如用户身份, 权限等. Session可以存储的数据远高于Cookie

#### Token方案

---

##### Token的特点

1. 访问服务器时需要的资源凭证
2. Token的组成部分: 用户编号 + 过期时间 + 签名
3. 服务端无状态, 可扩展性好
4. 支持移动端
5. 安全
6. 支持跨域访问

##### Access Token

1. 客户端使用账号密码登录
2. 服务端验证账号密码
3. 服务端生成并颁发Token给客户端
4. 客户端把Token存储在Cookie或者LocalStorage里
5. 客户端每次请求服务器在header头里设置Token
6. 服务端验证Token, 验证成功后返回响应

##### Refresh Token

Access Token有效期一周

Fefresh Token有效期一个月

Refresh Token是专门用于刷新Access Token的Token. 

如果没有Refresh Token, 也可以刷新Access Token, 但是每次刷新都需要用户名和密码

如果有了Refresh Token, 不需要每次输入账号密码, 可以用Refresh Token去刷新Access Token.

#### JWT

---

##### JWT是什么

JWT的全称是Json Web Token. 是基于RFC 7519开放标准的, 它定义了一种紧凑且独立的方式, 用于在各方之间以JSON对象的形式安全地传输信息. 此信息可以用作验证和互相信任, 因为它是经过数据签名的.

JWT可以使用密钥(使用HMAC算法)或使用RSA或ECDSA的公钥/私钥对进行签名.

##### JWT的使用场景

使用JWT的两个使用场景:

- 授权: 这是使用JWT最常见的使用场景. 用户登录后, 服务器会颁发一个Token, 后续所有的请求都会包含这个Token, 允许携带这个Token的用户访问服务器. 单点登录是当今广泛使用JWT的一项功能, 因为它的开销很小, 并且支持跨域.
- 信息交换: JWT在多方之间进行信息通信也是非常便捷的. 因为JWT可以签名, 所以接收方可以确认发送者是否在授权范围之内, 并且可以通过计算验证内容是否被篡改.

##### JWT的数据结构

案例:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

该字符串由3部分组成, 中间通过.来分割, 三个部分分别是: Header、Payload、Signature

##### Header

Header的主要作用是用来标识, 通常由两部分组成:

- typ: type的简写, 令牌类型, 也就是JWT
- alg: algorithm的简写, 加密签名算法.

##### Payload

也称为JWT claims, 放置需要传输的信息, 可以分为三类:

- Registered claims: 这里有一组预定义的声明, 不是强制但是比较推荐.如: issuer, expiration time, subject, audience等
- Public claims: 可以随意定义
- Private claims: 用于发布者和接受者以私有的方式通信的信息

##### Signature

signature部分是对Header和Payload两部分的签名, 作用是防止JWT被篡改, 这个部分的生成规则为代码是:

```
Header中定义的签名算法(
		base64编码(header) + "." + base64编码(payload),
		secret
)
```

secret是存放在服务器端加密使用到的盐.

##### 特点:

1. 无状态: Token存储在客户端, 完全是无状态的.
2. 可扩展性好: 因为Token是无状态的, 相对与Session来说不需要把用户请求打到指定的服务器上.
3. 安全性: 相对于Cookie来说, 可以有助于防止CSRF攻击.
4. 一次性: Token一旦颁发出去就不能收回

##### 扩展:

1. 一次性Token实现: 每次颁发一次Token就存储在服务器缓存中, 认证一次就从缓存服务器中删除
2. Token撤销: 根据相同的授权规则可以使特定的一个或一组Token失效

#### SSO

---

在企业发展初期, 企业使用的系统很少, 通常是一个或者多个, 每个系统都有自己的登录模块, 运营人员每天用自己的账号密码登录, 还是很方便.

但随着企业的发展, 公司的系统越来越多, 运营人员需要在不同的系统之间来回登录, 这样对运营人员的体验就非常不好.

单点登录英文全称Single Sign On, 简称就是SSO.

主要的应用场景是: 在多个互相信任的应用系统之间, 只需要登录任意其中一个系统, 就可以访问其他任意互相信任的应用系统.

##### 同域下的单点登录

一个企业一般情况下只有一个域名比如:github.com, 我们可以通过二级域名区分不同的系统: app1.github.com app2.github.com等等, 我们需要一个单点登录系统比如: sso.github.com

解决方案:

用户登录之后, 我们可以将Cookie的域设置为顶域. 用户访问子域中的任意一个系统, 都会带上对应的Cookie.

##### 不同域下的单点登录

![CAS_Browser_Single_Signon_Sequence_Diagram](/Users/ganendong/Documents/design/export/CAS_Browser_Single_Signon_Sequence_Diagram.png)

CAS官网上的标准流程, 具体流程如下:

第一次访问APP系统:

1. 用户访问APP系统, APP系统校验是否登录, 校验当前用户未登录
2. 重定向到SSO登录系统, SSO系统校验未登录, 跳转到登录页面
3. 用户在登录页面填写账号密码提交验证, SSO系统认证通过之后, 创建对应的Session, 并返回SSO域的Cookie.
4. SSO系统会生成一个(ST)Service Ticket, 然后跳转之前访问的页面(访问APP)并将ST传递过去
5. APP系统接收到请求后, 发现携带ST, 就向SSO系统验证ST是否有效
6. 验证通过后, APP系统创建对应的Session, 并设置APP域名的Cookie.

第二次访问APP系统

1. 再次访问APP系统就会携带APP域名对应的Cookie, 能找到对应的Session无需再登录

第一次访问APP2系统

1. 用户访问APP2系统, APP2系统判断未登录, 跳转到SSO
2. 跳转SSO系统携带SSO域名的Cookie, 无需重新认证
3. SSO颁发ST, 浏览器重新跳转访问APP2系统, 并将ST传递给APP2系统
4. APP2系统接收到ST之后访问SSO验证ST的有效性
5. 验证成功之后, APP2系统创建对应的Session, 并设置APP2域名的Cookie.

#### OAuth2

---



#### 方案比较

---

##### Cookie-Session需要注意的问题

Cookie

1. Cookie存储在客户端, 存在被盗取和篡改的风险, 重要数据不应存储在Cookie中, 如果存储则需要加密
2. 不存储敏感数据, 比如用户密码, 账户余额等信息
3. 对Cookie的属性httpOnly设置为true
4. 尽量减少Cookie存储的数据, 单个Cookie的体积不能超过4KB
5. 设置正确的domain和path, 减少数据传输
6. **cookie无法跨域**
7. 一个浏览器针对一个网站最多只能存储20个Cookie, 浏览器一般只允许存放300个Cookie
8. 移动端对Cookie的支持不是很好, 通常使用Token而不是Cookie

Session

1. Session存储在服务器端, 当用户同时在线比较多时, Session会占用很多的内存, 需要定期去清理过期的Session释放内存
2. 当我们的系统采用的是集群部署的时候, 就会有Session共享的问题. 因为Session是单个服务器创建的, 但是客户的后续请求不一定访问创建Session的服务器, 那么该服务器就不存在对应的Session了.
3. 当多台后端服务器的Session采用Session共享时, 还会出现跨域问题. 因为不同的应用可能部署的主机不一样, 需要处理好cookie跨域问题.
4. sessionId通常时存储在Cookie中的, 加入浏览器禁用Cookie或不支持Cookie怎么办?一般会把sessionId跟在URL参数后面即重写URL, 所有session不一定非要靠cookie实现.

##### Token需要注意的问题

1. Token可以存储在缓存服务器中
2. Token完全由服务器管理, 不存在跨域问题
3. Token可以避开CSRF攻击(不需要Cookie了)
4. 移动端对Token的支持就很好

##### JWT需要注意的问题

1. JWT不依赖Cookie, 所以不存在跨域问题
2. JWT默认的payload数据是不加密的,  不要讲未加密的机密数据直接放在payload中
3. JWT不仅可以用于身份的认证还可以用作数据交互, 合理使用JWT可以减少数据库查询
4. JWT最大优势时服务器不再需要存储Session, 使得服务器认证鉴权业务可以方便扩展.但是这也导致在使用过程中无法废弃某个Token或者更改Token的信息. 也就是说一旦JWT签发了, 到期之前始终有效, 除非服务器增加额外逻辑.
5. JWT本身包含了认证信息, 一旦泄露, 任何人都可以获取该JWT的所有权限. 为了减少泄露风险, JWT设置的有效时间应该短一点.
6. JWT适合一次性Token的场景, 颁发一个有效期极短的JWT, 即使泄露了危险性也很小, 由于每次操作都会生成新的JWT, 因此也没必要保存JWT, 实现真正的无状态.
7. 为了减少盗用, JWT不应该使用HTTP协议明码传输, 要使用HTTPS协议传输.

#### CORS

---

CORS, 全称Cross-Origin Resource Sharing, 是一种允许当前域的资源(html/js/web service)被其他域的脚本请求访问的机制, 通常由于同域安全策略浏览器会禁止这种跨域请求.

##### 什么是同源策略：

同源策略(Same-origin policy)是指在Web浏览器中, 允许某个网页脚本访问另一个网页的数据, 但前提是这两个网页必须有相同的URI、主机名和端口号, 一旦两个网站满足上诉条件, 这两个网站就被认定为具有相同来源. 此策略可防止某个页面上的恶意脚本通过该页面的文档对象模型访问另一个网页上的敏感数据.

同源策略对web应用程序具有特俗意义, 因为Web应用程序广泛依赖于HTTP cookie来维持用户会话, 所以必须将不相关的网站严格分隔, 以防止数据泄露.

值得注意的是同源策略仅使用于脚本, 这意味着某些网站可以通过相应的HTML标签访问不同来源网站上的图像、CSS、动态加载脚本等资源.

而跨站请求伪造就是利用同源策略不使用HTML标签的缺陷.

不是同源的案例:

1. 端口不同
2. 域名不同
3. 协议不同(http/htps)

##### 如何解决跨域问题:

只需要被访问的接口的返回头中设置"Access-Control-Allow-Origin"参数即可以解决跨域问题.

此参数就是用来表示跨域访问的原始域名的, 当设置为"*"时, 表示允许所有站点跨域访问.

##### Cookie的三级域名

Cookie在不同域名之间是无法共享的, 即跨域问题! 但是在顶级域名、二级域名、三级域名中是可以共享的.

顶级域名: domain.com

二级域名: super.domain.com

三级域名: big.super.domain.com

#### CSRF攻击

---

##### 跨站请求伪造:

跨站请求伪造(Cross-site request forgery), 也被称为one-click attcak或者session riding, 通常缩写为CSRF或者XSRF, 是一种挟持用户在当前已登录的Web应用程序上执行非本意的操作的攻击手段.

CSRF利用的是网站对用户网页浏览器的信任.

这利用了web中用户身份认证的一个漏洞: 简单的身份验证只能保证请求发自某个用户的浏览器, 却不能保证请求本身是用户自愿发出的.

##### 防御措施：

1. 检查Referer字段: HTTP头中有一个Referer字段, 这个字段用于标明请求来源于哪个地址. 在处理敏感数据请求时, 通常来说, referer字段应和请求的地址位于同一域名下.
2. 添加校验Token:访问敏感数据请求时, 要求用户浏览器提供不保存在Cookie里, 并且攻击者无法伪造的数据作为校验, 那么攻击者就无法再进行CSRF攻击. 

#### CSS攻击

---

XSS攻击通常指的是通过利用网页开发时留下的漏洞, 通过巧妙的方法注入恶意指令代码到网页, 使用户加载并执行攻击者恶意制造的网页程序. 这些恶意网页程序通常是JavaScript, 但实际上也可以包括Java、VBScript、ActiveX、Flash或者甚至是普通的HTML. 攻击成功后, 攻击者可能得到包括但不限于更高的权限、私密网页内容、会话和cookie等各种内容.

##### 防御措施：

Cookie设置httponly属性为True, 用于限制Cookie的访问权限.浏览器将禁止通过JavaScript访问和修改Cookie, 从而有效防止一些常见的攻击, 例如跨站脚本攻击(XSS).



##### 思考:

1. 限制单个账号的在线人数







































