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

- A VPC is always bound to a region.
- A subnet within a VPC is linked to an availability zone.
- A virtual machine is launched into a single subnet.
- If we move a virtual machine to a different availability zone, it will be placed in a different subnet and, as a consequence, it will have a different private IP address.

A VPC is a private virtual network on AWS, logically isolated.

Is a regional service (a VPC cannot span multiple regions), but you can have multiple VPCs within a region (the default limit is 5, but you can request to increase it). A VPC spans all AZ in a region.

A VPC has a router, which defines how to route traffic and we configure through its [route tables](https://docs.aws.amazon.com/vpc/latest/userguide/RouteTables.html).

A VPC has subnets. Each subnet resides in a single Availability Zone. Subnets allow you separate concerns inside the VPC and achieve high availability. We can create multiple subnets in the same AZ.

The VPC CIDR address block is the full range of IP address allocated. Each subnet takes a portion of them. It's recommended that each VPC has a different block of addresses that don't overlap, since this is a requirement to do VPC Peering and use Transit Gateways.

To connect to the public Internet we use an Internet Gateway. There's only one per VPC.

Some AWS services are public, and others run within a VPC:

- Public: DynamoDB, S3, Route 53, CloudFront... They are accessible from the public Internet, using public IPs and public endpoints.
- Private: EC2, RDS, EBS, EFS... Can have a public IP address, but they exist within a VPC.

## CIDR block

Classless Inter-Domain Routing.

https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing

See [What is CIDR?](https://aws.amazon.com/what-is/cidr/)

Is a concise way to specify IP address ranges and network masks. For example:

- `10.0.0.0/8`: all IP addresses from `10.0.0.0` to `10.255.255.255`.
- `10.0.0.0/16`: all IP addresses from `10.0.0.0` to `10.0.255.255`.
- `10.0.0.0/24`: all IP addresses from `10.0.0.0` to `10.0.0.255`.
- `10.0.0.0/32`: just `10.0.0.0`. All 32 bits are used.
  - In a Security Group, if we want to only allow traffic to an EC2 instance from a specific IP address, we need to use `/32` (eg `83.40.20.232/32`).
- `0.0.0.0/0`: all possible IP addresses.
  - We can use it in Security Groups to allow all IP addresses to access an instance (Anywhere-IPv4).

https://cidr.xyz

https://formulae.brew.sh/formula/ipcalc

## Subnet

https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html

A **range of IP addresses**, which is a segment/portion of the overall VPC CIDR address range.

> A subnet is **a way to separate concerns** inside the VPC. (AWS in Action p. 303)

Must reside within a single Availability Zone. You can have multiple subnets in the same Availability Zone.

By default we have a default VPC on each region, and each default VPC has a default subnet on each AZ of the region. For example, for N. Virginia there are 6 default subnets created, one for each AZ (us-east-1a to us-east-1f), but in Sydney there are 3 default subnets, since there are 3 AZ. (If you go to VPC → Your VPCs, there's a column 'Default VPC', and if you go to VPC → Subnets, there's a column 'Default subnet'.) Note that **the default subnets are public**, which means that they resources we launch there get IP addresses that are accessible from the public internet, which is a security risk.

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

The 172.31.0.0/16 is the overall VPC CIDR address block. Any address in the VPC will be within this range. Any packet sent to a CIDR address will be routed locally by the VPC router.

0.0.0.0/0 means anything else outside the VPC CIDR range. Thus, anything that is not sent to the CIDR address block will be routed to the Internet, outside.

Route table of a _private_ subnet:

| Destination   | Target |
| ------------- | ------ |
| 172.31.0.0/16 | Local  |

The CIDR block here allows routing within the VPC, thus we can have communication between public and private subnets. This happens with a bastion host, where an instance in a public subnet talks with an instance in a private subnet, using their private IPs.

For example, the default VPC in us-east has an overall CIDR of 172.31.0.0/**16**. Its subnets, which are public, have this CIDRs: 172.31.**0**.0/20, 172.31.**16**.0/20, 172.31.**32**.0/20, 172.31.**48**.0/20, 172.31.**64**.0/20 and 172.31.**80**.0/20. Since there are no private subnets, there's only one route table (like the public one above with a route to the IGW). To have a private subnet, we can create a new subnet with CIDR 172.31.**96**.0/20 and also a new route table with only a Local route, and associate the subnet to this private route table.

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

## Network Address Translation (NAT)

Receive traffic on one IP and translate it and send it out using a different IP.

For example, an internet gateway transforms the instance's public IP to a private IP (and viceversa) in incoming and outgoing network packets. From [Configuration for internet access](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-igw-internet-access.html):

> The internet gateway logically provides the one-to-one NAT on behalf of your instance, so that when traffic leaves your VPC subnet and goes to the internet, the reply address field is set to the public IPv4 address or Elastic IP address of your instance, and not its private IP address. Conversely, traffic that's destined for the public IPv4 address or Elastic IP address of your instance has its destination address translated into the instance's private IPv4 address before the traffic is delivered to the VPC.

Note that the association between the public and the private IPs is done externally to the instance, by the internet gateway. The instance only knows its private IP, not the public IP. If you run `ifconfig` or `ip addr` you only see the private IP. The instance's operating system can't see the public IP.

## Internet Gateway

Enables access to/from the internet. When we connect to an EC2 instance we do so through the internet gateway.

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html

> An internet gateway enables resources in your public subnets (such as EC2 instances) to connect to the internet if the resource has a public IPv4 address or an IPv6 address. Similarly, resources on the internet can initiate a connection to resources in your subnet using the public IPv4 address or IPv6 address.

You can only attach one IGW to a VPC.

An IGW performs **network address translation** (NAT): it translates the public IP addresses of the virtual machines to their private IP addresses.

https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html

An internet gateway supports inbound and outbound IPv4 and IPv6 traffic, whereas an Egress-only internet gateway allows **outbound** communication over **IPv6** from instances in your VPC to the internet, and prevents the internet from initiating an IPv6 connection with your instances.

https://stackoverflow.com/questions/74455063/what-exactly-are-nat-gateway-and-internet-gateway-on-aws

> Think of the Internet Gateway as the wire that you use to connect your home router to the Internet. Pull out that wire and your home network won't be connected to the Internet.

## Bastion host

:::info
Alternatively, you can connect to an instance in a private subnet with EC2 Instance Connect Endpoint, [see docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-ec2-instance-connect-endpoint.html). You can do so in the console by clicking "Connect" as usual, and then choosing "Connect using EC2 Instance Connect Endpoint". You need to [create an EC2 Instance Connect Endpoint](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-ec2-instance-connect-endpoints.html) first.
:::

CloudFormation template - https://aws.amazon.com/solutions/implementations/linux-bastion/

Allows to connect to an instance in a private subnet through an instance in a public subnet.

Can be done with a NAT gateway or a NAT instance.

How to Connect to a Private EC2 Instance in a VPC Using a Bastion Host - https://www.youtube.com/watch?v=rn9kAXz6qxA - See this accompanying blog post "SSH into EC2 in Private Subnet" - https://digitalcloud.training/ssh-into-ec2-in-private-subnet

How can I connect to a private Amazon RDS instance from local system through EC2 as a bastion host? - https://www.youtube.com/watch?v=ypWzL3PdKx0

Setup:

- Launch an instance in a private subnet, with an SSH key pair, and a security group that allows SSH access.
- Launch an instance in a public subnet.
- Connect to the public instance, and from there connect to the private instance by doing:
  - Run `nano private-instance-private-key.pem` and paste the content of the private instance's private key (`-----BEGIN RSA PRIVATE KEY-----`).
  - Give the file read access with `chmod 400 private-instance-private-key.pem`.
  - Connect to the private instance with `ssh -i private-instance-private-key.pem ec2-user@172.31.110.223`, using the private instance’s private IP.
- Once connected to the private instance, run `ping google.com`. It should _not_ receive a response, because it’s a private instance without a public IP, and the route table doesn’t have a route to the IGW. If we wanted the private instance to have access to the Internet we would use a NAT Gateway.

## NAT Devices

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat.html

> Use a NAT device to allow resources in private subnets to connect to the internet, other VPCs, or on-premises networks.

**Traffic is outbound only**. No one in the outside world from the Internet can connect to the private instance. This allows the instance to call an external service, download software updates etc. If we wanted bidirectional traffic, we would deploy the instance on a public subnet, so that it has a public IP, and use Internet Gateway.

### NAT gateway

:::info

> NAT Gateways exist because organizations want the additional security offered by private subnets, which guarantee that there is no inbound access from the Internet. **Similar security can be provided with a Security Group**, so private subnets aren't actually required.

From https://stackoverflow.com/questions/74455063/what-exactly-are-nat-gateway-and-internet-gateway-on-aws
:::

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

An Network Address Translation service used to allow instances in private subnets to connect to the Internet.

Announcement: https://aws.amazon.com/blogs/aws/new-managed-nat-network-address-translation-gateway-for-aws

To do it, launch a NAT gateway in a public subnet, and add a route 0.0.0.0/0 to the private subnet's route table pointing to the NAT Gateway.

We always deploy a NAT gateway in a **public subnet**, since it needs to have public IP assigned, which needs to be an **elastic IP**. We then add a route at the private subnet's route table, with destination 0.0.0.0/0 pointing to the NAT Gateway.

From https://aws.amazon.com/vpc/faqs/

> How do instances without public IP addresses access the Internet?
>
> Instances without public IP addresses can access the Internet in one of two ways:
>
> 1. Instances without public IP addresses can route their traffic through a NAT gateway or a NAT instance to access the Internet. These instances use the public IP address of the NAT gateway or NAT instance to traverse the Internet. The NAT gateway or NAT instance allows outbound communication but doesn’t allow machines on the Internet to initiate a connection to the privately addressed instances.
> 2. For VPCs with a hardware VPN connection or Direct Connect connection, instances can route their Internet traffic down the virtual private gateway to your existing datacenter. From there, it can access the Internet via your existing egress points and network security/monitoring devices.

You can use a NAT gateway to connect to other VPCs or an on-premises network. In this case, you route traffic from the NAT gateway through a transit gateway or a virtual private gateway.

A NAT gateway has a limit in bandwidth (100 Gbps) and number of packets it can process (10 million packets per second). You can split your resources into multiple subnets and create a NAT gateway in each subnet. [source](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html)

See https://cloudonaut.io/advanved-aws-networking-pitfalls-that-you-should-avoid/#NAT-Gateway-or-Public-Subnet

> You need to create a NAT Gateway for every Availability Zone that you have created private subnets to achieve high availability.

Example: VPC with servers in private subnets and NAT - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html

:::info Important
Since a NAT gateway has an Elastic IP, you are charged for each hour that your NAT gateway is provisioned and available. If you delete the NAT gateway, you need to release the EIP too afterwards. You also pay for the data processed by the NAT gateway, and for data transfers. See https://aws.amazon.com/vpc/pricing/

To reduce costs, you can:

- Move the EC2 instances to public subnets and use firewalls to restrict incoming traffic.
- To access AWS services you can:
  - For S3 and DynamoDB, use [Gateway Endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html) at [no additional charge](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html).
  - For [other services](https://docs.aws.amazon.com/vpc/latest/privatelink/aws-services-privatelink-support.html), use Interface Endpoints with [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html) with an hourly and data [processing fee](https://aws.amazon.com/privatelink/pricing/#Interface_Endpoint_pricing).

See https://cloudonaut.io/advanved-aws-networking-pitfalls-that-you-should-avoid/#NAT-Gateway-or-Public-Subnet for a discussion of pros and cons.

> If keeping costs to a minimum is essential, the baseline costs of $32.00 per month per NAT Gateway could be a show stopper. When using three AZs, you will pay $96.00 per month for three NAT Gateways.
>
> The NAT Gateway also increases costs for outbound traffic. You have to pay a premium of $0.045 per GB flowing from a private subnet to the Internet. That’s raising the costs for outgoing traffic by 50%.

:::

#### NAT gateway setup

We have a private instance on a private subnet. We deploy a **NAT gateway** to a **public subnet**, since it needs to have public IP assigned, which needs to be an **elastic IP** (when creating the NAT gateway, at 'Elastic IP allocation ID' click 'Allocate Elastic IP'). The NAT gateway talks to the Internet Gateway on behalf of the private instance.

We create a **private route table**, explicitly associated to the **private subnet** (on 'Subnet associations'). Then on 'Edit routes' we add a route entry with 'Destination' 0.0.0.0/0 (ie everything else that is not routed locally via the VPC router) and for 'Target' choose 'NAT Gateway', selecting the NAT gateway we've created. So any address outside of the subnet address range will go to the NAT gateway.

The private instance can use it's private IP address to connect to the private IP of the NAT gateway, which will forward the traffic to the Internet Gateway using Network Address Translation, and reach the Internet.

Public subnet route table:

| Destination | Target |
| ----------- | ------ |
| 10.0.0.0/16 | local  |
| 0.0.0.0/0   | igw-id |

Private subnet route table:

| Destination | Target         |
| ----------- | -------------- |
| 10.0.0.0/16 | local          |
| 0.0.0.0/0   | nat-gateway-id |

To check that the setup is correct do:

- Connect to a public instance using Instance Connect.
- From the terminal, using nano, create a file containing the private SSH key (a `.pem` file) of the private instance, and then give it read access with `chmod 400 private-instance-private-key.pem`.
- Connect to the private instance with `ssh`, using its private IPv4 address: `ssh -i private-instance-private-key.pem ec2-user@172.31.110.223`.
- Once connected to the private instance, run `ping google.com`. It should receive a response.

### NAT instance

https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html

_Not used much nowadays since we have NAT gateways._ It was the way to do it in the past, but NAT gateways, since they are managed by AWS, are highly available and scale automatically.

Unlike NAT gateways, is not an AWS service. It's a special AMI pre-configured. Has amzn-ami-vpc-nat on the name.

You have to disable the source and destination checks to function as a NAT.

See https://stackoverflow.com/questions/22188444/why-do-we-need-private-subnet-in-vpc

Simple example here: https://stackoverflow.com/a/74455786/4034572

## Network ACL (subnet firewall)

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html

[Compare security groups and network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html#VPC_Security_Comparison)

Allows or denies inbound or outbound traffic at the subnet level, whereas a security group operates at the EC2 instance level. A security group applies only to the instance it is associated with, but a NACL applies to all the instances in a subnet. When two instances in a subnet talk to each other, security groups are involved and they need to allow the traffic, but NACLs are not because traffic doesn't go outside the subnet.

A security group is stateful, whereas a NACL is stateless.

- Stateful (SG): if a rule allows inbound traffic on a port (eg 80), the corresponding responses are allowed as well.
- Stateless (NACL): to allow inbound traffic, in addition to a rule allowing inbound traffic on a port (eg 80), you also need a rule to allow outbound ephemeral ports (from 1024 to 65535). And if you want to make an HTTP connection from within your subnet, you have to open outbound port 80 and inbound ephemeral ports as well. See AWS in Action p. 161.

NACLs supports allow and deny rules, whereas security groups only support allow rules. A NACL requires defining a priority for each rule, from 1 to 32766. Rules are processed in order, with smaller number having higher priority. When it reaches a rule that either allows or denies the traffic, it applies the matching rule and stops evaluating the remaining rules. For example, we can have some allow rules for HTTP/S traffic, and then another rule that denies everything else. See an example of NACL rules [here](https://stackoverflow.com/a/45297037/4034572) and [here](https://github.com/AWSinAction/code3/blob/main/chapter05/vpc.yaml).

Traffic between subnets of a VPC is always routed by default. You can’t remove the routes between the subnets. If you want to prevent traffic between subnets in a VPC, you need to use NACLs attached to the subnets. (AWS in Action p. 163)

:::tip

> We recommend you start with using security groups to control traffic. If you want to add an extra layer of security, you should use NACLs on top. But doing so is optional, in our opinion. (AWS in Action p. 163)

From https://stackoverflow.com/a/56351087/4034572:

> In general, the recommendation is to leave NACLs at their default settings (allow all traffic IN & OUT).

:::

## Place your servers in private subnets, and load balancers in public subnets

From 'Terraform: Up and Running' (p. 60 and 72):

> Running a server in a public subnet is a security risk. You should deploy all of your servers, and certainly all of your data stores, in private subnets, which have IP addresses that can be accessed only from within the VPC and not from the public internet. **The only servers you should run in public subnets are a small number of reverse proxies and load balancers**, that you lock down as much as possible.

> Place the EC2 instances in private subnets (so they aren't directly accessible from the public internet) and the ALBs in public subnets (so users can access them directly).

When to use Public Subnet vs Private Subnet? - https://stackoverflow.com/questions/59067920/when-to-use-public-subnet-vs-private-subnet

Where to put your server, in a private or public subnet? - https://medium.com/recursivelabs/where-to-put-your-server-in-a-private-or-public-subnet-b1f0087a19fb - https://bits.theoremone.co/where-to-put-your-server-in-a-private-or-public-subnet/

EC2 instances should not have a public IP address | AWS Foundational Security Best Practices - https://stackoverflow.com/questions/67178299/ec2-instances-should-not-have-a-public-ip-address-aws-foundational-security-be

[hola](#place-your-servers-in-private-subnets-and-load-balancers-in-public-subnets)

## VPC endpoints

Private connections to public AWS services.

To access AWS services like S3 and DynamodB, instances in public subnets can use their public endpoints. For instances in private subnets, we could use a NAT Gateway, but there's a better way that doesn't use the public internet: VPC endpoints. Instances use private IPs to access the services.

There are two types of VPC endpoints: gateway and interface endpoints.
For S3 and DynamoDB, use [Gateway VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html) at [no additional charge](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html).
For [other services](https://docs.aws.amazon.com/vpc/latest/privatelink/aws-services-privatelink-support.html), use Interface Endpoints with [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html) with an hourly and data [processing fee](https://aws.amazon.com/privatelink/pricing/#Interface_Endpoint_pricing).

Comparison ([source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/privatelink-interface-endpoints.html#types-of-vpc-endpoints-for-ddb)):

<table>
  <thead>
    <tr>
      <th>
        <p>Gateway endpoints for DynamoDB</p>
      </th>
      <th>
        <p>Interface endpoints for DynamoDB</p>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">
        <p>In both cases, your network traffic remains on the AWS network.</p>
      </td>
    </tr>
    <tr>
      <td >
        <p>Use Amazon DynamoDB public IP addresses</p>
      </td>
      <td>
        <p>Use private IP addresses from your Amazon VPC to access Amazon DynamoDB</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Do not allow access from on premises</p>
      </td>
      <td>
        <p>Allow access from on premises</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Do not allow access from another AWS Region</p>
      </td>
      <td>
        <p>Allow access from an Amazon VPC endpoint in another AWS Region by using Amazon VPC
          peering or AWS Transit Gateway</p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Not billed</p>
      </td>
      <td>
        <p>Billed</p>
      </td>
    </tr>
  </tbody>
</table>

A similar comparison exists for S3 in [Types of VPC endpoints for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html#types-of-vpc-endpoints-for-s3).
