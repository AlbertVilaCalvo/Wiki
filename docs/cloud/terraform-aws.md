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

## Provider

```hcl
provider "aws" {
  region  = "us-east-1"
  profile = "personal"

  default_tags {
    tags = {
      Project     = "my-app"
      Environment = "dev"
    }
  }
}
```

## Backend

Since [version 1.11](https://github.com/hashicorp/terraform/releases/tag/v1.11.0), there's no need to have a DynamoDB table to do state locking:

> S3 native state locking is now generally available. The `use_lockfile` argument enables users to adopt the S3-native mechanism for state locking. As part of this change, we've deprecated the DynamoDB-related arguments in favor of this new locking mechanism. While you can still use DynamoDB alongside S3-native state locking for migration purposes, we encourage migrating to the new state locking mechanism.

The same S3 bucket (and DynamoDB table) can be used to store multiple state so as long as the `key` is different. For example:

```hcl
terraform {
  backend "s3" {
    bucket       = "my-app-terraform-state"
    key          = "frontend/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}

terraform {
  backend "s3" {
    bucket       = "my-app-terraform-state"
    key          = "backend/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}
```

## Tags

https://developer.hashicorp.com/terraform/tutorials/aws/aws-default-tags

```hcl
provider "aws" {
  region  = "us-east-1"

  default_tags {
    tags = {
      Project     = "my-app"
      Environment = "dev"
    }
  }
}
```

When you define the same tag in both the `default_tags` configuration in the provider and on a resource (using `tags`), the resource-specific tag overwrites the default setting. When running `terraform apply`, the `tags` attribute represents the resource-specific tags in Terraform state, while `tags_all` is the total of the resource tags and the default tags specified on the provider.

:::important
The `default_tags` block applies tags to all resources managed by this provider, except for the Auto Scaling groups (ASG). See [Propagate default tags to Auto Scaling group](https://developer.hashicorp.com/terraform/tutorials/aws/aws-default-tags#propagate-default-tags-to-auto-scaling-group).
:::

### Enforce tags

https://mattias.engineer/blog/2025/managing-aws-tags/#enforcing-tags-on-your-aws-resources

https://github.com/terratags/terratags

## IAM

GitHub Action to validate IAM policies in Terraform templates - https://github.com/aws-actions/terraform-aws-iam-policy-validator

### aws_iam_policy vs aws_iam_role_policy

Difference between aws_iam_policy and aws_iam_role_policy - https://stackoverflow.com/questions/66510222/difference-between-aws-iam-policy-and-aws-iam-role-policy

[aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) (recommended)

- Managed IAM policy that exists independently and can be reused.
- Can be attached to multiple roles, users or groups.
- Has its own ARN and lifecycle.
- Reusable across different IAM principals.
- Requires a separate `aws_iam_role_policy_attachment` resource to attach it to a role.
- Managed policies are recommended by AWS for better policy management.
- Better visibility: managed policies appear separately in the IAM console.

[aws_iam_role_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy)

- Inline policy that is embedded directly in a single role.
- Tied to the lifecycle of the role (deleted when the role is deleted).
- Cannot be reused or attached to other roles.
- More concise - no need for a separate attachment resource.

### Policy document

There are 4 ways to define a policy document JSON in Terraform:

1. [`jsonencode()`](https://developer.hashicorp.com/terraform/language/functions/jsonencode) function to convert a map to JSON.

- Validation of the structure at terraform plan.
- Easier to interpolate variables and use conditional logic.
- Better IDE syntax support.
- Harder to read.

2. [`aws_iam_policy_document`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) data source.

- Allows interpolation of Terraform variables with `${}`.
- Allows interpolation of [AWS variables](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html#policy-vars-using-variables) with `&{}`.

3. Heredoc inline JSON.

- Not recommended by HashiCorp ([source](https://developer.hashicorp.com/terraform/language/expressions/strings#heredoc-strings)): Don't use "heredoc" strings to generate JSON or YAML. Instead, use [the jsonencode function](https://developer.hashicorp.com/terraform/language/functions/jsonencode) or [the yamlencode function](https://developer.hashicorp.com/terraform/language/functions/yamlencode) so that Terraform can be responsible for guaranteeing valid JSON or YAML syntax.
- Same syntax. Can copy-paste.
- No validation. Higher risk of errors.

4. External JSON file with [`file()`](https://developer.hashicorp.com/terraform/language/functions/file) function.

See examples below.

### Policy examples

`jsonencode()` - Role for a Lambda function:

```hcl
resource "aws_iam_role" "lambda" {
  name = "${var.project_name}-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      },
    ]
  })
}

resource "aws_iam_policy" "lambda" {
  name = "${var.project_name}-lambda"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject"
        ]
        Resource = [
          aws_s3_bucket.images.arn,
          "${aws_s3_bucket.images.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem"
        ]
        Resource = aws_dynamodb_table.images.arn
      },
      {
        Effect   = "Allow"
        Action   = "logs:CreateLogGroup"
        Resource = "arn:aws:logs:${var.region}:${local.account_id}:*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Resource = [
          "arn:aws:logs:${var.region}:${local.account_id}:log-group:/aws/lambda/${aws_lambda_function.image_extract.function_name}:*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda.arn
}
```

`aws_iam_policy_document` - Role to read a secret from Secrets Manager:

```hcl
data "aws_iam_policy_document" "read_db_secret" {
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue"
    ]
    resources = [aws_secretsmanager_secret.db_credentials.arn]
  }
}

resource "aws_iam_policy" "read_db_secret" {
  name_prefix = "${var.app_name}-read-db-secret-${var.environment}"
  description = "Allow reading database credentials from Secrets Manager"
  policy      = data.aws_iam_policy_document.read_db_secret.json
}

resource "aws_iam_role_policy_attachment" "read_db_secret" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.read_db_secret.arn
}
```

`aws_iam_policy_document` - Bucket policy for CloudFront to access S3:

```hcl
data "aws_iam_policy_document" "website_s3_policy" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.website_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website_s3_policy.json
}
```

Heredoc - Role for an EKS cluster:

```hcl
resource "aws_iam_role" "cluster_role" {
  name = "${var.cluster_name}-eks-cluster-role"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster_role.name
}

resource "aws_iam_role_policy_attachment" "cluster_vpc_resource_controller" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.cluster_role.name
}
```

`file()` - IAM policy for AWS Load Balancer Controller:

```hcl
resource "aws_iam_role" "lb_controller" {
  name = "${var.app_name}-lb-controller-role-${var.environment}"
  assume_role_policy = jsonencode({
    # ...
  })
}

resource "aws_iam_policy" "lb_controller" {
  name        = "${var.app_name}-lb-controller-policy-${var.environment}"
  description = "IAM policy for AWS Load Balancer Controller for ${var.app_name} in ${var.environment} environment"
  # From https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.17.0/docs/install/iam_policy.json
  policy = file("${path.module}/lb_controller_iam_policy.json")
}

resource "aws_iam_role_policy_attachment" "lb_controller" {
  role       = aws_iam_role.lb_controller.name
  policy_arn = aws_iam_policy.lb_controller.arn
}
```

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

## Variable validation examples

These examples are AWS-specific, [see general examples here](terraform.md#variable-validation-examples).

https://dev.to/drewmullen/terraform-variable-validation-with-samples-1ank

AWS region:

```hcl
variable "aws_region" {
  description = "The AWS region to deploy the resources to"
  type        = string

  validation {
    condition     = can(regex("^(us|eu|ap|sa|ca|me|af)-(east|west|north|south|central|northeast|southeast|northwest|southwest)-[1-3]$", var.aws_region))
    error_message = "The region must be a valid AWS region (e.g., us-east-1, eu-west-2)."
  }
}
```

CIDR block:

```hcl
variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"

  validation {
    condition     = can(cidrhost(var.vpc_cidr, 0))
    error_message = "Must be valid CIDR."
  }
}
```

## VPC

- https://github.com/dustindortch/terraform-aws-vpcpublish
- https://github.com/aws-ia/terraform-aws-vpc

Get the subnets in the default VPC:

```hcl
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
  # Optional: select subnets by AZs
  # This is needed to create an EKS cluster, which can't be done in us-east-1e
  filter {
    name   = "availability-zone"
    values = ["us-east-1a", "us-east-1b", "us-east-1c"]
  }
}
```

Ways to define subnet CIDR blocks:

- https://github.com/terraform-aws-modules/terraform-aws-eks/blob/d57cdac936efe7ae3b0edbb75340b70c6774d4f3/examples/eks-managed-node-group/main.tf#L39-L41
- https://github.com/aws-ia/terraform-aws-eks-blueprints/blob/05d32bb2fff08959674c1d4cfe5e34ebc723049e/patterns/karpenter-mng/vpc.tf#L9-L10

### Use `aws_vpc_security_group_egress_rule`

From https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_security_group_egress_rule:

> Using `aws_vpc_security_group_egress_rule` and `aws_vpc_security_group_ingress_rule` resources is the current best practice. Avoid using the `aws_security_group_rule` resource and the `ingress` and `egress` arguments of the `aws_security_group` resource for configuring in-line rules, as they struggle with managing multiple CIDR blocks, and tags and descriptions due to the historical lack of unique IDs.

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

If you use `desired_capacity` attribute, when running `apply` Terraform will scale up or down the number of instances currently running to match the `desired_capacity` (~ desired_capacity = 2 → 1). To avoid this, use the `ignore_changes` lifecycle ([source](https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg#set-lifecycle-rule)):

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

- https://www.eksworkshop.com/docs/introduction/setup/your-account/using-terraform
- https://github.com/hashicorp-education/learn-terraform-provision-eks-cluster - https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
- https://github.com/aws-containers/retail-store-sample-app/tree/main/terraform/eks
- https://github.com/aws-samples/karpenter-blueprints/tree/main/cluster/terraform
- https://github.com/aws-samples/amazon-eks-security-immersion-day/tree/mainline/terraform/common
- https://github.com/aws-samples/eks-saas-gitops/tree/main/terraform
- https://github.com/stacksimplify/aws-eks-kubernetes-masterclass - https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices
- https://github.com/aws-ia/terraform-aws-eks-blueprints - https://aws-ia.github.io/terraform-aws-eks-blueprints
- https://github.com/aws-ia/terraform-aws-eks-blueprints-addons
- https://github.com/aws-ia/terraform-aws-eks-blueprints-teams
- https://github.com/aws-ia/terraform-aws-eks-ack-addons
- https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594
- https://github.com/jcolemorrison/hashistack-on-aws
- https://github.com/terraform-aws-modules/terraform-aws-eks
- https://github.com/maddevsio/aws-eks-base
- https://blog.raftech.nl/building-robust-platform-for-containers-part-1-terraform-eks-cillium-5822a13d3113 - https://github.com/RaftechNL/blog/tree/part-1 and https://github.com/RaftechNL/blog/tree/building-robust-container-platform-1
- https://blog.raftech.nl/building-robust-platform-for-containers-part-2-terraform-eks-with-karpenter-d7050c9cedd9 - https://github.com/RaftechNL/blog/tree/building-robust-container-platform-2
- https://github.com/stacksimplify/terraform-on-aws-eks - https://www.udemy.com/course/terraform-on-aws-eks-kubernetes-iac-sre-50-real-world-demos/ → Molt complet
- https://github.com/Apress/AWS-EKS-Essentials - https://link.springer.com/book/10.1007/979-8-8688-1331-3 → Many examples
- https://github.com/AJarombek/global-aws-infrastructure/tree/main/eks-v2 - See v1 (includes a VPC, EKS cluster, and EC2 worker nodes): https://github.com/AJarombek/global-aws-infrastructure/tree/0e23def69ad9c699ee9f2c4248130f935fda0057/eks
- https://github.com/hashicorp-education/learn-terraform-stacks-eks-deferred - https://developer.hashicorp.com/terraform/tutorials/cloud/stacks-eks-deferred
- https://github.com/PacktPublishing/Mastering-Terraform/tree/main/Chapter%2008%20-%20Building%20Container-based%20Cloud%20Solutions%20with%20AWS%20EKS - Mastering TerraformChapter 08 - Building Container-based Cloud Solutions with AWS EKS
- Auto Mode - https://github.com/setheliot/eks_auto_mode - https://builder.aws.com/content/2sV2SNSoVeq23OvlyHN2eS6lJfa/amazon-eks-auto-mode-enabled-build-your-super-powered-cluster

## Lambda

- https://github.com/dustindortch/terraform-docker-aws-lambda
- https://github.com/dustindortch/terraform-aws-lambda-container
- https://surajblog.medium.com/sending-cloudwatch-alarms-to-slack-via-sns-and-aws-lambda-using-terraform-7e707e0a413d
- https://github.com/terraform-aws-modules/terraform-aws-lambda
- Creating an Image Thumbnail Generator Using AWS Lambda and S3 Event Notifications with Terraform - https://dev.to/chinmay13/creating-an-image-thumbnail-generator-using-aws-lambda-and-s3-event-notifications-with-terraform-4e13

## RDS

- Tutorial 'Manage AWS RDS instances' - https://developer.hashicorp.com/terraform/tutorials/aws/aws-rds - https://github.com/hashicorp-education/learn-terraform-rds
- Tutorial 'Upgrade RDS major version' - https://developer.hashicorp.com/terraform/tutorials/aws/rds-upgrade - https://github.com/hashicorp-education/learn-terraform-rds-upgrade
- https://github.com/terraform-aws-modules/terraform-aws-rds
- https://github.com/lm-academy/terraform-course/tree/main/proj04-rds-module
- https://github.com/PacktPublishing/Mastering-Terraform/tree/main/Chapter%2009%20-%20Building%20Serverless%20Cloud%20Solutions%20with%20AWS%20Lambda - Mastering Terraform Chapter 09 - Building Serverless Cloud Solutions with AWS Lambda

The [subnet group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_subnet_group) is the collection of subnets in which the RDS instances can be provisioned. Usually, these are private subnets. If you don't specify a subnet group, the RDS instances will be created in the default VPC.

The [parameter group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_parameter_group) is used to configure database engine settings. If you don't specify a custom parameter group, the default one will be used.

```hcl
resource "aws_db_parameter_group" "main" {
  name   = "${var.app_name}-rds-params-${var.environment}"
  family = "postgres14"

  parameter {
    name  = "rds.force_ssl"
    value = "1"
  }

  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.Query_Logging.html
  parameter {
    name  = "log_connections"
    value = "1"
  }
}
```

Some (not all) available parameters for PostgreSQL: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.Parameters.html#Appendix.PostgreSQL.CommonDBATasks.Parameters.parameters-list

To list all available parameter names for a specific family run:

```shell
aws rds describe-db-parameters --db-parameter-group-name default.postgres13
aws rds describe-db-parameters --db-parameter-group-name default.postgres14 --query 'Parameters[].ParameterName'
```

## Multiple AWS accounts

https://cloudposse.com

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
