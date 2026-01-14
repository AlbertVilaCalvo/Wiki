---
title: App Runner
---

https://aws.amazon.com/apprunner

PaaS for containers. Scales the container instances up and down automatically. Load balances requests among containers.

When the application is not serving requests, you only pay for the provisioned memory. When it does, you pay for the memory and compute (vCPU).

Fargate vs. App Runner - https://cloudonaut.io/fargate-vs-apprunner

https://aws.github.io/copilot-cli

## CLI

https://docs.aws.amazon.com/cli/latest/reference/apprunner/index.html

```shell
aws apprunner create-service \
  --service-name simple \
  --source-configuration '{"ImageRepository": {"ImageIdentifier": "public.ecr.aws/s5r5a1t5/simple:latest", "ImageRepositoryType": "ECR_PUBLIC"}}'
```

```shell
aws apprunner list-services
```

```shell
aws apprunner delete-service --service-arn <service-arn>
```
