---
title: VPC
---

# VPC - Virtual Private Cloud

Docs: https://docs.aws.amazon.com/vpc

Cheatsheet - https://digitalcloud.training/amazon-vpc

Building Your First Amazon Virtual Private Cloud (VPC) - https://explore.skillbuilder.aws/learn/course/external/view/elearning/409/building-your-first-amazon-virtual-private-cloud

## Subnet

https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html

A range of IP addresses.

Must reside in a single Availability Zone.

CIDR (Classless Inter-Domain Routing): the range of IP address allocated on the subnet. See [What is CIDR?](https://aws.amazon.com/what-is/cidr/)

- Public:
  - Has an Internet Gateway on the route table.
  - By default, every EC2 instance launched will have a public IP address assigned.
- Private:
  - Doesn't have an IG on the route table → instances cannot communicate to the outside world, nor viceversa.
  - EC2 instances will not have a public IP address assigned when launched, and thus are unable to use an IG, even if you had an IG on the route table.

> A subnet is a 'public subnet' if it has a Route Table that references an Internet Gateway. [source](https://stackoverflow.com/a/74455786/4034572)

Route table of a _public_ subnet:

| Destination   | Target |
| ------------- | ------ |
| 172.31.0.0/16 | Local  |
| 0.0.0.0/0     | igw-id |

The 172.31.0.0/16 is the CIDR address block. Any address will be within this range. Any packet sent to a CIDR address will be routed locally by the VPC router.

0.0.0.0/0 means anything else outside the CIDR range. Thus, anything that is not sent to the CIDR address block will be routed to the Internet, outside.

Route table of a _private_ subnet:

| Destination   | Target |
| ------------- | ------ |
| 172.31.0.0/16 | Local  |

The CIDR here allows routing within the VPC, thus we can have communication between public and private subnets.
