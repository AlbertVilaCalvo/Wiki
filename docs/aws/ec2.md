---
title: EC2
---

# EC2 - Elastic Compute Cloud

Docs: https://docs.aws.amazon.com/ec2

https://console.aws.amazon.com/ec2/v2/home

Cheatsheet - https://digitalcloud.training/amazon-ec2/

Autoscaling cheatsheet - https://digitalcloud.training/amazon-ec2/

## IaaS

You manage the OS and whatever you want to run on top it, and AWS manages the [hypervisor](https://en.wikipedia.org/wiki/Hypervisor) and the hardware below.

## Virtual servers

Each EC2 instance is a virtual server or **virtual machine** that runs on top of host servers.

## AMI

Amazon Machine Image. A template with the OS and additional software like a server and applications.

Can be backed by EBS or backed by instance store.

## Learn

Tutorial 'Host a WordPress blog' (note that there are 2):

- Amazon Linux 2: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tuts-wordpress.html → https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html
- AL2023 (AMI newer than Amazon Linux 2): https://docs.aws.amazon.com/linux/al2023/ug/hosting-wordpress-aml-2023.html

## Instance types

https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html

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

Connect to your Linux instance - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html

Options:

### SSH

Connect to your Linux instance from Linux or macOS using SSH - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

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

### EC2 Instance Connect

Connect to your Linux instance with EC2 Instance Connect - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-eic.html

Uses SSH but there's no need to have a key :) It creates a temporary key pair: _When you connect to an instance using EC2 Instance Connect, the Instance Connect API pushes an SSH public key to the instance metadata where it remains for 60 seconds._

Uses IAM for access control.

You can use a terminal or a browser. Port 22 needs to be open.

### Session Manager

Connect to your Linux instance with AWS Systems Manager Session Manager - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/session-manager-to-linux.html

Uses IAM for access control. No need to open any ports Is the most secure.

### RDP

[Remote Desktop Protocol](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol). To connect to Windows machines. There are clients for many OS. You access the desktop using a graphical interface.

Port 3389 must be open on the security group.

## Internet gateway

Enables access to/from the internet.

When we connect to the EC2 instance we do so through the internet gateway.

## Security group (firewall)

A virtual firewall that controls incoming and outgoing (inbound and outbound) traffic.

Controls which port protocols and IP addresses we can connect from.

Source 0.0.0.0/0 means any IPv4 address, and ::/0 any IPv6 address.

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
```

## User Data

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-add-user-data.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html

Code scripts that run when the instance starts, to customize the instance.

```shell
#!/bin/bash
yum update -y
```

Limited to 16 kB.

Accessible at the metadata.

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

Allows to connect to an instance on a private subnet through an instance on a public subnet.

Can be done with a NAT gateway or a NAT instance.

https://www.youtube.com/watch?v=ypWzL3PdKx0

### NAT gateways

An AWS service used to allow instances in private subnets to connect to the Internet.

Traffic is **outbound** only. No one outside from the Internet will be able to connect to the private instance. This allows the instance to call an external service, download software updates etc. If we wanted bidirectional traffic, we would deploy the instance on a public subnet, so that it has a public IP, and use Internet Gateway.

We have a private instance on a private subnet. We deploy a **NAT gateway** to a **public subnet**, since it needs to have public IP assigned, which needs to be an **elastic IP**. The NAT gateway talks to the Internet Gateway on behalf of the private instance.

We create a **private route table**, explicitly associated to the **private subnet** (on 'Subnet associations'). Then on 'Edit routes' we add a route entry with 'Destination' 0.0.0.0/0 (ie everything else that is not routed locally via the VPC router) and for 'Target' choose 'NAT Gateway', selecting the NAT gateway we've created. So any address range outside of the VPC will go to the NAT gateway.

The private instance can use it's private IP address to connect to the private IP of the NAT gateway, which will forward the traffic to the Internet Gateway using Network Address Translation, and reach the Internet.

To check that the setup is correct do:

- Connect to a public instance using Instance Connect.
- From the terminal, using nano, create a file containing the private instance's SSH key-pair, and then `chmod 400`.
- Connect to the private instance with `ssh`, using its private IPv4 address.
- Once connected to the private instance, run `ping google.com`. It should receive a response.

### NAT instances

_Not used much nowadays since we have NAT gateways._

Unlike NAT gateways, is not an AWS service. It's a special AMI pre-configured. Has amzn-ami-vpc-nat on the name.

You have to disable the source and destination checks to function as a NAT.

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

- Needs to be enabled when launched.
- Only for supported AMIs.
- RAM is saved on a EBS volume and restored when restarted.
- Processes running are resumed when restarted.
- Instance ID is retained.

[Reboot](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-reboot.html)

- All IP address and DNS names are retained.

[For retirement](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-retirement.html)

- Scheduled to be retired by AWS when there is an irreparable failure of the underlying hardware.

[Terminated](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html)

- Root EBS volumes are deleted by default.

[Recovered](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html)

- Identical to the original instance.

## Pricing

https://aws.amazon.com/ec2/pricing

Instance purchasing options - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html

EC2 Pricing Models Explained - https://www.youtube.com/watch?v=rmFlOo7MNW0

[On-Demand](https://aws.amazon.com/ec2/pricing/on-demand/)

- No up-front commitment.
- Most expensive option (standard rate, no discount).
- Pay by the second (Amazon Linux) or hour (RHEL, SUSE).
- To try something, test a new app or for unpredictable workloads; not for steady workloads.

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

[Dedicated hosts](https://aws.amazon.com/ec2/dedicated-hosts/)

- Physical server that is fully dedicated for your use.
- Dedicated hardware to support software licenses or compliance.

## Amazon Linux

https://aws.amazon.com/linux/amazon-linux-2023

https://github.com/amazonlinux/amazon-linux-2023

What is Amazon Linux 2023? - https://docs.aws.amazon.com/linux/al2023/ug/what-is-amazon-linux.html

Comparing AL2 and Amazon Linux 2023 - https://docs.aws.amazon.com/linux/al2023/ug/compare-with-al2.html

## Placement groups

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html

Options:

- Cluster: instance are close (eg on the same rack) to have low-latency and high throughput. For HPC.
- Partition: split instances in partitions, and each partition runs on a separate underlying hardware. You can have up to 7 partitions per AZ. When we have data replicated and we want to ensure there's always a node running, eg Kafka or Cassandra.
- Spread: a small group of instances that all run on different hardware (rack) to reduce failures.

You choose it when you launch the instance.
