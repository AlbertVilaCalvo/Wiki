---
title: Backend
---

Server one-liners: https://gist.github.com/willurd/5720255

https://news.ycombinator.com/item?id=32410386

> most Rails apps spend most of their time on I/O waiting for something external
> The big problems were always due to I/O

https://news.ycombinator.com/item?id=33264190

> Twitter distributes config files across their entire fleet (hundreds of thousands of machines) using git and a cron job. Commit your config change, wait a few minutes and there it is.

Fundamentals of Backend Engineering - https://www.udemy.com/course/fundamentals-of-backend-communications-and-protocols/

## Ports < 1024 are restricted to the root user

Why are the first 1024 ports restricted to the root user only? - https://unix.stackexchange.com/questions/16564/why-are-the-first-1024-ports-restricted-to-the-root-user-only

Is there still a reason why binding to port < 1024 is only authorized for root on Unix systems? - https://serverfault.com/questions/38461/is-there-still-a-reason-why-binding-to-port-1024-is-only-authorized-for-root-o

See page 53 of 'Terraform Up and Running' (3rd edition).

## Apache Benchmark

https://httpd.apache.org/docs/2.4/programs/ab.html

Execute 10000 HTTP GET requests, processing up to 10 requests concurrently:

```shell
ab -n 10000 -c 10 "http://localhost/index.html"
```

Send 500,000 requests using 15 threads. The load test is limited to 300 seconds, using a connection timeout of 120 seconds:

```shell
ab -n 500000 -c 15 -t 300 -s 120 -r <url>
```
