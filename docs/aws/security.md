---
title: Security
---

## Security

What do I do if I notice unauthorized activity in my AWS account? - https://repost.aws/knowledge-center/potential-account-compromise

AWS Vault - https://github.com/99designs/aws-vault - Stores IAM credentials in your operating system's secure keystore

List of open source tools for AWS security: defensive, offensive, auditing, DFIR, etc. - https://github.com/toniblyx/my-arsenal-of-aws-security-tools

AWS security tool to perform security best practices assessments, audits, etc - https://github.com/prowler-cloud/prowler - https://prowler.pro

Analyze your Amazon Web Services (AWS) environments - https://github.com/duo-labs/cloudmapper

flAWS challenge (discover AWS-specific vulnerabilities) - http://flaws.cloud - http://flaws2.cloud

From https://www.linkedin.com/posts/andreaswittig_amazonwebservices-awscommunity-cloudsecurity-activity-7219251299983187968-Ra6t/

> Hot take: Security Hub controls are becoming more of a sales tool for AWS than effective security best practices.
> AWS recently announced the following controls.
>
> - [GuardDuty.5] GuardDuty EKS Audit Log Monitoring should be enabled
> - [GuardDuty.6] GuardDuty Lambda Protection should be enabled
> - [GuardDuty.8] GuardDuty Malware Protection for EC2 should be enabled
> - [GuardDuty.9] GuardDuty RDS Protection should be enabled
> - [GuardDuty.10] GuardDuty S3 Protection should be enabled
> - [Inspector.1] Amazon Inspector EC2 scanning should be enabled
> - [Inspector.2] Amazon Inspector ECR scanning should be enabled
> - [Inspector.3] Amazon Inspector Lambda code scanning should be enabled
> - [Inspector.4] Amazon Inspector Lambda standard scanning should be enabled
>
> Most of these features are not worth the money, in my opinion.

## Trusted Advisor

Can be used to check if any S3 bucket in the account has "Block Public Access Enabled", see https://cloudonaut.io/s3-security-best-practice/#Rule-4-Monitor-Trusted-Advisor-findings
