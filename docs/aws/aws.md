---
title: AWS
---

Documentation: https://docs.aws.amazon.com/index.html

re:Post - https://www.repost.aws

Whitepapers & Guides - https://aws.amazon.com/whitepapers

Ramp-Up Guides (guides to learning the AWS Cloud) - https://aws.amazon.com/training/ramp-up-guides

Architecture examples and diagrams - https://aws.amazon.com/architecture

Back to Basics video series: https://aws.amazon.com/es/architecture/back-to-basics

Open guide: https://github.com/open-guides/og-aws

DevOps exercises: https://github.com/bregman-arie/devops-exercises/blob/master/topics/aws/README.md -> Some solutions include Terraform and Pulumi

https://github.com/topics/aws

https://github.com/aws

https://github.com/aws-samples

https://github.com/awslabs

https://github.com/donnemartin/awesome-aws

https://www.101daysofdevops.com/courses/100-days-of-aws/

Local Stack - https://www.localstack.cloud - https://github.com/localstack/localstack

AWS’s Egregious Egress - https://blog.cloudflare.com/aws-egregious-egress

Serverless Patterns Collection - https://serverlessland.com/patterns

Clean all account resources - https://github.com/gruntwork-io/cloud-nuke

:::tip Important
Everything in AWS is an API call.
:::

## Things to do when you create an AWS account

With the root user.

- Enable MFA for the root user [link](/aws/iam#root-user-multi-factor-authentication-mfa)
- Set the account alias (at the IAM dashboard)
- Enable IAM access to billing (so that non-root users can have access to billing) [link](/aws/billing-pricing#enable-iam-access-to-billing)
- Enable free tier alerts [link](/aws/billing-pricing#enable-free-tier-alerts)
- Enable CloudWatch billing alerts and create one or more budgets [link](/aws/billing-pricing#create-budget-and-enable-cloudwatch-billing-alarmalert)
- Create the first IAM admin user [link](/aws/iam#create-the-first-iam-admin-user)
  - Once the admin is created, enable MFA for it
- Enforce MFA to users [link](/aws/iam#enforce-mfa-to-users)

## Multiple accounts

Control Tower: https://aws.amazon.com/controltower

AWS Control Tower vs Terraform - https://www.reddit.com/r/aws/comments/yv1tx4/aws_control_tower_vs_terraform/

AWS Organizations: https://aws.amazon.com/organizations

https://www.leapp.cloud - https://github.com/Noovolari/leapp

Transitioning to multiple AWS accounts (Prescriptive Guidance) - https://docs.aws.amazon.com/prescriptive-guidance/latest/transitioning-to-multiple-aws-accounts/welcome.html

You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/

Create six AWS accounts (logs, security, shared, dev, stage, and prod) - https://www.gruntwork.io/reference-architecture

- Logs: AWS Config, CloudTrail
- Security: IAM Roles, Users, Gropus, MFA
- Shared: shared Docker images, shared AMIs, CI/CD (Jenkins/CircleCI...)
- Dev/Stage/Prod: CloudFront, S3, Route53, VPC, ECS, EKS, RDS, Redis, Lambda, SQS, Kinesis, IaC Pipeline, CloudWatch, GuardDuty...

## Security

AWS Vault - https://github.com/99designs/aws-vault - Stores IAM credentials in your operating system's secure keystore

List of open source tools for AWS security: defensive, offensive, auditing, DFIR, etc. - https://github.com/toniblyx/my-arsenal-of-aws-security-tools

AWS security tool to perform security best practices assessments, audits, etc - https://github.com/prowler-cloud/prowler - https://prowler.pro

Analyze your Amazon Web Services (AWS) environments - https://github.com/duo-labs/cloudmapper

flAWS challenge (discover AWS-specific vulnerabilities) - http://flaws.cloud
