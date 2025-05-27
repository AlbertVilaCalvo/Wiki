---
title: SSH
---

**Port 22** needs to be open for inbound traffic at the server.

The client has the private key (contained on a `.pem` file that starts with `-----BEGIN RSA PRIVATE KEY-----`), and the server the public key (a file with the `.pub` extension, saved at `~/.ssh/authorized_keys`). Anyone with the private key can access the instance.

```shell
chmod 400 private-key.pem # Fix WARNING: UNPROTECTED PRIVATE KEY FILE!
ssh -i private-key.pem ec2-user@3.83.54.1
ssh -i private-key.pem ec2-user@ec2-107-22-100-77.compute-1.amazonaws.com
```

Close connection: `exit`

You can generate the public key from the private key at any time with: `ssh-keygen -y -f private-key.pem > public-key.pub` [source 1](https://askubuntu.com/questions/46424/how-do-i-add-ssh-keys-to-authorized-keys-file#comment372754_46425) [source 2](https://serverfault.com/a/52287)

You can print information about a key with `ssh-keygen -lf id_ed25519`. The columns are Size, Fingerprint, Comment and Type.

To list identities in the agent run `ssh-add -l` or `ssh-add -L`.

`ssh whoami.filippo.io` - https://github.com/FiloSottile/whoami.filippo.io - https://words.filippo.io/ssh-whoami-filippo-io/

> When ssh tries to authenticate via public key, it sends the server all your public keys, one by one, until the server accepts one. One can take advantage of this to enumerate all the client's installed public keys.

> If this behavior is problematic for you, you can tell ssh not to present your public keys to the server by default.
> Add these lines at the end of your ~/.ssh/config (after other "Host" directives)

```shell
Host *
  PubkeyAuthentication no
  IdentitiesOnly yes

# And then specify what keys should be used for each host
Host example.com
  PubkeyAuthentication yes
  IdentityFile ~/.ssh/id_rsa
  # IdentitiesOnly yes # Enable ssh-agent (PKCS11 etc.) keys
```

https://infosec.mozilla.org/guidelines/openssh

## Add an SSH key to an EC2 instance that is already launched

_Important: you need to connect to the machine using 'EC2 Instance Connect' to do this._

On the client, generate the SSH key pair:

```shell
ssh-keygen -t rsa -b 4096 # Name the file 'ec2_rsa' when prompted
# or
ssh-keygen -t ed25519
```

This creates 2 files: `ec2_rsa` and `ec2_rsa.pub`.

Copy the contents of the public key to the clipboard with `pbcopy < ec2_rsa.pub`.

Connect to the EC2 instance via 'EC2 Instance Connect'.

Run `sudo nano ~/.ssh/authorized_keys`, paste the contents of the `ec2_rsa.pub` saved in your clipboard and save the file.

Finally, connect running `ssh -i ec2_rsa ec2-user@3.83.54.1`, where 3.83.54.1 is the public IPv4 address.

## Key security

At `man ssh-keygen`, the `-b` option says:

> Specifies the number of bits in the key to create. For RSA keys, the minimum size is 1024 bits and the default is 3072 bits. Generally, 3072 bits is considered sufficient.
>
> For ECDSA keys, the -b flag determines the key length by selecting from one of three elliptic curve sizes: 256, 384 or 521 bits. Attempting to use bit lengths other than these three values for ECDSA keys will fail.
>
> ECDSA-SK, Ed25519 and Ed25519-SK keys have a fixed length and the -b flag will be ignored.

Ed25519 vs RSA - https://security.stackexchange.com/questions/90077/ssh-key-ed25519-vs-rsa

https://infosec.mozilla.org/guidelines/key_management#recommended---generally-valid-for-up-to-10-years-default

> Use of EC is favored over RSA for performances purposes.

Auditing GitHub users’ SSH key quality - https://blog.benjojo.co.uk/post/auditing-github-users-keys

> There are 2 keys with only 256 bits to them and another 7 that only have 512. 512 bit keys have been known to be factorable in less than 3 days.

> I tried on my own to make a 256 bit key and factor it, and the process took less than 25 minutes
