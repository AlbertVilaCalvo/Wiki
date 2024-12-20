---
title: Databases
---

https://github.com/topics/database

https://db-engines.com/en/ - See the [DB-Engines Ranking](https://db-engines.com/en/ranking)

dbfiddle: https://dbfiddle.uk - See how it works here: https://stackoverflow.com/a/60091176/4034572

Automatic SQL injection and database takeover tool - https://github.com/sqlmapproject/sqlmap

https://mobile.twitter.com/sarahmei/status/1348477224467394560

[Soft deletion probably isn't worth it](https://news.ycombinator.com/item?id=32156009)

Reddit’s database has two tables

- https://news.ycombinator.com/item?id=4468265
- https://news.ycombinator.com/item?id=32407873

| Database   | Default port |
| ---------- | ------------ |
| PostgreSQL | 5432         |
| MySQL      | 3306         |
| Redis      | 6379         |

## Admins

https://en.wikipedia.org/wiki/Comparison_of_database_administration_tools

- https://www.adminer.org
- https://dbeaver.io
- https://tableplus.com

Postgres:

- https://www.pgadmin.org

MySQL:

- https://www.mysql.com/products/workbench

## Length and data type for common fields

List of standard lengths for database fields - https://stackoverflow.com/questions/20958/list-of-standard-lengths-for-database-fields

Best practices on common person fields (Name, email, address, gender etc...) - https://dba.stackexchange.com/questions/3768/best-practices-on-common-person-fields-name-email-address-gender-etc

Is there a standard implementation of a Users Database? - https://dba.stackexchange.com/questions/3519/is-there-a-standard-implementation-of-a-users-database

https://www.singlestore.com/blog/engineers-guide-building-database-for-data-intensive-applications/

### Email

`VARCHAR(254) NOT NULL UNIQUE`

Max length is 254 according to the RFC, but some people recommend a lower max.

- What is the optimal length for an email address in a database? - https://stackoverflow.com/questions/1199190/what-is-the-optimal-length-for-an-email-address-in-a-database
- EmailAddress field length in database - https://stackoverflow.com/questions/1305327/emailaddress-field-length-in-database

### Password hash

What data type to use for hashed password field and what length? - https://stackoverflow.com/questions/247304/what-data-type-to-use-for-hashed-password-field-and-what-length

For [node.bcrypt.js](https://www.npmjs.com/package/bcrypt): `CHAR(60) NOT NULL`

### Name

- What should be the typical length of user's Full Name in database - https://stackoverflow.com/questions/4297841/what-should-be-the-typical-length-of-users-full-name-in-database

## Normalization

https://en.wikipedia.org/wiki/Database_normalization

### Normalize to make better relations, denormalize for performance

From https://news.ycombinator.com/item?id=32414172

- Prof: "Why do we normalize?"
- Class, in unison: "To make better relations."
- Prof: "Why do we denormalize?"
- Class, in unison: "Performance."

## ACID

https://en.wikipedia.org/wiki/ACID

## Database types

- Relational: https://db-engines.com/en/ranking/relational+dbms
- Key-value: https://db-engines.com/en/ranking/key-value+store
- Document: https://db-engines.com/en/ranking/document+store
- Time Series: https://db-engines.com/en/ranking/time+series+dbms
- Graph: https://db-engines.com/en/ranking/graph+dbms
- Vector: https://db-engines.com/en/ranking/vector+dbms
- Column: https://db-engines.com/en/ranking/wide+column+store

AWS database services comparison - https://docs.aws.amazon.com/whitepapers/latest/aws-overview/database.html#compare-database-services

https://en.wikipedia.org/wiki/Database#Classification

https://www.prisma.io/dataguide/intro/comparing-database-types

From https://danpalmer.me/2022-09-10-write-your-own-task-queue/ - https://news.ycombinator.com/item?id=32799058

- Postgres can bring strong consistency and options for idempotency control.
- Redis can bring speed and simplicity.
- RabbitMQ can bring complex queue topologies and behaviours, with strong consistency and scalability.
- Kafka can bring performance benefits for large scale high performance systems.

### Relational vs non-relational

What is a Relational Database? - https://aws.amazon.com/relational-database

https://aws.amazon.com/nosql

### OLTP vs OLAP

OLTP (online transaction processing): operational. CRUD.

OLAP (online analytical processing): for analytics/analysis. User behavior reports, business intelligence, financial decision making etc. Read, not write. Data comes from multiple OLTP databases.

https://aws.amazon.com/compare/the-difference-between-olap-and-oltp/

OLAP DBMS: https://clickhouse.com

## Key-value

https://aws.amazon.com/nosql/key-value

## Document

https://aws.amazon.com/nosql/document

## Column oriented

https://news.ycombinator.com/item?id=30905662

https://code.jsoftware.com/wiki/Jd/Overview

> Jd is a columnar (column oriented) RDBMS.
>
> Most RDBMS systems are row oriented. Ages ago they fell into the trap of thinking of tables as rows (records). You can see how this happened. The end user wants the record that has a first name, last name, license, make, model, color, and date. So a row was the unit of information and rows were stored sequentially on disk. Row orientation works for small amounts of data. But think about what happens when there are lots of rows and the user wants all rows where the license starts with 123 and the color is blue or black. In a naive system the application has to read every single byte of data from the disk. There are lots of bytes and reading from disk is, by orders of magnitude, the slowest part of the performance equation. To answer this simple question all the data had to be read from disk. This is a performance disaster and that is where decades of adding bandages and kludges started.
>
> Jd is columnar so the data is 'fully inverted'. This means all of the license numbers are stored together and sequentially on disk. The same for all the other columns. Think about the earlier query for license and color. Jd gets the license numbers from disk (a tiny fraction of the database) and generates a boolean mask of rows that match. It then gets the color column from disk (another small fraction of the data) and generates a boolean mask of matches and ANDS that with the other mask. It can now directly read just the rows from just the columns that are required in the result. Only a small fraction of the data is read. In J, columns used in queries are likely already in memory and the query runs at ram speed, not the sad and slow disk speed.
>
> Both scenarios above are simplified, but the point is strong and valid. The end user thinks in records, but the work to get those records is best organized by columns.
>
> Row oriented is slavishly tied to the design ideas of filing cabinets and manila folders. Column oriented embraces computers.
>
> A table column is a mapped file.

## Vector database

https://en.wikipedia.org/wiki/Vector_database

https://www.pinecone.io/learn/vector-database/

## Migration

https://www.rainforestqa.com/blog/2014-06-27-zero-downtime-database-migrations
