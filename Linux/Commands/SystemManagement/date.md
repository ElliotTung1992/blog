Linux date 命令可以用来显示或设定系统的日期和时间.

**语法:**

```
date [OPTION]... [+FORMAT]
date [-u] [-d datestr] [-s datestr] [--utc] [--universal] [--date=datestr] [--set=datestr] [--help] [--version] [+FORMAT] [MMDDhhmm[[CC]YY][.ss]]
```

可选参数:

- **-d, --date=STRING**：通过字符串显示时间格式，字符串不能是'now'。
- **-f, --file=DATEFILE**：类似于--date; 一次从DATEFILE处理一行。
- **-I[FMT], --iso-8601[=FMT]**：按照 ISO 8601 格式输出时间，FMT 可以为'date'(默认)，'hours'，'minutes'，'seconds'，'ns'。 可用于设置日期和时间的精度，例如：2006-08-14T02:34:56-0600。
- **-R, --rfc-2822** ： 按照 RFC 5322 格式输出时间和日期，例如: Mon, 14 Aug 2006 02:34:56 -0600。
- **--rfc-3339=FMT**：按照 RFC 3339 格式输出，FMT 可以为'date', 'seconds','ns'中的一个，可用于设置日期和时间的精度， 例如：2006-08-14 02:34:56-06:00。
- **-r, --reference=FILE**：显示文件的上次修改时间。
- **-s, --set=STRING**：根据字符串设置系统时间。
- **-u, --utc, --universal**：显示或设置协调世界时(UTC)。
- **--help**：显示帮助信息。
- **--version**：输出版本信息。

格式化参数:

在显示方面，使用者可以设定欲显示的格式 ，格式设定为一个加号后接数个标记，其中可用的标记列表如下：

```
%%   输出字符 %
%a   星期几的缩写 (Sun..Sat)
%A   星期的完整名称(Sunday..Saturday)。 
%b   缩写的月份名称（例如，Jan）
%B   完整的月份名称（例如，January）
%c   本地日期和时间（例如，Thu Mar  3 23:05:25 2005）
%C   世纪，和%Y类似，但是省略后两位（例如，20）
%d   日 (01..31)
%D   日期，等价于%m/%d/%y
%e   一月中的一天，格式使用空格填充，等价于%_d
%F   完整的日期；等价于 %Y-%m-%d
%g   ISO 标准计数周的年份的最后两位数字
%G   ISO 标准计数周的年份，通常只对%V有用
%h   等价于 %b
%H   小时 (00..23)
%I   小时 (01..12)
%j   一年中的第几天 (001..366)
%k   小时，使用空格填充 ( 0..23); 等价于 %_H
%l   小时, 使用空格填充 ( 1..12); 等价于 %_I
%m   月份 (01..12)
%M   分钟 (00..59)
%n   新的一行，换行符
%N   纳秒 (000000000..999999999)
%p   用于表示当地的AM或PM，如果未知则为空白
%P   类似 %p, 但是是小写的
%r   本地的 12 小时制时间(例如 11:11:04 PM)
%R   24 小时制 的小时与分钟; 等价于 %H:%M
%s   自 1970-01-01 00:00:00 UTC 到现在的秒数
%S   秒 (00..60)
%t   插入水平制表符 tab
%T   时间; 等价于 %H:%M:%S
%u   一周中的一天 (1..7); 1 表示星期一
%U   一年中的第几周，周日作为一周的起始 (00..53)
%V   ISO 标准计数周，该方法将周一作为一周的起始 (01..53)
%w   一周中的一天（0..6），0代表星期天
%W   一年中的第几周，周一作为一周的起始（00..53）
%x   本地的日期格式（例如，12/31/99）
%X   本地的日期格式（例如，23:13:48）
%y   年份后两位数字 (00..99)
%Y   年
%z   +hhmm 格式的数值化时区格式（例如，-0400）
%:z  +hh:mm 格式的数值化时区格式（例如，-04:00）
%::z  +hh:mm:ss格式的数值化时区格式（例如，-04:00:00）
%:::z  数值化时区格式，相比上一个格式增加':'以显示必要的精度（例如，-04，+05:30）
%Z  时区缩写 （如 EDT）
```

**实例:**

显示当前时间：

```
ganendong@ganendeMacBook-Pro ~ % date
Fri Apr 12 11:20:33 CST 2024
ganendong@ganendeMacBook-Pro ~ % date '+%c'
Fri Apr 12 11:21:31 2024
ganendong@ganendeMacBook-Pro ~ % date '+%D'
04/12/24
ganendong@ganendeMacBook-Pro ~ % date '+%x'
04/12/24
ganendong@ganendeMacBook-Pro ~ % date '+%T'
11:22:47
ganendong@ganendeMacBook-Pro ~ % date '+%X'
11:22:58
```

格式化输出：

```
ganendong@ganendeMacBook-Pro ~ % date '+%Y-%m-%d'
2024-04-12
```

输出昨天的日期:

```
# date -d "1 day ago" +"%Y-%m-%d"
2012-11-19
```

输出2秒后的时间：

```
date -d "2 second" +"%Y-%m-%d %H:%M.%S"
```

时间格式转换:

```
date -d "2009-12-12" +"%Y/%m/%d %H:%M.%S"
```

apache时间格式转换:

```
date -d "Dec 5, 2009 12:00:37 AM" +"%Y-%m-%d %H:%M.%S"
```

格式转换后时间游走:

```
date -d "Dec 5, 2009 12:00:37 AM 2 year ago" +"%Y-%m-%d %H:%M.%S"
```

按自己的时间格式输出:

```
date '+usr_time: $1:%M %P -hey'
```

显示时间后跳行, 再显示目前日期:

```
date '+%T%n%D'
```

显示月份和日数:

```
date '+%B%d'
```

时间加减操作:

```
date +%Y%m%d                   # 显示年月日
date -d "+1 day" +%Y%m%d       # 显示后一天的日期
date -d "-1 day" +%Y%m%d       # 显示前一天的日期
date -d "-1 month" +%Y%m%d     # 显示上一月的日期
date -d "+1 month" +%Y%m%d     # 显示下一月的日期
date -d "-1 year" +%Y%m%d      # 显示前一年的日期
date -d "+1 year" +%Y%m%d      # 显示下一年的日期
```

设定时间:

```
date -s                         # 设置当前时间，只有root权限才能设置，其他只能查看
date -s 20120523                # 设置成20120523，这样会把具体时间设置成00:00:00
date -s 01:01:01                # 设置具体时间，不会对日期做更改
date -s "01:01:01 2012-05-23"   # 这样可以设置全部时间
date -s "01:01:01 20120523"     # 这样可以设置全部时间
date -s "2012-05-23 01:01:01"   # 这样可以设置全部时间
date -s "20120523 01:01:01"     # 这样可以设置全部时间
```





