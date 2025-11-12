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

:::tip
Enable CloudWatch [detailed monitoring](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/manage-detailed-monitoring.html) of the EC2 instances _in production_. Note that this is a paid feature, so it should not be enabled in environments other than production.
:::

Instance Scheduler (automates the starting and stopping of various AWS services like EC2 and RDS instances) - https://aws.amazon.com/solutions/implementations/instance-scheduler-on-aws/

## IaaS

You manage the OS and whatever you want to run on top it, and AWS manages the [hypervisor](https://en.wikipedia.org/wiki/Hypervisor) and the hardware below.

## Virtual servers

Each EC2 instance is a virtual server or **virtual machine** that runs on top of a host server.

The virtualization technology of EC2 is [Nitro](https://aws.amazon.com/ec2/nitro/). Not all instances use Nitro, for example, the T2 family (eg t2.micro) doesn't, it uses Xen instead (see [Hypervisor type](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-hypervisor-type)). At the EC2 console, at the "Instance Types" page, by using the preferences you can add a column to the list that shows the "Hypervisor" (xen or nitro).

Note that you can also have a [Dedicated Host](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html), that is, a physical server that is fully dedicated for your use. [Mac instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html) are always bare metal instances on Dedicated Hosts. There are no Mac virtual machines, only dedicated hardware. You can launch one Mac instance per Dedicated Host.

## Learn

Tutorial 'Host a WordPress blog' (note that there are 2):

- Amazon Linux 2: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tuts-wordpress.html → https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html
- AL2023 (AMI newer than Amazon Linux 2): https://docs.aws.amazon.com/linux/al2023/ug/hosting-wordpress-aml-2023.html
- Elastic Beanstalk - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-hawordpress-tutorial.html

## Instance types

https://aws.amazon.com/ec2/instance-types/

https://docs.aws.amazon.com/ec2/latest/instancetypes/instance-types.html

https://instances.vantage.sh - https://github.com/vantage-sh/ec2instances.info

`t2.micro`:

- `t` is the family
- `2` is the generation
- `micro` is the size (CPU, memory, storage and network)

:::tip

> **Our experience indicates that you'll overestimate the resource requirements for your applications.** We recommend that you try to start your application with a smaller instance type than you think you need at first and change the instance type later if needed. (AWS in Action p. 63)

:::

You can change the instance type by stopping it and starting it, [see example](https://github.com/nealdct/aws-saa-code/blob/main/aws-lambda/ResizeInstance.py).

## Connect

Connect to your EC2 instance - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect.html

Options:

### SSH with key pair

(Prerequisites) Connect to your Linux instance using SSH - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html

(`ssh` commands) Connect to your Linux instance using an SSH client - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

Amazon EC2 key pairs and Amazon EC2 instances - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html

We connect to an SSH server running on the instance. **Port 22** (where the SSH daemon runs) must be open for inbound traffic; we do this with the security group, the instance firewall.

The client has the private key (contained on a `.pem` file), and the server the public key (at ` ~/.ssh/authorized_keys`). Anyone with the public key can access the instance.

To create a key pair, when launching an instance, click "Create new key pair" and select type 'RSA', file format `.pem` and enter a name like `us-east-kp`. A file named `us-east-kp.pem` containing the private key will be downloaded; store it safely, since anyone holding it will be able to connect to the instance. There are other ways to create it, see [Create a key pair for your Amazon EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html).

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

You can use a terminal or a browser. You need to allow inbound traffic on **port 22**, with protocol TCP and source 0.0.0.0/0 (any IP address). The instance needs to have a **public IP** address. See [Prerequisites for EC2 Instance Connect](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-prerequisites.html).

### Session Manager (AWS Systems Manager)

:::tip
Open `https://console.aws.amazon.com/systems-manager/session-manager/$INSTANCEID` in your browser. (`INSTANCEID` is like i-01269dace6eb55218.)
:::

- Connect to an Amazon EC2 instance by using Session Manager - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/connect-to-an-amazon-ec2-instance-by-using-session-manager.html
- Connect to your EC2 instance using SSH the modern way - https://cloudonaut.io/connect-to-your-ec2-instance-using-ssh-the-modern-way/ - https://www.youtube.com/watch?v=w-yVPzSbb0c
- (Benefits and features) AWS Systems Manager Session Manager - https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html
- (Not very useful) Connect to your Amazon EC2 instance using Session Manager - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-with-systems-manager-session-manager.html

Uses IAM for access control. **No need to open any ports** (unlike SSH, which requires opening the port 22, or RDP, which requires opening the port 3389). No need to configure a key pair upfront (it uses temporary key pairs). No need to maintain a bastion host. Is the most secure option. [See all benefits here](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html#session-manager-benefits).

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

**Port 3389** must be open for inbound traffic on the security group.

## Security group (instance firewall)

:::tip
To debug misconfiguration in firewall rules or monitor network traffic you can:

- Use the [VPC Reachability Analyzer](https://docs.aws.amazon.com/vpc/latest/reachability/getting-started.html) to simulate the traffic and see if the tool finds the configuration problem.
- Enable [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) to get access to aggregated log messages containing rejected connections.

:::

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html

https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html

A virtual firewall that controls incoming and outgoing (inbound and outbound) traffic _at the instance level_ (in contrast with Network ACL, which operate at the subnet level). They are attached to Elastic Network Interfaces (ENI).

The rules control which direction (inbound or outbound), IP protocols (TCP, UDP, ICMP), port and a single IP or a range of IP addresses we can connect from/to. We can also specify a security group. See [Components of a security group rule
](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components).

Security group rules only support allow, they cannot deny. If you don’t explicitly allow, it's denied and it doesn't get in. Thus, you cannot block a specific, individual IP address; you can only allow it. If you want to block a specific IP you need to use a Network ACL rule, which applies to all instances in the subnet. Or use AWS WAF.

By default, a security group:

- Does not allow any inbound traffic. You need to add rules yourself to do so.
- Contains a rule that allows all outbound traffic. If you want something more restrictive, you need to remove the rule and add other rules.

Source `0.0.0.0/0` means any IPv4 address, and `::/0` any IPv6 address.

A security group is associated to a single VPC, but you can associate it to multiple VPCs with [Security Group VPC Associations](https://docs.aws.amazon.com/vpc/latest/userguide/security-group-assoc.html).

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
curl http://169.254.169.254/latest/meta-data/local-ipv4 # private IP

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

:::warning
The user data only runs when the instance launches, at the first boot. You can edit its content (at Actions → Instance settings → Edit user data) in a instance that is running, but it won't run again, even if you stop and start the instance.
:::

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-add-user-data.html

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html

Code scripts that run the first time the instance launches, to customize the instance.

```shell
#!/bin/bash
yum update -y
```

Limited to 16 kB.

Must be encoded in base64. This is done automatically in the console and the CLI.

Accessible at the metadata at `http://169.254.169.254/latest/user-data`.

### Run Apache server

Note that you need to open port 80 and/or 443.

```shell
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
```

Once the Apache server is running, there are various ways to customize the HTML.

From https://github.com/AWSinAction/code3/blob/ccf418e8fbb4d64aa6cfd9ede3cfcae445a4eda7/chapter05/firewall1.yaml#L91:

```shell
echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hello!</title></head><body><p>Hello!</p></body></html>' > /var/www/html/index.html
```

From https://github.com/nealdct/aws-clf-code/blob/main/amazon-ec2/user-data-web-server.sh:

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

See slightly different way [here](https://github.com/nealdct/aws-saa-code/blob/86269fef68dfc7655f0c5c429917402d24103550/amazon-ec2/user-data-metadata.md?plain=1#L57-L69).

## Networking

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-networking.html

### Network interface adapter

Each instance always has a default (primary, eth0 or enX0) network interface attached to a subnet, and a private IP address on the subnet. (If it's on a public subnet, it can also have a public IP, which is associated with the private IP.) The primary network interface cannot be detached.

You can optionally attach an instance to more subnets by connecting it to multiple network interface adapters. Adapters can be on diferent subnets, but the subnets have to be in the same availability zone than the instance. You cannot move a network interface to a different AZ.

:::tip
Use `ifconfig` or `ip addr` to view the network interfaces, and `ifconfig enX0` or `ip addr show enX0` to see the details of the device.
:::

Adapter types:

- [Elastic Network Interface (ENI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html): the default. All instance types are supported.
- [Elastic Network Adapter (ENA)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/enhanced-networking.html): high network performance. _Not_ all instance types are supported.
- [Elastic Fabric Adapter (EFA)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html): for HPC, MPI (message passing interface) and ML. See [supported instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html#efa-instance-types).

### IP address

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html

> We release your instance's public IP address when it is stopped, hibernated, or terminated. Your stopped or hibernated instance receives a new public IP address when it is started.

Note that when you reboot an instance it keeps the public IPv4 address, [see docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-reboot.html).

Private IP:

- Local. Used to communicate within the network.
- Doesn't change, even if the instance is stopped.
- Used in public and private subnets.

Public IP:

- Globally unique. Used to communicate outside the network, including the internet.
- Is dynamic. It's associated to the instance until it is stopped or terminated, thus you cannot use it in application code since it can change. Note that the "Public IPv4 DNS" (eg ec2-3-94-61-169.compute-1.amazonaws.com) will also change, since it includes the public IP. It doesn't change if you reboot.
- Used in public subnets only.
- You don't control it. For example, you cannot move it to another instance like you can do with an Elastic IP.
- A public IP is associated to a private IP. The same happens with an Elastic IP. The association is done externally; the instance only knows about its private IP.

See [IP addressing for your VPCs and subnets](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html) for more info about public and private IPs.

IPAM (IP Address Manager) - https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html

### Public IPv4 address pricing

https://aws.amazon.com/blogs/aws/new-aws-public-ipv4-address-charge-public-ip-insights/

> Effective February 1, 2024 there will be a charge of $0.005 per IP per hour for all public IPv4 addresses, whether attached to a service or not (there is already a charge for public IPv4 addresses you allocate in your account but don’t attach to an EC2 instance).

https://www.linkedin.com/pulse/changes-aws-public-ip-address-charges-neal-k-davis-j0wae/ - https://www.youtube.com/watch?v=4EvktMxjyxU

Como optimizar las cargas IPv4 en AWS y ademas generar ahorro de costes - https://dev.to/aws-espanol/como-optimizar-las-cargas-ipv4-en-aws-y-ademas-generar-ahorro-de-costes-45e1

### Elastic IP

An [Elastic IP address](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) is **static**; it does not change over time. Therefore, you can rely on it.

You can remap an EIP to an instance in a different availability zone, but not in a different region.

You can assign the elastic IP (EIP) to a second network interface eth1 (will be on a different subnet than eth0), and attach this network interface to an instance. If the instance is stopped and started, the IP won't change.

Both an ENI and EIP can be mapped to a different instance in the same AZ. However, as explained above, the ENI cannot be moved to a different AZ, but the EIP can. Thus, if the instance fails, we can move the ENI or the EIP to another instance within the same AZ, or move the EIP to an instance in different AZ.

Elastic IP addresses are only for IPv4, not IPv6.

You are **charged** ($0.005 per hour) for all elastic IPs that are allocated to your account, even if you don't actually use them on a running instance. On a EC2 instance, if you do Instance state → Stop instance you'll see this warning:

> After you stop the instance, you are no longer charged usage or data transfer fees for it. However, you will still be billed for associated resources, such as attached EBS volumes and associated Elastic IP addresses.

The message has changed slightly now:

> After you stop the instance, you are no longer charged usage or data transfer fees for it. However, you will still be billed for associated Elastic IP addresses and EBS volumes.

And when you terminate an instance with an elastic IP it says:

> Elastic IPs which are not associated with an instance will incur an hourly cost. [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
> To disassociate and release Elastic IPs associated with this instance, go to the [Elastic IPs screen](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Addresses:).
> The following Elastic IPs are still associated with your account: 34.192.137.227

To **release** an EIP, first disassociate it from the network interface at EC2 → Network interfaces, select the network interface with the EIP, and then do Actions → Disassociate address. (Afterwards, if the instance is not running, you can optionally delete the network interface with Actions → Delete.) Then go to EC2 → Elastic IP addresses, select the allocated EIP and do Actions → Release Elastic IP address.

Elastic IP addresses are one method for handling **failover**, especially for **legacy** type applications that cannot be scaled horizontally. In the event of a failure of a single server with an associated Elastic IP address, the failover mechanism can re-associate the Elastic IP address to a replacement instance, ideally in an automated fashion. While this scenario may experience downtime for the application, the time may be limited to the time it takes to detect the failure and quickly re-associate the Elastic IP address to the replacement resource. [source](https://d1.awsstatic.com/whitepapers/aws-building-fault-tolerant-applications.pdf)

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
- Hibernation needs to be enabled when launched.
- Only for supported AMIs.
- RAM is saved on a EBS volume and restored when restarted.
- Processes that are running are resumed when restarted.
- Previously attached data volumes are reattached.
- Instance ID is retained.

[Reboot](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-reboot.html)

- Equivalent to an OS reboot. AWS recommends rebooting using the EC2 console, CLI or API instead of running the operating system reboot command from the instance.
- All IP address and DNS names are retained.

[For retirement](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-retirement.html)

- Scheduled to be retired by AWS when there is an irreparable failure of the underlying hardware.

[Terminated](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html)

- Root EBS volumes are deleted by default (`DeleteOnTermination` is true for the root volume, but is false for any other EBS volume attached).

[Recovered](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html)

- Restore an instance that is unavailable due to an underlying hardware or software issue.
- Automatic recovery can be configured or you can recover using a CloudWatch alarm.
- The recovered instance is identical to the original instance.

## EBS

https://docs.aws.amazon.com/ebs/

Network-attached storage for virtual machines.

:::info
EC2 instances are linked to a subnet, and the subnet is linked to an availability zone. EBS volumes are also located only in a single availability zone. If a virtual machine is moved to another availability zone because of an outage, the EBS volume cannot be accessed from the other availability zones.

To overcome this problem you can:

- Use EFS.
- Create snapshots of the EBS volumes regularly. Snapshots are stored in S3, which is regional and thus available in all AZs of the region. If the data is stored in the root volume, you can back it up with an AMI.
- Use another storage solution like [Gluster](https://www.gluster.org/), [DRBD](https://linbit.com/drbd/), S3, RDS, DynamoDB...

(AWS in Action p. 375.)
:::

:::info
An EBS volume is stored in an AZ, but snapshots are regional, since they are stored in S3, which is a regional service. Thus, we can create volumes from snapshots in AZs different from the AZ of the source volume. This is a way to move volumes from one AZ to another, inside the same region.
:::

:::tip
You can encrypt all new EBS volumes and copies of snapshots created in your account by default. At EC2 the console, go to the Settings page and enable "Always encrypt new EBS volumes".

There's an [AWS Config](https://aws.amazon.com/config/) check for this: [ec2-ebs-encryption-by-default](https://docs.aws.amazon.com/config/latest/developerguide/ec2-ebs-encryption-by-default.html).
:::

**Block** storage: requires an EC2 instance, since the OS is needed to create filesystems and partitions, reading and writing using system calls etc.

For **legacy applications** that read/write files from/to a filesystem, like relational databases. Is standalone/independent: can exist without an EC2 instance, but you need an EC2 instance to access it. It's accessed over the network. It replicates data among multiple disks within the availability zone automatically to increase durability and availability.

EBS volumes are independent of instances; you can terminate an instance and keep the volume. You can attach multiple volumes to an instance. The volumes and the instance must be in the same AZ.

An EC2 instance has a root EBS volume (`/dev/xvda`) that contains the OS. By default, the root volume is deleted when you terminate the EC2 instance (since the attribute [`DeleteOnTermination`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance-ebs.html#cfn-ec2-instance-ebs-deleteontermination) is true for it), but any other volumes attached are not (since `DeleteOnTermination` is false).

Generally, an EBS volume is attached to exactly one EC2 instance. It's possible to attach Provisioned IOPS SSD (io1 or io2) EBS volumes to multiple EC2 instances with [Multi-Attach](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html), but with some limitations.

Use `lsblk` to list the attached volumes. To use the volume, you need to create a filesystem first. For example, to create a filesystem of type XFS run `sudo mkfs -t xfs /dev/nvme1n1`. Then create a folder on which to mount the device with `sudo mkdir /data`. Afterwards, mount the device with `sudo mount /dev/nvme1n1 /data`. Once the device is mounted, use `df -h` to see it. Doing `lsblk` will now show `/data` at the `MOUNTPOINT` column. The volume is ready; we can now create files at the `/data` directory (eg `sudo touch /data/hello.txt`).

See similar instructions here: https://github.com/nealdct/aws-clf-code/blob/main/amazon-ebs/amazon-ebs-volumes.md

Some EC2 instance types are EBS-optimized, others optionally support EBS optimization, an some do not support EBS optimization; see [Amazon EBS-optimized instance types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html) and [Amazon EBS optimization](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-optimization.html).

You can back up EBS volumes with [EBS snapshots](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-snapshots.html). Snapshots are incremental. Snapshots are stored in S3, which is regional, so they are available in all AZs. Thus, we can launch a volume from a snapshot in a different AZ than the AZ of the source volume. To create a snapshot with the CLI use [`create-snapshot`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/create-snapshot.html): `aws ec2 create-snapshot --volume-id <volume-id>`.

Durability vs availability:

- Durability of 99.9%: if you have 1000 volumes, you will loose the data stored in one volume every year.
- Availability of 99.999%. If an outage occurs, the volume will not be available, but the data is not lost; it will be available when the outage ends.

## Instance Store

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html

HDD or SSD physically attached to the machine that hosts the VM, which results in very high performance. Unlike EBS volumes, instances store volumes can't exist without an EC2 instance. You cannot detach and re-attach an instance store to the same or another instance.

Since instance stores are not independent of EC2 instances, data is lost when you stop or terminate the VM, when there's a hardware failure or the machine is powered off, which means that it should not be used for data that must not be lost. Use it for ephemeral/temporary data, for example, caching data locally from a remote data source, or for NoSQL databases that use a cluster of machines to replicate data. Unlike EBS volumes, there's no built-in backup mechanism for instance store. If you need to back up the data, use EBS instead.

There is no additional charge to use the instance store volumes provided for your instance.

Not all instance types support instance store volumes.

Benchmark: https://benjdd.com/ec2-io/

## EFS

https://aws.amazon.com/efs

A serverless filesystem that can be shared between multiple Linux virtual machines running in different availability zones. Data is replicated among multiple AZ in a region, providing high availability in case there's an outage. Uses the NFS (Network File Server) v4.1 protocol. Linux only. Like S3, EFS grows with your storage needs; you don’t have to provision the storage up front. You don't need to provision throughput (IOPS), capacity scales automatically, and you pay only for what you use. You can connect instances from other VPCs ([docs](https://docs.aws.amazon.com/efs/latest/ug/mount-fs-different-vpc.html)), and from on-premises servers via Direct Connect or VPN.

You need to create a mount target on each subnet, and the EC2 instance where you mount the filesystem must be in the same subnet as the EFS mount target. Each mount target is bound to an availability zone. You need at least two mount targets in different availability zones for high availability. Mount targets are protected by security groups.

EFS file systems can be replicated to another region for disaster recovery. You can also mount the file system, but the replica will be read-only until you fail over to that region.

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

:::info

> **We recommend Savings Plans over Reserved Instances**. Saving Plans are the easiest and most flexible way to save money on your AWS compute costs and offer lower prices (up to 72% off On-Demand pricing), just like Reserved Instances. However, Savings Plans are different to Reserved Instances. With Reserved Instances, you make a commitment to a specific instance configuration, whereas with Savings Plans, you have the flexibility to use the instance configurations that best meet your needs. To use Savings Plans, you make a commitment to a consistent usage amount, measured in USD per hour.

Source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html:
:::

[On-Demand](https://aws.amazon.com/ec2/pricing/on-demand/)

- No up-front commitment.
- Most expensive option (standard rate, no discount).
- Pay by the second (Amazon Linux, RHEL) or hour (SUSE).
- To try something, test a new app or for unpredictable workloads. Not for steady, long-term workloads.

[Spot](https://aws.amazon.com/ec2/spot/)

- Bid on spare capacity.
- Least expensive option, up to 90% discount.
- Instance can be terminated at any time, thus workload needs to be interruptible.
  - You have 2 minutes to save the data, see [Spot Instance interruption notices](https://docs.amazonaws.cn/en_us/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html).
- To run compute heavy tasks like ML or HPC (hundreds or thousands of servers) at a very low cost.
- Fleet:
  - EC2 fleet: combine spot, on-demand and reserved.
  - Spot fleet (legacy): combine spot and on-demand.

[Reserved (RI)](https://aws.amazon.com/ec2/pricing/reserved-instances/)

- Commitment of 1-3 years.
- About 30-60% savings, up to 72%.
- You pay for capacity even if you don't use it, but on the other hand you ensure you'll have capacity.
- You can pay All Upfront, Partial Upfront and No Upfront.
- Can be:
  - Standard. Can change AZ, instance size and networking type with [ModifyReservedInstances](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyReservedInstances.html).
  - Convertible. More expensive, but you can change the instance family, OS, tenancy and payment option with [GetReservedInstancesExchangeQuote](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetReservedInstancesExchangeQuote.html).

[Savings plan](https://aws.amazon.com/savingsplans/)

- Best of all options, [see this](https://youtu.be/rmFlOo7MNW0?feature=shared&t=146).
- Hourly spend commitment of 1-3 years. Anything beyond that you'll pay the On-Demand price.
- Save up to 72%.
- You can pay All Upfront, Partial Upfront and No Upfront.
- More flexibility than reserved.
- Three types of Savings Plans: Compute Savings Plans (includes Fargate and Lambda too), EC2 Instance Savings Plans, and Amazon SageMaker Savings Plans.

[Dedicated instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html)

- Instances that run on hardware that's dedicated to a single AWS account, but might share hardware with other instances from the same AWS account that are not Dedicated Instances.
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

### EC2 Image Builder

https://aws.amazon.com/image-builder

Simplifies the creation, maintenance, validation, sharing, and deployment of Linux, Windows, and macOS images for use with Amazon EC2 and on-premises.

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

- Cluster: instance are close (eg on the same rack) to have low-latency and high throughput. For HPC. All instances are in the same AZ.
- Partition: split instances in partitions, and each partition runs on a separate underlying hardware. Partitions can be in different AZs in the same region. You can have up to 7 partitions per AZ. When we have data replicated and we want to ensure there's always a node running, eg Hadoop, Kafka or Cassandra.
- Spread: a small group of instances that all run on different hardware (ie a different rack) to reduce correlated failures. Can span multiple AZs in the same region.

You choose it when you launch the instance.

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/index.html

Examples - https://github.com/aws/aws-cli/tree/develop/awscli/examples/ec2

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

[Launch instance](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/run-instances.html)

```shell
aws ec2 run-instances \
 --image-id ami-061ac2e015473fbe2 \
 --instance-type t2.micro \
 --user-data file://user_data.sh  \
 --key-name MyKeyPair
```

```shell
aws ec2 run-instances \
 --image-id ami-071226ecf16aa7d96 \
 --instance-type t2.micro \
 --placement AvailabilityZone=us-east-1a \
 --security-group-ids sg-0ad454bc3945c3bf8
```

[Terminate instance](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/terminate-instances.html)

```shell
aws ec2 terminate-instances --instance-ids i-001b89bdc08ba65f7
```

[Create security group](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/create-security-group.html):

```shell
aws ec2 create-security-group --group-name SshAccess --description "Allow SSH"
```

Add inbound rule to security group ([docs](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html)):

```shell
aws ec2 authorize-security-group-ingress --group-name SshAccess --protocol tcp --port 22 --cidr 0.0.0.0/0
```

If you delete the default VPC, use [`create-default-vpc`](https://docs.aws.amazon.com/cli/latest/reference/ec2/create-default-vpc.html) recreate it. See docs: https://docs.aws.amazon.com/vpc/latest/userguide/work-with-default-vpc.html#create-default-vpc.

```shell
aws ec2 create-default-vpc
```
