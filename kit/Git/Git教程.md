#### 1: 什么是Git?

Git是目前世界上最好的分布式版本控制系统.

1.1 工作原理/流程：

![gitFlowChart](https://raw.githubusercontent.com/LittleElliotTung1992/pic_bed/main/root/gitFlowChart.png)

- Workspace: 工作区: 就是你在本地电脑看到的工作目录, 比如目录下的xxx工程(.git隐藏目录版本库除外)
- Index/Stage: 暂存区
- Repository: 本地仓库: 工作区有一个隐藏目录.git, 这个不属于工作区, 这是版本库. 其中版本库里存在很多东西, 其中最重要的是stage(暂存区), 还有git自动为我们创建了第一个分支Master, 以及指向master分支的一个指针HEAD.
- Remote: 远程仓库: 如Github、Gitee、GitLab



1. git add: 就是把文件添加进去, 实际上就是把文件添加到暂存区
2. git commit: 实际上就是把暂存区所有的变更提交到当前分支上
3. git push: 将变更提交至远程仓库
4. git fetch: 拉取远程仓库所有变更
5. git clone: 克隆远程仓库至本地仓库
6. git pull: 拉取远程仓库的最新变更, 并与本地分支合并
7. git checkout branch_name: 切换分支 



#### 2: 常用命令操作

##### 2.1 创建版本库及常用提交命令

把目录变成git管理的仓库: git init.

把需要提交的文件添加到暂存区里: git add 文件名

把文件从暂存区撤销, 回到未被追逐的状态: git restore --staged filename

把暂存区的文件提交到本地仓库: git commit -m '提交信息'

撤销之前的commit: git reset --soft HEAD^.

查看是否有未提交的修改: git status.

查看文件的修改内容: git diff 文件名

把当前目录下的文件都加入到暂存区, 然后执行commit: git commit -a -m '提交信息'

##### 2.2 版本管理

查看git历史操作记录: git log

查看git精简版历史操作记录: git log --pretty=oneline

回退到上个版本: git reset --hard HEAD^

回退到上上个版本: git reset --hard HEAD^^

回退到之前的某个版本如之前的第100个版本: git reset --hard HEAD~100

查看所有操作的时序日志记录: git reflog.

回退/前进到某个特定的版本: git reset --hard '版本号'

##### 2.3 撤销修改及删除文件

丢弃工作区的修改: git checkout -- file文件名

删除文件: 删除文件;git add '删除的文件'; git commit

##### 2.4 stash隐藏本地变更

当前工作现场 ”隐藏起来”: git stash.

当前工作现场 ”隐藏起来”, 并设置注释: git stash save ‘注释’.

查看隐藏内容: git stash list.

清空隐藏内容: git stash clean.

恢复指定版本的隐藏内容, 并手动删除: git stash apply stash@{$num}, git stash drop stash@{$num}.

恢复并删除最新的隐藏内容: git stash pop.

##### 2.5 推送变更至远程服务

git push origin branch_name

##### 2.6 拉取远程服务最新变更至工作区

git pull



#### 3: 远程仓库

##### 3.1 设置公钥和私钥

创建SSH key, 找到用户目录下的.ssh目录下, 如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如没有直接执行命令: ssh-keygen -t rsa

id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人

设置: 登录github,打开” settings”中的SSH Keys页面，然后点击“Add SSH Key”,填上任意title，在Key文本框里黏贴id_rsa.pub文件的内容

##### 3.2 如何添加远程仓库

先有本地仓库, 后有远程仓库,  远程仓库和本地仓库关联

```git
echo "# gittest" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin git@github.com:ElliotTung1992/gittest.git
  git push -u origin main
```

只有远程仓库，可容远程仓库

```
git clone git@github.com:ElliotTung1992/gittest.git
```



#### 4: 分支操作

##### 4.1 创建和合并分支

创建并切换到dev分支: git checkout -b branch_name;

创建分支: git branch branch_name;

切换分支: git checkout branch_name;

查看分支: git branch;

推送分支到远程仓库: git push --set-upstream origin branch_name

合并某分支到当前分支: git merge branch_name

删除分支: git branch -d branch_name

删除远程分支: git push origin --delete branch_name

##### 4.2 分支策略管理

Fast Forward模式: 删除分支后会丢失分支信息

关闭Fast Forward模式: --no-ff禁用Fast Forward模式: git merge --no-ff branch_name



#### 5: 全局配置

##### 5.1 配置电子邮箱地址和用户名称

配置电子邮箱地址: git config --global user.email "your_email@example.com"

配置用户名称: git config --global user.name "Your Name"

查看git配置的用户名: git config user.name

查看git配置的邮箱: git config user.email



#### 6: 问题解决

##### 6.1 error: failed to push some refs to 'github.com:ElliotTung1992/blog.git'

现象: 在远程仓库新加README.md文件, 在本地工作区新增修改git push报错

原因: 本地仓库与远程仓库都有变更内容, 但是两份内容没有联系

解决: 先已远程仓库为基准pull, 再push

```
错误信息提示: hint: 'git pull ...') before pushing again.
git pull --rebase origin main
```

##### 6.2 Failed to connect to 127.0.0.1 port: 7890

查看是否使用代理: git config --global -l

取消代理: 

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```































