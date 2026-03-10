---
title: DNS
---

https://messwithdns.net

https://www.cloudflare.com/learning/dns/what-is-dns/

Domain Name System (DNS) 101 Miniseries (Adrian Cantrill) - https://www.youtube.com/playlist?list=PLTk5ZYSbd9MhMmOiPhfRJNW7bhxHo4q-K - https://twitter.com/adriancantrill/status/1577568458912501763

https://github.com/bregman-arie/devops-exercises/blob/master/topics/dns/README.md

https://dnsimple.com

https://www.nslookup.io - Find all DNS records for a domain name

https://www.nslookup.io/dns-course - The DNS course for developers

https://github.com/mr-karan/doggo - https://doggo.mrkaran.dev/docs/ - https://news.ycombinator.com/item?id=40847699

(unmaintained) https://github.com/ogham/dog - https://dns.lookup.dog/

Build your own DNS server - https://app.codecrafters.io/courses/dns-server/overview

## Record types

https://en.wikipedia.org/wiki/List_of_DNS_record_types

## dig

https://en.wikipedia.org/wiki/Dig_(command)

https://digwebinterface.com

```shell
dig example.com

dig example.com A
dig example.com CNAME
dig example.com MX
```

## Flush DNS cache on a Mac

_This doesn't always work. If it doesn't, then wait a few minutes until the DNS changes propagate. Or try with a different browser (Chrome usually works before Firefox)._

If you deploy a Load Balancer with a domain to AWS sometimes you get errors, for example `NS_ERROR_UNKNOWN_HOST` at the browser (Firefox), and this error with `curl`:

```shell
$ curl https://api.myapp.com/products
curl: (6) Could not resolve host: api.myapp.com
```

To fix it, try to flush the DNS cache on your local machine:

```shell
dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

It asks for the administrator password. This forces your system to re-query DNS servers for domain name resolutions, which can resolve issues caused by stale or incorrect DNS entries.
