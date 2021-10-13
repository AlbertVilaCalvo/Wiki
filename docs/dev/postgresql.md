---
title: PostgreSQL
---

`brew info postgresql`

## Start/stop

With Brew:

```
brew services start postgresql
brew services stop postgresql
brew services restart postgres
brew services list
```


## Commands

`postgres --help`

Version: `postgres --version` or ` postgres -V`

Check if Postgres is running: `pgrep -l postgres`. If there's no output it's not running.

Check the logs:
- `postgres -D /usr/local/var/postgres` from https://medium.com/backticks-tildes/resetting-your-postgres-database-f43ba9f1c601
- `tail /usr/local/var/log/postgres.log` from https://thoughtbot.com/blog/macos-postgres-could-not-connect-to-server

Create database: `createdb dbname`

Recreate/reset database: `dropdb dbname && createdb dbname`


## psql

Connect to db: `psql dbname`

List databases: `\l`

List tables (relations): `\dt`

Show table schema: `\d tablename`


## Upgrade to new version

Eg from 13 to 14.

As explained in `brew info postgresql` you can do `brew postgresql-upgrade-database`.

See https://medium.com/backticks-tildes/resetting-your-postgres-database-f43ba9f1c601