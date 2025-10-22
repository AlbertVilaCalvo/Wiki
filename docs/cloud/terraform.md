---
title: Terraform
---

[www.terraform.io](https://www.terraform.io/)

https://developer.hashicorp.com/terraform

Forum - https://discuss.hashicorp.com/c/terraform-core/27

Copilot instructions:

- https://github.com/github/awesome-copilot/blob/main/instructions/terraform.instructions.md
- https://github.com/github/awesome-copilot/blob/main/instructions/generate-modern-terraform-code-for-azure.instructions.md

Reddit - https://www.reddit.com/r/Terraform/

https://github.com/topics/terraform

https://github.com/topics/terraform-module

Cheatsheet: https://cheat-sheets.nicwortel.nl/terraform-cheat-sheet.pdf

> Terraform is a binary that translates the contents of your configuration files into API calls to cloud providers. (Page 19 of Terraform: Up and Running)

> Terraform's primary function is to create, modify, and destroy infrastructure resources to match the desired state described in a Terraform configuration. [source](https://developer.hashicorp.com/terraform/cli/run)

## Characteristics

- Cross platform: works on Windows, macOS and Linux.
- Multi-cloud or cloud-agnostic: supports multiple cloud providers like AWS, GCP, Azure etc.
- Declarative: you describe the infrastructure you want, and Terraform figures out how to create it. The code represents the state of your infrastructure.
- Domain Specific Language: concise and uniform code. However, it can be more difficult to do some things like for loops compared to general purpose languages like TypeScript.
- Idempotent: we can execute it multiple times and we get the same result.
- Agentless: no need to install any software on the servers we manage.
- Masterless: no need to have a master server running that stores the state and distributes updates to the managed servers.
- Immutable (for some resources): when we need to modify a resource, instead of updating it, it creates a new one.

## `.gitignore`

https://github.com/github/gitignore/blob/main/Terraform.gitignore → Uncomment line 33 to exclude the `tfplan` plan file.

https://developer.hashicorp.com/terraform/language/style#gitignore

We should ignore:

- The `.terraform` directory, since it contains binary files we don't want to store in Git. Also, the binaries are OS-specific and they depend on the CPU architecture ([see releases](https://releases.hashicorp.com/terraform/1.9.1/)), so a specific version needs to be downloaded on each machine.
- State files (`*.tfstate`), since state contains secrets and passwords. Another reason is that if we deploy our infrastructure multiple times (dev, test, staging, prod), we need a different state file for each, so it makes sense to store them outside of the repository, decoupled from our code.
- Any `*.tfvars` files that contain sensitive information.

We should commit:

- `.terraform.lock.hcl`: the dependency lock file guarantees that the next time we do `terraform init` in another machine we download the same versions of the providers and modules.

## `.terraform.lock.hcl`

Is a dependency lock file that ensures that multiple people use the same versions of the providers and modules on different machines and CI/CD pipelines. It has the same function than the `package-lock.json`.

It contains the exact versions (eg `version = "2.5.1"`) of the providers and modules to use, and the hashes to verify the integrity.

Is created automatically by `init` if it doesn't exist. And if it exists, it's used by `init` to install the same versions.

## CLI

:::tip
Don't use the [official shell tab-completion](https://developer.hashicorp.com/terraform/cli/commands#shell-tab-completion) (installed with `terraform -install-autocomplete`), because it only adds tab-completion of commands (eg `apply`), but not options (eg `-auto-approve`).

Instead, use the [Oh My Zsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform), which autocompletes the options after typing just `-` + tab, showing a description of each argument too.

Note that there's also an [OpenTofu plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/opentofu).
:::

Workflow: `init` → `plan` → `apply` → `destroy`

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
- Creates the hidden `.terraform` directory, which contains cached providers plugins and modules.
  - You don't commit the `.terraform` directory in version control. This makes sense since providers are binaries, which we don't put in version control, and they are OS-specific, ie you get a different binary on a x86 vs an ARM processor.
- Downloads provider plugins and modules.
  - If the dependency lock file `.terraform.lock.hcl` exists, it downloads the versions specified there. Otherwise, it downloads the versions that match the constraints and then creates the `.terraform.lock.hcl` file.
- Creates the dependency lock file `.terraform.lock.hcl` if it doesn't exist yet. This file which ensures that every person running `terraform init` gets the same versions of the provider and modules, like `package-lock.json` does.

Is idempotent: it is safe to call it multiple times, and will have no effect if no changes are required. Thus, you can call it any time.

Since the `.terraform` directory is not checked into version control, you run `init` when you checkout a git repository, or in the CI/CD pipeline before running the other commands.

You need to run it again when you add, remove or change versions of providers or modules, and when you change the state backend.

To upgrade provider versions use `terraform init -upgrade`. It picks the latest version that meets the version constraints set in the code.

### `plan`

- Doc: https://developer.hashicorp.com/terraform/cli/commands/plan
- https://developer.hashicorp.com/terraform/cli/run#planning
- https://developer.hashicorp.com/terraform/tutorials/cli/plan

Does a **state [refresh](https://developer.hashicorp.com/terraform/cli/commands/refresh)**, that is, it checks the actual infrastructure resources using providers (which call cloud APIs), and compares them with the current configuration code, to get the difference between the current and desired state. Once it has the difference, it presents a description (plan) of the changes necessary to achieve the desired state. It does not perform any actual changes to real world infrastructure.

Actions are colored (green, red, yellow) and use a symbol:

- `+` Create
- `-` Destroy
- `~` Update
- `-/+` Re-create or replace (destroy and then create)
  - Be careful: you can loose data!
  - The destroy operation can fail. For example, if we try to re-create an S3 bucket that is not empty.

You can optionally save the plan to a file with `terraform plan -out=tfplan`, and pass it to `apply` later. The file is not human-readable, but you can use the [`show` command](https://developer.hashicorp.com/terraform/cli/commands/show) (`terraform show tfplan`) to inspect the plan.

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

Destroys all the resources. You do this seldomly in production, but frequently in a dev environment.

:::danger
Be very careful when running `terraform destroy -auto-approve`. Make sure you are at the right directory! And only do it while developing.
:::

It's an alias for `terraform apply -destroy`. You can also run `terraform plan -destroy` to show the proposed destroy changes without executing them, and then pass the destroy plan to `apply`.

See the [Destroy planning mode](https://developer.hashicorp.com/terraform/cli/commands/plan#planning-modes).

:::tip
Run `destroy` frequently while developing.

While developing some new infrastructure, instead of -or in addition to- doing incremental updates (eg create a VPC → `apply` → add subnets → `apply` → add security groups → `apply`...), it's a good practice to always do a `destroy` and then an `apply` after each update, re-creating the whole infrastructure from scratch.

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

Checks syntax errors.

Requires a successful run of `terraform init` (i.e. local installation of all providers and modules) to function.

Gotcha: sometimes a single syntax error can generate multiple errors.

### `graph`

https://developer.hashicorp.com/terraform/cli/commands/graph

Produces the Directed Acyclic Graph of resources, to see the objects dependencies.

If we run `terraform graph` it outputs the dependency graph as text, in the [DOT](<https://en.wikipedia.org/wiki/DOT_(graph_description_language)>) language. Use https://dreampuf.github.io/GraphvizOnline to visualitze the graph.

To create the graph image locally, install [Graphviz](https://graphviz.org) (use [Homebrew](https://formulae.brew.sh/formula/graphviz)) and run:

```shell
terraform graph -type=plan | dot -Tpng > graph.png
```

We can pass a plan file:

```shell
terraform graph -plan=tfplan | dot -Tpng > graph.png
```

### `output`

https://developer.hashicorp.com/terraform/cli/commands/output

```shell
terraform output -raw ec2_public_ip
```

If the output is a command, eg:

```hcl
output "ssh_connect" {
  value = "ssh -i ec2_rsa ec2-user@${aws_instance.ec2.public_ip}"
}
```

We can execute it with backticks:

```shell
`terraform output -raw ssh_connect`
```

## HCL

https://github.com/hashicorp/hcl

### Files

Usually you have 3 files:

```
main.tf
variables.tf
outputs.tf
```

### Blocks

https://developer.hashicorp.com/terraform/language/syntax/configuration

Everything is a block. Nothing can exist outside of a block.

A block has a **type** or keyword (`terraform`, `resource`, `variable`...) and optionally some **labels**, followed by curly braces, which delimit the body. Inside the curly braces (the body) we have arguments and nested blocks. (The [HCL spec](https://github.com/hashicorp/hcl/blob/main/hclsyntax/spec.md) uses 'attribute' instead of 'argument' [source](https://developer.hashicorp.com/terraform/language/syntax/configuration#arguments).) Each **argument** has a name or key and a value. The value comes from an **expression**: a string literal, a boolean, a number, a variable, a function in HCL, a reference to an attribute of a resource or a data source, or a combination of them. [See documentation](https://developer.hashicorp.com/terraform/language#about-the-terraform-language)

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

Argument names, block type names, labels etc. are identifiers. An identifier can contain letters, digits, `_` and `-`. However, the first character can only be a letter. [source](https://developer.hashicorp.com/terraform/language/syntax/configuration#identifiers)

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

https://developer.hashicorp.com/terraform/language/terraform

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

Note that you can't reference any input variable inside the `terraform` block ([source](https://developer.hashicorp.com/terraform/language/terraform#specification)):

> You can only use constant values in the `terraform` block. Arguments in the `terraform` block cannot refer to named objects, such as resources and input variables. Additionally, you cannot use built-in Terraform language functions in the block.

However, you can have multiple `terraform` blocks, which helps overcoming this limitation, since you can create a file on the fly (using HereDoc for example) that contains an extra `terraform` block, in which you set the values.

### `provider`

https://developer.hashicorp.com/terraform/language/providers

Providers are what we use to interact with cloud vendors. It provides implementations of resources and data sources. Without providers, Terraform can't manage any kind of infrastructure.

The `provider` block is **optional** and allows us to specify additional configuration.

```hcl
terraform {
  required_providers {
    # This name (aws) can be anything, but the convention is to be the same than the source.
    # Is the name used in the provider block below.
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
```

We can have multiple instances of the `provider` block. For example, if we want to deploy resources in two different AWS regions we need two instances of the provider - see the [resource `provider`](#resource-provider) meta-argument.

### `resource`

https://developer.hashicorp.com/terraform/language/resources

What we create and manage. The heart of Terraform and the reason why it exists. Supports [CRUD operations](https://developer.hashicorp.com/terraform/plugin/framework/resources).

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

> By default, Terraform interprets the initial word in the resource type name (separated by underscores) as the local name of a provider, and uses that provider's default configuration. [source](https://developer.hashicorp.com/terraform/language/meta-arguments/resource-provider)

> By convention, resource type names start with their provider's preferred local name. [source](https://developer.hashicorp.com/terraform/language/resources/syntax#providers)

:::

### `data` source

https://developer.hashicorp.com/terraform/language/data-sources

Something that exists outside of our Terraform code that we want to get properties from, to
pass them to our resources. A way to query the cloud provider's APIs for data.

A data source is **read only**, whereas resources support CRUD operations.

### `variable`

https://developer.hashicorp.com/terraform/language/values/variables

An input or parameter. Variables make the code more reusable by avoiding to hardcode values.

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

Don't set a default value for sensitive values or things that need to be unique globally (like an S3 bucket).

To set a variable, you have these options (_the latest ones will take precedence_):

- If we don't pass any value, it uses the default value (if available).
- Use an environment variable named `TF_VAR_` + the variable name, eg `TF_VAR_aws_region`.
  - In Unix use `export TF_VAR_aws_region=us-east-1`.
- Use a `terraform.tfvars`, `terraform.tfvars.json`, `*.auto.tfvars` or `*.auto.tfvars.json` file.
  - Files are processed in this order, alphabetically. Multiple files can define the same variable, and the latest will take precedence.
  - To use any other file name, use the `-var-file` CLI option, eg: `terraform plan -var-file="prod.tfvars"`.
  - Do not store sensitive values in `tfvars` files that are checked in version control.
- Use the CLI options `-var 'aws_region=us-east-1'` or `-var-file="prod.tfvars"`. [see docs](https://developer.hashicorp.com/terraform/cli/commands/plan#input-variables-on-the-command-line)
- If no value was given with the previous options, you'll be prompted to supply the value interactively in the CLI.
  - To avoid the interactive prompt to wait for an input in CI/CD pipelines, do `export TF_INPUT=0`. Otherwise, it will wait indefinitely until the pipeline times out! If we set `TF_INPUT=0` it throws an error if a variable is missing.

If we run `terraform plan` and we save the plan into a file, all the variables will be saved in the file and will be used when doing `apply`. But if we don't save the plan into a file, when we run `apply`, since it runs `plan` again, we'll need to supply the variables again somehow.

#### `sensitive`

To mask or avoid printing a sensitive value:

```hcl
variable "db_password" {
  description = "DB Password"
  type        = string
  sensitive   = true
}
```

#### `nullable`

By default is `true`, so `null` is accepted as a value.

```hcl
variable "db_password" {
  description = "DB Password"
  type        = string
  nullable    = false
}
```

In a module, if `nullable` is true (the default), when passing `null` Terraform doesn't use the default value. But when is false, Terraform uses the default value when a module input argument is `null`.

#### `validation`

https://developer.hashicorp.com/terraform/language/expressions/custom-conditions

```hcl
variable "min_size" {
  type = number
  validation {
    condition     = var.min_size >= 0
    error_message = "The min_size must be greater or equal than zero."
  }
}
```

### `output`

https://developer.hashicorp.com/terraform/language/values/outputs

The oposite of an input variable. It returns data (the `value`) when we run `apply` or [`output`](https://developer.hashicorp.com/terraform/cli/commands/output).

```hcl
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}
```

We can set the argument `sensitive` to true to avoid displaying it. In this case, we can use `terraform output my_var` to display it. Note that it is still stored in state, see [Sensitive Data in State](https://developer.hashicorp.com/terraform/language/state/sensitive-data).

If the output references a `sensitive` input variable or resource, you need to add `sensitive = true` to indicate that you are intentionally outputting a secret, or use the [`nonsensitive` function](https://developer.hashicorp.com/terraform/language/functions/nonsensitive) ([see example](https://stackoverflow.com/a/69001111/4034572)), otherwise you get this error:

```
│ Error: Output refers to sensitive values
│
│ on main.tf line 23:
│ 23: output "password" {
│
│ To reduce the risk of accidentally exporting sensitive data that was intended to be only internal, Terraform requires that any root module output containing sensitive data be explicitly
│ marked as sensitive, to confirm your intent.
│
│ If you do intend to export this data, annotate the output value as sensitive by adding the following argument:
│ sensitive = true
```

### `locals`

https://developer.hashicorp.com/terraform/language/block/locals

https://developer.hashicorp.com/terraform/language/values/locals

Since all code in HCL must be inside a block, we use the `locals` block to define values, manipulate data etc. To avoid repetition, they allow reusing an expression within a module.

### `module`

https://developer.hashicorp.com/terraform/language/block/module

https://developer.hashicorp.com/terraform/language/modules

Other code written in HCL that's reusable and we call from our code. A library.

[See Modules below](#modules)

## Meta-arguments

Arguments that are built-in into the language, as opposed to arguments defined by the providers. They are available to every resource, data source and module - nothing else.

### resource `provider`

- https://developer.hashicorp.com/terraform/language/meta-arguments/resource-provider
- https://developer.hashicorp.com/terraform/language/meta-arguments/module-providers

Allows us to distinguish multiple instances of a provider.

For example, to deploy to multiple AWS regions we need multiple `provider "aws"` instances:

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

# On a module we use a map
module "example" {
  providers = {
    aws = aws.california
  }
}
```

We can also use it when doing VPC Peering or Transit Gateway and the VPCs are in different accounts, and we need to get information from multiple AWS accounts. You should rarely use multiple accounts though; try to use a single account.

Important:

- Do not specify an `alias` for the first instance of the provider. Only do it for the second or third. This way we avoid adding `provider` in many places.
- The default instance should be the one that is used the most. The instance with an `alias` should be used for a few resources only.

### `lifecycle`

https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle

It's a nested block.

For example, when we want to change the configuration of an EC2 virtual machine (eg change the AMI), by default Terraform is going to first kill the existing VM, and then create a new one, resulting in some downtime. We can avoid this by using `create_before_destroy`, which tells Terraform to create a new VM before we kill the existing one.

### `depends_on`

https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on

:::warning
Should be used rarely. Ask yourself if you really need it.
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

## State

- https://developer.hashicorp.com/terraform/language/state
- https://developer.hashicorp.com/terraform/cli/state
- https://developer.hashicorp.com/terraform/cli/commands/state

https://www.gruntwork.io/blog/how-to-manage-terraform-state

Primarily, the state binds remote objects with resources declared in our configuration files.

State is stored in a JSON file:

```json title="terraform.tfstate"
{
  "version": 4, // Version of the Terraform state schema
  "terraform_version": "1.9.5", // Version of Terraform that last modified the state
  "serial": 79, // Version of this state file. Incremented every time we update the state
  "lineage": "8e16b7bb-3593-c363-6bf9-bde5a11ad86a",
  "outputs": {
    "bucket_name": {
      "value": "session2-bucket-xu0th",
      "type": "string"
    }
  },
  "resources": [],
  "check_results": null
}
```

It contains the Directed Acyclic Graph of resources; see the `"dependencies"` array.

State contains sensitive values like passwords and private keys, so it needs to be stored securely. See [Sensitive Data in State](https://developer.hashicorp.com/terraform/language/state/sensitive-data). This is one reason why we don't commit the state in our Git repositories.

Another reason to not commit the state into version control is that we usually want to deploy multiple instances of our infrastructure (dev, test, staging, prod). Each environment requires it's own state file, which can live outside of our repo, decoupled from our code.

### Why do we need a state file

Why do we need a state file (`terraform.tfstate`) if we already have the infrastructure in the cloud and we can query it? For various reasons:

- Terraform doesn't manage _all_ the resources in a cloud (AWS, Azure...) account, but only a subset of it. You can have many more resources, which may also be managed by other Terraform projects, or created manually or using the API. The state file records which resources are managed by a Terraform projects.
- The state file maps the resources in your configuration to the resources in the cloud, for example, by recording their IDs.
- State allows Terraform to detect drift (changes manually done directly to the cloud resources). This cannot be detected by comparing the configuration files with the cloud resources, because there's no way to tell if you want to change a resource or instead is drift; you need a three-way comparison.
- By having the information of the resources cached locally, Terraform doesn't need to query the cloud provider to obtain the information every time it needs it, which would be time consuming and would probably by rate-limited due to making hundreds of API calls.
- Not all resource information is defined in your Terraform code. Some information, for example the IDs of EC2 instances, is generated by the cloud providers after creating the resources, so you need to record it outside of the configuration. In addition, it's not always possible to recover all the information using the cloud APIs after creating a resource, so you need to record it at creation time.
- State allows you to import existing resources from the cloud.
- State records dependencies between objects. This is necessary for example when deleting resources, since the configuration doesn't have that resources anymore, but Terraform needs to know _what_ resources needs to delete, and _in which order_.

See more reasons at:

Bootstrapping Microservices section 7.8.7, page 217.

Purpose of Terraform State - https://developer.hashicorp.com/terraform/language/state/purpose

Why a state file is required? - https://stackoverflow.com/questions/74420611/terraform-why-a-state-file-is-required

Why is it required to persist terraform state file remotely? - https://stackoverflow.com/questions/54855030/why-is-it-required-to-persist-terraform-state-file-remotely

> If you lose the state you will end up with orphaned resources that are not being managed by Terraform.

### State backend (storage)

https://developer.hashicorp.com/terraform/language/settings/backends/configuration

By default the state file `terraform.tfstate` is stored locally using the [local backend](https://developer.hashicorp.com/terraform/language/settings/backends/local). This is OK for development, but not for anything serious since:

- Is not backed up, so we can loose it. This is really bad since our state is crucial to use Terraform.
- Is not accessible to others, so we can't collaborate with other people.

It's better to store the state remotely with a state backend like S3 or HCP Terraform.

Usually you need to install a provider to talk to a cloud provider like AWS or Azure using their APIs. However, Terraform knows how to use (for example) S3 or Google Cloud Storage APIs for the purpose of storing state, without installing any provider. Note that we can deploy resources to Azure (using the Azure provider) and use S3 for the state backend (without a provider) at the same time.

### Migrate backend state

- https://developer.hashicorp.com/terraform/tutorials/cloud/migrate-remote-s3-backend-hcp-terraform

If we change the backend (eg from local to S3) we need to run `terraform init`. Terraform will ask us to move any existing local state to the new backend, and we need to answer 'yes':

```
$ terraform init

Initializing the backend...
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the
  newly configured "s3" backend. No existing state was found in the newly
  configured "s3" backend. Do you want to copy this state to the new "s3"
  backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.
```

This creates a new state file object in the S3 bucket.

:::info
Often backends don't allow you to migrate state straight from another backend (eg S3 → GCS), so you need to migrate the existing remote state to local first, and then to the new backend (S3 → local → GCS).
:::

To move a remote state back to local use `terraform init -migrate-state`, which reconfigures the backend and attempts to migrate any existing state, prompting for confirmation (answer 'yes'). This creates a local `terraform.tfstate` file. There's also the `-force-copy` option that suppresses these prompts and answers "yes" to the migration questions.

```
$ terraform init -migrate-state

Terraform has detected you're unconfiguring your previously set "s3" backend.
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "s3" backend to the
  newly configured "local" backend. No existing state was found in the newly
  configured "local" backend. Do you want to copy this state to the new "local"
  backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes

Successfully unset the backend "s3". Terraform will now operate locally.
```

### State locking

https://developer.hashicorp.com/terraform/language/state/locking

To prevent concurrent updates to the state, Terraform supports locking. When the state is locked, Terraform won't run. When the state is stored locally, Terraform creates a lock file `.terraform.tfstate.lock.info` so that two processes don't update the state concurrently - although the chances that this happens are very low. **Remote backends really need to support locking**, otherwise the state file can be corrupted or have conflicts due to race conditions. Not all remote backends support locking. HCP Terraform is a good choice.

### Modify state

You should never manually edit the state file. Instead, use the [`state`](https://developer.hashicorp.com/terraform/cli/commands/state) command subcommands:

- `terraform state -help`: list the `state` subcommands.
- [`terraform state list`](https://developer.hashicorp.com/terraform/cli/commands/state/list): list all the resources.
- [`terraform state show <resource_id>`](https://developer.hashicorp.com/terraform/cli/commands/state/show): show attributes of a resource.
- [`terraform state mv <old_id> <new_id>`](https://developer.hashicorp.com/terraform/cli/commands/state/mv): to change the resource identifier.
  - When we change a resource name, Terraform deletes the existing resource and creates a new one. To avoid this, we can use `mv` by telling Terraform that is the same resource.
  - Required for resources that have a configuration or data that needs to be preserved.
  - Alternatively, we can use the [`moved` block](https://developer.hashicorp.com/terraform/language/moved) to do this too.
- [`terraform state rm <resource_id>`](https://developer.hashicorp.com/terraform/cli/commands/state/rm): removes a resource from the state only; it doesn't delete the actual resource in the cloud.
  - Used when we extract a part of our Terraform code to a different Git repository. Or when we want to deploy a new instance of a resource, but at the same time keep the old one to investigate (forensics) or check something on it.
  - Alternatively, we can use the [`removed` block](https://developer.hashicorp.com/terraform/language/resources/syntax#removing-resources) to do this too.

Use these commands to address some state drift. For example, if a security vulnerability was fixed outside of Terraform, so that Terraform doesn't try to undo the changes.

When we run `terraform state list`, if the resource has square brackets (eg `module.bucket.aws_s3_bucket.this[0]`), it means that the module is using `count` internally, and may create multiple instances (including zero) of the resource, so an index is required to specify which one is it:

```hcl
resource "aws_s3_bucket" "this" {
  count = local.create_bucket ? 1 : 0
}
```

### Import resources into state

We can use [`terraform import`](https://developer.hashicorp.com/terraform/cli/commands/import) to grab resources that have been deployed and add them into the state. The resources can be things that already existed before we started using Terraform, for example.

Some resources can't be imported, which should be detailed in the provider documentation for that resource.

Resources need to be imported one a time, but we can create a script to import many.

The command doesn't write any HCL, so we are responsible for updating the code.

`terraform import` workflow:

- We have some resources that already exist in the infrastructure, but not in our state.
- We run `terraform import` to gather the resources, and commit them into the state.
  - The command depends on the resource and the provider. For example, to import an EC2 instance we use `terraform import aws_instance.web i-12345678` according to [the docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#import). And to import a VPC we do `terraform import aws_vpc.web_vpc vpc-0eaee8c907067a57be`.
  - Once the resources are imported, the state is aware of them, but we still don't have the code for them.
- We write the code that matches the state.
  - Most likely this code is not perfect, except for very simple resources, so we'll need to adjust it.
- Run `terraform plan` and if there are changes, update the code iteratively until `terraform plan` gives no changes.
  - Most likely, the first time we run `plan` it will say that we have some delta/gap, ie some changes to apply to the infrastructure. But we don't want to apply this changes. Instead, we need to revise the code we've written to incorporate the gap, and run `plan` again. We do this iteratively until there's no changes.
- Finally, when `terraform plan` doesn't list any change, run `terraform apply`.
  - Even though there are no changes, this updates the state file (eg it increments the "serial" number).

Because executions of the `import` command are not recorded in version control, there's a new [`import` block](https://developer.hashicorp.com/terraform/language/import) which we can write and commit in version control. It can also generate the HCL code using `terraform plan`, although you'll need to edit it because it can have hardcoded values.

### Replace a resource

- https://developer.hashicorp.com/terraform/tutorials/state/state-cli#replace-a-resource-with-cli
- https://developer.hashicorp.com/terraform/cli/commands/plan#replace-address

```shell
terraform plan -replace=random_string.s3_bucket_suffix
terraform apply -replace=random_string.s3_bucket_suffix
```

## Providers

https://developer.hashicorp.com/terraform/language/providers

Providers are plugins of the Terraform core. They talk to cloud providers using their APIs. They define the resources and data sources available. Are written in Go.

Data sources are read only, whereas the resources support [CRUD operations](https://developer.hashicorp.com/terraform/plugin/framework/resources).

When a provider implements a resource, it needs to implement a set of functions in Go (Create, Read, Update, Delete...) - [see docs](https://developer.hashicorp.com/terraform/plugin/framework/getting-started/code-walkthrough#resource).

Usually providers are pulled from the [Terraform Registry](https://registry.terraform.io/), where you have the documentation and versions available. There are other provider registries. At this registry there are 4 provider tiers ([source](https://developer.hashicorp.com/terraform/docs/partnerships#terraform-provider-integrations)):

- Official: owned and maintained by HashiCorp. They use the `hashicorp` namespace.
- Partner: owned and maintained by third-party companies against their own APIs. They must participate in the [HashiCorp Technology Partner Program](https://www.hashicorp.com/partners/become-a-partner#technology).
- Community: published by individuals or organizations.
- Archived: deprecated or no longer maintained, but still available so that your code can still function.

:::danger
Be careful with community providers. A provider can do anything with your authentication credentials! It can contain malicious code and send information (for example, about your infrastructure) to anyone.
:::

We can use multiple providers together. This is an advantage of Terraform over other tools like CloudFormation, since we can define (for example) AWS resources using the hashicorp/aws provider and then deploy third party tools and software onto it using other providers from Red Hat or Palo Alto Networks. In addition, we can combine AWS services with other services running outside AWS like CloudFlare or Datadog in the same code.

It's not mandatory to specify the providers with `required_providers`, but it allows us to use version constraints. A provider `version` is optional; if omitted, it uses the latest one.

## Modules

https://developer.hashicorp.com/terraform/language/modules

https://developer.hashicorp.com/terraform/language/block/module

Reusable configuration. Like a library or package in other languages. To create resources in a repeatable way.

A module is an opinionated collection of resources, which are tightly coupled and should be deployed together.

All Terraform code is a module. The main directory where you run `plan` and `apply` is the **root module**, which calls other modules, the child modules. A child module can also call its own nested child module.

We use variables to pass data into the module, and outputs to get data out from it.

We do not generally specify `provider` blocks within a module, we simply allow them to pass through from the root.

You need to run `terraform init` when you add a new module, remove a module, modify the `source` or `version` of a module, or checkout a repository that contains module. Doing `terraform init` downloads modules, caches them in the `.terraform/modules` directory and updates the dependency lock file (`.terraform.lock.hcl`) if needed.

**Providers extend Terraform, and modules extend providers.**

> In Terraform, there are two forms of modularity, the provider (written in Go) and modules (written in HCL). [source](https://dustindortch.com/2024/03/27/terraform-best-pratices-defining-modules)

Advantages:

- Reusability: write infrastructure code once and use it multiple times across different projects or environments.
- Maintainability: update infrastructure in one place instead of many.
- Encapsulation: hide a lot of resource details and complexity inside a module and expose only a simple interface using variables and outputs.
- Standardization: organizations can enforce best practices and patterns by providing prebuilt modules (eg a secure VPC or a compliant S3 bucket).
- Organization: group related resources together logically (eg all VPC components).

When Should We Write Modules - https://dustindortch.com/2022/10/21/why-do-we-write-terraform-modules/

Terraform Best Practices: Defining Modules - https://dustindortch.com/2024/03/27/terraform-best-pratices-defining-modules

> Witnessing many learners of Terraform, there is a pattern where they create their first module and then go crazy writing modules for everything. Creating a module for an Azure Resource Group is one that takes things to an extreme.

> Modules for Complete Deployments. These should often be avoided, as well. Such a pattern goes a bit overboard on opinionation. The more opinionated a module is the lower the flexibility is.
> I have also created and watched others create a module that deploys an entire hub-and-spoke architecture. These sorts of modules do too much. Not only do they make the code less flexible, they also inflate the number of resources managed by the state. While deployment can be impressive, a failure can be equally impressive.

Terraform Module Best Practices: A Complete Guide - https://devopscube.com/terraform-module-best-practices/

https://www.gruntwork.io/blog/how-to-create-reusable-infrastructure-with-terraform-modules

> When creating a module, you should always prefer using separate resources. The advantage of using separate resources is that they can be added anywhere, whereas an inline block can only be added within the module that creates a resource. So using solely separate resources makes your module more flexible and configurable.

Google Cloud - Best practices for reusable modules - https://cloud.google.com/docs/terraform/best-practices/reusable-modules

### Source

Modules can live (`source`) locally, in a Git repository or a registry like https://registry.terraform.io/browse/modules.

```hcl
module "rds_read_replica" {
  source = "./modules/rds"
}
```

Note that only if the module comes from a registry we can specify a [`version` constraint](#version-constraints):

```hcl
# https://github.com/terraform-aws-modules/terraform-aws-eks
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"
}
```

If it comes from Git, we can use the `HEAD`, or use the `?ref=` query param to specify either a tag, a commit SHA or a branch:

```hcl
module "vpc" {
  source = "git::https://example.com/vpc.git" # HEAD
}
module "vpc" {
  source = "git::https://example.com/vpc.git?ref=v1.2.0"
}
module "vpc" {
  source = "git::https://example.com/vpc.git?ref=51d462976d84fdea54b47d80dcabbf680badcdb8"
}
module "vpc" {
  source = "git::https://example.com/vpc.git?ref=someBranch"
}
```

Using Git sources allows you to consume a module directly from the source repository, without publishing it to a registry. This can be useful if we need to use a version that the maintainer hasn't published to the registry yet. It's also a way to have private modules without using a private registry, since it works with private Git repos (with SSH or HTTPS + tokens).

### Module structure

https://developer.hashicorp.com/terraform/language/modules/develop/structure

Usually you have 3 files:

```
main.tf
variables.tf
outputs.tf
```

We can also have an `example.tfvars` file.

### Module example

```
modules/
├── ec2_instance/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── main.tf
```

Child module:

```hcl title="modules/ec2_instance/variables.tf"
variable "instance_name" {
  type        = string
  description = "Name of the EC2 instance"
}

variable "instance_type" {
  type        = string
  default     = "t2.micro"
  description = "EC2 instance type"
}
```

```hcl title="modules/ec2_instance/main.tf"
resource "aws_instance" "this" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux (note that is region-specific)
  instance_type = var.instance_type
  tags = {
    Name = var.instance_name
  }
}
```

```hcl title="modules/ec2_instance/outputs.tf"
output "instance_id" {
  value = aws_instance.this.id
}

output "public_ip" {
  value = aws_instance.this.public_ip
}
```

Root module (where you run `terraform plan` etc.):

```hcl title="main.tf"
provider "aws" {
  region = "us-east-1"
}

module "web_server" {
  source        = "./modules/ec2_instance"
  instance_name = "web-server"
  instance_type = "t2.xlarge"
}

output "web_server_public_ip" {
  value = module.web_server.public_ip
}
```

### Publish a module at the registry

The repository needs to be hosted in GitHub. The repository name needs to follow this pattern: `terraform-<provider>-<name>`, for example `terraform-aws-ec2`. The `<provider>` is the main provider that the module uses in case that there is more than one.

## Version constraints

:::tip
It's recommended to pin modules to a specific major and minor version, and to set a minimum required version of the Terraform binary, see https://developer.hashicorp.com/terraform/language/style#version-pinning

From https://cloud.google.com/docs/terraform/best-practices/root-modules#minor-provider-versions:

> In root modules, declare each provider and pin to a minor version (eg `version = "~> 4.0.0"`). This allows automatic upgrade to new patch releases while still keeping a solid target. For consistency, name the versions file `versions.tf`.

:::

https://developer.hashicorp.com/terraform/language/expressions/version-constraints

https://developer.hashicorp.com/terraform/language/providers/requirements#version-constraints

Tutorial - Lock and Upgrade Provider Versions - https://developer.hashicorp.com/terraform/tutorials/configuration-language/provider-versioning

```hcl
terraform {
  required_version = "~> 1.7" # Uses 1.9.5
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Uses 5.65.0
    }
  }
}
```

Examples:

- `= 2.0.0` or `2.0.0`: exactly 2.0.0. Is the default when there's no operator
- `!= 2.0.0`: exclude exactly 2.0.0. Use it when there's a bug or issue with some specific version
- `> 1.2.0`: 1.2.1 or 1.3, but not 1.2.0
- `>= 1.2.0`
- `>= 1.2.0, < 2.0.0"`
- Pessimistic operator: allows only the _rightmost_ version component to increment
  - `~> 1.2.0`: allows 1.2.0 and 1.2.1 but not 1.3
  - `~> 1.2`: allows 1.2 and 1.3 but not 2.0. Equivalent to `>= 1.2.0, < 2.0.0"`

For `module`s we can only use version constraints when they are `source`d from a registry, but not when locally or from a Git repository.

To upgrade provider versions use `terraform init -upgrade`. It picks the latest version that meets the version constraints set in the code.

If we don't specify a `version` it uses the latest one.

## Templates

- https://github.com/aws-ia/terraform-repo-template
- https://github.com/dustindortch/template-terraform

## Multiple environments

How to manage multiple environments with Terraform (Yevgeniy Brikman) - https://www.gruntwork.io/blog/how-to-manage-multiple-environments-with-terraform ([Old URL](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-32c7bc5d692))

1. [Using workspaces](https://www.gruntwork.io/blog/how-to-manage-multiple-environments-with-terraform-using-workspaces) ([Old URL](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-workspaces-98680d89a03e))
2. [Using branches](https://www.gruntwork.io/blog/how-to-manage-multiple-environments-with-terraform-using-branches) ([Old URL](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-branches-875d1a2ee647))
3. [Using Terragrunt](https://www.gruntwork.io/blog/how-to-manage-multiple-environments-with-terraform-using-terragrunt) ([Old URL](https://blog.gruntwork.io/how-to-manage-multiple-environments-with-terraform-using-terragrunt-2c3e32fc60a8))

https://dustindortch.com/2024/03/11/github-actions-release-flow/

> There are a number of practices that have been in place within the community, some of which I will proclaim are bad. The practice described in “Terraform Up and Running” whereby repositories hold subdirectories for each deployment...

> Terraform accommodates for differences with the use of variables. Instead of hardcoding differences, implement variables that allow for inputs that vary based on the requirements.

From https://www.fundamentals-of-devops.com/resources/2025/01/28/how-to-manage-state-and-environments-with-opentofu/#how-to-manage-multiple-environments:

|                                         | Workspaces | Branches | Terragrunt |
| --------------------------------------- | :--------: | :------: | :--------: |
| Minimize code duplication               |   ■■■■■    |  □□□□□   |   ■■■■□    |
| See and navigate environments           |   □□□□□    |  ■■■□□   |   ■■■■■    |
| Different settings in each environment  |   ■■■■■    |  ■■■■□   |   ■■■■■    |
| Different backends for each environment |   □□□□□    |  ■■■■□   |   ■■■■■    |
| Different versions in each environment  |   □□□□□    |  ■■□□□   |   ■■■■■    |
| Share data between modules              |   ■■□□□    |  ■■□□□   |   ■■■■■    |
| Work with multiple modules concurrently |   □□□□□    |  □□□□□   |   ■■■■■    |
| No extra tooling to learn or use        |   ■■■■■    |  ■■■■■   |   □□□□□    |

https://cloud.google.com/docs/terraform/best-practices/root-modules#separate-directories

> Use separate directories for each application
>
> To manage applications and projects independently of each other, put resources for each application and project in their own Terraform directories. A service might represent a particular application or a common service such as shared networking. Nest all Terraform code for a particular service under one directory (including subdirectories).

https://cloud.google.com/docs/terraform/best-practices/root-modules#subdirectories

> When deploying services in Google Cloud, split the Terraform configuration for the service into two top-level directories: a `modules` directory that contains the actual configuration for the service, and an `environments` directory that contains the root configurations for each environment.

```
-- SERVICE-DIRECTORY/
   -- OWNERS
   -- modules/
      -- <service-name>/
         -- main.tf
         -- variables.tf
         -- outputs.tf
         -- provider.tf
         -- README
      -- ...other…
   -- environments/
      -- dev/
         -- backend.tf
         -- main.tf

      -- qa/
         -- backend.tf
         -- main.tf

      -- prod/
         -- backend.tf
         -- main.tf
```

https://cloud.google.com/docs/terraform/best-practices/root-modules#environment-directories

> To share code across environments, reference modules. Typically, this might be a service module that includes the base shared Terraform configuration for the service. In service modules, hard-code common inputs and only require environment-specific inputs as variables.
>
> Each environment directory must contain the following files:
>
> - A `backend.tf` file, declaring the Terraform backend state location (typically, Cloud Storage)
> - A `main.tf` file that instantiates the service module

https://cloud.google.com/docs/terraform/best-practices/root-modules#tfvars

> For root modules, provide variables by using a `.tfvars` variables file. For consistency, name variable files `terraform.tfvars`.

> Don't specify variables by using alternative var-files or `var='key=val'` command-line options. Command-line options are ephemeral and easy to forget. Using a default variables file is more predictable.

Don't do this: `terraform plan -var-file="prod.tfvars"`

## Workspaces

https://developer.hashicorp.com/terraform/language/state/workspaces

> Workspaces in the Terraform CLI refer to separate instances of state data inside the same Terraform working directory.

> Terraform relies on state to associate resources with real-world objects. When you run the same configuration multiple times with separate state data, Terraform can manage multiple sets of non-overlapping resources.

https://developer.hashicorp.com/terraform/cli/workspaces

> Every initialized working directory starts with one workspace named `default`.

```shell
terraform workspace new development
terraform workspace new staging
terraform workspace select development
terraform workspace list
terraform workspace delete staging
```

https://cloud.google.com/docs/terraform/best-practices/root-modules#environment-directories

> Having multiple [CLI workspaces](https://developer.hashicorp.com/terraform/language/state/workspaces) within an environment isn't recommended for the following reasons:
>
> - It can be difficult to inspect the configuration in each workspace.
> - Having a single shared backend for multiple workspaces isn't recommended because the shared backend becomes a single point of failure if it is used for environment separation.
> - While code reuse is possible, code becomes harder to read having to switch based on the current workspace variable (for example, `terraform.workspace == "foo" ? this : that`).

Don't do this: `instance_type = terraform.workspace == "production" ? "t3.large" : "t3.micro"`

https://www.gruntwork.io/blog/how-to-manage-multiple-environments-with-terraform-using-workspaces

## VSCode extension

https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform

In addition to the [Terraform extension](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform), there is also the [HCL syntax extension](https://marketplace.visualstudio.com/items?itemName=hashicorp.hcl), which adds syntax highlighting for HCL files. Installing this extension optional, because Terraform syntax highlighting is already provided by the Terraform extension, since the HCL syntax extension _"is a grammar only extension targeted to provide HCL syntax highlighting for files not already accounted for by a more specific product-focused extension"_.

To autoformat on save you need to modify the `settings.json` file (to open it do Cmd+Shift+P and select 'Preferences: Open User Settings (JSON)') as explained in https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform#formatting

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

**Pre-commit Git hook** - https://github.com/antonbabenko/pre-commit-terraform

Terraform tools review playlist - https://www.youtube.com/playlist?list=PLvz1V_9d3uivwNgADT_eB-wKEWOzOOQXy

Generate terraform files from existing infrastructure (reverse Terraform) - https://github.com/GoogleCloudPlatform/terraformer

Generate CloudFormation / Terraform / Troposphere templates from your existing AWS resources - https://github.com/iann0036/former2

Wrapper for Terraform that provides extra tools for working with multiple Terraform modules - https://github.com/gruntwork-io/terragrunt - https://terragrunt.gruntwork.io

Go library that makes it easier to write automated tests - https://github.com/gruntwork-io/terratest

Collection of useful Terraform utilities - https://github.com/gruntwork-io/terraform-aws-utilities - https://terratest.gruntwork.io

Detect compliance and security violations - https://github.com/tenable/terrascan - https://runterrascan.io

https://github.com/aquasecurity/trivy - https://trivy.dev/latest/tutorials/misconfiguration/terraform/

Security scanner for your Terraform code - https://github.com/aquasecurity/tfsec - https://github.com/actions/starter-workflows/blob/main/code-scanning/tfsec.yml

Linter - https://github.com/terraform-linters/tflint - https://github.com/terraform-linters/tflint-ruleset-aws

Checkov - Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov - Workshop https://github.com/PaloAltoNetworks/prisma-cloud-devsecops-workshop/blob/main/guide/DevSecOps-lab.md

https://www.brainboard.co

https://spacelift.io - IaC Orchestration Platform

### tfenv

Terraform version manager - https://github.com/tfutils/tfenv

List all installable versions:

```shell
tfenv list-remote
```

List installed versions and which version is used:

```shell
tfenv list
```

Install version:

```shell
tfenv install # Installs version in TFENV_TERRAFORM_VERSION or .terraform-version
tfenv install 1.9.5
tfenv install latest
```

Change version:

```shell
tfenv use 1.9.5
```

## Free up disk space

The aws provider (terraform-provider-aws_v5.67.0_x5) is 586 MB.

```shell
# See if there are files to delete
find . -type d -name ".terraform"
find . -type f -name "terraform-provider-aws_*"

# Delete .terraform directories
find . -type d -name ".terraform" -exec rm -rf {} +
```

## Best practices

https://developer.hashicorp.com/terraform/language/style

Dustin Dortch:

- Do not hardcode values: https://dustindortch.com/2024/02/08/terraform-best-practices-do-not-hard-code-values/
- Files: https://dustindortch.com/2024/02/12/terraform-best-practices-files/
- Versioning: https://dustindortch.com/2024/02/29/terraform-best-practices-versioning/
- Defining Modules: https://dustindortch.com/2024/03/27/terraform-best-pratices-defining-modules/
- Variables: https://dustindortch.com/2024/04/04/terraform-best-practices-variables/

https://www.terraform-best-practices.com

Google Cloud:

- General style and structure: https://cloud.google.com/docs/terraform/best-practices/general-style-structure
- Root modules: https://cloud.google.com/docs/terraform/best-practices/root-modules

> _All_ resources in a particular root configuration are refreshed every time Terraform is run. This can cause slow execution if too many resources are included in a single state. **A general rule: Don't include more than 100 resources (and ideally only a few dozen) in a single state.**

See [Working with huge Terraform states](https://medium.com/@alexott_en/working-with-huge-terraform-states-2cb493db5352).

Terraform Best Practices for AWS users - https://github.com/ozbillwang/terraform-best-practices

Terraform Module Best Practices: A Complete Guide - https://devopscube.com/terraform-module-best-practices/

https://medium.com/devops-mojo/terraform-best-practices-top-best-practices-for-terraform-configuration-style-formatting-structure-66b8d938f00c

https://towardsaws.com/terraform-secrets-every-senior-engineer-must-know-advanced-best-practices-a72179458dff

## Learn

Tutorials - https://developer.hashicorp.com/terraform/tutorials - https://developer.hashicorp.com/tutorials/library?product=terraform

File names conventions - https://developer.hashicorp.com/terraform/language/style#file-names

https://www.youtube.com/@AntonBabenkoLive

List of many courses - https://www.linkedin.com/posts/ann-afamefuna_devops-cloudengineers-cloudsecurity-activity-7200293109002342400-J_qn/

https://frontendmasters.com/courses/enterprise-devops/

https://github.com/bregman-arie/devops-exercises/blob/master/topics/terraform/README.md

- Also in https://github.com/bregman-arie/devops-exercises/blob/master/topics/aws/README.md some solutions include Terraform

https://github.com/MichaelCade/90DaysOfDevOps#learn-infrastructure-as-code

Configuring a Highly Available Infrastructure in AWS using Terraform - https://faun.pub/configuring-a-highly-available-infrastructure-in-aws-using-terraform-2fc9dbb519b6

Comprehensive Guide to Terraform series by Yevgeniy Brikman:

1. [Why we use Terraform and not Chef, Puppet, Ansible, Pulumi, or CloudFormation](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c)
2. [An Introduction to Terraform](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180)
3. [How to manage Terraform state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa)
4. [How to create reusable infrastructure with Terraform modules](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d)
5. [Terraform tips & tricks: loops, if-statements, and gotchas](https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9)
6. [How to use Terraform as a team](https://blog.gruntwork.io/how-to-use-terraform-as-a-team-251bc1104973)

https://medium.com/@itsnarayan/optimizing-aws-infrastructure-leveraging-terraform-for-low-coupling-and-high-cohesion-a5ae6049ab1e

33 labs - https://www.whizlabs.com/infrastructure-automation-with-terraform/

Host a static website locally using Simple Storage Service (S3) and Terraform with LocalStack - https://docs.localstack.cloud/tutorials/s3-static-website-terraform/

## CDK for Terraform

https://www.terraform.io/cdktf

It generates JSON files (`*.tf.json`).

Terraforming with TypeScript - https://radar.com/blog/terraforming-with-typescript

## VS CloudFormation

https://cloudonaut.io/cloudformation-vs-terraform

https://developer.hashicorp.com/terraform/intro/vs/cloudformation

We can use multiple providers together. This is an advantage of Terraform over other tools like CloudFormation, since we can define (for example) AWS resources using the hashicorp/aws provider and then deploy third party tools and software onto it using other providers from Red Hat or Palo Alto Networks. In addition, we can combine AWS services with other services running outside AWS like CloudFlare or Datadog in the same code.

## Terraform Associate Certification (003)

https://developer.hashicorp.com/certifications/infrastructure-automation

https://developer.hashicorp.com/terraform/tutorials/certification-003

https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials-003

Recorded Webinar "Preparing for the HashiCorp Certified: Terraform Associate (003) certification exam" - https://www.hashicorp.com/events/webinars/terraform-associate-exam-preparation

https://www.exampro.co/terraform

https://www.whizlabs.com/hashicorp-certified-terraform-associate/

https://www.coursera.org/learn/exam-prep-hashicorp-certified-terraform-associate-003 (Whizlabs)

https://www.udemy.com/course/terraform-associate-practice-exam

https://github.com/allister-grange/terraform-associate-guide-003

https://www.packtpub.com/en-es/product/hashicorp-terraform-associate-003-exam-guide-9781804618844

https://github.com/stacksimplify/hashicorp-certified-terraform-associate - https://www.udemy.com/course/hashicorp-certified-terraform-associate-step-by-step - https://terraformguru.com/terraform-certification-using-aws-cloud

## Internals

It uses a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) to represent resources - see https://github.com/hashicorp/terraform/tree/main/internal/dag and https://developer.hashicorp.com/terraform/internals/graph.

Uses the library https://github.com/zclconf/go-cty internally.
