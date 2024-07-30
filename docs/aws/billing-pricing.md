---
title: Billing & Pricing
---

Billing dashboard (old page): https://console.aws.amazon.com/billing/home

## Billing

:::info Important
All the 4 actions below need to be done with the **root user**.
:::

### Enable IAM access to billing

Since we are not going to use the root account, we need to grant access to the billing console to the other user accounts.

To do so, navigate to the 'Account page' (either at the top right drop-down or by searching 'Account'). Scroll down to 'IAM user and role access to Billing information', click 'Edit', check 'Activate IAM Access' and click 'Update'.

Docs:

- IAM tutorial: Delegate access to the billing console - https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_billing.html
- Overview of managing access permissions - https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/control-access-billing.html

### Enable PDF invoices delivery by email

Navigate to [Billing preferences](https://console.aws.amazon.com/billing/home#/preferences) (click 'Billing and Cost Management home' at the top right drop-down → 'Billing Preferences' at the left menu), and enable 'PDF invoices delivery by email'.

### Enable Free tier alerts

Navigate to [Billing preferences](https://console.aws.amazon.com/billing/home#/preferences) (click 'Billing and Cost Management home' at the top right drop-down → 'Billing Preferences' at the left menu), and enable 'AWS Free Tier alerts'.

If you don't specify an email, alerts will be sent the to the root user email.

### Create Budget and enable CloudWatch billing alarm/alert

Navigate to [Billing preferences](https://console.aws.amazon.com/billing/home#/preferences) (click 'Billing and Cost Management home' at the top right drop-down → 'Billing Preferences' at the left menu), and enable 'Receive CloudWatch billing alerts'.

Afterwards, navigate to 'Budgets' (at the left menu) and click 'Create a budget'. Choose 'Monthly cost budget'. Set the budget name, the 'budgeted amount ($)' and the 'Email recipients'. Finally click 'Create budget'.

:::tip
Is better to create multiple alarms, like $10, $15, $20…
:::

## Pricing

https://aws.amazon.com/pricing

https://calculator.aws

https://calculator.s3.amazonaws.com/index.html

Cost Explorer - https://aws.amazon.com/aws-cost-management/aws-cost-explorer/

AWS Billing and Cost Management Documentation - https://docs.aws.amazon.com/account-billing/index.html

Free tier:

- https://aws.amazon.com/free/
- How do I make sure I don't incur charges when I'm using the AWS Free Tier? https://aws.amazon.com/premiumsupport/knowledge-center/free-tier-charges/

Cloud cost estimates for Terraform in pull requests - https://github.com/infracost/infracost - https://www.infracost.io

https://www.lastweekinaws.com/blog/the-key-to-unlock-the-aws-billing-puzzle-is-architecture/ (taken from https://danielcompton.net/penny-wise-cloud-foolish)

https://www.economize.cloud

Infracost - https://www.infracost.io
