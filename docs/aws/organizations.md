---
title: Organizations
---

https://docs.aws.amazon.com/organizations

Centrally manage multiple AWS accounts. You can create new accounts, have consolidated billing...

The **management account** is the account that created the organization. Is at the root of the hierarchy and manages the other accounts.

You can group accounts into Organizational Units (OU). Then we can apply SCP (service control policies) and tag policies to OUs.

You can apply CloudTrail to member accounts. Useful for auditing and compliance.

When you create an account through organizations, it will have the role `OrganizationAccountAccessRole`, and it the `AdministratorAccess` policy that give it full admin permissions. See https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html

You need to enable each service you want to integrate at Organizations → Services.

## Consolidated billing

Have a single bill on the management account. You only pay in one place.

Aggregate service usage on multiple accounts to get **volume pricing discounts**.

- Paying account. Pays the bill. Is independent, it cannot access resources of other accounts.
- Linked account. All linked accounts are independent.

## All features (SCP and tag policies)
