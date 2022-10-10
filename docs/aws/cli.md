---
title: CLI
---

https://aws.amazon.com/cli

https://github.com/aws/aws-cli

Reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html

V1 reference: https://docs.aws.amazon.com/cli/latest/reference

## Don't use the root user

> do not use the AWS account root user access keys for any task where it's not required. Instead, [create a new administrator IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) with access keys for yourself [source](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

## Configuration

`~/.aws/credentials` and `~/.aws/config`

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

`aws configure help`

`aws configure` is the fastest way to set up your AWS CLI installation

`aws sts get-caller-identity` -> Returns details about the IAM user or role whose credentials are used to call the operation [source](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-caller-identity.html)

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