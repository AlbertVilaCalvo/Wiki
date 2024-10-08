---
title: Terraform AWS
---

https://registry.terraform.io/providers/hashicorp/aws

Docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs

https://aws.amazon.com/solutions/partners/terraform-modules/

Tutorials:

- Get started: https://developer.hashicorp.com/terraform/tutorials/aws-get-started
- Use cases: https://developer.hashicorp.com/terraform/tutorials/aws

```hcl
provider "aws" {
  region  = "us-east-1"
  profile = "personal"
}
```

## Authentication

See the documentation for all the possible authentication methods: https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration

Ideally, the `provider "aws"` block should be free of authentication configuration:

```hcl
provider "aws" {}
```

### Authentication with OIDC (recommended for CI/CD)

Ideal, because it avoids having secrets.

The provider assumes an IAM role.

### Authentication with the `config` and `credentials` files

If you are authenticated in the AWS CLI with the `~/.aws/config` and `~/.aws/credentials` files, it picks the credentials automatically. This is because the aws provider uses the [AWS SDK for Go](https://github.com/aws/aws-sdk-go-v2) under the hood.

By default it uses the `default` profile, but you can specify different one:

```hcl
provider "aws" {
  profile = "some-profile"
}
```

### Authentication with environment variables

```shell
export AWS_ACCESS_KEY_ID="ZIO5FTAECEH4LATF66RY"
export AWS_SECRET_ACCESS_KEY="FSRfz3SLa2fM2Hvzc1EQRjpNGNNO7t6B6WIj5XYg"
export AWS_REGION="us-east-1"
```

Note that there are no spaces before and after the `=`.

Advantages:

- The secrets are not going to be stored in the state.
- No need to change the code if we change from an IAM user to an IAM role.
- Portable.

### Authentication with access and secret key (not recommended)

**This is the worse option.**

_Never ever commit the access and secret keys into version control! Even if the repository is private!_

```hcl
provider "aws" {
  access_key = "ZIO5FTAECEH4LATF66RY"
  secret_key = "FSRfz3SLa2fM2Hvzc1EQRjpNGNNO7t6B6WIj5XYg"
  region     = "us-east-1"
}
```

Obviously, we would use variables instead of hardcoding the credentials, and then provide values for them using a `.tfvars` file, the `-var` option in the CLI, etcetera.

```hcl
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

variable "access_key" {
  type        = string
  sensitive   = true
  description = "AWS Access Key ID"
}

variable "secret_key" {
  type        = string
  sensitive   = true
  description = "AWS Secret Access Key"
}

variable "region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region"
}
```

:::danger
If we use variables, the secrets are going to be stored in the state file.
:::
