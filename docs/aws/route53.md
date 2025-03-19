---
title: Route 53
---

https://console.aws.amazon.com/route53/

## Functions

- Domain registration
- DNS service: translates a domain name to an IP
- Health checks to monitor endpoints

## Hosted zone

:::danger
Important: never delete the hosted zone, nor the NS and SOA records that come by default. To recreate them you may need assistance from AWS support.

https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-replace-hosted-zone.html
:::

A collection of records of a domain.

When you buy a domain it creates a hosted zone for you:

> To make it easier for you to use Route 53 as the DNS service for your new domain, we'll automatically create a hosted zone. That's where you store information about how to route traffic for your domain, for example, to an Amazon EC2 instance. If you won't use your domain right now, you can delete the hosted zone. If you will use your domain, Route 53 charges for the hosted zone and for the DNS queries that we receive for your domain. For more information, see [Amazon Route 53 Pricing](http://aws.amazon.com/route53/pricing/).

## Routing policies

Choosing a routing policy - https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html

[Simple](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html): typically route traffic to a single resource (ie a web server).

[Failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html): performs health checks to automatically route visitors to an alternate location to avoid outages. For disaster recovery across regions.

[Geolocation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html): choose the resources that serve your traffic based on the geographic location of your users.

[Geoproximity](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html): route traffic to the geographically nearest resource.

[Latency-based](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html): route to the AWS region that provides the lowest possible latency.

[IP-based](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-ipbased.html): route based on the user IP.

[Multivalue answer](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html): returns several IP addresses.

[Weighted](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html): eg send 10%/90%. For load balancing or A/B testing (eg testing new versions of software).

AWS Route 53 Routing Policies explained with diagrams - https://cloudly.engineer/2019/aws-route-53-routing-policies-explained-with-diagrams/aws/
