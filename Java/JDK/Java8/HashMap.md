#### HashMap的put逻辑

---

相关源码:

```
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // 初始化操作
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 非Hash冲突的场景 - 直接插入
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    // Hash冲突的场景    
    else {
        Node<K,V> e; K k;
        // 判断数组下标对应的节点是否就是当前输入的节点
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 处理红黑树
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 处理链表
        else {
            for (int binCount = 0; ; ++binCount) {
            		// 在链表中未找到相同key的元素, 则新增
                if ((e = p.next) == null) {
                		// 在链表后新增节点
                    p.next = newNode(hash, key, value, null);
                    // 如果链表的长度超过惊扰起始点, 则链表进行树化
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                // 在链表中找到相同key的元素
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        // 如果hashMap中之前存在该key对应的元素则把新值替换成旧值返回
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    // 判断是否需要扩容
    if (++size > threshold)
    		// 超过阀值, 进行扩容
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

树化:

```
// 树化门槛
static final int TREEIFY_THRESHOLD = 8;
// 如果链表的长度超过树化门槛, 则链表转换为红黑树
if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
		treeifyBin(tab, hash);
```

链化:

```
// 链化门槛
static final int UNTREEIFY_THRESHOLD = 6;
// 如果当前链表的长度小于链化门槛, 则红黑树会退化成链表
if (lc <= UNTREEIFY_THRESHOLD)
  	tab[index] = loHead.untreeify(map);
```



#### HashMap是如何扩容的?

---

HashMap相关代码:

```
// 负载因子
float lf = fields.get("loadFactor", 0.75f);
// 扩容门槛值, 当数组的值大于这个门槛值时则进行扩容
float ft = (float)cap * lf;
threshold = ((cap < MAXIMUM_CAPACITY && ft < MAXIMUM_CAPACITY) ?
             (int)ft : Integer.MAX_VALUE);
if (++size > threshold)
            resize();
```



#### 扩容后的元素如何存放

---

在JDK1.8中, 对HashMap进行了优化

HashMap在进行resize(扩容)之后, 元素的位置要么在原来的位置上, 要么在原位置再移动2次幂的位置

```
// 计算元素在数据的下标
tab[i = (n - 1) & hash])
// HashMap数组的扩容逻辑,新数组的长度是原数组的2倍
newThr = oldThr << 1;
// 元素的hash值和老数组的长度进行与运算
// 关键位运算刚好是老数组长度的最高位
// 如果计算结果为1则元素的新位置为newTab[j + oldCap] = hiHead;
// 如果计算结果为0则元素的位置不变
if ((e.hash & oldCap) == 0) {
    if (loTail == null)
        loHead = e;
    else
        loTail.next = e;
    loTail = e;
}
else {
    if (hiTail == null)
        hiHead = e;
    else
        hiTail.next = e;
    hiTail = e;
}
if (loTail != null) {
    loTail.next = null;
    newTab[j] = loHead;
}
if (hiTail != null) {
    hiTail.next = null;
    newTab[j + oldCap] = hiHead;
}
```

