---
title: Kafka
---

https://kafka.apache.org

Event Sourcing and Message Streaming are NOT the same things. Kafka is NOT suitable for Event Sourcing. Kafka is suitable for Message Streaming. - https://www.linkedin.com/posts/vaughnvernon_event-sourcing-and-message-streaming-are-activity-7153936417142788097-gxTv/

https://www.confluent.io

https://www.warpstream.com

https://aws.amazon.com/msk

https://www.conduktor.io

https://redpanda.com - See https://news.ycombinator.com/item?id=43098971

https://github.com/provectus/kafka-ui

Kaskade – A text user interface for Kafka - https://github.com/sauljabin/kaskade - https://news.ycombinator.com/item?id=40961101

Best practices for cost-efficient Kafka clusters - https://stackoverflow.blog/2024/09/04/best-practices-for-cost-efficient-kafka-clusters

Build your own Kafka - https://app.codecrafters.io/courses/kafka/overview

What Every Software Engineer Should Know about Apache Kafka: Events, Streams, Tables, Storage, Processing, And More - https://news.ycombinator.com/item?id=23206566 - https://www.michael-noll.com/blog/2020/01/16/what-every-software-engineer-should-know-about-apache-kafka-fundamentals/

I wrote a children's book / illustrated guide to Apache Kafka - https://news.ycombinator.com/item?id=27541339 - https://www.gentlydownthe.stream

Kafka is fast -- I'll use Postgres - https://news.ycombinator.com/item?id=45747018 - https://topicpartition.io/blog/postgres-pubsub-queue-benchmarks

RabbitMQ vs Kafka: Which Platform to Choose in 2023? - https://news.ycombinator.com/item?id=37574552 - https://eranstiller.com/rabbitmq-vs-kafka

RabbitMQ vs Kafka - ¿Cuál escoger? - https://www.youtube.com/watch?v=IZh8wB9PSqo

[Kafka at the low end: how bad can it get?](https://broot.ca/kafka-at-the-low-end.html) - https://news.ycombinator.com/item?id=43095070

> Kafka is not a good job queue, especially not at particularly low volumes, at least until [Queues for Kafka (KIP-932)](https://www.confluent.io/blog/queues-on-kafka/) comes along.

## Learn

What is Apache Kafka? - https://www.confluent.io/what-is-apache-kafka - https://www.youtube.com/watch?v=06iRM1Ghr1k

https://developer.confluent.io/courses

https://developer.confluent.io/tutorials

https://courses.datacumulus.com

https://developers.redhat.com/learn/apache-kafka

https://developers.redhat.com/devnation/event-driven-architecture

https://university.redpanda.com

https://kodekloud.com/courses/event-streaming-with-kafka

## Queues

KIP-932: Queues for Kafka - https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka

https://news.ycombinator.com/item?id=37677341

Early access in 4.0 - https://www.confluent.io/blog/latest-apache-kafka-release/

> This KIP introduces the concept of a share group as a way of enabling cooperative consumption using Kafka topics. It does not add the concept of a “queue” to Kafka per se, but rather introduces cooperative consumption to accommodate these queuing use-cases, using regular Kafka topics. Share groups make this possible. You can think of a share group as roughly equivalent to a “durable shared subscription” in existing systems.

Introduced in 4.2 - https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/

> Introduces share groups, a new cooperative consumption model where multiple consumers can concurrently process records from the same partitions with individual acknowledgment and delivery counting - enabling queue-like use cases without strict partition-to-consumer assignment.

## Apache Kafka vs RabbitMQ

https://www.linkedin.com/posts/sahnlam_apache-kafka-vs-rabbitmq-kafka-and-rabbitmq-activity-7442061433485508608-mXes/

> Kafka and RabbitMQ both handle messages, but they solve different problems.
>
> Kafka is a distributed log. Producers append messages to partitions. Those messages are stored based on retention policy. Consumers pull messages using offsets. You can rewind, replay, reprocess everything. It is designed for high throughput event streaming where multiple consumers consume the same data independently.
>
> RabbitMQ is a message broker. Producers publish messages to exchanges. Those exchanges route to queues based on binding keys and patterns (direct, topic, fanout). Messages get pushed to consumers and then deleted once acknowledged. It is built for task distribution and traditional messaging workflows.
>
> The common mistake is using Kafka like a queue or RabbitMQ like an event log. They're different tools built for different use cases.
