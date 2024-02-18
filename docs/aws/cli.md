---
title: CLI
---

:::info
If installed with Brew, the "examples" directory is at `/usr/local/share/awscli/examples`.
:::

https://aws.amazon.com/cli

https://github.com/aws/aws-cli

Reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html

V1 reference: https://docs.aws.amazon.com/cli/latest/reference

Use `--dry-run` to check if you have the required permissions.

## Command structure

https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html

`aws <command> <subcommand> [options and parameters]`. Eg `aws s3 ls`.

:::tip
In shell scripts, you can also `wait` for a command to finish. See https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html#cli-usage-commandstructure-wait
:::

## Auto-completion

Use tab to auto-complete commands, parameters and options - see how to use it at https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html#cli-command-completion-about

It uses the tool `aws_completer`. Check it's location with `which aws_completer` (I got `/usr/local/bin/aws_completer`).

If the CLI is installed with Brew, auto-completion should work with no extra configuration. To verify that it works write `aws s` and press tab. You should get a list of commands like 's3 s3api s3control...'. If it doesn't work, you need to configure it - see how at https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html#cli-command-completion-linux. It seems that you need to add `complete -C '/usr/local/bin/aws_completer' aws` to `.zshrc`. The book 'AWS for System Administrators' also explains this (page 9).

## Don't use the root user

> do not use the AWS account root user access keys for any task where it's not required. Instead, [create a new administrator IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) with access keys for yourself [source](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

## Best practices for managing AWS access keys

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#securing_access-keys

https://docs.aws.amazon.com/accounts/latest/reference/credentials-access-keys-best-practices.html

- Remove (or don't generate) an account access key
- Use temporary security credentials (IAM roles) instead of long-term access keys

## Configuration

`~/.aws/credentials`

```
[default]
aws_access_key_id = XXX
aws_secret_access_key = YYY
```

`~/.aws/config`

```
[default]
region = eu-west-3
output = json
```

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

`aws configure help`

`aws configure` is the fastest way to set up your AWS CLI installation.

`aws sts get-caller-identity` → Returns details about the IAM user or role whose credentials are used to call the operation - [source](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-caller-identity.html). You can do `aws sts get-caller-identity --query Account --output text` to get only the account ID.

`aws configure list-profiles`

`aws configure list`

`aws configure list --profile <profile-name>`

Configure: `aws configure --profile <profile-name>` → Asks for AWS Access Key ID, AWS Secret Access Key, Default region name and Default output format.

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

### Create Access keys using the web console

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

## Filtering AWS CLI output

https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-filter.html#cli-usage-filter-client-side

Use `--query <key>` to select. See https://jmespath.org/tutorial.html for how to query.

Use `--output text/json/yaml/yaml-stream` to change the output format.

## ModuleNotFoundError: No module named 'docutils'

To fix it run `brew reinstall docutils`. Solution from https://github.com/aws/aws-cli/issues/7479.
