---
title: EC2
---

# EC2 - Elastic Compute Cloud

Docs: https://docs.aws.amazon.com/ec2

https://console.aws.amazon.com/ec2/v2/home

IaaS. You manage the OS and up, AWS manages the hardware and [hypervisor](https://en.wikipedia.org/wiki/Hypervisor).

## Learn

Tutorial 'Host a WordPress blog' (note that there are 2):

- Amazon Linux 2: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/tuts-wordpress.html -> https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html
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
- On the 'Network settings' click 'Edit'
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
- Click 'Launch instance'

To terminate the instance, at the Instances pages open the 'Instance state' drop-down and click 'Terminate instance'.

## Connect

Connect to your Linux instance - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html

Options:

### SSH

Connect to your Linux instance from Linux or macOS using SSH - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

We connect to an SSH server running on the instance. Port 22 (where the SSH daemon runs) must be open; we do this with the security group (the firewall).

The client has the private key, and the server the public key (at ` ~/.ssh/authorized_keys`). Anyone with the public key can access the instance.

```shell
chmod 400 us-east-kp.pem # Fix WARNING: UNPROTECTED PRIVATE KEY FILE!
ssh -i us-east-kp.pem ec2-user@ec2-107-22-100-77.compute-1.amazonaws.com
```

If asked:
"The authenticity of host 'ec2-107-22-100-77.compute-1.amazonaws.com (107.22.100.77)' can't be established.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?"
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

## Security group

A virtual firewall that controls incoming and outgoing (inbound and outbound) traffic.

## Amazon Linux

https://aws.amazon.com/linux/amazon-linux-2023

https://github.com/amazonlinux/amazon-linux-2023

What is Amazon Linux 2023? - https://docs.aws.amazon.com/linux/al2023/ug/what-is-amazon-linux.html

Comparing AL2 and Amazon Linux 2023 - https://docs.aws.amazon.com/linux/al2023/ug/compare-with-al2.html
