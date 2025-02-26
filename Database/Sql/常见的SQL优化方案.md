#### 数据库SQL常见优化手段

---

1. 尽量不要使用`select * from table`
2. `where`子句或者`order by`涉及的列尽量加索引
3. 避免在`where`子句中使用`!=或<>`操作符
4. 