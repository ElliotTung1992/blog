#### Linux安装nginx

##### 1. 安装依赖包:

```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

##### 2. 下载并解压安装包

```
cd /usr/local
mkdir nginx
cd nginx
//下载tar包
wget http://nginx.org/download/nginx-1.13.7.tar.gz
tar -xvf nginx-1.13.7.tar.gz
```

##### 3. 安装Nginx

```
//进入nginx目录
cd /usr/local/nginx
//进入目录
cd nginx-1.13.7
//执行命令
./configure
//执行make命令
make
//执行make install命令
make install
```

##### 4. 配置nginx

```
# 打开配置文件
vi /usr/local/nginx/conf/nginx.conf
```

