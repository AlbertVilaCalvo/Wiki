---
title: AWS
---

Documentation: https://docs.aws.amazon.com

re:Post - https://www.repost.aws

What's new (announcements) - https://aws.amazon.com/new

AWS News Blog - aws.amazon.com/blogs/aws

Reddit - https://www.reddit.com/r/aws/

Service status - https://health.aws.amazon.com/health/status

re:Invent - https://reinvent.awsevents.com

Prescriptive Guidance - https://aws.amazon.com/prescriptive-guidance

Whitepapers & Guides - https://aws.amazon.com/whitepapers

Architecture examples and diagrams - https://aws.amazon.com/architecture

Hands-on Tutorials - https://aws.amazon.com/getting-started/hands-on

Services available on each region - https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services - https://awsservices.info - https://services.adlinga.com/services

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

Introduction to DevOps on AWS - https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/introduction-to-devops.html

A Comprehensive Guide to Building a Scalable Web App on Amazon Web Services - Part 1 - https://archive.ph/j72xI

The Good Parts of AWS - https://dvassallo.gumroad.com/l/aws-good-parts - By https://dvassallo.com - https://stackoverflow.com/users/222908/daniel-vassallo

:::info
**Everything in AWS is an API call.** It doesn’t matter whether you are using the management console, the command line interface or writing code using an SDK — you are always interacting with an API.

AWS is API driven. You can automate everything. Automation increases reliability and efficiency.

APIs is one of the reasons why AWS has been so successful.
:::

## Training Learning

https://www.aws.training

https://explore.skillbuilder.aws/learn

https://www.awseducate.com - https://aws.amazon.com/education/awseducate → Really basic

Ramp-Up Guides (guides to learning the AWS Cloud) - https://aws.amazon.com/training/ramp-up-guides

AWS Debug Games - https://games.cloudonaut.io

AWS guides and templates - https://aws.amazon.com/startups/build

## Global Infrastructure

https://aws.amazon.com/about-aws/global-infrastructure/

### Regions

Most services are region-specific, except for IAM, CDN (CloudFront) and DNS (Route 53), which are global ([more info](https://stackoverflow.com/questions/68811957/aws-global-services)). Note that at the web console, when you go to the IAM Dashboard, the region at the navigation bar is "Global" and you can't select any region like "N. Virginia".

Regions are independent; data isn't transferred between regions.

Not all services are available on all regions, see https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services, [AWS Service Availability Tool](https://awsservices.info) and [AWS Services Matrix](https://services.adlinga.com/services).

:::info
For **disaster recovery**, deploy across multiple **regions**.
For **high availability**, deploy across multiple **availability zones** for redundancy and quickly fail over to another AZ.
:::

### Availability zones

:::warning
AWS charges $0.01/GB for network traffic between availability zones. See [Overview of Data Transfer Costs for Common Architectures](https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/) and [Data Transfer within the same AWS Region](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer_within_the_same_AWS_Region).

Note that you pay twice: for outbound and inbound traffic. From [The hidden cross AZ cost: how we reduced AWS Data Transfer cost by 80%](https://medium.com/@debyroth340/the-hidden-cross-az-cost-how-we-reduced-aws-data-transfer-cost-by-80-836b6d06886d):

> Effectively, it’s 0.02$ per GB since each transferred gigabyte counted as 2GB on the bill: once for sending and second for receiving.

See [Understanding AWS Network Traffic Costs](https://aws.plainenglish.io/understanding-aws-network-traffic-costs-8e95542e1d84) for more network costs.
:::

Regions, Availability Zones, and Local Zones - https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html

A region consist of (typically) 3 or more availability zones, located in the same area but isolated and physically separate from each other. Each availability zone consist of one or more data centers — we don’t know how many because AWS doesn’t make information about their data centers publicly available.

From AWS in Action p. 388:

- Some services are global, like IAM, CDN (CloudFront) and DNS (Route 53).
- Some services operate over multiple availability zones within a region, like S3, EFS and DynamoDB. They can withstand an availability zone outage by default.
- Some services can optionally fail over into another availability zone, like RDS with [Multi-AZ](https://aws.amazon.com/rds/features/multi-az/), and EC2 with [Auto Scaling](https://aws.amazon.com/ec2/autoscaling/).

Also see which servies are fault tolerant at page 433.

To distribute resources across availability zones, when creating an AWS account, AWS randomly maps AZ identifiers (eg eu-west-1a) to different AZ data centers (eg use1-az4) for each account. You can see this mapping at the VPC console, at the Subnets page, at the columns "Availability Zone" and "Availability Zone ID". You can check that the mapping is different for different accounts by running `aws ec2 describe-availability-zones --region eu-west-1 --profile <profile>` with two different profiles, and you may get this different responses:

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

## Things to do when you create an AWS account

With the root user.

- Enable MFA for the root user [link](/aws/root-user#multi-factor-authentication-mfa)
- Set the account alias (at the IAM dashboard). It's easier to remember than the account id
  - Note that the account alias must be globally unique, since it's used to generate the sign-in URL (eg `https://albert.signin.aws.amazon.com/console`). It can be changed later.
  - Do not confuse the account alias with the account name, which is defined when you create the AWS account, and it helps you identify the account. It can also be changed.
- Enable IAM access to billing (so that non-root users can have access to billing) [link](/aws/billing-pricing#enable-iam-access-to-billing)
- Enable PDF invoices delivery by email [link](/aws/billing-pricing#enable-pdf-invoices-delivery-by-email)
- Enable free tier alerts [link](/aws/billing-pricing#enable-free-tier-alerts)
- Enable CloudWatch billing alerts and create one or more budgets [link](/aws/billing-pricing#create-budget-and-enable-cloudwatch-billing-alarmalert)
- Create the first IAM admin user [link](/aws/iam#create-the-first-iam-admin-user)
  - Once the admin is created, enable MFA for it using the root account [link](/aws/iam#add-mfa-to-other-users)
- Enforce MFA to users [link](/aws/iam#enforce-mfa-to-users)
- At the S3 dashboard, at the "Block Public Access settings for this account" page, enable "Block _all_ public access" to disable public access for _all_ S3 buckets in the account [link](/aws/s3#block-all-public-access-for-all-buckets-in-the-account)
- Enable regions that are not enabled by default, eg "Europe (Spain)". This is done by clicking Account at the top right

## Tags

Tagging enables customers to group sets of resources for cost reporting and automation, such as patching for select tagged instances and grouping resources that make up a microservice, application, or workload.

Guidance for Tagging on AWS - https://aws.amazon.com/solutions/guidance/tagging-on-aws/

Tag policies: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html

Resource groups: a collection of resources that shares one or more tags. https://docs.aws.amazon.com/ARG/latest/userguide/resource-groups.html

[Cost allocation tags](/aws/billing-pricing#cost-allocation-tags)

## Multiple accounts

TODO move this to a new doc?

With multiple accounts you can isolate resources, for example development and production resources.

For disaster recovery, it's also recommended to place the duplicated workloads in separate accounts. See [Designing for multi-account scenarios using AWS Disaster Recovery Service](https://aws.amazon.com/blogs/storage/designing-for-multi-account-scenarios-using-aws-disaster-recovery-service/)

Control Tower: https://aws.amazon.com/controltower

AWS Control Tower vs Terraform - https://www.reddit.com/r/aws/comments/yv1tx4/aws_control_tower_vs_terraform/

AWS Organizations: https://aws.amazon.com/organizations

Setting up a secure and scalable multi-account AWS environment - https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-aws-environment/welcome.html

Organizing Your AWS Environment Using Multiple Accounts (AWS Whitepaper) - https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/organizing-your-aws-environment.html - [Also available in PDF](https://docs.aws.amazon.com/pdfs/whitepapers/latest/organizing-your-aws-environment/organizing-your-aws-environment.pdf)

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
