---
title: AWS
---

Documentation: https://docs.aws.amazon.com

re:Post - https://www.repost.aws

What's new (announcements) - https://aws.amazon.com/new

AWS News Blog - aws.amazon.com/blogs/aws

Reddit - https://www.reddit.com/r/aws/

re:Invent - https://reinvent.awsevents.com

Whitepapers & Guides - https://aws.amazon.com/whitepapers

Ramp-Up Guides (guides to learning the AWS Cloud) - https://aws.amazon.com/training/ramp-up-guides

Architecture examples and diagrams - https://aws.amazon.com/architecture

Services available on each region - https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services - https://awsservices.info

Back to Basics video series: https://aws.amazon.com/es/architecture/back-to-basics

Open guide: https://github.com/open-guides/og-aws

DevOps exercises: https://github.com/bregman-arie/devops-exercises/blob/master/topics/aws/README.md → Some solutions include Terraform and Pulumi

https://github.com/topics/aws

https://github.com/aws

https://github.com/aws-samples

https://github.com/awslabs

https://github.com/donnemartin/awesome-aws

https://github.com/thyagomota/aws-labs - https://github.com/thyagomota/aws-labs-2023

https://www.101daysofdevops.com/courses/100-days-of-aws/

Local Stack - https://www.localstack.cloud - https://github.com/localstack/localstack

AWS deprecations, breaking changes and price increases - https://github.com/SummitRoute/aws_breaking_changes

AWS’s Egregious Egress - https://blog.cloudflare.com/aws-egregious-egress

Serverless Patterns Collection - https://serverlessland.com/patterns

AWS observability in Grafana Cloud - https://grafana.com/solutions/cloud-monitoring-aws

Amazon Web Services In Plain English - https://expeditedsecurity.com/aws-in-plain-english - https://news.ycombinator.com/item?id=27948209

A Comprehensive Guide to Building a Scalable Web App on Amazon Web Services - Part 1 - https://archive.ph/j72xI

:::tip Important
Everything in AWS is an API call.

AWS is API driven. You can automate everything. Automation increases reliability and efficiency.
:::

## Regions

https://aws.amazon.com/about-aws/global-infrastructure/

Most services are region-specific, except for IAM, CDN (CloudFront) and DNS (Route 53), which are global ([more info](https://stackoverflow.com/questions/68811957/aws-global-services)). Note that at the web console, when you go to the IAM Dashboard, the region at the navigation bar is "Global" and you can't select any region like "N. Virginia".

Regions are independent; data isn't transferred between regions.

Not all services are available on all regions, see https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services and https://awsservices.info

## Availability zones

:::warning
AWS charges $0.01/GB for network traffic between availability zones. See [Overview of Data Transfer Costs for Common Architectures](https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/) and [Data Transfer within the same AWS Region](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer_within_the_same_AWS_Region).

Note that you pay twice: for outbound and inbound traffic. From [The hidden cross AZ cost: how we reduced AWS Data Transfer cost by 80%](https://medium.com/@debyroth340/the-hidden-cross-az-cost-how-we-reduced-aws-data-transfer-cost-by-80-836b6d06886d):

> Effectively, it’s 0.02$ per GB since each transferred gigabyte counted as 2GB on the bill: once for sending and second for receiving.

See [Understanding AWS Network Traffic Costs](https://aws.plainenglish.io/understanding-aws-network-traffic-costs-8e95542e1d84) for more network costs.
:::

A region consist of (typically) 3 or more availability zones, located in the same area but isolated and physically separate from each other. Each availability zone consist of one or more data centers — we don’t know how many because AWS doesn’t make information about their data centers publicly available.

From AWS in Action p. 388:

- Some services are global, like IAM, CDN (CloudFront) and DNS (Route 53).
- Some services operate over multiple availability zones within a region, like S3, EFS and DynamoDB. They can withstand an availability zone outage by default.
- Some services can optionally fail over into another availability zone, like RDS with [Multi-AZ](https://aws.amazon.com/rds/features/multi-az/), and EC2 with [Auto Scaling](https://aws.amazon.com/ec2/autoscaling/).

To distribute resources across availability zones, when creating an AWS account, AWS randomly maps AZ identifiers (eg eu-west-1a) to different AZ data centers (eg use1-az4) for each account. You can see this by running `aws ec2 describe-availability-zones --region eu-west-1 --profile <profile>` with two different profiles, and you may get this different responses:

```json
{
  "RegionName": "eu-west-1",
  "ZoneName": "eu-west-1a",
  "ZoneId": "euw1-az1"
}
```

```json
{
  "RegionName": "eu-west-1",
  "ZoneName": "eu-west-1a",
  "ZoneId": "euw1-az2"
}
```

## Remove all resources from an AWS account

- https://github.com/rebuy-de/aws-nuke
- https://github.com/gruntwork-io/cloud-nuke

## Top architecture blog posts

- 2020 - https://aws.amazon.com/blogs/architecture/top-15-architecture-blog-posts-of-2020/
- 2021 - https://aws.amazon.com/blogs/architecture/top-10-architecture-blog-posts-of-2021/
- 2022 - https://aws.amazon.com/blogs/architecture/top-10-aws-architecture-blog-posts-of-2022/
- 2023 - https://aws.amazon.com/blogs/architecture/top-architecture-blog-posts-of-2023/

## Training Learning

https://www.aws.training

https://explore.skillbuilder.aws/learn

https://www.awseducate.com - https://aws.amazon.com/education/awseducate → Really basic

AWS Debug Games - https://games.cloudonaut.io

AWS guides and templates - https://aws.amazon.com/startups/build

## Things to do when you create an AWS account

With the root user.

- Enable MFA for the root user [link](/aws/root-user#multi-factor-authentication-mfa)
- Set the account alias (at the IAM dashboard)
- Enable IAM access to billing (so that non-root users can have access to billing) [link](/aws/billing-pricing#enable-iam-access-to-billing)
- Enable free tier alerts [link](/aws/billing-pricing#enable-free-tier-alerts)
- Enable CloudWatch billing alerts and create one or more budgets [link](/aws/billing-pricing#create-budget-and-enable-cloudwatch-billing-alarmalert)
- Create the first IAM admin user [link](/aws/iam#create-the-first-iam-admin-user)
  - Once the admin is created, enable MFA for it using the root account [link](/aws/iam#add-mfa-to-other-users)
- Enforce MFA to users [link](/aws/iam#enforce-mfa-to-users)
- At the S3 dashboard, at the "Block Public Access settings for this account" page, enable "Block _all_ public access" to disable public access for _all_ S3 buckets in the account [link](/aws/s3#block-all-public-access-for-all-buckets-in-the-account)

## Multiple accounts

Control Tower: https://aws.amazon.com/controltower

AWS Control Tower vs Terraform - https://www.reddit.com/r/aws/comments/yv1tx4/aws_control_tower_vs_terraform/

AWS Organizations: https://aws.amazon.com/organizations

https://www.leapp.cloud - https://github.com/Noovolari/leapp

Do I need multiple AWS accounts? - https://docs.aws.amazon.com/accounts/latest/reference/welcome-multiple-accounts.html

Transitioning to multiple AWS accounts (Prescriptive Guidance) - https://docs.aws.amazon.com/prescriptive-guidance/latest/transitioning-to-multiple-aws-accounts/welcome.html

You should have lots of AWS accounts - https://news.ycombinator.com/item?id=33069547 - https://www.reddit.com/r/aws/comments/xuq73y/you_should_have_lots_of_aws_accounts/ - https://src-bin.com/you-should-have-lots-of-aws-accounts/

Create six AWS accounts (logs, security, shared, dev, stage, and prod) - https://www.gruntwork.io/reference-architecture

- Logs: AWS Config, CloudTrail
- Security: IAM Roles, Users, Gropus, MFA
- Shared: shared Docker images, shared AMIs, CI/CD (Jenkins/CircleCI...)
- Dev/Stage/Prod: CloudFront, S3, Route53, VPC, ECS, EKS, RDS, Redis, Lambda, SQS, Kinesis, IaC Pipeline, CloudWatch, GuardDuty...

https://blog.gruntwork.io/a-comprehensive-guide-to-authenticating-to-aws-on-the-command-line-63656a686799

> There are two ways you can manage authentication: IAM Users in each account or IAM Users in one account and IAM roles in all the others.
