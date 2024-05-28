---
title: IAM
---

# Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

https://github.com/topics/iam

**Security best practices in IAM** - https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html

:::tip
Enable [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)

See some use cases at [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

It can [generate policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html) - [see below](#generate-policy-based-on-cloudtrail-events)
:::

A vault for securely storing and accessing AWS credentials in development environments - https://github.com/99designs/aws-vault

Cloudsplaining is an AWS IAM Security Assessment tool that identifies violations of least privilege and generates a risk-prioritized report - https://github.com/salesforce/cloudsplaining

A tool for quickly evaluating IAM permissions in AWS - https://github.com/nccgroup/PMapper

Refining permissions in AWS using last accessed information - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html

AWS Vault - https://github.com/99designs/aws-vault - Stores IAM credentials in your operating system's secure keystore

IAM is a **global** service. Notice you cannot select any region at the top-right dropdown. Any user, group, role etc. can be used on all regions, all around the world.

## Summary

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.
- Principal: user, account, service, or other entity that is allowed or denied access to a resource. Can be ([source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#Principal_specifying)):
  - AWS account and root user
  - IAM roles
  - Role sessions
  - IAM users
  - Federated user sessions
  - AWS services
  - All principals

Nice summary - https://blog.awsfundamentals.com/aws-iam-roles-terms-concepts-and-examples

Cheatsheet - https://digitalcloud.training/aws-iam/

## User

By default users have no permissions, thus they can't do anything. You give them permissions using groups and policies.

Each user has a username (Account name), used to log in.

Authentication:

- Web console: username and password + (optionally) MFA.
- CLI & API: access key ID and secret access key. You can also have MFA too.
  - Only a user can have access keys (not a group, role or policy).
  - Best practice: use roles for applications that run on EC2 instances or lambda functions. See [Require workloads to use temporary credentials with IAM roles to access AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-workloads-use-roles)

### Service account

An IAM user for a service or application.

> IAM roles for service accounts provide the ability to manage credentials for your applications, similar to the way that Amazon EC2 instance profiles provide credentials to Amazon EC2 instances. [source](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)

## Group

A collection of users.

A way of organizing users and applying permissions to them through a policy.

Is not an identity, thus it cannot be used at the a `Principal` field of a policy. See https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html:

> You cannot identify a user group as a principal in a policy (such as a resource-based policy) because groups relate to permissions, not authentication, and principals are authenticated IAM entities.

## Role

A way to **delegate** permissions without using permanent credentials. Is an identity. Roles are assumed by users, applications and services (the trusted entities).

When you assume a role you loose any other permissions. Eg if you are an admin but you assume a role, you loose the admin permissions. Thus, the permissions assigned to a role need to include everything required to complete the task.

From https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam

- Is an AWS identity with permissions that determine what can and can't do.
- Can be assigned a policy for permissions.
- Users, applications and services can assume roles.
- Does not have long term credentials/passwords/access keys. Instead, if a user is assigned a role, access keys are created dynamically and provided to the user temporarily.
- Can be used to delegate access to users, applications or services that don't normally have access to your AWS resources.
- A user who assumes a role temporarily gives up his other own permissions and instead takes on the permissions of the role.
- Eg we can give an EC2 instance a IAM role to temporarily access a S3 bucket using an instance profile.
- Roles remove the need to modify a user's policy each time a change is required.

https://stackoverflow.com/questions/46199680/difference-between-iam-role-and-iam-user-in-aws

https://classroom.udacity.com/nanodegrees/nd0044/parts/8fc72c65-158a-429d-a08f-f25b8b66e99f/modules/769586dd-1c0b-4155-af83-853bc9fa7fdc/lessons/e21110af-9970-4f3c-b1ad-c8cc4f27df39/concepts/ee39a09f-e9c3-48db-93c7-d773f07bb6aa

> We recommend using IAM roles for human users and workloads that access your AWS resources so that they use temporary credentials (instead of IAM users) [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users)

> A role is an identity in AWS that doesn't have its own credentials (as a user does) [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)

### `sts:AssumeRole`

The API call used to assume a role.

On a trust policy the `Action` is `sts:AssumeRole`.

https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/assume-role.html

https://stackoverflow.com/questions/63241009/aws-sts-assume-role-in-one-command

### EC2 instance profile

A way to attach a role to an EC2 instance, for example to access other services like S3.

We need a trust policy to allow the EC2 instance to assume the role.

To create one:

- Go to IAM → Roles, and click 'Create role'.
- At the 'Trusted entity type' choose 'AWS service', and at the 'Use case' drop-down list select EC2 (under 'Commonly used services'). This is the trust policy.
- Click 'Next' and select the Permissions policies.

Once the role is created, you can see the **trust policy** at the role's 'Trust relationship' tab, where the trusted entities is:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

The **permissions policy** can be anything. For example, if we've given S3 read access with `AmazonS3ReadOnlyAccess`, it will be:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "s3:Describe*",
        "s3-object-lambda:Get*",
        "s3-object-lambda:List*"
      ],
      "Resource": "* "
    }
  ]
}
```

To attach the role to the EC2 instance, when creating an instance, select the role at the 'IAM instance profile' dropdown. And if the instance is already running, go to the EC2 console → Instances, open the instance, and on the Actions drop-down menu (top right) do Security → Modify IAM role. Select the role and click 'Update IAM role'.

## Policy

JSON file. Permissions assigned to a user, group or role.

```json
{
  "Sid": "AllowManageOwnSSHPublicKeys", // Who/what is authorized
  "Effect": "Allow", // Or "Deny"
  "Action": [
    // Which task(s) are allowed/denied. It's an API action
    "iam:GetSSHPublicKey",
    "iam:ListSSHPublicKeys"
  ],
  "Condition": {
    // Which condition(s) need to be met for authorization
  },
  // Resources to which authorized tasks are performed. An ARN or *
  "Resource": "arn:aws:iam::*:user/${aws:username}"
}
```

Console: https://console.aws.amazon.com/iamv2/home?#/policies

**Policy Simulator**: https://policysim.aws.amazon.com

Policy types - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types

AWS managed policies - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#aws-managed-policies

AWS IAM Policies in a Nutshell - https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/

### EAR

A policy needs to have an EAR to listen what is going to do: Effect, Action and Resource.

### Allow and Deny

All permissions are implicitly denied by default. Thus, nothing is allowed unless there's an explicit Allow.

Any explicit Deny overrides any explicit Allows. Thus, if there's multiple policies with conflicting statements, the most restrictive policy is applied.

Note that the root user has full access.

See 'Policy evaluation logic' - https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html

### Examples

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

#### AdministratorAccess policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

Allows all actions on all resources.

#### Deny operations to resource if it's not authenticated using MFA

For an S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "Null": {
          "aws:MultiFactorAuthAge": "true"
        }
      }
    }
  ]
}
```

More specific:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": {
        "AWS": "arn:aws:iam::238267638199:user/Albert"
      },
      "Action": [
        "s3:ListBucket",
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Condition": {
        "Null": {
          "aws:MultiFactorAuthAge": "true"
        }
      }
    }
  ]
}
```

### Permissions policy and trust policy (role)

See https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/

:::tip
Trust policy: who

Permissions policy: what
:::

#### Permissions policy

Defines the permissions (Allow or Deny) that the user of the role is able to perform (or is denied from performing), and on which resources. Is an **identity-based policy**.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe*",
      "Resource": "*"
    }
  ]
}
```

#### Trust policy

Who is allowed to assume the role, and under which conditions. Is a **resource-based policy**.

> The IAM service supports only one type of resource-based policy called a role trust policy, which is attached to an IAM role. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_resource-based)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111122223333:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

For example to allow the S3 service to replicate two buckets we create a Role with this custom trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Identity-based vs resource-based policy

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html

#### Identity-based policy

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_id-based

Examples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

Attached to users, groups and roles (permissions policy). Can be attached in various ways:

- Inline policy: a policy that only applies to single, specific user, group or role. It cannot be reused. If you delete the user, the policy is also deleted.
- Managed policy: either created by you (customer managed) or AWS (AWS managed). Standalone: it can be applied to multiple entities.

Does not have a Principal.

Example: Allows access to a specific DynamoDB table ([source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_dynamodb_specific-table.html))

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListAndDescribe",
      "Effect": "Allow",
      "Action": [
        "dynamodb:List*",
        "dynamodb:DescribeReservedCapacity*",
        "dynamodb:DescribeLimits",
        "dynamodb:DescribeTimeToLive"
      ],
      "Resource": "*"
    },
    {
      "Sid": "SpecificTable",
      "Effect": "Allow",
      "Action": [
        "dynamodb:BatchGet*",
        "dynamodb:DescribeStream",
        "dynamodb:DescribeTable",
        "dynamodb:Get*",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchWrite*",
        "dynamodb:CreateTable",
        "dynamodb:Delete*",
        "dynamodb:Update*",
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/MyTable"
    }
  ]
}
```

#### Resource-based policy

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_resource-based

Attached to a resource like an S3 bucket, a DynamoDB table or a SQS queue. Defines permissions for a principal accessing the resource.

> Resource-based policies are inline policies. There are no managed resource-based policies. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_resource-based)

**It has a `Principal`.**

On the JSON there's a `Principal` who gets permission to perform `Action`s to a specific `Resource` only.

Not all resources support resource-based policies, see the table at https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html.

Example ([source](https://stackoverflow.com/questions/45306696/s3-bucket-policy-allow-full-access-to-a-bucket-and-all-its-objects)):

```json
{
  "Version": "2012-10-17",
  "Id": "BucketPolicy",
  "Statement": [
    {
      "Sid": "AllAccess",
      "Action": "s3:*",
      "Effect": "Allow",
      "Principal": "*",
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

Can be applied to a role too: a trust policy.

Note that when the Action applies to an object, like `s3:GetObject`, the Resource needs to have `/*` appended, otherwise the permission applies to the S3 bucket and it doesn't work:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicAccessToS3Objects",
      "Principal": "*",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-static-website-bucket/*" // <- We need '/*' here!
    }
  ]
}
```

### Session policy

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#policies_session

Limit the permissions of a role when you use the STS AssumeRole action using the CLI or API.

> A session policy is a permissions policy which you can optionally pass during an AssumeRole operation. This enables you to place further restrictions on a role's permissions for that session. [source](https://aws.amazon.com/about-aws/whats-new/2019/05/session-permissions/)

### Generate policy based on CloudTrail events

Automatically generates a policy for the permissions that the entity actually used.

Go to IAM → Roles and open a role. At the bottom you have the "Generate policy" button.

It's a [recommended best practice](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-gen-least-privilege-policies)

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_generate-policy.html

https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html

### S3 access control policies

- IAM Policies
  - Identity-based
  - Does not have Principal
  - Good for a large number of buckets with varying permissions
  - Centralize access control within IAM
  - Size limit of 2048-6144 characters
- Bucket Policies
  - Resource-based
  - Attached to a specific bucket
    - Similar to an inline policy. If you want to edit it, you'll have to go through every bucket
  - Must have a Principal
  - Simple to use for cross-account access without IAM roles
  - Size limit of 20 KB

Example of **IAM policy**:

```json title=iam_policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-bucket"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:DeleteObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

Attach the IAM policy to the a user with [`put-user-policy`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/put-user-policy.html):

```shell
aws iam put-user-policy --user-name MyUser --policy-name S3AccessUserPolicy --policy-document file://iam_policy.json
```

Example of **bucket policy**:

```json title=bucket_policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/MyUser"
      },
      "Action": ["s3:PutObject"],
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

Attach the bucket policy to an S3 bucket with [`put-bucket-policy`](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html):

```shell
aws s3api put-bucket-policy --bucket my-bucket --policy file://bucket_policy.json
```

### Role vs Policy

https://www.strongdm.com/blog/aws-iam-roles-vs-policies

> A role is a type of IAM identity that can be authenticated and authorized to utilize an AWS resource, whereas a policy defines the permissions of the IAM identity.

https://www.learnaws.org/2022/03/03/iam-roles-policies/

https://repost.aws/questions/QUnIdoElwIRvWhJHjucPVkzg/what-are-the-key-differences-between-iam-roles-and-iam-policies

> An role is very similar to a user, in that it is an identity with permission policies that determine what the identity can and cannot do in AWS. However, a role does not have any credentials (password or access keys) associated with it.
> Policies determine what actions a user, role, or member of a user group can perform, on which AWS resources, and under what conditions.

> You attach IAM policies (which contain a set of permissions) to an IAM Role. Therefore, a single IAM roles can have multiple IAM policies in it. Lastly, a user can "assume" an IAM Role, meaning it will inherit automatically the policy or policies attached to that Role.

## Principal

https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html

A Principal is a user, account, service, or other entity that is allowed or denied access to a resource [source](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-bucket-user-policy-specifying-principal-intro.html)

It can be a ([source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#Principal_specifying)):

- AWS account and root user
- IAM role
- Role session
- IAM user
- Federated user session (Google, Facebook etc)
- AWS service (ie an application)

Note that a Group is not a principal since:

> You cannot identify a user group as a principal in a policy (such as a resource-based policy) because **groups relate to permissions, not authentication, and principals are authenticated IAM entities** [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html#Principal_specifying)

## A company with several departments that manage AWS

https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam

1. Create an IAM group for each department.
2. Create a policy and assign it to the group.
3. Create IAM users for each person on each department and add them to their respective groups.

## Finding your AWS account ID

https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId

`aws sts get-caller-identity`

`aws sts get-caller-identity --query Account --output text`

## Multi-factor authentication

Supported MFA methods/devices - https://aws.amazon.com/iam/features/mfa/

Using multi-factor authentication (MFA) in AWS - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html

### Add MFA to _other_ users

(This works for yourself too if you are not the root user, since it doesn't appear on the list.)

Go to the IAM Dashboard → Users and select a user. Click the 'Security credentials' tab and do 'Assign MFA device'.

### Enforce MFA to users

Prevent users to perform actions unless they've set up MFA with a policy - https://www.youtube.com/watch?v=cP_IbgnK8yk - https://github.com/iaasacademy/aws-how-to-guide/tree/main/Enable%20IAM%20Users%20to%20setup%20MFA - https://iaasacademy.com/aws-how-to-guides/enable-iam-users-to-manage-their-mfa-settings-aws-how-to-guide/

### Perform API call operations protected by MFA

Use `sts get-session-token` to get _temporary_ credentials to access a service protected with MFA from the CLI:

```shell
aws sts get-session-token --serial-number arn:aws:iam::ACCOUNT_ID:mfa/DEVICE_NAME --token-code <otp-token>
```

Returns an `AccessKeyId`, `SecretAccessKey` and `SessionToken`.

Documentation:

- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/get-session-token.html
- https://docs.aws.amazon.com/STS/latest/APIReference/API_GetSessionToken.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html#api_getsessiontoken

## Create the first IAM admin user

> We recommend that you not use the root level credentials for anything other than initial setup of the account and the creation of the IAM user account with administrator permissions attached via policy [source](https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam)

There are 2 guides/tutorials that explain how to set up the admin user:

- Tutorial: Secure Your AWS Account - https://aws.amazon.com/getting-started/guides/setup-environment/module-two/
- Creating your first IAM admin user and user group - https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html → This is the tutorial I've followed, see the steps above

### Steps

TLDR: create a group with the 'AdministratorAccess' policy, then create a user and add it to the group.

- Sign in to the console as Root user.
- Click your name at the top navbar → Account. At the section 'IAM User and Role Access to Billing Information' click 'Edit' and enable 'Activate IAM Access'.
- Go to the IAM console → Users and click 'Create user'.
- On the 'Set user details' page do:
  - Set 'User name' to 'Administrator'.
  - Check 'Provide user access to the AWS Management Console'.
  - Select 'I want to create an IAM user'.
  - Set a password at 'Custom password' and save it.
  - Uncheck 'Users must create a new password at next sign-in'.
  - Click 'Next'.
- On the 'Set permissions' page do:
  - Click 'Add user to group' and then 'Create group'.
  - Set 'Group name' to 'Administrators'.
  - Check the policy 'AdministratorAccess'.
  - Click 'Create group'.
  - Click 'Next'.
- On the 'Review and create' page optionally add [tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html).
  - Click 'Create user'.

:::info Important
Don't forget to enable MFA for the admin user
:::

## Password policy

Go to IAM → Account settings and on the Password policy box click the 'Edit' button.

https://www.netskope.com/blog/a-real-world-look-at-aws-best-practices-password-policies

## ARN

https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html

Format:

```shell
arn:partition:service:region:account-id:resource-id
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

Examples:

```shell
# IAM user
arn:aws:iam::123456789012:user/johndoe
# VPC
arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0e9801d129EXAMPLE
```

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/index.html

[Create user](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-user.html)

```shell
aws iam create-user --user-name my-user-name
```

[List users](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-users.html)

```shell
aws iam list-users
```

[Create role](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-role.html)

```shell
aws iam create-role --role-name <role-name> --assume-role-policy-document file://trust.json --output text --query 'Role.Arn'
```

Example of trust policy document (`trust.json`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<ACCOUNT_ID>:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Attach a Policy to a IAM role [docs](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/put-role-policy.html)

```shell
aws iam put-role-policy --role-name <role-name> --policy-name <policy-name> --policy-document file://iam-role-policy.json
```

Example of policy document `iam-role-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["eks:Describe*", "ssm:GetParameters"],
      "Resource": "*"
    }
  ]
}
```

Attach an _inline_ policy to a user [docs](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/put-user-policy.html)

```shell
aws iam put-user-policy --user-name MyUser --policy-name MyUserPolicy --policy-document file://iam-user-policy.json
```

Example of policy `iam-user-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::my-bucket"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:DeleteObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}
```

Delete role

- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_delete.html
- First remove the role from instance profile: `aws iam remove-role-from-instance-profile --instance-profile-name <instance-profile-name> --role-name <role-name>`
- If there's a policy attached to the role, remove it: `aws iam delete-role-policy --role-name <role-name> --policy-name <policy-name>`
  - Deleting IAM policies: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-delete.html
  - https://docs.aws.amazon.com/cli/latest/reference/iam/delete-role-policy.html
- Finally, remove the role: `aws iam delete-role --role-name <role-name>`
- If you get the error "Cannot delete entity, must remove roles from instance profile first" on the console when trying to delete a role, use the CLI instead.

## Permission boundaries

Defines the maximum permissions that a user, group or role can have. Can be applied to users and roles. Used to prevent privilege escalation.

Sets the maximum permissions that an identity-based policy can grant an IAM entity.

Important: they don't grant permissions, it controls the permissions you have. You still need to have the permissions granted to you through a role for example.

(Documentation) Permissions boundaries for IAM entities - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html

When and where to use IAM permissions boundaries - https://aws.amazon.com/blogs/security/when-and-where-to-use-iam-permissions-boundaries/

How can I use permissions boundaries to limit the scope of IAM users and roles, and also prevent privilege escalation? - https://aws.amazon.com/premiumsupport/knowledge-center/iam-permission-boundaries/

How can I resolve access denied issues caused by permissions boundaries? - https://aws.amazon.com/premiumsupport/knowledge-center/iam-access-denied-permissions-boundary/

Prevent privilege escalation with AWS IAM permission boundaries - https://iaasacademy.com/aws-how-to-guides/aws-iam-permissions-boundaries-help-to-prevent-privilege-escalations - https://www.youtube.com/watch?v=LZdfxS2DnFw

AWS Permission Boundaries for Dummies - https://news.ycombinator.com/item?id=33192295

It's a best practice - https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-permissions-boundaries

## Eventually consistent

From https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html

> IAM, like many other AWS services, is eventually consistent. IAM achieves high availability by replicating data across multiple servers within Amazon's data centers around the world. If a request to change some data is successful, the change is committed and safely stored. However, the change must be replicated across IAM, which can take some time.

Changes that I make are not always immediately visible - https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_eventual-consistency

www.it-automation.com/2021/06/06/how-to-deal-with-eventual-consistency-in-AWS-IAM.html
