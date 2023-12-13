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



#### 2: 常用命令操作

##### 2.1 创建版本库及常用提交命令

把目录变成git管理的仓库: git init.

把需要提交的文件添加到暂存区里: git add 文件名

把暂存区的文件提交到本地仓库: git commit -m '提交信息'

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







































