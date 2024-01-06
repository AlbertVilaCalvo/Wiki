---
title: IAM
---

# Identity and Access Management

https://docs.aws.amazon.com/iam/index.html

FAQs: https://aws.amazon.com/iam/faqs/

https://github.com/topics/iam

Security best practices in IAM - https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html

IAM Access Analyzer - https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html - See some use cases at [Security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

A vault for securely storing and accessing AWS credentials in development environments - https://github.com/99designs/aws-vault

Cloudsplaining is an AWS IAM Security Assessment tool that identifies violations of least privilege and generates a risk-prioritized report - https://github.com/salesforce/cloudsplaining

A tool for quickly evaluating IAM permissions in AWS - https://github.com/nccgroup/PMapper

Refining permissions in AWS using last accessed information - https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html

AWS Vault - https://github.com/99designs/aws-vault - Stores IAM credentials in your operating system's secure keystore

## Concepts

- User: an individual, system, or application requiring access to AWS services.
- Group: collection of users. A user can be in many groups.
- Role: set of permissions.
- Policy: JSON file. Permissions assigned to a user, group or role.

### Role

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

### Role vs Policy

https://www.strongdm.com/blog/aws-iam-roles-vs-policies

> A role is a type of IAM identity that can be authenticated and authorized to utilize an AWS resource, whereas a policy defines the permissions of the IAM identity.

https://www.learnaws.org/2022/03/03/iam-roles-policies/

https://repost.aws/questions/QUnIdoElwIRvWhJHjucPVkzg/what-are-the-key-differences-between-iam-roles-and-iam-policies

> An role is very similar to a user, in that it is an identity with permission policies that determine what the identity can and cannot do in AWS. However, a role does not have any credentials (password or access keys) associated with it.
> Policies determine what actions a user, role, or member of a user group can perform, on which AWS resources, and under what conditions.

> You attach IAM policies (which contain a set of permissions) to an IAM Role. Therefore, a single IAM roles can have multiple IAM policies in it. Lastly, a user can "assume" an IAM Role, meaning it will inherit automatically the policy or policies attached to that Role.

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

## Root user

Has complete access to all AWS services and resources, including billing information. Is the most privileged user.

AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html

> We strongly recommend that you do not use the root user for your everyday tasks, even the administrative ones. Instead, **adhere to the best practice of using the root user only to create your first IAM user**. (...) For a tutorial on how to set up an administrator for daily use, see [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html).

Best practices to protect your account's root user - https://docs.aws.amazon.com/accounts/latest/reference/best-practices-root-user.html

> We strongly recommend that you use the root user only for two things:
>
> - Create the first administrator user in AWS Identity and Access Management (IAM). For details about how to do this, see [Creating your first IAM user and group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) in the _IAM User Guide_.
> - Perform those tasks that can be performed by **only** the root user. For the complete list of these tasks, see [Tasks that require root user credentials](https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html).

https://securingthe.cloud/2020/how-to-secure-aws-account-root-user-best-practices

You can transfer the root account - see https://aws.amazon.com/premiumsupport/knowledge-center/transfer-aws-account/

If you're the owner account, what's the point of using iam instead of root? - https://www.reddit.com/r/aws/comments/yu7b1w/if_youre_the_owner_account_whats_the_point_of/

> Never use Root, only use it to create an IAM admin, that's it. Root can close the account, subscribe to Enterprise Support (costing you $$$$) and delete anything (even if it's denied by an IAM policy)

### Resetting a lost or forgotten root user password

The root user has an associated email address that can be used to reset (ie change) the password, even it you have enabled MFA. Note that you can change the password, but MFA will still be required to login after changing the password, if it was enabled.

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys_retrieve.html#reset-root-password

Steps:

- Choose 'Root user' and set the email at the field 'Root user email address'.
- Click 'Forgot password?'.
- At the email you'll receive, click the reset password link.
- At the page that opens, set the new password at the fields 'New password' and 'Confirm new password'. Click 'Reset password'.
- You'll receive an email saying 'Your Amazon Web Services Password Has Been Updated'.
- A new password is set. Now you need to log in. If MFA was enabled, it will be required when logging in with the new password.

Note that this process was done with MFA enabled, and after changing the password MFA was still there.

If you loose access to the MFA you need to have access to the email _and_ the primary contact **phone** as explained at [Recovering a root user MFA device](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_lost-or-broken.html#root-mfa-lost-or-broken). See steps at https://www.howtoforge.com/how-to-recover-aws-account-access-if-the-mfa-device-is-lost/

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

Note that at the top of the [IAM dashboard](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home) there is a 'Security recommendations' section that tells you if the Root user has MFA and access keys.

### Root user email

From https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

> Tip: For Root user email address, use a corporate email distribution list (for example, it.admins@example.com) or email box if your account is a professional AWS account. Avoid using an individual's corporate email address (for example, paulo.santos@example.com). With this practice, your company can retain access to the AWS account even when an employee changes positions or leaves the company. The email address can be used to reset account credentials. Be sure that you protect access to these distribution lists.

### Root user multi-factor authentication (MFA)

> It's a best practice to enable multi-factor authentication (MFA) on the root account to secure your AWS resources. [source](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

- Enable MFA on the AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa
- Enable a **virtual** MFA device for your AWS account root user (console) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root
  - > Make a secure backup of the QR code or secret configuration key, or make sure that you enable multiple virtual MFA devices for your account.
- Enable a **hardware** MFA device for the AWS account root user (console) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root

Recovering a root user MFA device - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_lost-or-broken.html#root-mfa-lost-or-broken - See steps at https://www.howtoforge.com/how-to-recover-aws-account-access-if-the-mfa-device-is-lost/

## Create the first IAM admin user

> We recommend that you not use the root level credentials for anything other than initial setup of the account and the creation of the IAM user account with administrator permissions attached via policy [source](https://explore.skillbuilder.aws/learn/course/120/play/459/introduction-to-aws-identity-and-access-management-iam)

There are 2 guides/tutorials that explain how to set up the admin user:

- Tutorial: Secure Your AWS Account - https://aws.amazon.com/getting-started/guides/setup-environment/module-two/
- Creating your first IAM admin user and user group - https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html → This is the tutorial I've followed, see the steps above

Steps:

- Sign in to the console as Root user.
- Click your name at the top navbar → Account. At the section 'IAM User and Role Access to Billing Information' click 'Edit' and enable 'Activate IAM Access'.
- Go to the IAM console → Users and click 'Add users'.
- On the 'Set user details' page do:
  - Set 'User name' to 'Administrator'.
  - Check 'Password - AWS Management Console access'.
  - Set a password at 'Custom password'.
  - Uncheck 'User must create a new password at next sign-in'.
  - Click 'Next: Permissions'.
- On the 'Set permissions' page do:
  - Click 'Add user to group' and then 'Create group'.
  - Set 'Group name' to 'Administrators'.
  - Check the policy 'AdministratorAccess'.
  - Click 'Create group'.
  - Click the 'Next: Tags' button.
- On the 'Add tags (optional)' page optionally add [tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html).
- Click 'Next: Review' and then 'Create user'.

## Enforce MFA to users

Prevent users to perform actions unless they've set up MFA with a policy - https://www.youtube.com/watch?v=cP_IbgnK8yk - https://github.com/iaasacademy/aws-how-to-guide/tree/main/Enable%20IAM%20Users%20to%20setup%20MFA - https://iaasacademy.com/aws-how-to-guides/enable-iam-users-to-manage-their-mfa-settings-aws-how-to-guide/

## Policy

JSON file. Permissions assigned to a user, group or role.

Console: https://console.aws.amazon.com/iamv2/home?#/policies

Simulator: https://policysim.aws.amazon.com

Examples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

AWS IAM Policies in a Nutshell - https://start.jcolemorrison.com/aws-iam-policies-in-a-nutshell/

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
