---
title: IAM
---

# Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.

https://stackoverflow.com/questions/46199680/difference-between-iam-role-and-iam-user-in-aws

https://classroom.udacity.com/nanodegrees/nd0044/parts/8fc72c65-158a-429d-a08f-f25b8b66e99f/modules/769586dd-1c0b-4155-af83-853bc9fa7fdc/lessons/e21110af-9970-4f3c-b1ad-c8cc4f27df39/concepts/ee39a09f-e9c3-48db-93c7-d773f07bb6aa

## Finding your AWS account ID

https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId

`aws sts get-caller-identity`

## Don't use the root user

> We don't recommend generating access keys for your root user, because they allow full access to all your resources for all AWS services [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)

> We strongly recommend that you do not use the root user for your everyday tasks. Safeguard your root user credentials and use them to perform the tasks that only the root user can perform. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

## Create IAM admin user

> We recommend that you not use the root level credentials for anything other than initial setup of the account and the creation of the IAM user account with administrator permissions attached via policy [source](https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam)

Creating your first IAM admin user and user group - https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html

IAM -> Users -> click 'Add users' button.

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
