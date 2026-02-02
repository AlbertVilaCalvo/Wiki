---
title: PostgreSQL
---

Port: 5432

`brew info postgresql`

https://github.com/dhamaniasad/awesome-postgres

https://www.pgadmin.org

Learn Postgres at the Playground - https://www.crunchydata.com/developers/tutorials - https://news.ycombinator.com/item?id=32498435

https://www.manning.com/books/just-use-postgres

https://www.manning.com/books/postgresql-mistakes-and-how-to-avoid-them

Postgres WASM - https://news.ycombinator.com/item?id=33067962

https://www.crunchydata.com

Storage engine for modern hardware - https://github.com/orioledb/orioledb/ - From Thoughworks Technology Radar 27:

> OrioleDB is a new storage engine for PostgreSQL. Our teams use PostgreSQL a lot, but its
> storage engine was originally designed for hard drives. Although there are several options to tune
> for modern hardware, it can be difficult and cumbersome to achieve optimal results. OrioleDB
> addresses these challenges by implementing a cloud-native storage engine with explicit support
> for solid-state drives (SSDs) and nonvolatile random-access memory (NVRAM)...

## Reserved words

https://www.postgresql.org/docs/current/sql-keywords-appendix.html

## Error codes

https://www.postgresql.org/docs/current/errcodes-appendix.html

## Start/stop

With Brew:

```shell
brew services start postgresql
brew services stop postgresql
brew services restart postgresql
brew services list
```

With pg_ctl:

```shell
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

Delete database: `dropdb dbname`

Recreate/reset database: `dropdb dbname && createdb dbname`

Copy database:

- https://stackoverflow.com/questions/876522/creating-a-copy-of-a-database-in-postgresql
- https://stackoverflow.com/questions/808735/postgresql-how-to-create-a-copy-of-a-database-or-schema

## psql

Command reference: https://www.postgresql.org/docs/current/app-psql.html

Start and connect to a db: `psql dbname`

Connect with a specific user instead of the default: `psql -d dbname -U username`

Print current user: `\conninfo` - see https://stackoverflow.com/questions/39735141/how-to-check-connected-user-on-psql

List users: `\du`

Quit: `\q`

Connect to a db: `\c dbname` or `\connect dbname`. We can specify username, host, port etc.

Load .sql file: `\i src/database-setup.sql`

List databases: `\l`

List the relations (tables) of your currently connected database: `\d`

List tables (relations): `\dt`

List tables and indexes: `\dti`

Show table schema: `\d tablename`

## pg_ctl

Docs: https://www.postgresql.org/docs/14/app-pg-ctl.html

```shell
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

## Data type extensions

https://www.postgresql.org/docs/current/citext.html - case-insensitive character string type

https://docs.cloud.google.com/sql/docs/postgres/extensions#data-type-extensions

https://github.com/kriasoft/node-starter-kit/blob/b3fd3ec4532481fa5ffe43ed35e9e24bc9fdb6a9/migrations/001_initial.js#L26-L30

## Custom data types

https://github.com/kriasoft/node-starter-kit/blob/b3fd3ec4532481fa5ffe43ed35e9e24bc9fdb6a9/migrations/001_initial.js#L32-L36
