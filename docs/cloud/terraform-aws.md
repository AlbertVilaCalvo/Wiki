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

## Examples

- Lots of examples: https://github.com/stacksimplify/terraform-on-aws-ec2 - https://www.udemy.com/course/terraform-on-aws-with-sre-iac-devops-real-world-demos
- https://github.com/AJarombek/global-aws-infrastructure
- https://github.com/AJarombek/jarombek-com-infrastructure
- https://github.com/AJarombek/saints-xctf-infrastructure
- https://github.com/bregman-arie/devops-exercises/search?q=terraform

### Modules

- https://github.com/topics/terraform-module
- https://github.com/terraform-aws-modules
- https://github.com/dustindortch/terraform-aws-account
- https://github.com/dustindortch/terraform-aws-idp-tfe-oidc
- https://github.com/aws-ia/terraform-aws-iam-identity-center
- Terraform module for building and deploying Next.js apps to AWS. Supports SSR (Lambda), Static (S3) and API (Lambda) pages. - https://github.com/milliHQ/terraform-aws-next-js

## VPC

- https://github.com/dustindortch/terraform-aws-vpcpublish
- https://github.com/aws-ia/terraform-aws-vpc
- Auto Scaling Groups tutorial - https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg

## ECS

- https://github.com/aws-ia/ecs-blueprints
- https://github.com/aws-ia/terraform-aws-ecs-fargate
- (2016) https://www.ybrikman.com/writing/2016/03/31/infrastructure-as-code-microservices-aws-docker-terraform-ecs

## EKS

- https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
- https://github.com/aws-ia/terraform-aws-eks-blueprints - https://aws-ia.github.io/terraform-aws-eks-blueprints
- https://github.com/aws-ia/terraform-aws-eks-blueprints-addons
- https://github.com/aws-ia/terraform-aws-eks-blueprints-teams
- https://github.com/aws-ia/terraform-aws-eks-ack-addons
- https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594
- https://github.com/jcolemorrison/hashistack-on-aws
- https://www.udemy.com/course/terraform-on-aws-eks-kubernetes-iac-sre-50-real-world-demos
- https://github.com/terraform-aws-modules/terraform-aws-eks
- https://github.com/maddevsio/aws-eks-base

## Lambda

- https://github.com/dustindortch/terraform-docker-aws-lambda
- https://github.com/dustindortch/terraform-aws-lambda-container
- https://surajblog.medium.com/sending-cloudwatch-alarms-to-slack-via-sns-and-aws-lambda-using-terraform-7e707e0a413d
- https://github.com/terraform-aws-modules/terraform-aws-lambda

## RDS

- https://github.com/terraform-aws-modules/terraform-aws-rds

## Multiple AWS accounts

- You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/
- https://www.gruntwork.io/products/account-factory

AWS Control Tower Account Factory for Terraform:

- https://github.com/aws-ia/terraform-aws-control_tower_account_factory - https://registry.terraform.io/modules/aws-ia/control_tower_account_factory/aws/latest
- Provision accounts with AWS Control Tower Account Factory for Terraform - https://docs.aws.amazon.com/controltower/latest/userguide/taf-account-provisioning.html

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
