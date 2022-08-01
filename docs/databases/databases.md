---
title: Databases
---

https://mobile.twitter.com/sarahmei/status/1348477224467394560

[Soft deletion probably isn't worth it](https://news.ycombinator.com/item?id=32156009)

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
