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

