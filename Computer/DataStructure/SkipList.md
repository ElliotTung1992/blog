##### 什么是跳表

在计算机科学中, 条约列表是一种数据结构. 它使得包含n个元素的有序链表的查找和插入操作的平均时间复杂度是O(log n), 优于数组的O(n)复杂度.

快速的查询效果是通过维护一个多层次的链表实现, 且与前一层(下面一层)链表元素的数量相比, 每一层链表中的元素的数量更少. 一开始时, 算法在最稀疏的层次进行搜索, 直至需要查找的元素在该层两个相邻的元素中间. 这时, 算法将跳转到下一个层次, 重复刚才的搜索, 直到找到需要查到的元素为止. 跳过的元素的方法可以是随机性选择或确定性选择.

##### 链表

链表(Linked List)是一种基本的数据结构, 用于表示一组元素, 这些元素按顺序排列, 每个元素都与下一个元素连接.与数组不同, 这些元素按顺序排列, 没个元素都与下一个元素连接.

与数组不同, 链表的元素不是在内存中连续存储的, 而是通过指针来连接的.

链表由节点(Node)组成, 每个节点包含两个主要部分: 数据和指向下一个节点(或上一个节点, 如果是双向链表)的引用(指针).

问题:

如果有序链表中有10个元素, 如果我要查找最后一个元素, 只能从头开始遍历链表, 直到找到我们要找的元素.

这样的查询效率就非常低, 平均时间复杂度是O(n).

如何优化？

我们从链表中每两个元素抽出来构成新的链表, 组成一级索引,一级索引指向原始链表. 

以此类推就构成了一个跳表.

总结: 跳表就是可以实现二分查找的有序链表.

##### 时间复杂度

时间复杂度 = 索引的高度 * 每层索引需要遍历的个数

假设每两个节点会抽出一个节点作为上一级索引的节点, 原始链表有n个元素, 则一级索引有n/2个元素, 二级索引有n/4个元素, k级索引有2/(n的k次方)个元素, 最高层索引一般有2个元素.

即最高索引h满足 2 = n/(2的h次方), 即 h = log2n -1, 最高级索引 h 为索引层的高度加上原始数据一层，跳表的总高度 h = log2n

每层索引需要遍历的个数: 二分查找每层最多遍历2次

跳表的索引高度 h = log2n，且每层索引最多遍历 2 个元素。所以跳表中查找一个元素的时间复杂度为 O(2*logn)，省略常数即：O(logn)

##### 空间复杂度

假设原始链表包含n个元素, 则一级索引元素个数为 n/2、二级索引元素个数为 n/4、三级索引元素个数为 n/8 以此类推。所以，索引节点的总和是：n/2 + n/4 + n/8 + … + 8 + 4 + 2 = n-2，**空间复杂度是 O(n)**.

##### 插入数据

插入数据如何更新索引?

1. 每次新增删除原来所有老索引再新建 - 耗性能
2. 随机算法更新索引

##### 删除数据

删除数据的同时删除索引

##### 总结

1. 跳表是可以实现二分查找的有序链表
2. 每个元素插入时随机生成它的level
3. 最底层链表包含所有的数据
4. 如果一个元素出现在level(x), 那么它肯定出现在x以下的level中
5. 每个索引包含两个指针, 一个向下, 一个向右
6. 跳表的查询、插入和删除的时间复杂度为0(log n), 与平衡二叉树接近



##### 使用场景

1. Redis中的有序数组(zset)



























