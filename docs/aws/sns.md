---
title: SNS
---

https://aws.amazon.com/sns/

_Fully managed Pub/Sub service for A2A and A2P messaging._

> Amazon SNS is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and event-driven serverless applications. Amazon SNS provides topics for high-throughput, push-based, many-to-many messaging.

From https://aws.amazon.com/about-aws/whats-new/2023/10/amazon-sns-in-place-message-archiving-replay-fifo-topics/

> Amazon SNS is a messaging service that supports Application-to-Application (A2A) communication. The A2A functionality provides topics for high-throughput, push-based, many-to-many messaging between distributed systems, microservices, and event-driven serverless applications. Amazon SNS Standard topics provide best-effort ordering and at-least-once-delivery, while Amazon SNS FIFO topics support strict ordering and exactly-once delivery. Both Standard and FIFO topics support message filtering and fanout to multiple subscriptions, with high durability and security.

https://catalog.workshops.aws/building-event-driven-architectures-on-aws/en-US/sns

> Amazon SNS is recommended when you want to build an application that reacts to high throughput or low latency messages published by other applications or microservices (as Amazon SNS provides nearly unlimited throughput), or for applications that need very high fan-out (thousands or millions of endpoints). Messages are unstructured and can be in any format.

Message filtering to route SNS messages to different SQS queues: https://catalog.workshops.aws/building-event-driven-architectures-on-aws/en-US/sns/filtering

![SNS message filtering](/img/sns-filter-sns_arch_filtering.png 'SNS message filtering')

What is the difference between Amazon SNS and Amazon SQS? - https://stackoverflow.com/questions/13681213/what-is-the-difference-between-amazon-sns-and-amazon-sqs

(Fanout Pattern) SQS Queues and SNS Notifications – Now Best Friends - https://aws.amazon.com/blogs/aws/queues-and-notifications-now-best-friends/

Topics are used to deliver the same message to multiple subscribers.

Supports different transfer protocols: HTTP, HTTPS, Email, Email-JSON, SMS and SQS.

Messages can be delivered to SQS queues, email addresses, mobile apps (push notifications), phone numbers (SMS text messages), Lambda functions, HTTP(S) endpoints (webhooks) and Kinesis Data Firehose streams. These are called endpoints.
