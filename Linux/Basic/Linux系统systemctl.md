#### Linux systemctl命令

---

Linux Systemctl是一个系统管理守护线程、工具和库的集合，用于取代System V、service和chconfig命令，初始进程主要负责控制systemd系统和服务管理器。

通过Systemctl Chelp可以看到该命令主要分为：查询或发送控制命令给systemd服务，管理单元服务的命令，服务文件的相关命令，任务、环境、快照相关命令，systemd服务的配置重载，系统开机关机相关的命令.

##### 路径区别 - /usr/lib/systemd/system和/etc/systemd/system:

- /usr/lib/systemd/system路径: 对于那些支持systemd的软件，安装的时候，会自动在这个目录添加一个配置文件

- /etc/systemd/system路径: 对于非软件包形式的临时软件安装，系统管理员应将文件手动放置在这个目录

注意: 开机自启动脚本可以在/etc/systemd/system或者/usr/lib/systemd/system目录下配置，当两个环境都配置的情况下，/etc/systemd/system的配置优先



#### 服务文件

---

##### 服务文件的组成部分

1. [Unit]部分: 包含服务的元数据和依赖关系
2. [Service]部分: 定义服务的运行参数，如启动命令、工作目录、环境变量等
3. [Install]部分: 定义服务安装时的行为，如服务应该被哪个目标启动

##### [Unit] 单元

| 名称          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| Description   | 服务描述                                                     |
| Documentation | 文档描述                                                     |
| After         | 指定服务启动的顺序, 服务将在列出的单元之后启动               |
| Before        | 参After                                                      |
| Requires      | 指定服务启动**所需**的其他服务单元, 如果这些服务**未运行**，Systemd将**尝试启动**它们 |
| Wants         | 指定服务**希望启动**的其他服务单元，但**不强制**要求, 这是软依赖，即使这些服务未运行，也不会阻止当前服务的启动 |
| Refuses       | 指定服务**不希望启动**的其他服务单元, 是用于防止某些服务启动的**软策略** |
| BindsTo       | 指定服务**绑定到**的其他服务单元, 如果**绑定**的服务**未运行**，当前**服务**也**不会启动** |
| PartOf        | 指定服务**所属的**更大的服务单元组, 这通常用于表示服务是**某个更大系统的一部分** |

##### [Service] 单元

| 名称              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| Type              | 定义服务的类型，例如simple、forking、oneshot、notify或dbus，Type指定了Systemd如何管理服务进程. |
| ExecStart         | 指定启动服务时执行的命令或脚本. 这是服务启动时运行的主要命令. |
| ExecStop          | 指定停止服务时执行的命令或脚本. 这个命令通常用于清理资源或正常关闭服务. |
| ExecReload        | 指定重新加载服务配置时执行的命令. 这通常用于应用服务配置的更改而不停止服务. |
| Restart           | 定义服务失败时的重启策略, 例如on-failure、always、never等.   |
| RestartSec        | 定义服务重启前的等待时间, 单位是秒.                          |
| TimeoutStartSec   | 定义服务启动超时的时间, 单位是秒.                            |
| TimeoutStopSec    | 定义服务停止超时的时间, 单位是秒.                            |
| PIDFile           | 指定服务进程ID文件的路径. Systemd将使用这个文件来跟踪服务的进程ID. |
| User              | 指定运行服务的用户名称                                       |
| Group             | 指定运行服务的用户组                                         |
| Environment       | 设置服务运行时的环境变量                                     |
| EnvironmentFile   | 指定一个文件, 其中的键值对将被设置为服务的环境变量           |
| WorkingDirectory  | 指定服务进程的工作目录                                       |
| StandardInput     | 指定服务的标准输入源，例如tty或null                          |
| StandardOutput    | 指定服务的标准输出目标，例如journal、console或file           |
| StandardError     | 指定服务的标准错误输出目标，通常与StandardOutput相同         |
| SuccessExitStatus | 定义服务进程退出时被认为是成功的退出状态码                   |
| RemainAfterExit   | 如果设置为yes，即使服务的主进程退出，Systemd也会认为服务仍在运行 |

Type:

1. simple

   > 这是默认的服务类型，适用于大多数服务。simple 类型的服务通常启动一个单一的进程，并且这个进程会一直运行直到被停止。Systemd会根据ExecStart指令启动服务，并在ExecStop指令指定的命令被执行时停止服务

2. oneshot

   > 这种类型的服务执行一次性任务，启动后立即退出。Systemd会等待服务进程退出，然后自动认为服务已经启动并完成。oneshot 类型的服务通常用于不需要长时间运行的任务

3. idle

   > 这种类型的服务在系统空闲时运行。它们通常用于执行不需要实时响应的任务，如系统维护或日志分析

4. forking

   > 适用于传统的Unix守护进程，这些守护进程在启动时会fork一个子进程，然后父进程立即退出。Systemd会等待父进程退出，然后继续启动其他服务。如果父进程没有退出，Systemd会认为服务启动失败

5. notify

   > 类似于simple，但服务进程会在完成初始化并准备好接收请求时发送一个通知。这允许Systemd更好地并行化服务的启动过程。如果服务没有发送通知，Systemd会认为服务启动失败

##### [Install]单元

- WantedBy

  > 这个指令指定了服务单元文件应该被安装到哪个或哪些.target文件的.wants目录下. 当Systemd启动到达指定的.target时, 它会查看该.target的.wants目录下的所有服务单元文件, 并启动它们.
  >
  > 如果你想让服务在系统进入多用户文本模式时启动, 你可以设置`WantedBy=multi-user.target`

##### target文件的作用

1. 定义系统状态: .target文件定义了系统启动或运行时**应该**达到的**状态**，例如多用户模式、图形界面模式或维护模式。
2. 管理服务依赖: 通过Requires和Wants指令，.target文件可以指定**一组服务**的启动顺序和依赖关系。
3. 控制服务激活: 通过WantedBy指令，.target文件可以控制服务是否应该在系统启动时**自动激活**。

##### 常见的tartget

| 名称              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| graphical.target  | 代表图形用户界面（GUI）的目标状态。在这个状态下，系统会启动X窗口系统和桌面环境，提供图形界面供用户操作。 |
| multi-user.target | 代表多用户文本模式的状态。在这个状态下，系统允许多个用户通过文本终端登录，但不启动图形界面。 |
| rescue.target     | 用于系统恢复的目标状态。在这个状态下，系统会启动一个最小化的环境，通常用于修复系统问题或恢复丢失的数据 |
| emergency.target  | 用于紧急恢复的目标状态。当系统无法正常启动时，可以进入这个状态进行故障排除。在这个状态下，系统通常只提供基本的命令行界面。 |
| network.target    | 网络服务已完成启动                                           |



#### systemctl服务管理

---

1. 列出所有可用的单元

```
systemctl list-unit-files
```

2. 列出所有运行中的单元

```
systemctl list-units
```

3. 检查某个服务是否是开机自启动的，设置服务开机启动，关闭服务开机启动

```
systemctl is-enabled name.service
systemctl enable name.service
systemctl disable name.service
```

4. Linux中启动、重启、停止、重载以及检查服务状态

```
systemctl start name.service
systemctl status name.service
systemctl restart name.service
systemctl stop name.service
systemctl reload name.service
```

5. 重新加载Systemd配置: 在创建或修改文件后需要执行

```
systemctl daemon-reload
```





























