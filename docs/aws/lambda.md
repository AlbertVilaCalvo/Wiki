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

## Execution role

https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html

An IAM role that grants the function permission to access AWS services and resources.

You can see which services the function has access to at the Configuration tab → Permissions → Resource summary.

In order for Lambda to properly assume your execution role, the role's trust policy must specify the Lambda service principal (`lambda.amazonaws.com`) as a trusted service:

```json title="trust_policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

The permissions policy of the default execution role allows the function to write CloudWatch logs:

```json title="permissions_policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:us-east-1:000111222333:*"
    },
    {
      "Effect": "Allow",
      "Action": ["logs:CreateLogStream", "logs:PutLogEvents"],
      "Resource": [
        "arn:aws:logs:us-east-1:000111222333:log-group:/aws/lambda/MyLambdaFunction:*"
      ]
    }
  ]
}
```

The AWS managed policy [`AWSLambdaBasicExecutionRole`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSLambdaBasicExecutionRole.html) has the same permissions, but it applies to any resource (`*`), thus it doesn't follow the least-privilege principal.

## Synchronous and Asynchronous execution

- https://docs.aws.amazon.com/lambda/latest/dg/invocation-sync.html
- https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html

From [invoke](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/invoke.html):

> You can invoke a function synchronously (and wait for the response), or asynchronously. By default, Lambda invokes your function synchronously (i.e. the `InvocationType` is `RequestResponse`).

> For synchronous invocation, details about the function response, including errors, are included in the response body and headers.

> For asynchronous invocation , Lambda adds events to a queue before sending them to your function. If your function does not have enough capacity to keep up with the queue, events may be lost. Occasionally, your function may receive the same event multiple times, even if no error occurs. To retain events that were not processed, configure your function with a [dead-letter queue](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq).

## CloudWatch alarm

> In general, we recommend creating an alarm on the Errors and Throttles metrics to monitor your Lambda functions. (AWS in Action p. 184)

Steps (for the Errors metric):

- Go to the [CloudWatch console](https://console.aws.amazon.com/cloudwatch) → "All alarms" and click "Create alarm".
- Click "Select metric" → Lambda → "By Function Name", select the metric "Errors" of the Lambda function and click "Select metric".
- At the page "Specify metric and conditions" set:
  - Statistic: Sum
  - Period: 5 minutes
  - Conditions:
    - Threshold type: Static
    - Whenever Errors is...: Greater (> threshold)
    - than...: 0
- At the page "Configure actions" set:
  - Alarm state trigger: In alarm
  - Send a notification to the following SNS topic: either use an existing SNS topic if you already have one, or create a new one named "Lambda XYZ health check" (you need to add your email and click "Create topic")
- At the page "Add name and description" give it the name "Lambda XYZ health check error"
- Proceed until the end

You'll immediately receive an email to confirm the subscription (AWS Notification - Subscription Confirmation).

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/index.html

[Invoke](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/invoke.html):

```json title=payload.json
{
  "email": "a@b.c"
}
```

```shell
aws lambda invoke --function-name MyFunction --payload fileb://payload.json response.json
```

Note the 'b' in 'fileb', it indicates a binary file.

## Access to VPC resources

Giving Lambda functions access to resources in an Amazon VPC - https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html
