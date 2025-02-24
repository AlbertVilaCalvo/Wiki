---
title: Root User
---

Has complete access to all AWS services and resources, including billing information. Is the most privileged user, and its permissions cannot be restricted.

Logs in at the web console using the email. IAM users log in using username and password (in case the user has access to the console enabled, because you can have a user that only has access keys for the CLI).

AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html

> We strongly recommend that you do not use the root user for your everyday tasks, even the administrative ones. Instead, **adhere to the best practice of using the root user only to create your first IAM user**. (...) For a tutorial on how to set up an administrator for daily use, see [Creating your first IAM admin user and user group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html).

Root user best practices - https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html - Previously it was https://docs.aws.amazon.com/accounts/latest/reference/best-practices-root-user.html

> We strongly recommend that you use the root user only for two things:
>
> - Create the first administrator user in AWS Identity and Access Management (IAM). For details about how to do this, see [Creating your first IAM user and group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) in the _IAM User Guide_.
> - Perform those tasks that can be performed by **only** the root user. For the complete list of these tasks, see [Tasks that require root user credentials](https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html).

https://securingthe.cloud/2020/how-to-secure-aws-account-root-user-best-practices

You can transfer the root account - see https://aws.amazon.com/premiumsupport/knowledge-center/transfer-aws-account/

If you're the owner account, what's the point of using iam instead of root? - https://www.reddit.com/r/aws/comments/yu7b1w/if_youre_the_owner_account_whats_the_point_of/

> Never use Root, only use it to create an IAM admin, that's it. Root can close the account, subscribe to Enterprise Support (costing you $$$$) and delete anything (even if it's denied by an IAM policy)

## Resetting a lost or forgotten root user password

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

## Monitoring

AWS Management Console sign-in events - Monitor root user activity with AWS CloudTrail at no additional cost - https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-aws-console-sign-in-events.html

How can I create an EventBridge event rule to notify me that my AWS root user account was used? - https://aws.amazon.com/premiumsupport/knowledge-center/root-user-account-eventbridge-rule/

## Tasks that require root user credentials

https://docs.aws.amazon.com/general/latest/gr/root-vs-iam.html#aws_tasks-that-require-root

https://docs.aws.amazon.com/accounts/latest/reference/root-user-tasks.html

https://medium.com/awesome-cloud/aws-account-root-user-a43c9fb1697a

## Don't use the root user for everyday tasks

> We strongly recommend that you do not use the root user for your everyday tasks. Safeguard your root user credentials and use them to perform the tasks that only the root user can perform. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

## Don't generate access keys for the root user

> We don't recommend generating access keys for your root user, because they allow full access to all your resources for all AWS services. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#lock-away-credentials)

> One of the best ways to protect your account is to not have access keys for your AWS account root user. Unless you must have root user access keys (which is rare), it is best not to generate them. [source](https://docs.aws.amazon.com/accounts/latest/reference/credentials-access-keys-best-practices.html)

> If you do have an access key for your root user, delete it. [source](https://docs.aws.amazon.com/accounts/latest/reference/best-practices-root-user.html)

### Deleting access keys for the root user

https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_delete-key

At the navigation bar, click your name and then 'Security credentials'. At the section 'Access keys (access key ID and secret access key)' there should not be any item.

Note that at the top of the [IAM dashboard](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home) there is a 'Security recommendations' section that tells you if the Root user has MFA and access keys.

## Email

From https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/

> Tip: For Root user email address, use a corporate email distribution list (for example, it.admins@example.com) or email box if your account is a professional AWS account. Avoid using an individual's corporate email address (for example, paulo.santos@example.com). With this practice, your company can retain access to the AWS account even when an employee changes positions or leaves the company. The email address can be used to reset account credentials. Be sure that you protect access to these distribution lists.

## Multi-factor authentication (MFA)

> It's a best practice to enable multi-factor authentication (MFA) on the root account to secure your AWS resources. [source](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

How to:

- At the top right menu, go to 'Security credentials'. You'll see a warning 'You don't have MFA assigned'. Click 'Assign MFA'.
- Alternatively, go to the IAM Dashboard and you'll see a warning 'Add MFA for root user' (and 'Add MFA for yourself' if you are not root) on the 'Security recommendations' box. Click 'Add MFA'.
- MFA device name: root-account-mfa-device
- MFA device: Authenticator app

Documentation:

- Enable MFA on the AWS account root user - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user_manage_mfa
- Enable a **virtual** MFA device for your AWS account root user (console) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root
  - > Make a secure backup of the QR code or secret configuration key, or make sure that you enable multiple virtual MFA devices for your account.
- Enable a **hardware** MFA device for the AWS account root user (console) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_physical.html#enable-hw-mfa-for-root

Recovering a root user MFA device - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_lost-or-broken.html#root-mfa-lost-or-broken - See steps at https://www.howtoforge.com/how-to-recover-aws-account-access-if-the-mfa-device-is-lost/

## Centrally manage root access

If you have an AWS Organization, you can delete root credentials for your member accounts and perform privileged actions from the management or delegated account.

See [Centrally manage root access for member accounts](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user-access-management) and [Centralize root access for member accounts](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-enable-root-access.html).
