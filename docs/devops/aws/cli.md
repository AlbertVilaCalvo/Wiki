---
title: CLI
---

https://aws.amazon.com/cli

Reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html

V1 reference: https://docs.aws.amazon.com/cli/latest/reference

## Configuration

`~/.aws/credentials` and `~/.aws/config`

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

`aws configure help`

`aws configure list-profiles`

`aws configure list`

`aws configure list --profile <profile-name>`

Configure: `aws configure --profile <profile-name>` -> Asks for AWS Access Key ID, AWS Secret Access Key, Default region name and Default output format.

Set value: `aws configure set <varname> <value> [--profile profile-name]`, eg `aws configure set region us-east-1 --profile default`

`~/.aws/config` example:

```
[default]
region=us-west-2
output=json
```

`~/.aws/credentials` example:

```
[default]
aws_access_key_id=
aws_secret_access_key=
# aws_session_token=
```
