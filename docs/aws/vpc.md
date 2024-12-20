---
title: VPC
---

# VPC - Virtual Private Cloud

Docs: https://docs.aws.amazon.com/vpc

Cheatsheet - https://digitalcloud.training/amazon-vpc

Building Your First Amazon Virtual Private Cloud (VPC) - https://explore.skillbuilder.aws/learn/course/external/view/elearning/409/building-your-first-amazon-virtual-private-cloud

Example: VPC for web and database servers - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-web-database-servers.html

Analogy - https://stackoverflow.com/a/65193190/4034572

## Examples / Tutorials

Example: VPC with servers in private subnets and NAT - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html

Building a 3-Tier VPC in AWS - https://github.com/AmirMalaeb/3-Tier-VPC-AWS

## Main concepts

A VPC is a private network on AWS.

Is a regional service (a VPC cannot span multiple regions), but you can have multiple VPCs within a region (the default limit is 5, but you can request to increase it).

A VPC has a router, which we configure through its [route tables](https://docs.aws.amazon.com/vpc/latest/userguide/RouteTables.html).

A VPC has subnets. Each subnet resides in a single Availability Zone. Subnets allow you separate concerns inside the VPC and achieve high availability.

The VPC CIDR address block is the full range of IP address allocated. Each subnet takes a portion of them.

To connect to the public Internet we use an Internet Gateway. There's only 1 per VPC.

## CIDR block

Classless Inter-Domain Routing.

https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing

See [What is CIDR?](https://aws.amazon.com/what-is/cidr/)

Is a concise way to specify IP address ranges and network masks. For example:

- `10.0.0.0/8`: all IP addresses from `10.0.0.0` to `10.255.255.255`.
- `10.0.0.0/16`: all IP addresses from `10.0.0.0` to `10.0.255.255`.
- `10.0.0.0/24`: all IP addresses from `10.0.0.0` to `10.0.0.255`.
- `10.0.0.0/32`: just `10.0.0.0`.
  - In a Security Group, if we want to only allow traffic to an EC2 instance from a specific IP address, we need to use `/32` (eg `83.40.20.232/32`).
- `0.0.0.0/0`: all possible IP addresses.
  - We can use it in Security Groups to allow all IP addresses to access an instance (Anywhere-IPv4).

https://cidr.xyz

https://formulae.brew.sh/formula/ipcalc

## Subnet

https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html

A range of IP addresses, which is a segment/portion of the overall VPC CIDR address range.

> A subnet is **a way to separate concerns** inside the VPC. (AWS in Action p. 303)

Must reside in a single Availability Zone. You can have multiple subnets in the same Availability Zone.

By default we have a default VPC on each region, and each default VPC has a default subnet on each AZ of the region. For example, for N. Virginia there are 6 default subnets created, one for each AZ (us-east-1a to us-east-1f), but in Sydney there are 3 default subnets, since there are 3 AZ. (If you go to VPC → Your VPCs, there's a column 'Default VPC', and if you go to VPC → Subnets, there's a column 'Default subnet'.) Note that **the default subnets are public**, which means that they get IP addresses that are accessible from the public internet, which is a security risk.

- Public:
  - Has an Internet Gateway on the route table.
  - On VPC → Subnets, the column 'Auto-assign public IPv4 address' is 'Yes'.
  - By default, every EC2 instance launched will have a public IP address assigned.
    - When we are launching an instance, at 'Network settings', if we pick a public subnet the field 'Auto-assign public IP' will be 'Enable'.
  - Used to deploy a load balancer or reverse proxy.
- Private:
  - Doesn't have an IG on the route table → instances cannot communicate to the outside world, nor viceversa.
  - On VPC → Subnets, the column 'Auto-assign public IPv4 address' is 'No'.
  - EC2 instances will not have a public IP address assigned when launched, and thus are unable to use an IG, even if you had an IG on the route table.
    - When we are launching an instance, at 'Network settings', if we pick a private subnet the field 'Auto-assign public IP' will change to 'Disable'.
  - Used to deploy application servers that sit behind a public load balancer and also database servers.

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

From "What is the difference between a public and private subnet in a Amazon VPC?" - https://serverfault.com/questions/556363/what-is-the-difference-between-a-public-and-private-subnet-in-a-amazon-vpc

- A private subnet sets the route 0.0.0.0/0 to a NAT gateway/instance. Private subnet instances only need a private IP and internet traffic is routed through the NAT in the public subnet. You could also have no route to 0.0.0.0/0 to make it a truly private subnet with no internet access in or out.
- A public subnet routes 0.0.0.0/0 through an Internet Gateway (igw). Instances in a public subnet require public IPs to talk to the internet.

### Subnet route table association

If you don't explicitly associate a subnet to a specific route table, it will be implicitly associated to the main route table.

https://stackoverflow.com/questions/77355449/routing-tables-in-aws

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html#subnet-route-tables

> Your VPC has an implicit router, and you use route tables to control where network traffic is directed. Each subnet in your VPC must be associated with a route table, which controls the routing for the subnet (subnet route table). You can explicitly associate a subnet with a particular route table. Otherwise, the subnet is implicitly associated with the main route table. A subnet can only be associated with one route table at a time, but you can associate multiple subnets with the same subnet route table.

https://docs.aws.amazon.com/vpc/latest/userguide/RouteTables.html

> Main route table: The route table that automatically comes with your VPC. It controls the routing for all subnets that are not explicitly associated with any other route table.

## Internet Gateway

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

> An internet gateway enables resources in your public subnets (such as EC2 instances) to connect to the internet if the resource has a public IPv4 address or an IPv6 address. Similarly, resources on the internet can initiate a connection to resources in your subnet using the public IPv4 address or IPv6 address.

An IGW performs network address translation (NAT): it translates the public IP addresses of the virtual machines to their private IP addresses.

https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html

An internet gateway supports inbound and outbound IPv4 and IPv6 traffic, whereas an Egress-only internet gateway allows **outbound** communication over **IPv6** from instances in your VPC to the internet, and prevents the internet from initiating an IPv6 connection with your instances.

## NAT gateway

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

A NAT gateway is a Network Address Translation (NAT) service.

Traffic is outbound only: NAT gateways enable resources in private subnets to reach the internet. External services, however, cannot initiate a connection with the resources in the private subnets.

If you choose to create a NAT gateway in your VPC, you are charged for each hour that your NAT gateway is provisioned and available. You are also charged for the amount of data that passes through the gateway.

We always deploy a NAT gateway in a **public subnet**, since it needs to have public IP assigned, which needs to be an **elastic IP**. We also add a route at the private subnet's route table with destination 0.0.0.0/0 pointing to the NAT Gateway.

From https://aws.amazon.com/vpc/faqs/

> How do instances without public IP addresses access the Internet?
>
> Instances without public IP addresses can access the Internet in one of two ways:
>
> 1. Instances without public IP addresses can route their traffic through a NAT gateway or a NAT instance to access the Internet. These instances use the public IP address of the NAT gateway or NAT instance to traverse the Internet. The NAT gateway or NAT instance allows outbound communication but doesn’t allow machines on the Internet to initiate a connection to the privately addressed instances.
> 2. For VPCs with a hardware VPN connection or Direct Connect connection, instances can route their Internet traffic down the virtual private gateway to your existing datacenter. From there, it can access the Internet via your existing egress points and network security/monitoring devices.

A NAT gateway has a limit in bandwidth (100 Gbps) and number of packets it can process (10 million packets per second). You can split your resources into multiple subnets and create a NAT gateway in each subnet. [source](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html)

See https://cloudonaut.io/advanved-aws-networking-pitfalls-that-you-should-avoid/#NAT-Gateway-or-Public-Subnet

> You need to create a NAT Gateway for every Availability Zone that you have created private subnets to achieve high availability.

## Network ACL (subnet firewall)

Operates at the subnet level, whereas a security group operates at the EC2 instance level.

A security group is stateful, whereas a NACL is stateless.

- Stateful (SG): if a rule allows inbound traffic on a port (eg 80), the corresponding responses are allowed as well.
- Stateless (NACL): to allow inbound traffic, in addition to a rule allowing inbound traffic on a port (eg 80), you also need a rule to allow outbound ephemeral ports. And if you want to make an HTTP connection from within your subnet, you have to open outbound port 80 and inbound ephemeral ports as well. See AWS in Action p. 161.

A NACL requires defining a priority for each rule. Rules are processed in order, with smaller number having higher priority.

Traffic between subnets of a VPC is always routed by default. You can’t remove the routes between the subnets. If you want to prevent traffic between subnets in a VPC, you need to use NACLs attached to the subnets. (AWS in Action p. 163)

:::tip

> We recommend you start with using security groups to control traffic. If you want to add an extra layer of security, you should use NACLs on top. But doing so is optional, in our opinion. (AWS in Action p. 163)

:::

## Place your servers in private subnets, and load balancers in public subnets

From 'Terraform: Up and Running' (p. 60 and 72):

> Running a server in a public subnet is a security risk. You should deploy all of your servers, and certainly all of your data stores, in private subnets, which have IP addresses that can be accessed only from within the VPC and not from the public internet. **The only servers you should run in public subnets are a small number of reverse proxies and load balancers**, that you lock down as much as possible.

> Place the EC2 instances in private subnets (so they aren't directly accessible from the public internet) and the ALBs in public subnets (so users can access them directly).

When to use Public Subnet vs Private Subnet? - https://stackoverflow.com/questions/59067920/when-to-use-public-subnet-vs-private-subnet

Where to put your server, in a private or public subnet? - https://medium.com/recursivelabs/where-to-put-your-server-in-a-private-or-public-subnet-b1f0087a19fb - https://bits.theoremone.co/where-to-put-your-server-in-a-private-or-public-subnet/

EC2 instances should not have a public IP address | AWS Foundational Security Best Practices - https://stackoverflow.com/questions/67178299/ec2-instances-should-not-have-a-public-ip-address-aws-foundational-security-be

[hola](#place-your-servers-in-private-subnets-and-load-balancers-in-public-subnets)
