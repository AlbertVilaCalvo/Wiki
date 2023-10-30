---
title: MySQL
---

MySQL Workbench: https://www.mysql.com/products/workbench

## Logs

https://stackoverflow.com/questions/5441972/how-to-see-log-files-in-mysql

https://stackoverflow.com/questions/11606972/how-can-i-enable-mysql-slow-query-log-on-my-server

### Log queries, at runtime

```
SET GLOBAL general_log = 1;
SET GLOBAL log_output = 'FILE';
SET GLOBAL general_log_file = 'mysql_general.log';
```
