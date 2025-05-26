---
title: EventBridge
---

https://aws.amazon.com/eventbridge

https://docs.aws.amazon.com/eventbridge

Serverless event bus. Can invoke over 200 AWS services as a target. You can schedule events with [EventBridge Scheduler](https://aws.amazon.com/eventbridge/scheduler/).

Building event-driven architectures on AWS (EventBridge workshop) - https://catalog.workshops.aws/building-event-driven-architectures-on-aws/en-US

How to Use Amazon EventBridge to Build Decoupled, Event-Driven Architectures - https://pages.awscloud.com/AWS-Learning-Path-How-to-Use-Amazon-EventBridge-to-Build-Decoupled-Event-Driven-Architectures_2020_LP_0001-SRV.html - The first video is very good at explaining why and how to decouple services with an event bus (is available [at YouTube](https://www.youtube.com/watch?v=TXh5oU_yo9M) too).

Serverless 101: Amazon EventBridge - https://www.youtube.com/watch?v=e3sevLjtIQg

Event examples (from AWS in Action p. 191):

- CloudTrail emits an event for every call to the AWS API (if CloudTrail is enabled in the AWS account and region).
- EC2 emits events whenever the state of an EC2 instances changes (eg from `Pending` to `Running`).
- AWS emits an event to notify you of service degradations or downtimes.

[Global endpoints](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-global-endpoints.html) allow you to fail over event ingestion automatically to a secondary Region during service disruptions, without the need for manual intervention. See workshop https://catalog.workshops.aws/building-event-driven-architectures-on-aws/en-US/eventbridge/global-endpoint
