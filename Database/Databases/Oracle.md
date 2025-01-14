#### Oracle数据库操作

---

##### 操作数据库

1. 以Oracle身份登录数据库, 输入命令: su - oracle
2. 进入SqlPlus控制平台, 输入命令: sqlplus /nolog
3. 以系统管理员登录, 输入命令: connect /as sysdba
4. 重启数据库: startup
5. 关闭数据库: shutdown immediate
6. 退出sqlplus控制台: exit

##### 操作监听器

1. 登入监听器控制台: lsnrctl
2. 查看监听器状态: status
3. 重启: reload
4. 启动监听器: start
5. 停止监听器: stop
6. 查看日志: viewlog