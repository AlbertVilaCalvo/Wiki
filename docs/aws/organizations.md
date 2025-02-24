---
title: Organizations
---

https://docs.aws.amazon.com/organizations

Centrally manage multiple AWS accounts. You can create new accounts, have consolidated billing...

The **management account** is the account that created the organization. It is at the root of the hierarchy and manages the other accounts, called **member accounts**. You can create new accounts or add existing accounts.

You can group accounts into Organizational Units (OU). Then we can apply SCP (service control policies) and tag policies to OUs and the root account.

<img src="https://docs.aws.amazon.com/images/organizations/latest/userguide/images/AccountOuDiagram.png">

You can apply CloudTrail to member accounts. Useful for auditing and compliance.

You can just have consolidated billing or enable all features (which includes the consolidated billing too).

## Consolidated billing

Have a single bill on the management account. You only pay in one place.

Aggregate service usage on multiple accounts to get **volume pricing discounts**.

- Paying account. Pays the bill. Is independent, it cannot access resources of other accounts.
- Linked account. Linked to the paying account for billing. All linked accounts are independent.

## All features

Service control policies, tag policies, services etc.

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_integrate_services.html

You need to enable each service you want to integrate at Organizations → Services. The same with policies.

## `OrganizationAccountAccessRole`

When you create an account through organizations, it will create a role in the new member account, named `OrganizationAccountAccessRole`. (This is the default name, but you can change it, although it's not recommended.) The management account can use this IAM role to access resources in the member account. If you check the role at the IAM console, you can see that it has the policy [`AdministratorAccess`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html) attached, which grants full admin permissions to the account. See [Accessing member accounts in an organization with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html).

To manage a member account using the console, log in to the console using the management account and click "Switch role" (at the top right). At the form that opens, at the "Account ID" set the ID of the account you want to manage, and at the "IAM role name" set `OrganizationAccountAccessRole`. See [Accessing a member account that has OrganizationAccountAccessRole with AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access-cross-account-role.html).

## Service control policies (SCPs)

https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html

Control what API actions are allowed in a given account, that is, the maximum available permissions in an AWS account. SCPs do not grant permissions.

IAM policies apply at users and roles within an AWS account, but SCP apply to multiple accounts or organizations.

:::info
SCP is a limit, not a permission, like permission boundaries.
:::

https://digitalcloud.training/aws-scp-mastering-aws-service-control-policies

## CLI

API reference: https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html

CLI command reference: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/organizations/index.html
