---
title: IAM
---

# Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

https://github.com/topics/iam

Security best practices in IAM - https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html

Using multi-factor authentication (MFA) in AWS - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html

IAM Access Analyzer - https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html - See some use cases at [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

A vault for securely storing and accessing AWS credentials in development environments - https://github.com/99designs/aws-vault

Cloudsplaining is an AWS IAM Security Assessment tool that identifies violations of least privilege and generates a risk-prioritized report - https://github.com/salesforce/cloudsplaining

A tool for quickly evaluating IAM permissions in AWS - https://github.com/nccgroup/PMapper

## Concepts

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.

https://stackoverflow.com/questions/46199680/difference-between-iam-role-and-iam-user-in-aws

https://classroom.udacity.com/nanodegrees/nd0044/parts/8fc72c65-158a-429d-a08f-f25b8b66e99f/modules/769586dd-1c0b-4155-af83-853bc9fa7fdc/lessons/e21110af-9970-4f3c-b1ad-c8cc4f27df39/concepts/ee39a09f-e9c3-48db-93c7-d773f07bb6aa

> We recommend using IAM roles for human users and workloads that access your AWS resources so that they use temporary credentials (instead of IAM users) [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#enable-mfa-for-privileged-users)

## Finding your AWS account ID

https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId

`aws sts get-caller-identity`

## Root user

Has complete access to all AWS services and resources, including billing information. Is the most privileged user.

AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html

> We strongly recommend that you do not use the root user for your everyday tasks, even the administrative ones. Instead, **adhere to the best practice of using the root user only to create your first IAM user**. (...) For a tutorial on how to set up an administrator for daily use, see [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html).

Best practices to protect your account's root user - https://docs.aws.amazon.com/accounts/latest/reference/best-practices-root-user.html

> We strongly recommend that you use the root user only for two things:
>
> - Create the first administrator user in AWS Identity and Access Management (IAM). For details about how to do this, see [Creating your first IAM user and group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) in the _IAM User Guide_.
>
> - Perform those tasks that can be performed by **only** the root user. For the complete list of these tasks, see [Tasks that require root user credentials](https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html).

https://securingthe.cloud/2020/how-to-secure-aws-account-root-user-best-practices

### Root user monitoring

AWS Management Console sign-in events - Monitor root user activity with AWS CloudTrail at no additional cost - https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-aws-console-sign-in-events.html

How can I create an EventBridge event rule to notify me that my AWS root user account was used? - https://aws.amazon.com/premiumsupport/knowledge-center/root-user-account-eventbridge-rule/

### Tasks that require root user credentials

https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root

https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html

https://medium.com/awesome-cloud/aws-account-root-user-a43c9fb1697a

### Don't use the root user for everyday tasks

> We strongly recommend that you do not use the root user for your everyday tasks. Safeguard your root user credentials and use them to perform the tasks that only the root user can perform. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

### Don't generate access keys for the root user

> We don't recommend generating access keys for your root user, because they allow full access to all your resources for all AWS services. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)

> One of the best ways to protect your account is to not have access keys for your AWS account root user. Unless you must have root user access keys (which is rare), it is best not to generate them. [source](https://docs.aws.amazon.com/accounts/latest/reference/credentials-access-keys-best-practices.html)

> If you do have an access key for your root user, delete it. [source](https://docs.aws.amazon.com/accounts/latest/reference/best-practices-root-user.html)

#### Deleting access keys for the root user

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_delete-key

At the navigation bar, click your name and then 'Security credentials'. At the section 'Access keys (access key ID and secret access key)' there should not be any item.

### Root user email

From https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

> Tip: For Root user email address, use a corporate email distribution list (for example, it.admins@example.com) or email box if your account is a professional AWS account. Avoid using an individual's corporate email address (for example, paulo.santos@example.com). With this practice, your company can retain access to the AWS account even when an employee changes positions or leaves the company. The email address can be used to reset account credentials. Be sure that you protect access to these distribution lists.

### Root user multi-factor authentication (MFA)

> It's a best practice to enable multi-factor authentication (MFA) on the root account to secure your AWS resources. [source](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

Enable MFA on the AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa

## Create first IAM admin user

> We recommend that you not use the root level credentials for anything other than initial setup of the account and the creation of the IAM user account with administrator permissions attached via policy [source](https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam)

Creating your first IAM admin user and user group - https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html

IAM -> Users -> click 'Add users' button.

## Enforce MFA to users

Prevent users to perform actions unless they've set up MFA with a policy - https://www.youtube.com/watch?v=cP_IbgnK8yk - https://github.com/iaasacademy/aws-how-to-guide/tree/main/Enable%20IAM%20Users%20to%20setup%20MFA - https://iaasacademy.com/aws-how-to-guides/enable-iam-users-to-manage-their-mfa-settings-aws-how-to-guide/

## Policy

JSON file. Permissions assigned to a user, group or role.

Console: https://console.aws.amazon.com/iamv2/home?#/policies

Simulator: https://policysim.aws.amazon.com

Examples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

AWS IAM Policies in a Nutshell - https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/

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
