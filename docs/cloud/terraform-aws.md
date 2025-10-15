---
title: Terraform AWS
---

https://registry.terraform.io/providers/hashicorp/aws

Docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs

Terraform providers forum - https://discuss.hashicorp.com/c/terraform-providers/31

https://aws.amazon.com/solutions/partners/terraform-modules/

Are you missing an AWS resource in Terraform? Try awscc provider! - https://cloudonaut.io/are-you-missing-an-aws-resource-in-terraform-try-awscc-provider

Tutorials:

- Get started: https://developer.hashicorp.com/terraform/tutorials/aws-get-started
- Use cases: https://developer.hashicorp.com/terraform/tutorials/aws

```hcl
provider "aws" {
  region  = "us-east-1"
  profile = "personal"

  default_tags {
    tags = {
      Project = "my-app"
    }
  }
}
```

Since [version 1.11](https://github.com/hashicorp/terraform/releases/tag/v1.11.0), there's no need to have a DynamoDB table to do state locking:

> S3 native state locking is now generally available. The `use_lockfile` argument enables users to adopt the S3-native mechanism for state locking. As part of this change, we've deprecated the DynamoDB-related arguments in favor of this new locking mechanism. While you can still use DynamoDB alongside S3-native state locking for migration purposes, we encourage migrating to the new state locking mechanism.

## IAM

GitHub Action to validate IAM policies in Terraform templates - https://github.com/aws-actions/terraform-aws-iam-policy-validator

Difference between aws_iam_policy and aws_iam_role_policy - https://stackoverflow.com/questions/66510222/difference-between-aws-iam-policy-and-aws-iam-role-policy

- [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) -> managed policy, can be re-used
- [aws_iam_role_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) → inline policy

## Get AWS account id

Use `data.aws_caller_identity.current.account_id`. You need to declare the data resource. You can use a local value to make it shorter.

```hcl
data "aws_caller_identity" "current" {}

# Use local.account_id
locals {
  account_id = data.aws_caller_identity.current.account_id
}
```

## Get AZs

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones

```hcl
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_subnet" "subnet_a" {
  availability_zone = data.aws_availability_zones.available.names[0] # "us-east-1a" if we are at "us-east-1"
}

output "list_of_az" {
  value = data.aws_availability_zones.available[*].names
}
# list_of_az = [
#   tolist([
#     "us-east-1a",
#     "us-east-1b",
#     "us-east-1c",
#     "us-east-1d",
#     "us-east-1e",
#     "us-east-1f",
#   ]),
# ]
```

## Get the Amazon Linux AMI

https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami

```hcl
data "aws_ami" "amazon-linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_launch_configuration" "example" {
  image_id = data.aws_ami.amazon-linux.id
}
```

## S3

```hcl
resource "random_string" "bucket" {
  length  = 6
  special = false
  upper   = false
}

resource "aws_s3_bucket" "image_uploads" {
  bucket = "my-bucket-${random_string.bucket.result}"
  versioning_configuration {
    status = "Enabled"
  }
}
```

## EC2 user data

:::warning
It's recommended to install security updates at the end of the boot process by including `yum -y update` (installs all updates) or `yum -y --security update` (installs only security updates) in the user data.
:::

### Inline with heredoc

```hcl
resource "aws_instance" "example" {
  ami                    = "ami-0fb653ca2d3203ac1"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.instance.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p 8080 &
              EOF

  user_data_replace_on_change = true

  tags = {
    Name = "example"
  }
}
```

### External file

```shell title="user-data.sh"
#!/bin/bash

# Update the system and install necessary packages
yum update -y
yum install -y httpd

# Start the Apache server
systemctl start httpd
systemctl enable httpd
```

```hcl
resource "aws_instance" "example" {
  user_data = file("user-data.sh")
}
```

### Base 64

On a [`aws_launch_template`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/launch_template) you need to encode the data in base64 ([see the docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/launch_template#user_data)), otherwise you get this error:

> Error: creating EC2 Launch Template (terraform-20241008173227703800000001): operation error EC2: CreateLaunchTemplate, https response error StatusCode: 400, RequestID: 38094e48-f95f-4a60-afc9-87645f3d4f63, api error InvalidUserData.Malformed: Invalid BASE64 encoding of user data.

Use `user_data = filebase64("user-data.sh")` or `user_data = filebase64("${path.module}/user-data.sh")`. If you need to interpolate some variable into the user data then do:

```hcl
locals {
  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p ${var.server_port} &
              EOF
}

resource "aws_launch_template" "example" {
  user_data = base64encode(local.user_data)
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

## Auto Scaling

- Auto Scaling Groups tutorial - https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg - https://github.com/hashicorp/learn-terraform-aws-asg
- https://terraformguru.com/terraform-real-world-on-aws-ec2/15-Autoscaling-with-Launch-Templates - https://github.com/stacksimplify/terraform-on-aws-ec2/tree/main/15-Autoscaling-with-Launch-Templates
- https://github.com/stacksimplify/terraform-on-aws-ec2/tree/main/09-AWS-ALB-Application-LoadBalancer-Basic - https://github.com/gerardodavidlopezcastillo/TF_ALB-ApplicationLoadBalancer_Public
- https://terraformguru.com/terraform-real-world-on-aws-ec2/10-ALB-Path-Based-Routing/ - https://github.com/gerardodavidlopezcastillo/TF_ALB-PathBasedRouting_Public
- https://terraformguru.com/terraform-real-world-on-aws-ec2/11-ALB-Host-Header-Based-Routing/ - https://github.com/gerardodavidlopezcastillo/TF_ALB-HostHeaderBasedRouting_Public
- https://github.com/stacksimplify/terraform-on-aws-ec2/tree/main/12-ALB-HTTPHeader-QueryString-Redirects - https://github.com/gerardodavidlopezcastillo/TF_ALB-HTTPHeaderQueryStringRedirects_Public
- https://terraformguru.com/terraform-real-world-on-aws-ec2/16-AWS-NLB-Network-Load-Balancer/ - https://github.com/stacksimplify/terraform-on-aws-ec2/tree/main/16-AWS-NLB-Network-Load-Balancer - https://github.com/gerardodavidlopezcastillo/TF_NLB-NetworkLoadBalancer_Public

We need to use [`create_before_destroy`](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#create_before_destroy) in `aws_launch_configuration` and `aws_launch_configuration`.

From https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg#ec2-launch-template

> You cannot modify a launch configuration, so any changes to the definition force Terraform to create a new resource. The `create_before_destroy` argument in the `lifecycle` block instructs Terraform to create the new version before destroying the original to avoid any service interruptions.

From 'Terraform: Up and Running' (p. 68):

> Launch configurations are immutable, so if you change any parameter, Terraform will try to replace it. Normally, when replacing a resource, Terraform would delete the old resource first and then creates its replacement, but because your ASG how has a reference to the old resource, Terraform won't be able to delete it.

If you use `desired_capacity` attribute, when running `apply` Terraform will scale up or down the number of instances currently running to match the `desired_capacity` (~ desired_capacity = 2 -> 1). To avoid this, use the `ignore_changes` lifecycle ([source](https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg#set-lifecycle-rule)):

```hcl
resource "aws_autoscaling_group" "example" {
  min_size             = 1
  max_size             = 3
  desired_capacity     = 1

  lifecycle {
    ignore_changes = [desired_capacity]
  }
}
```

## ECS

- https://github.com/aws-ia/ecs-blueprints
- https://github.com/aws-ia/terraform-aws-ecs-fargate
- (2016) https://www.ybrikman.com/writing/2016/03/31/infrastructure-as-code-microservices-aws-docker-terraform-ecs

## EKS

- https://github.com/aws-containers/retail-store-sample-app/tree/main/terraform/eks
- https://github.com/aws-samples/karpenter-blueprints/tree/main/cluster/terraform
- https://github.com/aws-samples/amazon-eks-security-immersion-day/tree/mainline/terraform/common
- https://github.com/aws-samples/eks-saas-gitops/tree/main/terraform
- https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
- https://github.com/stacksimplify/aws-eks-kubernetes-masterclass - https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices
- https://github.com/aws-ia/terraform-aws-eks-blueprints - https://aws-ia.github.io/terraform-aws-eks-blueprints
- https://github.com/aws-ia/terraform-aws-eks-blueprints-addons
- https://github.com/aws-ia/terraform-aws-eks-blueprints-teams
- https://github.com/aws-ia/terraform-aws-eks-ack-addons
- https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594
- https://github.com/jcolemorrison/hashistack-on-aws
- https://www.udemy.com/course/terraform-on-aws-eks-kubernetes-iac-sre-50-real-world-demos
- https://github.com/terraform-aws-modules/terraform-aws-eks
- https://github.com/maddevsio/aws-eks-base
- https://blog.raftech.nl/building-robust-platform-for-containers-part-1-terraform-eks-cillium-5822a13d3113 - https://github.com/RaftechNL/blog/tree/part-1 and https://github.com/RaftechNL/blog/tree/building-robust-container-platform-1
- https://blog.raftech.nl/building-robust-platform-for-containers-part-2-terraform-eks-with-karpenter-d7050c9cedd9 - https://github.com/RaftechNL/blog/tree/building-robust-container-platform-2

## Lambda

- https://github.com/dustindortch/terraform-docker-aws-lambda
- https://github.com/dustindortch/terraform-aws-lambda-container
- https://surajblog.medium.com/sending-cloudwatch-alarms-to-slack-via-sns-and-aws-lambda-using-terraform-7e707e0a413d
- https://github.com/terraform-aws-modules/terraform-aws-lambda
- Creating an Image Thumbnail Generator Using AWS Lambda and S3 Event Notifications with Terraform - https://dev.to/chinmay13/creating-an-image-thumbnail-generator-using-aws-lambda-and-s3-event-notifications-with-terraform-4e13

## RDS

- Tutorial 'Manage AWS RDS instances' - https://developer.hashicorp.com/terraform/tutorials/aws/aws-rds
- Tutorial 'Upgrade RDS major version' - https://developer.hashicorp.com/terraform/tutorials/aws/rds-upgrade
- https://github.com/terraform-aws-modules/terraform-aws-rds

## Multiple AWS accounts

- You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/
- https://www.gruntwork.io/products/account-factory

AWS Control Tower Account Factory for Terraform:

- https://github.com/aws-ia/terraform-aws-control_tower_account_factory - https://registry.terraform.io/modules/aws-ia/control_tower_account_factory/aws/latest
- Provision accounts with AWS Control Tower Account Factory for Terraform - https://docs.aws.amazon.com/controltower/latest/userguide/taf-account-provisioning.html
- Manage your AWS multi-account environment with Account Factory for Terraform (AFT)- https://aws.amazon.com/blogs/mt/manage-your-aws-multi-account-environment-with-account-factory-for-terraform-aft/

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
