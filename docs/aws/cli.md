---
title: CLI
---

https://aws.amazon.com/cli

https://github.com/aws/aws-cli

:::tip
You can make requests idempotent by adding `--client-token` with a unique value. See:

- [Ensuring idempotency in Amazon EC2 API requests](https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html)
- https://serverfault.com/questions/818956/how-to-you-get-an-aws-client-token-to-use-with-aws-ec2-run-instances
- [New Amazon EC2 Feature: Idempotent Instance Creation](https://aws.amazon.com/blogs/aws/new-amazon-ec2-feature-idempotent-instance-creation/)
- [Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

:::

:::info
If installed with [Brew](https://formulae.brew.sh/formula/awscli#default), the "examples" directory is located at `$HOMEBREW_PREFIX/share/awscli/examples`. (There are also completions and functions at `$HOMEBREW_PREFIX/share/zsh/site-functions`.)
:::

**Command reference**:

- https://awscli.amazonaws.com/v2/documentation/api/latest/index.html
- https://docs.aws.amazon.com/cli/latest/reference/index.html

V1 reference: https://docs.aws.amazon.com/cli/latest/reference

Use `--dry-run` to check if you have the required permissions.

:::tip
Use [CloudShell](https://aws.amazon.com/cloudshell/) which is automatically configured with the credentials of the user you are logged in with. [This video](https://www.youtube.com/watch?v=fz4rbjRaiQM) shows many things you can do in CloudShell.
:::

AWS CLI Builder - https://awsclibuilder.com

## Command structure

https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html

```
aws <command> <subcommand> [options and parameters]
aws <service> <action> [--name value...]
```

The _command_ typically corresponds to an AWS service, and the _subcommand_ is an action or operation, eg:

```shell
aws s3 ls
aws ec2 describe-instances
```

:::tip
In shell scripts, you can also `wait` for a command to finish. See https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html#cli-usage-commandstructure-wait
:::

## Help

```shell
aws help # Shows all services
aws <service> help # Shows all actions of the service
aws <service> <action> help # Shows all options of the action
```

## Auto-completion

Use tab to auto-complete commands, parameters and options - see how to use it at https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html#cli-command-completion-about

It uses the tool `aws_completer`. Check it's location with `which aws_completer` (I got `/usr/local/bin/aws_completer`).

If the CLI is installed with Brew, auto-completion should work with no extra configuration. To verify that it works write `aws s` and press tab. You should get a list of commands like 's3 s3api s3control...'. If it doesn't work, you need to configure it - see how at https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html#cli-command-completion-linux. It seems that you need to add `complete -C '/usr/local/bin/aws_completer' aws` to `.zshrc`. The book 'AWS for System Administrators' also explains this (page 9).

## Don't use the root user

> do not use the AWS account root user access keys for any task where it's not required. Instead, [create a new administrator IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) with access keys for yourself [source](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

## Best practices for managing AWS access keys

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html

- Do NOT use your account's root credentials to create access keys.
- Do NOT put access keys or credential information in your application files.
- Do NOT include files that contain access keys or credential information in your project area.
- Access keys or credential information stored in the shared AWS credentials file are stored in plaintext.

https://docs.aws.amazon.com/accounts/latest/reference/credentials-access-keys-best-practices.html

- Remove (or don't generate) an account access key
- Use temporary security credentials (IAM roles) instead of long-term access keys

[Alternatives to long-term access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds-programmatic-access.html)

- Don't embed long-term access keys and secret access keys in your application code or in a code repository
- Use IAM roles to generate temporary security credentials whenever possible
- Use alternatives to long-term access keys for the AWS Command Line Interface (AWS CLI) or the `aws-shell`
  - AWS CloudShell
  - AWS CLI Version 2 integration with AWS IAM Identity Center
- Don't create long-term access keys for human users who need access to applications or AWS services
- Don't store long-term access keys within an AWS compute service

## Create Access keys using the web console

- Go to the IAM console → Users and select your Admin user (_not the root user_).
- Click the 'Security credentials' tab.
- Scroll down to 'Access keys'.
- Click 'Create access key'.
- Select 'Command Line Interface (CLI)'.
- Check 'I understand the above recommendation and want to proceed to create an access key'.
- Click 'Next'.
- On the 'Set description tag' set a tag like 'MBP2016'.
- Click 'Create access key'.

Once the access key is shown on the 'Retrieve access keys' page, on the terminal run `aws configure`.

- Paste the 'Access Key ID' and then the 'Secret Access Key' from the website.
- Set 'Default region name' to `us-east-1`, `eu-west-3` or else.
- Leave 'Default output format' to 'json'.

Doing `aws s3 ls` should give a response (will be empty if there are no buckets, but no credentials error will appear).

## Who am I?

```shell
aws sts get-caller-identity
```

Returns details (UserId, Account and Arn) about the IAM user or role whose credentials are used to call the operation - [docs](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html).

Get the **account ID**:

```shell
aws sts get-caller-identity --query Account --output text
```

## Access keys configuration

`~/.aws/credentials`

```
[default]
aws_access_key_id = XYZ
aws_secret_access_key = ABC

[bootcamp]
aws_access_key_id = XYZ
aws_secret_access_key = ABC
```

`~/.aws/config`

```
[default]
region = eu-west-3
output = json

[profile bootcamp]
region = us-east-1
output = json
```

Note that we only add "profile" at the `config` file, not the `credentials` file, see [this](https://stackoverflow.com/questions/593334/how-to-use-multiple-aws-accounts-from-the-command-line) and [this](https://dev.to/hmintoh/how-to-use-multiple-aws-accounts-with-the-aws-cli-3lge).

If we add a region, then we can omit `--region <region>` on commands.

Comments are written with `#`.

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

https://docs.aws.amazon.com/cli/latest/reference/configure/index.html

`aws configure help`

`aws configure` is the fastest way to set up your AWS CLI installation. It asks for the AWS Access Key ID, AWS Secret Access Key, Default region name and Default output format.

`aws configure --profile <profile-name>` → It it sets `[profile-name]` at `~/.aws/credentials`.

We can also configure by setting the values one by one:

```shell
aws configure set aws_access_key_id <access-key-id> --profile <profile-name>
aws configure set aws_secret_access_key <secret-access-key> --profile <profile-name>
aws configure set aws_session_token <session-token> --profile <profile-name>
```

`aws configure get region`

`aws configure list-profiles`

`aws configure list`

`aws configure list --profile <profile-name>`

You can create access keys for a user with: `aws iam create-access-key --user-name MyUser`

[Set](https://docs.aws.amazon.com/cli/latest/reference/configure/set.html) value: `aws configure set <varname> <value> [--profile profile-name]`, eg `aws configure set region us-east-1 --profile default`

### Multiple accounts

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

https://stackoverflow.com/questions/593334/how-to-use-multiple-aws-accounts-from-the-command-line

Important: on the `config` file we need to add "profile" (`[profile user1]`), but not on `credentials`.

## Filtering AWS CLI output

https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-filter.html#cli-usage-filter-client-side

Use `--query <key>` to select. See https://jmespath.org/tutorial.html for how to query.

Use `--output text/json/yaml/yaml-stream` to change the output format.
Use `--output text` to pass the output to `grep`, `sed` or `awk`.

```shell
aws sts get-caller-identity --query Account --output text
```

You can save the output into a variable using [command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html):

```shell
S3_BUCKET=$(aws cloudformation describe-stacks --stack-name myStackName \
 --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
 --output text)
```

```shell
S3_BUCKET=`aws cloudformation describe-stacks --stack-name myStackName \
 --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
 --output text`
```

## Shell scripts

https://github.com/AWSinAction/code3/blob/main/chapter04/virtualmachine.sh

## ModuleNotFoundError: No module named 'docutils'

To fix it run `brew reinstall docutils`. Solution from https://github.com/aws/aws-cli/issues/7479.
