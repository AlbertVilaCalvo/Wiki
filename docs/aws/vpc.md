---
title: VPC
---

# VPC - Virtual Private Cloud

Docs: https://docs.aws.amazon.com/vpc

Cheatsheet - https://digitalcloud.training/amazon-vpc

Building Your First Amazon Virtual Private Cloud (VPC) - https://explore.skillbuilder.aws/learn/course/external/view/elearning/409/building-your-first-amazon-virtual-private-cloud

Example: VPC for web and database servers - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-web-database-servers.html

Analogy - https://stackoverflow.com/a/65193190/4034572

## Main concepts

Is a regional service (a VPC cannot span multiple regions), but you can have multiple VPCs within a region (the default limit is 5, but you can request to increase it).

A VPC has a router, which we configure through its [route tables](https://docs.aws.amazon.com/vpc/latest/userguide/RouteTables.html).

To connect to the public Internet we use an Internet Gateway. There's only 1 per VPC.

The VPC CIDR address block is the full range of IP address allocated. Each subnet takes a portion of them.

CIDR: Classless Inter-Domain Routing. See [What is CIDR?](https://aws.amazon.com/what-is/cidr/)

## Subnet

https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html

A range of IP addresses, which is a segment/portion of the overall VPC CIDR address range.

Must reside in a single Availability Zone, and cannot span multiple AZs.

You can have multiple subnets in the same Availability Zone.

By default we have a default VPC on each region, and each default VPC has a subnet on each AZ of the region. For example, for N. Virginia there are 6 subnets created, one for each AZ (us-east-1a to us-east-1f), but in Sydney there are 3 subnets, since there are 3 AZ. If you go to VPC → Your VPCs, there's a column 'Default VPC', and if you go to VPC → Subnets, there's a column 'Default subnet'.

- Public:
  - Has an Internet Gateway on the route table.
  - On VPC → Subnets, the column 'Auto-assign public IPv4 address' is 'Yes'.
  - By default, every EC2 instance launched will have a public IP address assigned.
    - When we are launching an instance, at 'Network settings', if we pick a public subnet the field 'Auto-assign public IP' will be 'Enable'.
- Private:
  - Doesn't have an IG on the route table → instances cannot communicate to the outside world, nor viceversa.
  - On VPC → Subnets, the column 'Auto-assign public IPv4 address' is 'No'.
  - EC2 instances will not have a public IP address assigned when launched, and thus are unable to use an IG, even if you had an IG on the route table.
    - When we are launching an instance, at 'Network settings', if we pick a private subnet the field 'Auto-assign public IP' will change to 'Disable'.

> A subnet is a 'public subnet' if it has a Route Table that references an Internet Gateway. [source](https://stackoverflow.com/a/74455786/4034572)

AWS VPC identify private and public subnet - https://stackoverflow.com/questions/48830793/aws-vpc-identify-private-and-public-subnet

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

### Subnet route table association

If you don't explicitly associate a subnet to a specific route table, it will be implicitly associated to the main route table.

https://stackoverflow.com/questions/77355449/routing-tables-in-aws

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#subnet-route-tables

> Your VPC has an implicit router, and you use route tables to control where network traffic is directed. Each subnet in your VPC must be associated with a route table, which controls the routing for the subnet (subnet route table). You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table. A subnet can only be associated with one route table at a time, but you can associate multiple subnets with the same subnet route table.

https://docs.aws.amazon.com/vpc/latest/userguide/RouteTables.html

> Main route table: The route table that automatically comes with your VPC. It controls the routing for all subnets that are not explicitly associated with any other route table.

## Internet Gateway

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html

An internet gateway supports inbound and outbound IPv4 and IPv6 traffic, whereas an Egress-only internet gateway allows **outbound** communication over **IPv6** from instances in your VPC to the internet, and prevents the internet from initiating an IPv6 connection with your instances.

## NAT gateway

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

A NAT gateway is a Network Address Translation (NAT) service.

Traffic is outbound only: NAT gateways enable resources in private subnets to reach the internet. External services, however, cannot initiate a connection with the resources in the private subnets.

If you choose to create a NAT gateway in your VPC, you are charged for each hour that your NAT gateway is provisioned and available. You are also charged for the amount of data that passes through the gateway.

## Network ACL (firewall)

Operates at the subnet level, whereas a security group operates at the EC2 instance level.
