Linux pstree(英文全称: display a tree of process)命令将所有进程以树状图显示, 树状图会以pid(如果有指定)或是以init这个歌基本进程为根(root), 如果有指定使用者 id, 则树状图会只显示该使用者所拥有的进程.

**语法:**

```
pstree [-a] [-c] [-h|-Hpid] [-l] [-n] [-p] [-u] [-G|-U] [pid|user]

pstree -V
```

**参数说明:**

- -a 显示该进程的完整指令及参数, 如果是被记忆体置换出去的进程则会加上括号
- -c 如果有重覆的进程名, 则分开列出（预设值是会在前面加上 *）

**实例:**

显示进程的关系:

```
pstree
```

特别表明在运行的进程:

```
pstree -apnh
```

