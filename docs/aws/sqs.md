---
title: SQS
---

https://aws.amazon.com/sqs

_Fully managed message queuing for microservices, distributed systems, and serverless applications._

_Secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components._

With SQS you can decouple services so that they can run and fail independently, which lets you build applications that are easy to scale and **fault-tolerant**. You can have as many consumer as you want, running in parallel. And if a consumer fails, the message will be returned to the queue after the [visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) and will be picked by another consumer, making the application fault-tolerant.

The queue acts as a **buffer**. Producers and consumers don’t have to run at the same speed. You can have a spike of messages being produced, and the consumers will keep processing them until the queue becomes empty again. You can even stop all consumers and still produce messages, which is handy while doing maintenance on your consumers.

Producers and consumers are asynchronously decoupled. They don’t know each other; they both only know about the message queue.

Characteristics:

- Unlimited number of transactions per second (for Standard queues, not FIFO queues).
- Pay per message. No minimum fee.
- Highly available. From the [FAQs](https://aws.amazon.com/sqs/faqs/): _How reliable is the storage of my data in Amazon SQS? Amazon SQS stores all message queues and messages within a single, highly-available AWS region with multiple redundant Availability Zones (AZs), so that no single computer, network, or AZ failure can make messages inaccessible_.

Tutorial: Send Messages Between Distributed Applications with Amazon Simple Queue Service - https://aws.amazon.com/getting-started/hands-on/send-messages-distributed-applications

https://stackoverflow.com/questions/2336438/emulating-amazon-sqs-during-development

## SQS vs SNS vs MQ

Differences between Amazon SQS, Amazon MQ, and Amazon SNS - https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html#sqs-difference-from-amazon-mq-sns

> Amazon SNS is ideal for scenarios requiring immediate notifications, such as real-time user engagement or alarm systems. To prevent message loss when subscribers are offline, integrating Amazon SNS with Amazon SQS queue messages ensures consistent delivery.

What is the difference between Amazon SNS and Amazon SQS? - https://stackoverflow.com/questions/13681213/what-is-the-difference-between-amazon-sns-and-amazon-sqs

SQS isn’t a message broker like ActiveMQ—SQS is only a message queue. Don’t expect features like message routing or message priorities. Comparing SQS to ActiveMQ is like comparing DynamoDB to MySQL. (AWS in Action p. 408)

## Fanout pattern with SQS and SNS

Push messages to multiple subscribers at once. Multiple SQS queues subscribe to an SNS topic. SNS sends identical copies of a message to multiple queues in parallel.

SQS Queues and SNS Notifications – Now Best Friends - https://aws.amazon.com/blogs/aws/queues-and-notifications-now-best-friends/

> One common design pattern is called “fanout.” In this pattern, a message published to an SNS topic is distributed to a number of SQS queues in parallel. By using this pattern, you can build applications that take advantage parallel, asynchronous processing. For example, you could publish a message to a topic every time a new image is uploaded. Independent processes, each reading from a separate SQS queue, could generate thumbnails, perform image recognition, and store metadata about the image.

Tutorial: Send Fanout Event Notifications - https://aws.amazon.com/getting-started/hands-on/send-fanout-event-notifications/

## Standard vs FIFO queues

| [Standard](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html)     | [FIFO](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-fifo-queues.html)           |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Nearly unlimited number of transactions per second                                                              | Up to 3,000 messages per second with batching or up to 300 send, receive, or delete operations per second without |
| Message is delivered **at least once**, but occasionally more than one copy of a message is delivered           | Each message is delivered **exactly once**                                                                        |
| Best-effort ordering. Occasionally, messages might be delivered in an order different from which they were sent | Message order is preserved                                                                                        |
| When very high throughput is important                                                                          | When the order of operations and events is critical, or where duplicates can't be tolerated                       |

The name of a FIFO queue must end with the `.fifo` suffix.

## CLI

https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/index.html

[get-queue-attributes](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/get-queue-attributes.html)

```shell
aws sqs get-queue-attributes \
 --queue-url "https://sqs.us-east-1.amazonaws.com/<account-id>/<queue-name>" \
 --attribute-names All
```

```shell
aws sqs get-queue-attributes \
 --queue-url "https://sqs.us-east-1.amazonaws.com/<account-id>/<queue-name>" \
 --attribute-names ApproximateNumberOfMessages
```

[Send message](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sqs/send-message.html):

```shell
aws sqs send-message \
 --queue-url https://sqs.us-east-1.amazonaws.com/<account-id>/<queue-name> \
 --message-body "{\"id\": \"87C7C957\", \"url\": \"http://www.google.com\"}"
 --region=us-east-1
```
