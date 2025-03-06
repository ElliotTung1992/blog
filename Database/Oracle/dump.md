导出脚本:

```
#!/bin/bash
sqlplus -S / as sysdb <<EOF
CREATE OR REPLACE DIRECTORY DUMP_DIR AS 'directory_path';
GRANT READ, WRITE ON DIRECTORY DUMP_DIR TO <user_name>;
EOF

expdp <username>/<password>@<database_link> directory=DUMP_DIR dumpfile=dumpfile_name.dmp logfile=logfile_name.log schemas=<schema_name>
```

导出脚本说明:

```
sqlplus / as sysdba: 以sysdba身份登陆
-S: 表示静默模式(silent mode),在这种模式下, sqlplus不会显示任何提示信息或命令输出, 主要用于脚本模式, 适合自动化脚本执行.
CREATE OR REPLACE DIRECTORY DUMP_DIR AS 'directory_path'; 创建一个目录对象, 该对象指向系统中的一个目录
GRANT READ, WRITE ON DIRECTORY DUMP_DIR TO <user_name>; 创建目录后需授予用户访问该目录的权限.
username/password@database_link:你的数据库用户名和密码,以及数据库链接（如果有的话）
directory=directory_object:指定一个Oracle目录对象,该对象指向文件系统中的一个目录,用于存放导出的dump文件和日志文件.你需要有权限访问这个目录对象.
dumpfile=dumpfile_name.dmp:指定导出的文件名
logfile=logfile_name.log:指定日志文件的名称
schemas=schema_name:指定要导出的模式（schema）名称.如果需要导出多个模式,可以使用逗号分隔
```

导入脚本:

```
#!/bin/bash
sqlplus -S / as sysdb <<EOF
CREATE OR REPLACE DIRECTORY PUMP_DIR AS 'directory_path';
GRANT READ, WRITE ON DIRECTORY PUMP_DIR TO <user_name>;
EOF

impdp username/password@database DIRECTORY=directory_name DUMPFILE=dumpfile_name.dmp LOGFILE=logfile_name.log
```

导入脚本说明:

```
username/password@database:你的数据库用户名、密码和数据库服务名或SID
DIRECTORY:Oracle目录对象，用于指定数据文件和日志文件的存储位置。你需要有对该目录的写权限
DUMPFILE:要导入的.dmp文件名
LOGFILE:导入过程的日志文件名
```

