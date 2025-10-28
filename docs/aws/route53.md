---
title: Route 53
---

https://console.aws.amazon.com/route53/

## Functions

- Domain registration
- DNS service: translates a domain name to an IP
- Health checks to monitor endpoints

## Hosted zone

:::important
Do not delete a hosted zone, nor the NS and SOA records that come by default. To recreate them you may need assistance from AWS support. See:

- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-replace-hosted-zone.html
- https://repost.aws/questions/QUX9LuHTz8S76A-IPQfur_tA/how-to-recreate-deleted-hosted-zone-route53-with-the-same-name-server-before
- https://stackoverflow.com/questions/75195699/how-to-restore-deleted-aws-hosted-zone-domain
- https://serverfault.com/questions/838330/deleted-then-recreated-route-53-hosted-zones-now-website-not-working
- https://www.reddit.com/r/aws/comments/wgeu1z/accidentally_deleted_hosted_zone/

Also note this from [Deleting a public hosted zone](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DeleteHostedZone.html):

> If you delete a hosted zone, you can't undelete it. You must create a new hosted zone and update the name servers for your domain registration, which can require up to 48 hours to take effect. In addition, if you delete a hosted zone, someone could hijack the domain and route traffic to their own resources using your domain name.

:::

A hosted zone is a collection of records of a domain.

> A hosted zone is a container for records. Each record in a hosted zone contains information about how you want to route traffic for a domain, such as example.com, and its subdomains (acme.example.com, zenith.example.com). A hosted zone and the corresponding domain have the same name. There are two types of hosted zones:
>
> - _Public hosted zones_ contain records that specify how you want to route traffic on the internet.
> - _Private hosted zones_ contain records that specify how you want to route traffic in a VPC.

When you buy a domain, Route 53 automatically creates a hosted zone for you:

> To make it easier for you to use Route 53 as the DNS service for your new domain, we'll automatically create a hosted zone. That's where you store information about how to route traffic for your domain, for example, to an Amazon EC2 instance. If you won't use your domain right now, you can delete the hosted zone. If you will use your domain, Route 53 charges for the hosted zone and for the DNS queries that we receive for your domain. For more information, see [Amazon Route 53 Pricing](http://aws.amazon.com/route53/pricing/).

## Records

Initially, a hosted zone has 2 records:

| Record name        | Type | Routing | Alias | Value                                                                                       | TTL (seconds) |
| ------------------ | ---- | ------- | ----- | ------------------------------------------------------------------------------------------- | ------------- |
| recipemanager.link | NS   | Simple  | No    | ns-314.awsdns-39.com. ns-1822.awsdns-35.co.uk. ns-524.awsdns-01.net. ns-1029.awsdns-00.org. | 172800        |
| recipemanager.link | SOA  | Simple  | No    | ns-314.awsdns-39.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400                | 900           |

When you configure a domain to be used with CloudFront with an ACM SSL/TLS Certificate you have these records:

| Record name                                               | Type  | Routing | Alias | Value/Route traffic to                                                                      | TTL (seconds) |
| --------------------------------------------------------- | ----- | ------- | ----- | ------------------------------------------------------------------------------------------- | ------------- |
| recipemanager.link                                        | A     | Simple  | Yes   | d36iaepzett3qz.cloudfront.net.                                                              | -             |
| www.recipemanager.link                                    | A     | Simple  | Yes   | d36iaepzett3qz.cloudfront.net.                                                              | -             |
| recipemanager.link                                        | AAAA  | Simple  | Yes   | d36iaepzett3qz.cloudfront.net.                                                              | -             |
| www.recipemanager.link                                    | AAAA  | Simple  | Yes   | d36iaepzett3qz.cloudfront.net.                                                              | -             |
| \_51ae72618dcab944c2a8886846f32724.recipemanager.link     | CNAME | Simple  | No    | d36iaepzett3qz.cloudfront.net.                                                              | 60            |
| \_0df33b75b26b881e3e7bb0257f35b27e.www.recipemanager.link | CNAME | Simple  | No    | d36iaepzett3qz.cloudfront.net.                                                              | 60            |
| recipemanager.link                                        | NS    | Simple  | No    | ns-314.awsdns-39.com. ns-1822.awsdns-35.co.uk. ns-524.awsdns-01.net. ns-1029.awsdns-00.org. | 172800        |
| recipemanager.link                                        | SOA   | Simple  | No    | ns-314.awsdns-39.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400                | 900           |

Notes:

- The two AAAA records are IPv6.
- The two CNAME records are used to validate the ownership of the domain for the ACM SSL/TLS certificate. From the console "Info" sidebar:

> AWS Certificate Manager (ACM) must prove that you own or control all of the domain names that you specify in your request. You can choose to prove your ownership with either Domain Name System (DNS) validation or with email validation. In general, we recommend using DNS validation over email validation for the following reasons:
>
> - If you use Amazon Route 53 to manage your public DNS records, you can update your records through ACM directly.
> - ACM automatically renews DNS-validated certificates for as long as a certificate remains in use and the DNS record is in place.
> - To be renewed, email-validated certificates require an action by the domain owner. ACM begins sending renewal notices 45 days before expiration, using the domain's WHOIS mailbox addresses and five common administrator addressess. The notifications contain a link that the domain owner can click for easy renewal. Once all listed domains are validated, ACM issues a renewed certificate with the same ARN.

## Routing policies

Choosing a routing policy - https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html

[Simple](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html): typically route traffic to a single resource (ie a web server).

[Failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html): performs health checks to automatically route visitors to an alternate location to avoid outages. For disaster recovery across regions. Health checks are required.

[Geolocation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html): choose the resources that serve your traffic based on the geographic location of your users. Used for localization of content.

[Geoproximity](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html): route traffic to the geographically nearest resource.

[Latency-based](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html): route to the AWS region that provides the lowest possible latency.

[IP-based](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-ipbased.html): route based on the user IP.

[Multivalue answer](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-multivalue.html): returns several IP addresses.

[Weighted](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html): eg send 10%/90%. For load balancing or A/B testing (eg testing new versions of software).

AWS Route 53 Routing Policies explained with diagrams - https://cloudly.engineer/2019/aws-route-53-routing-policies-explained-with-diagrams/aws/
