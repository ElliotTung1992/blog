#### Linux chage

---

chage命令用于密码的实效管理, 可以修改账号和密码的有效期限.

该命令用于确定用户何时必须修改密码, 系统使用这些信息来决定用户何时必须修改其密码.

##### 语法:

```
chage [options] LOGIN
```

其中，LOGIN 是用户名。如果不指定任何选项，chage 会以交互方式运行，提示用户所有字段的当前值。输入新值以更改字段，或将该行留空以使用当前值。

主要选项及其功能:

- `-d, --lastday LAST_DAY`：将最近一次密码设置时间设为LAST_DAY。LAST_DAY可以是距离1970年1月1日后的天数，也可以是YYYY-MM-DD格式的日期。如果LAST_DAY为0表示用户在下次登录时必须更改密码。‌12
- `-E, --expiredate EXPIRE_DATE`：将账户过期时间设为EXPIRE_DATE。EXPIRE_DATE可以是距离1970年1月1日后的天数，也可以是YYYY-MM-DD格式的日期。如果EXPIRE_DATE为-1则表示账户永不过期。
- `-m, --mindays MIN_DAYS`：将两次改变密码之间相距的最小天数设为MIN_DAYS。此字段为0表示用户可以随时更改其密码。
- `-M, --maxdays MAX_DAYS`：将两次改变密码之间相距的最大天数设为MAX_DAYS。此字段为-1表示取消检查密码的有效性。
- `-W, --warndays WARN_DAYS`：将密码过期警告天数设为WARN_DAYS。此选项用于在密码过期前提前收到警告信息。

##### 案例:

```
# 用户SamAltnan下次登录必须修改密码：
chage -d 0 SamAltman

# 用户JackDawson账号30天后过期:
chage -E $(date -d '+30days' +%F) JackDawson


```

