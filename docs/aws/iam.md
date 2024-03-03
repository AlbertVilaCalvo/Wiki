---
title: IAM
---

# Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

https://github.com/topics/iam

**Security best practices in IAM** - https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html

IAM Access Analyzer - https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html - See some use cases at [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

A vault for securely storing and accessing AWS credentials in development environments - https://github.com/99designs/aws-vault

Cloudsplaining is an AWS IAM Security Assessment tool that identifies violations of least privilege and generates a risk-prioritized report - https://github.com/salesforce/cloudsplaining

A tool for quickly evaluating IAM permissions in AWS - https://github.com/nccgroup/PMapper

Refining permissions in AWS using last accessed information - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html

AWS Vault - https://github.com/99designs/aws-vault - Stores IAM credentials in your operating system's secure keystore

## Summary

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.
- Principal: user, account, service, or other entity that is allowed or denied access to a resource.

## User

By default users have no permissions, thus they can't do anything. You give them permissions using groups and policies.

Each user has a username (Account name), used to log in.

Authentication:

- Web console: username and password + (optionally) MFA.
- CLI & API: access key ID and secret access key. You can also have MFA too.
  - Only a user can have access keys (not a group, role or policy).
  - Best practice: use roles for applications that run on EC2 instances or lambda functions. See [Require workloads to use temporary credentials with IAM roles to access AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-workloads-use-roles)

## Group

A collection of users.

A way of organizing users and applying permissions to them through a policy.

## Role

A way to delegate permissions. Is an identity. Roles are assumed by users, applications and services.

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

https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/assume-role.html

https://stackoverflow.com/questions/63241009/aws-sts-assume-role-in-one-command

## Policy

JSON file. Permissions assigned to a user, group or role.

```json
{
  "Sid": "AllowManageOwnSSHPublicKeys", // Who/what is authorized
  "Effect": "Allow", // Or "Deny"
  "Action": [
    // Which task(s) are allowed
    "iam:GetSSHPublicKey",
    "iam:ListSSHPublicKeys"
  ],
  "Condition": {
    // Which condition(s) need to be met for authorization
  },
  "Resource": "arn:aws:iam::*:user/${aws:username}" // Resources to which authorized tasks are performed
}
```

Console: https://console.aws.amazon.com/iamv2/home?#/policies

Simulator: https://policysim.aws.amazon.com

AWS IAM Policies in a Nutshell - https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/

### Allow and Deny

By default all permissions are denied. Thus, nothing is allowed unless there's an explicit Allow.

Deny overrides any Allow.

### Examples

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

AdministratorAccess:

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

### Identity-based vs resource-based policy

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html

Identity-based policy: applied to users, groups and roles.

Resource-based policy: applied to a resource like an S3 bucket or a SQS queue. Not all resources support resource-based policies, see the table at https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html.

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
      "Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"],
      "Principal": "*"
    }
  ]
}
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

It can be a ([source](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html)):

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

## Create the first IAM admin user

> We recommend that you not use the root level credentials for anything other than initial setup of the account and the creation of the IAM user account with administrator permissions attached via policy [source](https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam)

There are 2 guides/tutorials that explain how to set up the admin user:

- Tutorial: Secure Your AWS Account - https://aws.amazon.com/getting-started/guides/setup-environment/module-two/
- Creating your first IAM admin user and user group - https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html → This is the tutorial I've followed, see the steps above

### Steps

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

## CLI

`aws iam list-users`

`aws iam list-users --profile <profile-name>`

Create role

- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-role.html
- `aws iam create-role --role-name <role-name> --assume-role-policy-document file://trust.json --output text --query 'Role.Arn'`

Example of trust relationship policy document `trust.json`:

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

Attach a Policy to a IAM role

- https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/put-role-policy.html
- `aws iam put-role-policy --role-name <role-name> --policy-name <policy-name> --policy-document file://iam-role-policy.json`

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

Delete role

- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage_delete.html
- First remove the role from instance profile: `aws iam remove-role-from-instance-profile --instance-profile-name <instance-profile-name> --role-name <role-name>`
- If there's a policy attached to the role, remove it: `aws iam delete-role-policy --role-name <role-name> --policy-name <policy-name>`
  - Deleting IAM policies: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-delete.html
  - https://docs.aws.amazon.com/cli/latest/reference/iam/delete-role-policy.html
- Finally, remove the role: `aws iam delete-role --role-name <role-name>`
- If you get the error "Cannot delete entity, must remove roles from instance profile first" on the console when trying to delete a role, use the CLI instead.

## Permission boundaries

(Documentation) Permissions boundaries for IAM entities - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html

When and where to use IAM permissions boundaries - https://aws.amazon.com/blogs/security/when-and-where-to-use-iam-permissions-boundaries/

How can I use permissions boundaries to limit the scope of IAM users and roles, and also prevent privilege escalation? - https://aws.amazon.com/premiumsupport/knowledge-center/iam-permission-boundaries/

How can I resolve access denied issues caused by permissions boundaries? - https://aws.amazon.com/premiumsupport/knowledge-center/iam-access-denied-permissions-boundary/

Prevent privilege escalation with AWS IAM permission boundaries - https://iaasacademy.com/aws-how-to-guides/aws-iam-permissions-boundaries-help-to-prevent-privilege-escalations - https://www.youtube.com/watch?v=LZdfxS2DnFw

AWS Permission Boundaries for Dummies - https://news.ycombinator.com/item?id=33192295
