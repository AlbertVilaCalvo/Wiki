---
title: PostgreSQL
---

`brew info postgresql`

## Start/stop

With Brew:

```
brew services start postgresql
brew services stop postgresql
brew services restart postgresql
brew services list
```

With pg_ctl:

```
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
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

Comand reference: https://www.postgresql.org/docs/current/app-psql.html

Start and connect to a db: `psql dbname`

Connect to a db: `\c dbname` or `\connect dbname`. We can speficy username, host, port etc.

List databases: `\l`

List tables (relations): `\dt`

List tables and indexes: `\dti`

Show table schema: `\d tablename`

## pg_ctl

Docs: https://www.postgresql.org/docs/14/app-pg-ctl.html

```
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
```

## Upgrade to new version

Eg from 13 to 14.

As explained in `brew info postgresql` you can do `brew postgresql-upgrade-database`.

See https://medium.com/backticks-tildes/resetting-your-postgres-database-f43ba9f1c601

## pgAdmin

At the home, click 'Add New Server', then fill the dialog with this data:

- General tab
  - Name: Servidor Local
- Connection tab
  - Host name/address: localhost
  - Port: 5432
  - Username: albertvilacalvo
