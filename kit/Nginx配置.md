1. 设置服务器监听的端口和文档根目录

```
server {
    listen       80;
    server_name  localhost;
 
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

2. 配置反向代理

```
server {
    listen       80;
    server_name  localhost;
 
    location / {
        proxy_pass http://upstream_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

3. 配置SSL/TLS

```
server {
    listen       443 ssl;
    server_name  localhost;
 
    ssl_certificate      /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key  /etc/nginx/ssl/nginx.key;
 
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

4. 配置负载均衡

```
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
}
 
server {
    listen       80;
    server_name  localhost;
 
    location / {
        proxy_pass http://backend;
    }
}
```

5. 配置静态文件缓存

```
server {
    listen       80;
    server_name  localhost;
 
    location ~* \.(jpg|jpeg|png|css|js|ico|html)$ {
        expires 30d;
    }
}
```

6. 配置日志记录

```
server {
    listen       80;
    server_name  localhost;
 
    access_log  /var/log/nginx/host.access.log;
    error_log  /var/log/nginx/host.error.log;
 
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

7. 配置重定向

```
server {
    listen       80;
    server_name  localhost;
 
    location / {
        rewrite ^/foo$ /bar last;
    }
}
```

8. 配置IP访问限制

```
server {
    listen       80;
    server_name  localhost;
 
    location / {
        allow 192.168.1.0/24;
        deny all;
    }
}
```



##### Nginx配置文件格式：

```
main block: 主配置段, 即全局配置段, 对http和mail都有效

# 事件模块相关参数
events {

}
# http/https协议相关配置
http {

}
# mail协议相关配置
mail {

}
# stream服务器相关配置
stream {

}
```

##### nginx默认配置文件：

```
user www-data;
worker_processes auto; # 工作进程数
pid /run/nginx.pid; # pid文件位置
include /etc/nginx/modules-enabled/*.conf;

# 事件模块
events {
	worker_connections 768; # 每个进程最大连接数
	# multi_accept on;
}

# http/https模块
http {

	##
	# Basic Settings
	##
	
	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	# server_tokens off;
	
	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;
	
	include /etc/nginx/mime.types;
	default_type application/octet-stream;
	
	##
	# SSL Settings
	##
	
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;
	
	##
	# Logging Settings
	##
	
	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;
	
	##
	# Gzip Settings
	##
	
	gzip on;
	
	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
	
	##
	# Virtual Host Configs
	##
	
	# http模块子配置文件
	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


#mail {

#	# See sample authentication script at:

#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript

#

#	# auth_http localhost/auth.php;

#	# pop3_capabilities "TOP" "USER";

#	# imap_capabilities "IMAP4rev1" "UIDPLUS";

#

#	server {

#		listen     localhost:110;

#		protocol   pop3;

#		proxy      on;

#	}

#

#	server {

#		listen     localhost:143;

#		protocol   imap;

#		proxy      on;

#	}

#}
```



##### http模块

1. server模块: 用于配置http服务器的具体行为, 包括监听的端口, 虚拟主机的配置, 请求处理逻辑等
2. location模块: 用于指定不同URL请求的处理方式, 例如静态文件服务、反向代理等
3. upstream模块: 用于配置反向代理的目标服务器列表
4. include指令: 用于引入其他的子配置文件, 可以将一些通用的配置项单独放在一个文件中, 然后通过include指令引入.



##### 全局配置模块

工作进程数优化：

worker_processes: auto

通过使用auto参数, Nginx可以根据系统的负载情况智能地分配工作进程, 以提供更好的性能和资源利用率.

worker_priority -20; - 设置工作进程优先级

worker_cpu_affinity 01 10; - 用于控制woker进程与CPU的亲和性关系

worker_rlimit_nofile 65536 调试工作进程打开文件的个数

系统默认项修改:

1.临时修改方案 - 当前会话有效:

ulimit -n 70000

ulimit -a

2.永久修改, 修改pam认证模块

```
vim /etc/security/limits.conf
#在最后加入

*                soft    core            unlimited
*                hard    core            unlimited
*                soft    nproc           1000000
*                hard    nproc           1000000
*                soft    nofile          1000000
*                hard    nofile          1000000
*                soft    memlock         32000
*                hard    memlock         32000
*                soft    msgqueue        8192000
*                hard    msgqueue        8192000

`nproc`（最大进程数限制）的软限制和硬限制都设置为 1000000，当前用户在单个会话中可以创建的最大进程数为 1000000

`nofile`（打开文件描述符限制）的软限制和硬限制都设置为 1000000，这意味着当前用户在单个会话中可以使用的最大文件描述符数将被限制为 1000000。软限制是软性限制，用户可以根据需要进行调整，而硬限制是硬性限制，一旦设定，用户无法超过该限制

`memlock`（锁定内存限制）的软限制和硬限制都设置为 32000，这意味着当前用户在单个会话中可以锁定的最大内存量为 32000KB

`msgqueue`（消息队列限制）的软限制和硬限制都设置为 8192000，这意味着当前用户在单个会话中可以使用的最大消息队列大小为 8192000字节
```

```
# 重启生效
reboot
```

关闭master-worker工作模式

```
master_process off|on;
```



##### events模块

在Nginx的主配置文件中, events部分用于配置Nginx服务器的事件模块相关参数, 控制Nginx服务器在处理连接请求时的行为.

```
events {
   worker_connections  65536;  #设置单个工作进程的最大并发连接数
   use epoll;
   #使用epoll事件驱动，Nginx支持众多的事件驱动，比如:select、poll、epoll，只能设置在events模块中设置。
   accept_mutex on; 
   #on为同一时刻一个请求轮流由work进程处理,而防止被同时唤醒所有worker,避免多个睡眠进程被唤醒的设置，默认为off，新请求会唤醒所有worker进程,此过程也称为"惊群"，因此nginx刚安装完以后要进行适当的优化。建议设置为on
   multi_accept on; 
   #ON时Nginx服务器的每个工作进程可以同时接受多个新的网络连接，此指令默认为off，即默认为一个工作进程只能一次接受一个新的网络连接，打开后几个同时接受多个。建议设置为on
}
```



##### http模块设置

1. include: 引入其他配置文件, 通常用于加载MIME类型配置文件
2. default_type: 指定默认的MIME类型
3. server: 定义一个或多个虚拟主机
4. listen: 指定该虚拟主机监听的端口
5. server_name: 指定域名, 用于匹配请求的主机头
6. root: 指定虚拟主机的根目录
7. location: 用于匹配不同的URL, 并定义相关配置规则

设置支持的文件类型:

include    mime.types



##### mine

在Nginx中, mime是一种配置指令, 用于设置MIME类型与文件扩展名的映射关系

```
# 查看当前Nginx服务器配置的MIME类型列表
cat /etc/nginx/mime.types
```



##### root

在Nginx配置中, root指令用于设置虚拟服务器块的根目录, 即指明软件的根目录

```
指定了该服务块的根目录是/var/www/html
访问该服务器的网站时, Nginx会在/var/www/html文件夹中查找并提供相应的静态文件
root /var/www/html;
```































