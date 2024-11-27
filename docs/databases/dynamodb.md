---
title: DynamoDB
---

Tutorials - https://www.youtube.com/c/EnricoPortolan/search?query=dynamodb

Tutorial - Create and Query a NoSQL Table with Amazon DynamoDB - https://aws.amazon.com/tutorials/create-nosql-table/

Amazon DynamoDB Learning Plan - https://explore.skillbuilder.aws/learn/public/learning_plan/view/1840/amazon-dynamodb-learning-plan

On-demand price reduction - https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-dynamo-db-reduces-prices-on-demand-throughput-global-tables/

## CLI

```shell
aws dynamodb put-item --table-name Users --item '{"Name": {"S": "Albert Einstein"}, "DOB": {"S": "1879-03-14"}}'
```

## Single table design

https://www.reddit.com/r/aws/comments/xq1p6s/comment/iq7m7g4/
