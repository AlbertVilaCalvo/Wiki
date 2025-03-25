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

## Ports

https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml

- System or well-known ports (1-1023). Reserved for specific services. Used by system processes that provide widely used types of network services.
- User or registered ports (1024-49151). Also registered by IANA, but not as commonly used. Designated for use with a certain protocol or application.
- Dynamic, private or ephemeral ports (49152-65535). For proprietary services or private use. Used for only a short period of time for the duration of a communication session.

When a client connects to a server, there's a source IP and a destination IP, and a source port and a destination port. The server listens on a well-known port like 80 or 443. The client's port, the source port, is dynamically chosen by the operating system, randomly, from th ephemeral ports range.

### Ports < 1024 are restricted to the root user

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

You can also do ([source](https://github.com/nealdct/aws-clf-code/blob/main/amazon-ec2/generate-load-on-alb.md)):

```shell
for i in {1..200}; do curl http://alb-address.com & done; wait
```
