---
title: EC2
---

# EC2 - Elastic Compute Cloud

Docs: https://docs.aws.amazon.com/ec2

https://console.aws.amazon.com/ec2/v2/home

Cheatsheet - https://digitalcloud.training/amazon-ec2/

Auto Scaling cheatsheet - https://digitalcloud.training/amazon-ec2-auto-scaling/

:::info
EC2 instances run on a single availability zone. To achieve high availability in case there's an outage in one availability zone, you can fail over into another AZ with Auto Scaling.
:::

## IaaS

You manage the OS and whatever you want to run on top it, and AWS manages the [hypervisor](https://en.wikipedia.org/wiki/Hypervisor) and the hardware below.

## Virtual servers

Each EC2 instance is a virtual server or **virtual machine** that runs on top of host servers.

The virtualization technology of EC2 is [Nitro](https://aws.amazon.com/ec2/nitro/).

## Learn

Tutorial 'Host a WordPress blog' (note that there are 2):

- Amazon Linux 2: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tuts-wordpress.html → https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html
- AL2023 (AMI newer than Amazon Linux 2): https://docs.aws.amazon.com/linux/al2023/ug/hosting-wordpress-aml-2023.html
- Elastic Beanstalk - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-hawordpress-tutorial.html

## Instance types

https://aws.amazon.com/ec2/instance-types/

https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html

`t2.micro`:

- `t` is the family
- `2` is the generation
- `micro` is the size (CPU, memory, storage and network)

> **Our experience indicates that you'll overestimate the resource requirements for your applications.** We recommend that you try to start your application with a smaller instance type than you think you need at first and change the instance type later if needed. (AWS in Action p. 63)

## Launch instance

- _Make sure you are at the right region_
- Go to the EC2 Dashboard and click the button 'Launch instance'
- Give it a Name
- Choose the OS image (Amazon Machine Image)
  - Eg pick Amazon Linux 2023
- Choose the instance type (t2.nano, t2.micro...)
- Choose a [key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) if you plan to connect to the instance using SSH
  - You can create a new one of type 'RSA', file format `.pem` and name like `us-east-kp`
- On the 'Network settings'
  - VPC: select one or just use the default
  - Subnet: No preference
  - Auto-assign public IP: Enable
  - Firewall (security groups):
    - If we don't have any, create a new one:
      - Check 'Create security group'
      - Give it a name, eg 'WebSSHAccess', and edit the Description too, putting the same name and the creation date
      - Type: ssh
      - Source type: Anywhere, or any IP
      - (This will open port 22 for SSH access)
    - If we have one:
      - Check 'Select exiting security group' and select it
- Advanced details (optional)
  - IAM instance profile: attach any IAM Role for accessing services like S3
  - Metadata accessible: Enabled
  - Metadata version: V1 and V2 or V2
  - Set 'User data'
- Click 'Launch instance'

To terminate the instance, at the Instances pages open the 'Instance state' drop-down and click 'Terminate instance'.

## Connect

Connect to your EC2 instance - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect.html

Options:

### SSH with key pair

(Prerequisites) Connect to your Linux instance using SSH - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html

(`ssh` commands) Connect to your Linux instance using an SSH client - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

We connect to an SSH server running on the instance. Port 22 (where the SSH daemon runs) must be open; we do this with the security group (the firewall).

The client has the private key (contained on a `.pem` file), and the server the public key (at ` ~/.ssh/authorized_keys`). Anyone with the public key can access the instance.

To connect, we can use either the 'Public IPv4 address' (eg 3.87.6.57) or 'Public IPv4 DNS' (eg ec2-3-87-6-57.compute-1.amazonaws.com; note that it has the public IP on the name).

```shell
chmod 400 us-east-kp.pem # Fix WARNING: UNPROTECTED PRIVATE KEY FILE!
ssh -i us-east-kp.pem ec2-user@ec2-107-22-100-77.compute-1.amazonaws.com
# or
ssh -i us-east-kp.pem ec2-user@107.22.100.77
```

If asked:

> "The authenticity of host 'ec2-107-22-100-77.compute-1.amazonaws.com (107.22.100.77)' can't be established.
> This key is not known by any other names
> Are you sure you want to continue connecting (yes/no/[fingerprint])?"

Say 'yes'. It will say "Warning: Permanently added 'ec2-107-22-100-77.compute-1.amazonaws.com' (ED25519) to the list of known hosts."

Problems:

- You need to open the port 22.
- It's not possible to change the key pair externally after launching the EC2 instance.
- It works only for a single user.

It's preferable to use the Session Manager.

### EC2 Instance Connect

Connect to your Linux instance with EC2 Instance Connect - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-eic.html

Uses SSH but there's no need to have a key :) It creates a temporary key pair: _When you connect to an instance using EC2 Instance Connect, the Instance Connect API pushes an SSH public key to the instance metadata where it remains for 60 seconds._

Uses IAM for access control.

You can use a terminal or a browser. Port 22 needs to be open. The instance needs to have a public IPv4 address.

### Session Manager (AWS Systems Manager)

:::tip
Open `https://console.aws.amazon.com/systems-manager/session-manager/$INSTANCEID` in your browser. (`INSTANCEID` is like i-01269dace6eb55218.)
:::

- Connect to an Amazon EC2 instance by using Session Manager - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/connect-to-an-amazon-ec2-instance-by-using-session-manager.html
- Connect to your EC2 instance using SSH the modern way - https://cloudonaut.io/connect-to-your-ec2-instance-using-ssh-the-modern-way/ - https://www.youtube.com/watch?v=w-yVPzSbb0c
- (Benefits and features) AWS Systems Manager Session Manager - https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html
- (Not very useful) Connect to your Amazon EC2 instance using Session Manager - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-systems-manager-session-manager.html

Uses IAM for access control. No need to open any ports (unlike SSH, which requires opening the port 22, or RDP, which requires opening the port 3389). No need to configure a key pair upfront (it uses temporary key pairs). No need to maintain a bastion host. Is the most secure option. [See all benefits here](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager-benefits).

You can use either an interactive one-click browser-based shell or the AWS Command Line Interface (AWS CLI). To connect from the terminal (instead of the browser) see [Install the Session Manager plugin for the AWS CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html).

Requirements:

- The SSM agent needs to be installed. It is on Amazon Linux, Ubuntu and some other AMIs.
- The EC2 instance needs to be launched with an [IAM instance profile](/aws/iam#ec2-instance-profile) role having the permission policy `AmazonSSMManagedInstanceCore`, which "Allows EC2 instances to call AWS services like CloudWatch and Systems Manager on your behalf.".

When launching an EC2 instance using the console do:

- At "Key pair (login)", choose "Proceed without a key pair (Not recommended)".
- At "Network settings", choose "Create security group" and uncheck "Allow SSH traffic fom".
- At "Advanced details" → "IAM instance profile", choose a role that has the permission policy `AmazonSSMManagedInstanceCore`. (You need the trust policy `sts:AssumeRole` as well, [see this](/aws/iam#ec2-instance-profile).)

:::info
The default user on Amazon Linux 2 is the `ec2-user`. But when using the Session Manager via the AWS Management Console, you are logged in with another user named `ssm-user`. (Doing `whoami` prints `ssm-user`.)

Thus, to access the `ec2-user` home directory (`cd /home/ec2-user`) you need to run `sudo -s` first, otherwise you get "Permission denied". [source](https://superuser.com/a/241137)
:::

### RDP (Windows)

[Remote Desktop Protocol](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol). To connect to Windows machines. There are clients for many OS. You access the desktop using a graphical interface.

Port 3389 must be open on the security group.

## Internet gateway

Enables access to/from the internet.

When we connect to the EC2 instance we do so through the internet gateway.

## Security group (instance firewall)

:::tip
To debug misconfiguration in firewall rules or monitor network traffic you can:

- Use the [VPC Reachability Analyzer](https://docs.aws.amazon.com/vpc/latest/reachability/getting-started.html) to simulate the traffic and see if the tool finds the configuration problem.
- Enable [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) to get access to aggregated log messages containing rejected connections.

:::

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html

A virtual firewall that controls incoming and outgoing (inbound and outbound) traffic _at the instance level_ (in contrast with Network ACL, which operate at the subnet level).

The rules control which direction (inbound or outbound), IP protocols (TCP, UDP, ICMP), port and IP addresses we can connect from/to. We can also specify a security group.

By default, a security group:

- Does not allow any inbound traffic. You need to add rules yourself to do so.
- Contains a rule that allows all outbound traffic. If you want something more restrictive, you need to remove the rule and add other rules.

Source `0.0.0.0/0` means any IPv4 address, and `::/0` any IPv6 address.

## Metadata

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html

Information about the instance, stored locally on the instance.

The IP address 169.254.169.254 is the address of Instance Metadata Service that runs locally on the same computer. It's a [link-local address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html#link-local-addresses). It can be accessed only from the instance.

To [get the instance metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html) run:

```shell
# V1
curl http://169.254.169.254/
curl http://169.254.169.254/latest/meta-data
curl http://169.254.169.254/latest/meta-data/instance-id
curl http://169.254.169.254/latest/meta-data/public-ipv4

# V2
# Get token
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
# or
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
# Use token
curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/placement/availability-zone

# You can do this with a single command
EC2AZ=$(TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"` && curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/placement/availability-zone)
```

Get the region ([see other options here](https://stackoverflow.com/questions/4249488/find-region-from-within-an-ec2-instance)):

```shell
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 60"`
AZ=`curl -H "X-aws-ec2-metadata-token: $TOKEN" -v http://169.254.169.254/latest/meta-data/placement/availability-zone`
REGION=${AZ::-1}
```

## User Data

:::tip
To debug a user data script, have a look at the `/var/log/cloud-init-output.log` file shown, which contains the outputs of the user data script _at the end_.

```shell
sudo less /var/log/cloud-init-output.log
sudo cat /var/log/cloud-init-output.log
```

See [Cloud-init log files](https://docs.cloud-init.io/en/latest/reference/user_files.html#cloud-init-log-files).
:::

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-add-user-data.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html

Code scripts that run when the instance starts, to customize the instance.

```shell
#!/bin/bash
yum update -y
```

Limited to 16 kB.

Accessible at the metadata at `http://169.254.169.254/latest/user-data`.

### Run Apache server

```shell
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
```

Once the Apache server is running, there are various ways to customize the HTML:

```shell
echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hello!</title></head><body><p>Hello!</p></body></html>' > /var/www/html/index.html
```

```shell
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
AZ=`curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/placement/availability-zone`

cat > /var/www/html/index.html <<EOF
<html>
  <head>
    <title>Instance Availability Zone</title>
  </head>
  <body>
    <div>This instance is located in Availability Zone: $AZ</div>
  </body>
</html>
EOF
```

## Networking

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-networking.html

### Network interface adapter

Important: you can have multiple adapters connected to the instance, which can be on diferent subnets, but the subnets have to be in the same availability zone. Thus, you cannot move a network interface to a different AZ.

Each instance has a default (primary, eth0) network interface attached to a subnet, and a private IP address on the subnet. (If it's on a public subnet, it can also have a public IP, which is associated with the private IP.) The primary network interface cannot be detached. You can optionally attach the instance to more subnets using more network interface adapters, but each subnet has to be on the same availability zone.

Adapter types:

- [Elastic Network Interface (ENI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html): the default. All instance types are supported.
- [Elastic Network Adapter (ENA](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html): high network performance. _Not_ all instance types are supported.
- [Elastic Fabric Adapter (EFA)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html): for HPC, MPI (message passing interface) and ML. See [supported instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html#efa-instance-types).

### IP address

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html

> We release your instance's public IP address when it is stopped, hibernated, or terminated. Your stopped or hibernated instance receives a new public IP address when it is started.

Private IP:

- Doesn't change, even if the instance is stopped.
- Used on public and private subnets.

Public IP:

- Is dynamic. It's associated to the instance until it is stopped or terminated, thus you cannot use it in application code since it can change. Note that the ‘Public IPv4 DNS’ (eg ec2-3-94-61-169.compute-1.amazonaws.com) will also change, since it includes the public IP.
- Used in public subnets only.

Note that when you reboot an instance it keeps the public IPv4 address, [see docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-reboot.html).

### Pricing

https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/

https://www.linkedin.com/pulse/changes-aws-public-ip-address-charges-neal-k-davis-j0wae/ - https://www.youtube.com/watch?v=4EvktMxjyxU

### Elastic IP

An [Elastic IP address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) is **static**; it does not change over time.

You can assign the elastic IP (EIP) to a second network interface eth1 (will be on a different subnet than eth0), and attach this network interface to an instance. If the instance is stopped and started, the IP won't change.

Both an ENI and EIP can be mapped to a different instance in the same AZ. However, as explained above, the ENI cannot be moved to a different AZ, but the EIP can. Thus, if the instance fails, we can move the ENI or the EIP to another instance within the same AZ, or move the EIP to an instance in different AZ.

Elastic IP addresses are only for IPv4, not IPv6.

You are **charged** for elastic IPs that are allocated to your account but you don't actually use on a running instance. On a EC2 instance, if you do Instance state → Stop instance you'll see this warning:

> After you stop the instance, you are no longer charged usage or data transfer fees for it. However, you will still be billed for associated resources, such as attached EBS volumes and associated Elastic IP addresses.

And when you terminate an instance with an elastic IP it says:

> Elastic IPs which are not associated with an instance will incur an hourly cost. [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
> To disassociate and release Elastic IPs associated with this instance, go to the [Elastic IPs screen](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Addresses:).
> The following Elastic IPs are still associated with your account: 34.192.137.227

To **release** an EIP, first disassociate it from the network interface at EC2 → Network interfaces, select the network interface with the EIP, and then do Actions → Disassociate address. (Afterwards, if the instance is not running, you can optionally delete the network interface with Actions → Delete.) Then go to EC2 → Elastic IP addresses, select the allocated EIP and do Actions → Release Elastic IP address.

### NAT

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html

Network Address Translation.

Receives traffic on one IP and translates it and sends it out using a different IP.

The internet gateway transforms the instance's public IP to a private IP (and viceversa) in incoming and outgoing network packets.

See https://stackoverflow.com/questions/74455063/what-exactly-are-nat-gateway-and-internet-gateway-on-aws

> NAT Gateways exist because organizations want the additional security offered by private subnets, which guarantee that there is no inbound access from the Internet. **Similar security can be provided with a Security Group**, so private subnets aren't actually required.

### Bastion hosts

:::info
Alternatively, there's also the EC2 Instance Connect Endpoint: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-ec2-instance-connect-endpoint.html
:::

CloudFormation template - https://aws.amazon.com/solutions/implementations/linux-bastion/

Allows to connect to an instance on a private subnet through an instance on a public subnet.

Can be done with a NAT gateway or a NAT instance.

How to Connect to a Private EC2 Instance in a VPC Using a Bastion Host - https://www.youtube.com/watch?v=rn9kAXz6qxA - See this accompanying blog post 'SSH into EC2 in Private Subnet' - https://digitalcloud.training/ssh-into-ec2-in-private-subnet

How can I connect to a private Amazon RDS instance from local system through EC2 as a bastion host? - https://www.youtube.com/watch?v=ypWzL3PdKx0

### NAT gateway

An AWS service used to allow instances in private subnets to connect to the Internet.

Announcement: https://aws.amazon.com/blogs/aws/new-managed-nat-network-address-translation-gateway-for-aws

To do it, launch a NAT gateway in a public subnet, and add a route 0.0.0.0/0 to the private subnet's route table pointing to the NAT Gateway.

Traffic is **outbound** only. No one outside from the Internet will be able to connect to the private instance. This allows the instance to call an external service, download software updates etc. If we wanted bidirectional traffic, we would deploy the instance on a public subnet, so that it has a public IP, and use Internet Gateway.

Example: VPC with servers in private subnets and NAT - https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html

:::info Important
Since a NAT gateway has an Elastic IP, you'll be charged. If you delete the NAT gateway, you need to release the EIP too afterwards. You also pay for the data processed by the NAT gateway, and for data transfers. See https://aws.amazon.com/vpc/pricing/

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

#### Steps

We have a private instance on a private subnet. We deploy a **NAT gateway** to a **public subnet**, since it needs to have public IP assigned, which needs to be an **elastic IP** (in 'Elastic IP allocation ID' click 'Allocate Elastic IP'). The NAT gateway talks to the Internet Gateway on behalf of the private instance.

We create a **private route table**, explicitly associated to the **private subnet** (on 'Subnet associations'). Then on 'Edit routes' we add a route entry with 'Destination' 0.0.0.0/0 (ie everything else that is not routed locally via the VPC router) and for 'Target' choose 'NAT Gateway', selecting the NAT gateway we've created. So any address outside of the subnet address range will go to the NAT gateway.

The private instance can use it's private IP address to connect to the private IP of the NAT gateway, which will forward the traffic to the Internet Gateway using Network Address Translation, and reach the Internet.

Main route table (public subnet):

| Destination | Target |
| ----------- | ------ |
| 10.0.0.0/16 | local  |
| 0.0.0.0/0   | igw-id |

Private route table (private subnet):

| Destination | Target         |
| ----------- | -------------- |
| 10.0.0.0/16 | local          |
| 0.0.0.0/0   | nat-gateway-id |

To check that the setup is correct do:

- Connect to a public instance using Instance Connect.
- From the terminal, using nano, create a file containing the private instance's SSH key-pair, and then `chmod 400`.
- Connect to the private instance with `ssh`, using its private IPv4 address.
- Once connected to the private instance, run `ping google.com`. It should receive a response.

### NAT instance

_Not used much nowadays since we have NAT gateways._ It was the way to do it in the past, but NAT gateways, since they are managed by AWS, are highly available and they scale automatically.

Unlike NAT gateways, is not an AWS service. It's a special AMI pre-configured. Has amzn-ami-vpc-nat on the name.

You have to disable the source and destination checks to function as a NAT.

See https://stackoverflow.com/questions/22188444/why-do-we-need-private-subnet-in-vpc

## Lifecycle

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-lifecycle.html

<img src="https://static.packt-cdn.com/products/9781787125629/graphics/573f7f95-0362-4395-a034-058e031d4f2b.png" />

[Stopped](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Stop_Start.html)

- Only for EBS-backend instances. If the root volume is instance store-backed you cannot stop it.
- You are not charged in EC2, but you pay for the EBS data since the volumes remain attached.
- RAM is lost.
- Host will be different when it restarts → if there's some maintenance or the host has an issue, we can stop the instance to move it.
- Private IPv4 and IPv6 address is retained, but public (not Elastic) IPv4 is not. Elastic IPs are always retained.

[Hibernating](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html)

- For On-Demand or Spot instances.
- Needs to be enabled when launched.
- Only for supported AMIs.
- RAM is saved on a EBS volume and restored when restarted.
- Processes running are resumed when restarted.
- Previously attached data volumes are reattached.
- Instance ID is retained.

[Reboot](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-reboot.html)

- Equivalent to an OS reboot.
- All IP address and DNS names are retained.

[For retirement](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-retirement.html)

- Scheduled to be retired by AWS when there is an irreparable failure of the underlying hardware, .

[Terminated](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html)

- Root EBS volumes are deleted by default (`DeleteOnTermination` is true for the root volume, but is false for any other EBS volume attached).

[Recovered](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html)

- Automatic recovery be configured or you can do so using a CloudWatch alarm.
- The recovered instance is identical to the original instance.

## EBS

https://docs.aws.amazon.com/ebs/

Network-attached storage for virtual machines.

:::info
EC2 instances are linked to a subnet, and the subnet is linked to an availability zone. EBS volumes are also located only in a single availability zone. If a virtual machine is moved to another availability zone because of an outage, the EBS volume cannot be accessed from the other availability zones.

To overcome this problem you can:

- Use EFS.
- Create snapshots of the EBS volumes regularly. Snapshots are stored in S3, which is available in multiple AZs. If the data is stored in the root volume, you can back it up with an AMI.
- Use another storage solution like [Gluster](https://www.gluster.org/), [DRBD](https://linbit.com/drbd/), S3, RDS, DynamoDB...

(AWS in Action p. 375.)
:::

**Block** storage: requires an EC2 instance, since the OS is needed to create filesystems and partitions, reading and writing using system calls etc.

For **legacy applications** that read/write files from/to a filesystem, like relational databases. Is standalone/independent: can exist without an EC2 instance, but you need an EC2 instance to access it. It's accessed over the network. It replicates data among multiple disks automatically to increase durability and availability.

An EC2 instance has a root EBS volume (`/dev/xvda`) that contains the OS. By default, the root volume is deleted when you terminate the EC2 instance (since the attribute [`DeleteOnTermination`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance-ebs.html#cfn-ec2-instance-ebs-deleteontermination) is true for it), but any other volumes attached are not (`DeleteOnTermination` is false).

Generally, an EBS volume is attached to exactly one EC2 instance. It's possible to attach EBS volumes to multiple EC2 instances with [Multi-Attach](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html), but with some limitations.

Use `lsblk` to list the attached volumes. To use the volume, you need to create a filesystem first. For example, to create a filesystem of type XFS run `sudo mkfs -t xfs /dev/nvme1n1`. Then create a folder on which to mount the device with `sudo mkdir /data`. Afterwards, mount the device with `sudo mount /dev/nvme1n1 /data`. Once the device is mounted, use `df -h` to see it. Doing `lsblk` will now show `/data` at the `MOUNTPOINT` column. The volume is ready; we can now create files at the `/data` directory (eg `sudo touch /data/hello.txt`).

Some EC2 instance types are EBS-optimized, others optionally support EBS optimization, an some do not support EBS optimization; see [Amazon EBS-optimized instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html) and [Amazon EBS optimization](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-optimization.html).

You can back up EBS volumes with [EBS snapshots](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html). Snapshots are incremental. Snapshots are stored in S3, which is available in multiple AZs. To create a snapshot with the CLI use [`create-snapshot`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/create-snapshot.html): `aws ec2 create-snapshot --volume-id <volume-id>`.

Durability vs availability:

- Durability of 99.9%: if you have 1000 volumes, you will loose the data stored in one volume every year.
- Availability of 99.999%. If an outage occurs, the volume will not be available, but the data is not lost; it will be available when the outage ends.

## Instance Store

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

HDD or SSD physically attached to the machine that hosts the VM, which results in very high performance. Unlike EBS volumes, instances store volumes can't exist without an EC2 instance.

Since instance stores are not independent of EC2 instances, data is lost when you stop or terminate the VM, or when there's a hardware failure, which means that should not be used for data that must not be lost. Use it for ephemeral/temporary data, for example, caching data locally from a remote data source, or for NoSQL databases that use a cluster of machines to replicate data. Unlike EBS volumes, there's no built-in backup mechanism for instance store. If you need to back up the data, use EBS instead.

Not all instance types support instance store volumes.

## EFS

A filesystem that can be shared between multiple Linux virtual machines in different availability zones. Data is replicated among multiple AZ in a region, providing high availability in case there's an outage. Uses the NFS (Network File Server) v4.1 protocol. Like S3, EFS grows with your storage needs; you don’t have to provision the storage up front.

You need to create a mount target on each subnet, and the EC2 instance where you mount the filesystem must be in the same subnet as the EFS mount target. Each mount target is bound to an availability zone. You need at least two mount targets in different availability zones for high availability. Mount targets are protected by security groups.

## EBS vs Instance Store vs EFS

|             | EBS                                         | Instance Store                           | EFS                                               |
| ----------- | ------------------------------------------- | ---------------------------------------- | ------------------------------------------------- |
| Type        | Block                                       | Block                                    | File                                              |
| Attachment  | Accessed over the network                   | Physically attached → High performance   | Accessed over the network                         |
| Shared      | Single instance (but can do multi-attach)   | Single instance                          | Multiple instances                                |
| Data Center | Single AZ → 99.9% uptime                    | Single AZ                                | Multiple AZ → 99.99% uptime, high availability    |
| Persistence | Persistent, since it's independent of VMs   | Ephemeral, for temporal data like caches | Persistent (11 9s of durability)                  |
| Backup      | EBS snapshots and [AWS Backup][backup]      | No built-in backup mechanism             | [AWS Backup][backup]                              |
| Pricing     | Pay for provisioned storage, even if unused |                                          | Grows as needed, don't have to provision up front |

[backup]: https://aws.amazon.com/backup/

## Pricing

https://aws.amazon.com/ec2/pricing

Instance purchasing options - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html

EC2 Pricing Models Explained - https://www.youtube.com/watch?v=rmFlOo7MNW0

[On-Demand](https://aws.amazon.com/ec2/pricing/on-demand/)

- No up-front commitment.
- Most expensive option (standard rate, no discount).
- Pay by the second (Amazon Linux) or hour (RHEL, SUSE).
- To try something, test a new app or for unpredictable workloads. Not for steady, long-term workloads.

[Spot](https://aws.amazon.com/ec2/spot/)

- Bid on spare capacity.
- Least expensive option, up to 90% discount.
- Instance can be terminated at any time, thus workload needs to be interruptible.
  - You have 2 minutes to save the data, see [Spot Instance interruption notices](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html).
- To run compute heavy tasks like ML or HPC (hundreds or thousands of servers) at a very low cost.

[Reserved (RI)](https://aws.amazon.com/ec2/pricing/reserved-instances/)

- Commitment of 1-3 years.
- About 30-60% savings, up to 72%.
- You pay for capacity even if you don't use it, but on the other hand you ensure you'll have capacity.
- Can be Standard or Convertible (more expensive but you can change the instance attributes).

[Savings plan](https://aws.amazon.com/savingsplans/)

- Best of all options, [see this](https://youtu.be/rmFlOo7MNW0?feature=shared&t=146).
- Hourly spend commitment of 1-3 years. Anything beyond that you'll pay On-Demand price.
- Saving up to 72%.
- More flexibility than reserved.
- Three types of Savings Plans: Compute Savings Plans (includes Fargate and Lambda too), EC2 Instance Savings Plans, and Amazon SageMaker Savings Plans.

[Dedicated instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html)

- Might share hardware with other instances from the same AWS account that are not Dedicated Instances.
- Billed per instance.

[Dedicated hosts](https://aws.amazon.com/ec2/dedicated-hosts/)

- Physical server that is fully dedicated for your use.
- Dedicated hardware to support software licenses (since we have visibility of sockets and physical cores) or compliance/regulatory requirements.
- Billed per host.

## AMI

:::info Important
The AMI ID is region-specific, that is, the AMI ID of the latest Amazon Linux is different in us-east-1 and us-west-1. Is important to set the right value in CloudFormation templates.
:::

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html

Amazon Machine Image. A template with a read-only filesystem including the OS, additional software like a server and applications and configuration.

The AMI does not include the kernel of the OS. The kernel is loaded from Amazon Kernel Image (AKI)

Can be backed by EBS (persistent) or instance store (non-persistent).

You can find AMIs in the AWS Marketplace: https://aws.amazon.com/marketplace

Automatically clean up unused AMIs to reduce EBS storage consumption and costs - https://cloudonaut.io/cleaning-up-amis - https://www.npmjs.com/package/aws-amicleaner

### Amazon Linux

https://aws.amazon.com/linux/amazon-linux-2023

https://github.com/amazonlinux/amazon-linux-2023

What is Amazon Linux 2023? - https://docs.aws.amazon.com/linux/al2023/ug/what-is-amazon-linux.html

Comparing AL2 and Amazon Linux 2023 - https://docs.aws.amazon.com/linux/al2023/ug/compare-with-al2.html

Amazon Linux is originally based on RHEL, like CentOS. See [Relationship to Fedora](https://docs.aws.amazon.com/linux/al2023/ug/relationship-to-fedora.html).

It uses the `yum` package manager. To install software run:

```shell
yum update -y
yum install -y httpd
```

AL2 (not the 2023) has extras - https://docs.aws.amazon.com/linux/al2/ug/al2-extras.html

```shell
amazon-linux-extras list
sudo amazon-linux-extras install python3.8
```

## Placement groups

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html

> Placement groups are optional. If you don't launch your instances into a placement group, EC2 tries to place the instances in such a way that all of your instances are spread out across the underlying hardware to minimize correlated failures.

Options:

- Cluster: instance are close (eg on the same rack) to have low-latency and high throughput. For HPC.
- Partition: split instances in partitions, and each partition runs on a separate underlying hardware. You can have up to 7 partitions per AZ. When we have data replicated and we want to ensure there's always a node running, eg Kafka or Cassandra.
- Spread: a small group of instances that all run on different hardware (ie a different rack) to reduce correlated failures.

You choose it when you launch the instance.

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/index.html

See this example: https://github.com/AWSinAction/code3/blob/main/chapter04/virtualmachine.sh

See [List and filter using the CLI and API](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Filtering.html#Filtering_Resources_CLI).

Note that if you use wildcards (`*`) in `--filters` you need to use quotes.

```shell
aws ec2 describe-instances
aws ec2 describe-instances --filters Name=instance-type,Values=t2.micro
aws ec2 describe-instances --filters Name=instance-state-name,Values=stopped Name=instance-type,Values=t2.micro
```

:::tip
Use `--query` to extract data from the JSON response using [JMESPath](https://jmespath.org).

Use `--output text` to pass the output to `grep`, `sed` or `awk`.
:::

```shell
aws ec2 describe-instances \
 --filters "Name=tag:Name,Values=jenkins-multiaz-efs-eip" \
 "Name=instance-state-code,Values=16" \
 --query "Reservations[0].Instances[0].InstanceId" \
 --output text
```

```shell
aws ec2 describe-instances \
 --filters "Name=tag:Name,Values=jenkins-multiaz" \
 "Name=instance-state-code,Values=16" \
 --query "Reservations[0].Instances[0].[InstanceId, PublicIpAddress, PrivateIpAddress, SubnetId]"
```

```shell
aws ec2 describe-images \
 --filters "Name=name,Values=amzn2-ami-hvm-2.0.202*-x86_64-gp2" \
 --query "Images[0].ImageId" \
 --output text
```

```shell
aws ec2 describe-regions
```

```shell
aws ec2 describe-availability-zones --region eu-west-1
```

```shell
aws ec2 terminate-instances --instance-ids i-001b89bdc08ba65f7
```
