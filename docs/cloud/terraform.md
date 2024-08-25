---
title: Terraform
---

[www.terraform.io](https://www.terraform.io/)

https://developer.hashicorp.com/terraform

https://github.com/topics/terraform

https://github.com/topics/terraform-module

Cheatsheet: https://cheat-sheets.nicwortel.nl/terraform-cheat-sheet.pdf

> Terraform's primary function is to create, modify, and destroy infrastructure resources to match the desired state described in a Terraform configuration. [source](https://developer.hashicorp.com/terraform/cli/run)

It uses a [Directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) to represent resources - see https://github.com/hashicorp/terraform/tree/main/internal/dag and https://developer.hashicorp.com/terraform/internals/graph.

Uses the library https://github.com/zclconf/go-cty internally.

## CLI

:::tip
Don't use the [official shell tab-completion](https://developer.hashicorp.com/terraform/cli/commands#shell-tab-completion) (installed with `terraform -install-autocomplete`), because it only adds tab-completion of commands (eg `apply`), but not arguments (eg `-refresh`).

Instead, use the [Oh My Zsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform), which autocompletes the arguments after typing just `-` + tab, showing a description of each argument too.

Note that there's also an [OpenTofu plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/opentofu).
:::

List commands:

```shell
terraform
# or
terraform -help
```

Command help:

```shell
terraform init -help
```

### `init`

- Doc: https://developer.hashicorp.com/terraform/cli/commands/init
- https://developer.hashicorp.com/terraform/cli/init

The first command we must always run. It initializes a working directory with this steps:

- Initializes the backend (state).
- Downloads provider plugins and modules.
- Creates the hidden `.terraform` directory, which contains cached providers plugins and modules.
  - You don't commit the `.terraform` directory in version control. This makes sense since providers are binaries, which we don't put in version control, and they are OS-specific, ie you get a different binary on a x86 vs an ARM processor.

Is idempotent: it is safe to call it multiple times, and will have no effect if no changes are required. Thus, you can call it any time.

Since the `.terraform` directory is not checked into version control, you run `init` when you checkout a git repository, or in the CI/CD pipeline before running the other commands.

You need to run it again when you add or remove providers or modules, or change their versions.

### `plan`

- Doc: https://developer.hashicorp.com/terraform/cli/commands/plan
- https://developer.hashicorp.com/terraform/cli/run#planning
- https://developer.hashicorp.com/terraform/tutorials/cli/plan

Does a state [refresh](https://developer.hashicorp.com/terraform/cli/commands/refresh), that is, it checks the actual infrastructure resources using providers (which call cloud APIs), and compares them with the current configuration, to get the difference between the current and desired state. Once it has the difference, it presents a description (plan) of the changes necessary to achieve the desired state. It does not perform any actual changes to real world infrastructure.

Actions are colored (green, red, yellow) and use a symbol:

- Create: +
- Destroy: -
- Update: ~
- Re-create (destroy and create): -/+

You can optionally save the plan on a file with `terraform plan -out=tfplan`, and pass it to `apply` later. The file is not human-readable.

### `apply`

- Doc: https://developer.hashicorp.com/terraform/cli/commands/apply
- https://developer.hashicorp.com/terraform/cli/run#applying
- https://developer.hashicorp.com/terraform/tutorials/cli/apply

It actually executes a plan on real world infrastructure, to bring it to the desired state.

We can pass it a plan file from `terraform plan -out=tfplan` with `terraform apply tfplan`. It won't ask for approval then, since it assumes you've already reviewed the plan. If we don't pass a plan, it does a new plan before executing it, which guarantees that the plan is done with the infrastructure we have right now. In this case it asks for interactive approval, unless we use the option `-auto-approve`.

:::warning
Some resources behave in unexpected ways. For example, a change of a network configuration on an API Gateway can make it offline for some time (eg 15 minutes).
:::

### `destroy`

- Doc: https://developer.hashicorp.com/terraform/cli/commands/destroy
- https://developer.hashicorp.com/terraform/cli/run#destroying

Destroys the resources.

It's an alias for `terraform apply -destroy`. To show the proposed destroy changes without executing them use `terraform plan -destroy`.

See the [Destroy planning mode](https://developer.hashicorp.com/terraform/cli/commands/plan#planning-modes).

:::tip
Run `destroy` frequently while developing.

While developing some new infrastructure, instead of -or in addition to- doing incremental updates (eg create a VPC → `apply` → add subnets → `apply` → add security groups → `apply`...), always do a `destroy` and then an `apply` after each update, creating the whole infrastructure from scratch every time.

This way we avoid cyclic dependencies, and we make sure that we can create the environment from scratch at any time.
:::

:::warning
Destroy can partially fail, that is, some resources may fail to be deleted, but the rest will. For example, if you have an S3 bucket that is not empty, it will fail to delete it, but the other resources in the plan will be gone.
:::

## Tools

:::tip
For VSCode, in addition to the [Terraform extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform), also install the [HCL syntax extension](https://marketplace.visualstudio.com/items?itemName=hashicorp.hcl), which adds syntax highlighting for HCL files.
:::

Generate terraform files from existing infrastructure (reverse Terraform) - https://github.com/GoogleCloudPlatform/terraformer

Generate CloudFormation / Terraform / Troposphere templates from your existing AWS resources - https://github.com/iann0036/former2

Wrapper for Terraform that provides extra tools for working with multiple Terraform modules - https://github.com/gruntwork-io/terragrunt

Go library that makes it easier to write automated tests - https://github.com/gruntwork-io/terratest

Collection of useful Terraform utilities - https://github.com/gruntwork-io/terraform-aws-utilities

Detect compliance and security violations - https://github.com/tenable/terrascan - https://runterrascan.io

Security scanner for your Terraform code - https://github.com/aquasecurity/tfsec - https://github.com/actions/starter-workflows/blob/main/code-scanning/tfsec.yml

Linter - https://github.com/terraform-linters/tflint - https://github.com/terraform-linters/tflint-ruleset-aws

Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov

https://www.brainboard.co

## Learn / Best practices

Tutorials - https://developer.hashicorp.com/terraform/tutorials - https://developer.hashicorp.com/tutorials/library?product=terraform

List of many courses - https://www.linkedin.com/posts/ann-afamefuna_devops-cloudengineers-cloudsecurity-activity-7200293109002342400-J_qn/

https://frontendmasters.com/courses/enterprise-devops/

Terraform Best Practices for AWS users - https://github.com/ozbillwang/terraform-best-practices

https://github.com/bregman-arie/devops-exercises/blob/master/topics/terraform/README.md

- Also in https://github.com/bregman-arie/devops-exercises/blob/master/topics/aws/README.md some solutions include Terraform

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

33 labs - https://www.whizlabs.com/infrastructure-automation-with-terraform/

Host a static website locally using Simple Storage Service (S3) and Terraform with LocalStack - https://docs.localstack.cloud/tutorials/s3-static-website-terraform/

## Examples

- https://github.com/AJarombek/global-aws-infrastructure
- https://github.com/AJarombek/jarombek-com-infrastructure
- https://github.com/AJarombek/saints-xctf-infrastructure
- Terraform module for building and deploying Next.js apps to AWS. Supports SSR (Lambda), Static (S3) and API (Lambda) pages. - https://github.com/milliHQ/terraform-aws-next-js
- https://github.com/bregman-arie/devops-exercises/search?q=terraform
- https://github.com/aws-ia/terraform-aws-control_tower_account_factory

### Modules

- Terraform Module Template - https://github.com/aws-ia/terraform-repo-template
- https://github.com/aws-ia/terraform-aws-vpc
- https://github.com/aws-ia/terraform-aws-iam-identity-center

## ECS

- https://github.com/aws-ia/ecs-blueprints
- https://github.com/aws-ia/terraform-aws-ecs-fargate

## EKS

- https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
- https://github.com/aws-ia/terraform-aws-eks-blueprints - https://aws-ia.github.io/terraform-aws-eks-blueprints
- https://github.com/aws-ia/terraform-aws-eks-blueprints-addons
- https://github.com/aws-ia/terraform-aws-eks-blueprints-teams
- https://github.com/aws-ia/terraform-aws-eks-ack-addons

## Multiple AWS accounts

You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/

AWS Control Tower Account Factory for Terraform:

- https://registry.terraform.io/modules/aws-ia/control_tower_account_factory/aws/latest
- Provision accounts with AWS Control Tower Account Factory for Terraform - https://docs.aws.amazon.com/controltower/latest/userguide/taf-account-provisioning.html

## CDK for Terraform

https://www.terraform.io/cdktf

Terraforming with TypeScript - https://radar.com/blog/terraforming-with-typescript

## VS CloudFormation

https://developer.hashicorp.com/terraform/intro/vs/cloudformation

## Terraform Associate Certification (003)

https://developer.hashicorp.com/certifications/infrastructure-automation

https://developer.hashicorp.com/terraform/tutorials/certification-003

https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials-003

https://www.exampro.co/terraform

https://www.whizlabs.com/hashicorp-certified-terraform-associate/

https://www.udemy.com/course/terraform-associate-practice-exam

https://github.com/allister-grange/terraform-associate-guide-003

https://www.packtpub.com/en-es/product/hashicorp-terraform-associate-003-exam-guide-9781804618844
