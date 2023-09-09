---
title: Terraform
---

[www.terraform.io](https://www.terraform.io/)

https://developer.hashicorp.com/terraform (new) - https://learn.hashicorp.com/terraform (old)

https://github.com/topics/terraform

https://github.com/topics/terraform-module

## Tools

Generate terraform files from existing infrastructure (reverse Terraform) - https://github.com/GoogleCloudPlatform/terraformer

Wrapper for Terraform that provides extra tools for working with multiple Terraform modules - https://github.com/gruntwork-io/terragrunt

Go library that makes it easier to write automated tests - https://github.com/gruntwork-io/terratest

Collection of useful Terraform utilities - https://github.com/gruntwork-io/terraform-aws-utilities

Detect compliance and security violations - https://github.com/tenable/terrascan - https://runterrascan.io

Security scanner for your Terraform code - https://github.com/aquasecurity/tfsec - https://github.com/actions/starter-workflows/blob/main/code-scanning/tfsec.yml

Linter - https://github.com/terraform-linters/tflint - https://github.com/terraform-linters/tflint-ruleset-aws

## Learn / Best practices

Terraform Best Practices for AWS users - https://github.com/ozbillwang/terraform-best-practices

https://github.com/bregman-arie/devops-exercises/blob/master/topics/terraform/README.md

https://github.com/MichaelCade/90DaysOfDevOps#learn-infrastructure-as-code

https://medium.com/devops-mojo/terraform-best-practices-top-best-practices-for-terraform-configuration-style-formatting-structure-66b8d938f00c

Configuring a Highly Available Infrastructure in AWS using Terraform - https://faun.pub/configuring-a-highly-available-infrastructure-in-aws-using-terraform-2fc9dbb519b6

Comprehensive Guide to Terraform series by Yevgeniy Brikman

1. [Why we use Terraform and not Chef, Puppet, Ansible, Pulumi, or CloudFormation](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c)
2. [An Introduction to Terraform](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180)
3. [How to manage Terraform state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa)
4. [How to create reusable infrastructure with Terraform modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d)
5. [Terraform tips & tricks: loops, if-statements, and gotchas](https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9)
6. [How to use Terraform as a team](https://blog.gruntwork.io/how-to-use-terraform-as-a-team-251bc1104973)

How to manage multiple environments with Terraform (Yevgeniy Brikman) - https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-32c7bc5d692

1. [Using workspaces](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-workspaces-98680d89a03e)
2. [Using branches](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-branches-875d1a2ee647)
3. [Using ](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-terragrunt-2c3e32fc60a8)

https://medium.com/@itsnarayan/optimizing-aws-infrastructure-leveraging-terraform-for-low-coupling-and-high-cohesion-a5ae6049ab1e

## Examples

- https://github.com/AJarombek/global-aws-infrastructure
- https://github.com/AJarombek/jarombek-com-infrastructure
- https://github.com/AJarombek/saints-xctf-infrastructure
- Terraform module for building and deploying Next.js apps to AWS. Supports SSR (Lambda), Static (S3) and API (Lambda) pages. - https://github.com/milliHQ/terraform-aws-next-js
- https://github.com/bregman-arie/devops-exercises/search?q=terraform

## Multiple AWS accounts

You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/

AWS Control Tower Account Factory for Terraform:

- https://registry.terraform.io/modules/aws-ia/control_tower_account_factory/aws/latest
- Provision accounts with AWS Control Tower Account Factory for Terraform - https://docs.aws.amazon.com/controltower/latest/userguide/taf-account-provisioning.html

## CDK for Terraform

https://www.terraform.io/cdktf

Terraforming with TypeScript - https://radar.com/blog/terraforming-with-typescript
