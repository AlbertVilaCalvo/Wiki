---
title: Organizations
---

https://docs.aws.amazon.com/organizations

Centrally manage multiple AWS accounts. You can create new accounts, have consolidated billing, get volume discounts...

The **management account** is the account that created the organization. It is at the root of the hierarchy and manages the other accounts, called **member accounts**. You can create new accounts or add existing accounts.

You can group accounts into Organizational Units (OU). Then you can apply SCP (service control policies) and tag policies to OUs and the root account.

<img src="https://docs.aws.amazon.com/images/organizations/latest/userguide/images/AccountOuDiagram.png" />

You can create an organizational CloudTrail trail that logs all events for all AWS accounts in the organization. Useful for auditing and compliance. [See docs](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html).

Best practices - https://aws.amazon.com/organizations/getting-started/best-practices/

You can just have consolidated billing or enable all features (which includes the consolidated billing too).

## Consolidated billing

https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html

Have a single bill on the management account, which pays the charges of all the member accounts. You only pay in one place.

Aggregate service usage on multiple accounts to get **volume pricing discounts**.

Standard and Convertible Reserved Instances can be shared between multiple accounts, see [RI pricing](https://aws.amazon.com/ec2/pricing/reserved-instances/pricing/).

## All features

Consolidated billing + service control policies, resource control policies, tag policies, backup policies, trusted services etc.

You need to enable the features at Organizations → Policies and Organizations → Services.

## `OrganizationAccountAccessRole`

When you create an account through organizations, it will create a role in the new member account, named `OrganizationAccountAccessRole`. (This is the default name, but you can change it, although it's not recommended.) The management account can use this IAM role to access resources in the member account. If you check the role at the IAM console, you can see that it has the policy [`AdministratorAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html) attached, which grants full admin permissions to the account. See [Accessing member accounts in an organization with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html).

To manage a member account using the console, log in to the console using the management account and click "**Switch role**" (at the top right). At the form that opens, at the "Account ID" set the ID of the account you want to manage, and at the "IAM role name" set `OrganizationAccountAccessRole`. See [Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html).

## Service control policies (SCPs)

:::info
SCP is a limit, not a permission, like [permissions boundaries](iam#permissions-boundaries).

Users and roles in the management account are not affected by SCPs.
:::

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html

Control what API actions are allowed in a given account, that is, the maximum available permissions in an AWS account. SCPs do not grant permissions, only limit.

IAM policies apply at users and roles within an AWS account, whereas SCP apply to accounts or organization units (OU) in an organization.

SCPs affect all users and roles in the member account, including its root user, but they don't affect users and roles in the management account. SCPs restrictions cascade down, affecting accounts below in the hierarchy.

You need to enable SCPs at Organizations → Policies.

https://digitalcloud.training/aws-scp-mastering-aws-service-control-policies

It's a best practice, see https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-permissions-guardrails

> We recommend that you use Organizations service control policies (SCPs) to establish permissions guardrails to control access for all principals (IAM roles and users) across your accounts.

### SCPs evaluation strategies

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_evaluation.html

By default you have the managed policy `FullAWSAccess`, which allows all actions on all resources like the [`AdministratorAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html) policy, and it is attached to the Root and all the OUs and accounts. This policy is required to override the implicit deny. If removed, the member accounts can't do anything and therefore you need to add policies to allow actions.

There are 2 strategies:

- Allow everything by keeping the policy `FullAWSAccess`, and then explicitly deny actions.
- Deny everything by removing the policy `FullAWSAccess`, and then explicitly allow actions. For example, replace policy the `FullAWSAccess` with a policy allowing only a set of services.

### SCPs examples

- https://github.com/aws-samples/service-control-policy-examples
- https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html

#### Example: require t2.micro

From https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_ec2.html#example-ec2-1

Could be used to enforce development accounts to only use `t2.micro` instances:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireMicroInstanceType",
      "Effect": "Deny",
      "Action": "ec2:RunInstances",
      "Resource": ["arn:aws:ec2:*:*:instance/*"],
      "Condition": {
        "StringNotEquals": {
          "ec2:InstanceType": "t2.micro"
        }
      }
    }
  ]
}
```

We are denying any type different than `t2.micro`.

## Resource control policies (RCPs)

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html

It's a best practice, see https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#bp-permissions-guardrails

> We recommend that you use Organizations resource control policies (RCPs) to establish permissions guardrails to control access for AWS resources across your organization.

## Trusted services

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html

Allow AWS services (called trusted service) to perform tasks in your organization and its accounts.

You need to enable each service you want to integrate at Organizations → Services. However, it's strongly recommended to not do it there, and instead enable trusted access using the service’s console or API. See [Using AWS Organizations with other AWS services](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html).

> We _strongly recommend_ that, when the option is available, you enable and disable trusted access by using _only_ the trusted service's console, or its AWS CLI or API operation equivalents. This lets the trusted service perform any required initialization when enabling trusted access, such as creating any required resources and any required clean up of resources when disabling trusted access.

## Tag policies

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html

## Centrally manage root access

If you have an AWS Organization, you can delete the root user credentials for your member accounts and perform privileged actions from the management or delegated account.

See [Centrally manage root access for member accounts](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html#id_root-user-access-management) and [Centralize root access for member accounts](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-enable-root-access.html).

## CLI

API reference: https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html

CLI command reference: https://docs.aws.amazon.com/cli/latest/reference/organizations/index.html
