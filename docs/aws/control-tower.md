---
title: Control Tower
---

https://aws.amazon.com/controltower

User guide - https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html

Blog articles - https://aws.amazon.com/blogs/mt/category/management-tools/aws-control-tower/

Set up a multi-account environment based on best practices.

It automatically sets up AWS Organizations.

When you set up the landing zone, it creates:

- A management account and a Root OU that sits at the top of the organization hierarchy.
- 2 organizational units:
  - Security OU. Foundational. Required. Contains the Log Archive account and Audit account, known as shared accounts.
  - Sandbox OU. Additional. For the accounts you create, like dev and prod.
- 3 shared accounts: the management account, the Log Archive account and the Audit account.
- IAM Identity Center directory to manage users.
- Preventive guardrails and detective guardrails.
- Organization-level CloudTrail trail to aggregate logs for all accounts in the AWS Organization. Events are stored in an S3 bucket.
- Permissions that Control Tower needs to administer accounts and SCPs in the organization. For example, the roles AWSControlTowerAdmin, AWSControlTowerStackSetRole, AWSControlTowerCloudTrailRole and AWSControlTowerConfigAggregatorRoleForOrganizations.

https://www.thoughtworks.com/radar/tools/aws-control-tower

## Resources

Guidance for Establishing an Initial Foundation using Control Tower on AWS - https://aws.amazon.com/solutions/guidance/establishing-an-initial-foundation-using-control-tower-on-aws/ → Links to this whitepaper: https://docs.aws.amazon.com/whitepapers/latest/establishing-your-cloud-foundation-on-aws/welcome.html

Enable AWS Control Tower for Existing Organizations - https://www.youtube.com/watch?v=CwRy0t8nfgM

AWS Control Tower Overview and Landing Zone Hands-On - https://www.youtube.com/watch?v=3-aaw-B1j8Y

Provisioning access to security and audit teams in an AWS multi-account environment created by AWS Control Tower - https://aws.amazon.com/blogs/mt/provisioning-access-to-security-and-audit-teams-in-an-aws-multi-account-environment-created-by-aws-control-tower/

AWS re:Invent 2019: Architecting security & governance across your landing zone (SEC325-R2) - https://www.youtube.com/watch?v=zVJnenaD3U8

## AWS Control Tower Account Factory for Terraform

https://github.com/aws-ia/terraform-aws-control_tower_account_factory
