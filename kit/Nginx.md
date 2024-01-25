##### Mac系用Nginx的安装:

brew search nginx.

brew install nginx.

brew uninstall nginx.

查看安装信息: brew info nginx

查看Nginx是否安装成功并检查其版本: nginx -v

查看Nginx是否在运行: ps -ef | grep 'nginx'

启动Nginx服务: brew services start nginx

停止Nginx服务: brew services stop nginx

重启Nginx服务: brew services restart nginx

##### Nginx文件和目录

查看Nginx安装信息: brew info Nginx.

安装目录: **/opt/homebrew/Cellar/nginx/1.25.3**

根目录: **/opt/homebrew/var/www**

日志目录: **/opt/homebrew/var/log/nginx**

配置文件: **/opt/homebrew/etc/nginx/nginx.conf**

服务文件: **/opt/homebrew/etc/nginx/servers/**

/etc/nginx 目录是NGINX服务器的默认配置根

/etc/nginx/nginx.conf 文件是NGINX服务使用的默认配置入口点.

/var/log/nginx 目录是NGINX的默认日志位置

##### NGINX命令

nginx -h: 显示Nginx帮助菜单

nginx -v: 显示Nginx版本

nginx -v: 显示Nginx版本、build信息和配置参数

等等 

##### 提供静态内容

server {
        listen 80;
        server_name www.elliot.com;
        location / {
            root   /opt/homebrew/var/www;
            index  index.html index.htm;
        }

}

此配置通过HTTP在端口80上从目录/opt/homebrew/var/www提供静态文件.

##### 优雅重载

nginx -s reload

通过在不终止服务器的情况下重载NGINX配置, 您将能够动态更改配置, 同时又不丢失任何数据包.



#### 高性能负载均衡

##### HTTP负载均衡























