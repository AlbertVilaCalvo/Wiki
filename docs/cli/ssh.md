---
title: SSH
---

The **port 22** needs to be open for inbound traffic.

The client has the private key (contained on a `.pem` file), and the server the public key (a file with the `.pub` extension, saved at `~/.ssh/authorized_keys`). Anyone with the public key can access the instance.

```shell
chmod 400 us-east-kp.pem # Fix WARNING: UNPROTECTED PRIVATE KEY FILE!
ssh -i us-east-kp.pem ec2-user@3.83.54.1
ssh -i us-east-kp.pem ec2-user@ec2-107-22-100-77.compute-1.amazonaws.com
```

Close connection: `exit`

You can generate the public key from the private key at any time with: `ssh-keygen -y -f key.pem > key.pub` [source](https://askubuntu.com/questions/46424/how-do-i-add-ssh-keys-to-authorized-keys-file#comment372754_46425)

## Add an SSH key to an EC2 instance that is already launched

_Important: you need to connect to the machine using 'EC2 Instance Connect' to do this._

On the client, generate the SSH key pair:

```shell
ssh-keygen -b 2048 -t rsa # Name the file 'ec2_rsa' when prompted
```

This creates 2 files: `ec2_rsa` and `ec2_rsa.pub`.

Copy the contents of the public key to the clipboard with `pbcopy < ec2_rsa.pub`.

Connect to the EC2 instance via 'EC2 Instance Connect'.

Run `sudo nano ~/.ssh/authorized_keys`, paste the contents of the `ec2_rsa.pub` saved in your clipboard and save the file.

Finally, connect running `ssh -i ec2_rsa ec2-user@3.83.54.1`, where 3.83.54.1 is the public IPv4 address.
