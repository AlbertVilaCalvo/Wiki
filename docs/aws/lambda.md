---
title: Lambda
---

https://aws.amazon.com/lambda

Quotas (limits) - https://docs.aws.amazon.com/general/latest/gr/lambda-service.html - https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html

> The most important limitation of a Lambda function is the maximum duration of 900 seconds per invocation. (AWS in Action p. 203)

https://github.com/awslabs/aws-lambda-powertools-typescript

Cheatseet - https://digitalcloud.training/aws-lambda/

Serverless Application Repository - https://serverlessrepo.aws.amazon.com/applications

Web Application reference architecture - https://github.com/aws-samples/lambda-refarch-webapp

Tutorial - https://aws.amazon.com/getting-started/hands-on/amazon-s3-object-lambda-to-dynamically-watermark-images/

Build a serverless retail solution for endless aisle on AWS - https://aws.amazon.com/blogs/architecture/building-serverless-endless-aisle-retail-architectures-on-aws - from [Top Architecture Blog Posts of 2023](https://aws.amazon.com/blogs/architecture/top-architecture-blog-posts-of-2023/)

Lambda is a regional service.

Issues to Avoid When Implementing Serverless Architecture with AWS Lambda - https://aws.amazon.com/blogs/architecture/mistakes-to-avoid-when-implementing-serverless-architecture-with-lambda/ - From https://aws.amazon.com/blogs/architecture/top-10-architecture-blog-posts-of-2021/

:::info
The Arm architecture based on AWS Graviton is the cheaper option. See https://aws.amazon.com/blogs/apn/comparing-aws-lambda-arm-vs-x86-performance-cost-and-analysis-2/ and https://aws.amazon.com/lambda/pricing/
:::

## Access to VPC resources

Giving Lambda functions access to resources in an Amazon VPC - https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html
