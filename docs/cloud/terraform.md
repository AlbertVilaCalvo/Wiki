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

## `.gitignore`

https://github.com/github/gitignore/blob/main/Terraform.gitignore

https://developer.hashicorp.com/terraform/language/style#gitignore

## CLI

:::tip
Don't use the [official shell tab-completion](https://developer.hashicorp.com/terraform/cli/commands#shell-tab-completion) (installed with `terraform -install-autocomplete`), because it only adds tab-completion of commands (eg `apply`), but not options (eg `-refresh`).

Instead, use the [Oh My Zsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform), which autocompletes the options after typing just `-` + tab, showing a description of each argument too.

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
- Re-create (destroy and then create): -/+

You can optionally save the plan to a file with `terraform plan -out=tfplan`, and pass it to `apply` later. The file is not human-readable, but you can use `terraform show tfplan` to view the plan.

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

### `fmt`

- https://developer.hashicorp.com/terraform/cli/commands/fmt
- https://developer.hashicorp.com/terraform/language/style#code-formatting

```shell
terraform fmt
terraform fmt -check
```

### `validate`

https://developer.hashicorp.com/terraform/cli/commands/validate

Requires a successful run of `terraform init` (i.e. local installation of all providers and modules) to function.

## HCL

https://github.com/hashicorp/hcl

### Blocks

https://developer.hashicorp.com/terraform/language/syntax/configuration

Everything is a block. Nothing can exist outside of a block.

A block has a **type** or keyword (`terraform`, `resource`, `variable`...) and optionally some **labels**, followed by curly braces, which delimit the body. Inside the curly braces (the body) we have arguments and nested blocks. (The [HCL spec](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md) uses 'attribute' instead of 'argument' [source](https://developer.hashicorp.com/terraform/language/syntax/configuration#arguments).) Each **argument** has a name or key and a value. The value comes from an expression (a string literal, a boolean, a number, a variable, a function in HCL, a property of a resource or a data source...). [See documentation](https://developer.hashicorp.com/terraform/language#about-the-terraform-language)

```hcl
block_type "block_label_1" "block_label_2" {
  # Body

  # Argument
  argument_name = "argument_value_from_expression"

  nested_block {
  }
}
```

Most blocks can appear multiple times (eg `terraform`, `resource`, `variable`, `module`...), but some can't, which should be detailed in the documentation.

Argument names, block type names, labels etc. are identifiers. An identifier can contain letters, digits, `_` and `-`. However, the first character can only be a letter or an underscore. [source](https://developer.hashicorp.com/terraform/language/syntax/configuration#identifiers)

### Primitive types (scalars)

https://developer.hashicorp.com/terraform/language/expressions/type-constraints#primitive-types

- string
  - Can only use double quotes (not single)
- boolean
  - true or false
- number
  - Can be an int or a float, there's only a single type for both
- null
  - No value assigned

Terraform can coerce (cast) values of one type to another type automatically if a type is expected but you pass a different one. Some times it works and others it doesn't. See https://developer.hashicorp.com/terraform/language/expressions/type-constraints#conversion-of-primitive-types

All types: https://developer.hashicorp.com/terraform/language/expressions/types

## Blocks

Top-level block types available in Terraform.

### `terraform`

https://developer.hashicorp.com/terraform/language/settings

Configures Terraform, the backend etc.

```hcl
terraform {
  required_version = "~> 1.9.2"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}
```

### `provider`

https://developer.hashicorp.com/terraform/language/providers

What we use to interact with cloud vendors. It provides implementations of resources and data sources. Without providers, Terraform can't manage any kind of infrastructure.

```hcl
provider "aws" {
  region = "us-east-1"
}
```

When a provider implements a resource, it needs to implement a set of functions in Go (Create, Read, Update, Delete...) - [see docs](https://developer.hashicorp.com/terraform/plugin/framework/getting-started/code-walkthrough#resource).

### `resource`

https://developer.hashicorp.com/terraform/language/resources

What we create and manage. The heart of Terraform and the reason why it exists.

The first label is the resource type, and the second the resource name.

```hcl
resource "type" "name" {
}
```

The resource name is used to identify multiple resources of the same type.

```hcl
resource "aws_vpc" "web_vpc" {
  cidr_block = "10.0.0.0/16"
}
```

The **identifier** of the resource is `type.name`, eg `aws_vpc.web_vpc`. This is how you reference this resource in the state. You can't have 2 resources with the same identifier (ie same type and name):

```hcl
resource "aws_vpc" "web_vpc" {
}
# Not allowed
resource "aws_vpc" "web_vpc" {
}
```

:::note
The resource type (`aws_vpc` or `aws_instance`) always starts with the name of the provider and an underscore (`aws_`).

> By convention, resource type names start with their provider's preferred local name. [source](https://developer.hashicorp.com/terraform/language/resources/syntax#providers)

:::

### `data` source

https://developer.hashicorp.com/terraform/language/data-sources

Something that exists outside of our Terraform code that we want to get properties from, to
pass them to our resources.

### `variable`

https://developer.hashicorp.com/terraform/language/values/variables

An input. Variables make the code more reusable by avoiding to hardcode values.

Variables are also available in other tools that use HCL (unlike `resource` for example, which is Terraform specific).

```hcl
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}
```

The identifier is `var.name`, eg `var.aws_region`. This is how you reference it.

If you don't specify a type, its type will be `any`. It's important to always specify the type to avoid errors.

### `output`

https://developer.hashicorp.com/terraform/language/values/outputs

The oposite of an input variable. It returns data (the `value`) when we run `apply` or [`output`](https://developer.hashicorp.com/terraform/cli/commands/output).

```hcl
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}
```

### `locals`

https://developer.hashicorp.com/terraform/language/values/locals

Since all code in HCL must be inside a block, we use the `locals` block to define values,
manipulate data etc. To avoid repetition, they allow reusing an expression within a module.

### `module`

https://developer.hashicorp.com/terraform/language/modules

Other code written in HCL that's reusable and we call from our code. A library.

## Meta-arguments

Arguments that are built-in into the language, as opposed to arguments defined by the providers. They are available to every resource, data source and module - nothing else.

### resource `provider`

If we have multiple `provider "aws"`, we need to use the [resource `provider`](https://developer.hashicorp.com/terraform/language/meta-arguments/resource-provider) meta-argument in a `resource` to disambiguate:

```hcl
# The default. Will be used when a resource doesn't specify a 'provider'
provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  region = "us-west-1"
  alias  = "california"
}

resource "aws_vpc" "myvpc" {
  provider = aws.california
}
```

### `lifecycle`

https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle

It's a nested block.

For example, when we want to change the configuration of an EC2 virtual machine (eg change the AMI), by default Terraform is going to first kill the existing VM, and then create a new one, resulting in some downtime. We can avoid this by using `create_before_destroy`, which tells Terraform to create a new VM before we kill the existing one.

### `depends_on`

https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on

:::warning
Should we used rarely.
:::

### `count`

https://developer.hashicorp.com/terraform/language/meta-arguments/count

How many instances of the resource or module to create.

All instances should be almost identical, otherwise is safer to use `for_each`. See [When to Use `for_each` Instead of `count`](https://developer.hashicorp.com/terraform/language/meta-arguments/count#when-to-use-for_each-instead-of-count).

:::note
A resource can only use `count` or `for_each`, but not both.
:::

### `for_each`

https://developer.hashicorp.com/terraform/language/meta-arguments/for_each

Similar to `count`, is also used to create multiple instances of a resource or module, but we can easily set different properties to each one in a safer way.

## Modules

When Should We Write Modules - https://dustindortch.com/2022/10/21/why-do-we-write-terraform-modules/

## VSCode extension

https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform

In addition to the [Terraform extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform), there is also the [HCL syntax extension](https://marketplace.visualstudio.com/items?itemName=hashicorp.hcl), which adds syntax highlighting for HCL files. Installing this extension optional, because Terraform syntax highlighting is already provided by the Terraform extension, since the HCL syntax extension _"is a grammar only extension targeted to provide HCL syntax highlighting for files not already accounted for by a more specific product-focused extension"_.

To autoformat on save you need to modify the `settings.json` file (to open it do Cmd+Shif+P and select 'Preferences: Open User Settings (JSON)') as explained in https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform#formatting

It has [code snippets](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform#code-snippets).

It can handle multiple, separate folders (eg modules) using VSCode Workspaces - [see docs](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform#vs-code-workspace-support).

## JetBrains extension

https://plugins.jetbrains.com/plugin/7808-terraform-and-hcl

Docs: https://www.jetbrains.com/help/idea/terraform.html

There are 2 formatters. To use the `terraform fmt` formatter instead of the [JetBrains formatter](https://www.jetbrains.com/help/idea/terraform.html#use-jetbrains-formatter), go to Preferences → Advanced Settings → Terraform and enable the option 'Terraform fmt'.

You can format a file with Code → Terraform tools → Format file, but is not very ergonomic. To enable auto-formatting, add a file watcher ([see picture in this StackOverflow answer](https://stackoverflow.com/a/77050052/4034572)):

- Go to Preferences → Tools → File Watchers
- Click the + symbol (Add)
- At the drop-down list, select 'terraform fmt', which should have the following options pre-filled:
  - Name: terraform fmt
  - Files to Watch:
    - File type: Terraform config files
    - Scope: Project files
  - Tool to Run on Changes:
    - Program: `$TerraformExecPath$`
    - Arguments: `fmt $FilePath$`
    - Output paths to refresh: `$FilePath$`
    - Working directory: leave it empty
    - Environment variables: leave it empty
  - Advanced settings: leave it as it is. Should have only one option checked: Trigger the watcher on external changes

## Tools

Terraform tools review playlist - https://www.youtube.com/playlist?list=PLvz1V_9d3uivwNgADT_eB-wKEWOzOOQXy

Generate terraform files from existing infrastructure (reverse Terraform) - https://github.com/GoogleCloudPlatform/terraformer

Generate CloudFormation / Terraform / Troposphere templates from your existing AWS resources - https://github.com/iann0036/former2

Wrapper for Terraform that provides extra tools for working with multiple Terraform modules - https://github.com/gruntwork-io/terragrunt - https://terragrunt.gruntwork.io

Go library that makes it easier to write automated tests - https://github.com/gruntwork-io/terratest

Collection of useful Terraform utilities - https://github.com/gruntwork-io/terraform-aws-utilities - https://terratest.gruntwork.io

Detect compliance and security violations - https://github.com/tenable/terrascan - https://runterrascan.io

Security scanner for your Terraform code - https://github.com/aquasecurity/tfsec - https://github.com/actions/starter-workflows/blob/main/code-scanning/tfsec.yml

Linter - https://github.com/terraform-linters/tflint - https://github.com/terraform-linters/tflint-ruleset-aws

Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov

https://www.brainboard.co

## Learn / Best practices

Tutorials - https://developer.hashicorp.com/terraform/tutorials - https://developer.hashicorp.com/tutorials/library?product=terraform

File names conventions - https://developer.hashicorp.com/terraform/language/style#file-names

Best practices (Dustin Dortch):

- Do not hardcode values: https://dustindortch.com/2024/02/08/terraform-best-practices-do-not-hard-code-values/
- Files: https://dustindortch.com/2024/02/12/terraform-best-practices-files/
- Versioning: https://dustindortch.com/2024/02/29/terraform-best-practices-versioning/
- Defining Modules: https://dustindortch.com/2024/03/27/terraform-best-pratices-defining-modules/
- Variables: https://dustindortch.com/2024/04/04/terraform-best-practices-variables/

https://www.youtube.com/@AntonBabenkoLive

List of many courses - https://www.linkedin.com/posts/ann-afamefuna_devops-cloudengineers-cloudsecurity-activity-7200293109002342400-J_qn/

https://frontendmasters.com/courses/enterprise-devops/

Terraform Best Practices for AWS users - https://github.com/ozbillwang/terraform-best-practices

https://github.com/bregman-arie/devops-exercises/blob/master/topics/terraform/README.md

- Also in https://github.com/bregman-arie/devops-exercises/blob/master/topics/aws/README.md some solutions include Terraform

https://github.com/MichaelCade/90DaysOfDevOps#learn-infrastructure-as-code

https://medium.com/devops-mojo/terraform-best-practices-top-best-practices-for-terraform-configuration-style-formatting-structure-66b8d938f00c

Configuring a Highly Available Infrastructure in AWS using Terraform - https://faun.pub/configuring-a-highly-available-infrastructure-in-aws-using-terraform-2fc9dbb519b6

Comprehensive Guide to Terraform series by Yevgeniy Brikman:

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

Module templates:

- https://github.com/aws-ia/terraform-repo-template
- https://github.com/dustindortch/template-terraform

Modules

- https://github.com/terraform-aws-modules
- https://github.com/dustindortch/terraform-aws-account
- https://github.com/dustindortch/terraform-aws-idp-tfe-oidc
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

## Lambda

- https://github.com/dustindortch/terraform-docker-aws-lambda
- https://github.com/dustindortch/terraform-aws-lambda-container

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
