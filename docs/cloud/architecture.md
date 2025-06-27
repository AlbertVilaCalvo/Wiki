---
title: Architecture
---

https://bytebytego.com - https://highscalability.com

https://github.com/donnemartin/system-design-primer

https://github.com/karanpratapsingh/system-design - https://www.karanpratapsingh.com/courses/system-design - https://leanpub.com/systemdesign

https://github.com/bregman-arie/system-design-notebook

https://github.com/binhnguyennus/awesome-scalability

https://www.developertoarchitect.com - Mark Richards

Software Architecture Monday - https://www.developertoarchitect.com/lessons/ - https://www.youtube.com/@markrichards5014

Cloud design patterns - https://learn.microsoft.com/en-us/azure/architecture/patterns/

Engineering at N26: a Tour of our Tech Stack and Architecture - https://medium.com/insiden26/engineering-at-n26-a-tour-of-our-tech-stack-and-architecture-9e58ce96f889

https://github.com/ByteByteGoHq/system-design-101

Self-contained Systems - https://scs-architecture.org

https://github.com/dapr/dapr - https://dapr.io

Virtual Waiting Room on AWS - To sell concert tickets. Uses an SQS queue - https://aws.amazon.com/solutions/implementations/virtual-waiting-room-on-aws/

## Coupling

https://en.wikipedia.org/wiki/Coupling_(computer_programming)

Loose coupling benefit: reduce interdependencies so a failure in one component does not cascade to other components.

Stamp coupling: modules share a data structure, but each modules only uses a part (a subset of fields) of it. You overspecify a contract, which creates coupling.

## Synchronous vs Asynchronous communication

:::tip
If you want to make a process asynchronous, you must manage the way the process initiator tracks the process status. One way of doing that is to return an ID to the initiator that can be used to look up the process. During the process, this ID is passed from step to step. (AWS in Action p. 401.)

When designing an asynchronous process, it’s important to keep track of the process. You need some kind of identifier for it. (AWS in Action p. 441.)
:::

Sync:

- Easy to communicate the end result (success or error) to the user.

Async:

- Fire and forget.
- More resilient: if the consumer of the event is down, we can buffer the events in a queue and continue later.
- Complex to build and debug.
- Error handling is difficult.
- Transactions are difficult.
- Highly decoupled systems.
- Performance hit due to communication, work done in multiple services etc.
- High performance and scalability.

## Atomic vs Eventual consistency

Atomicity: we do it at the application layer, not the database.

Compensating updates can fail.

## ACID vs BASE transactions

ACID:

- Atomicity, consistency, isolation and durability
- All updates or nothing

BASE:

- Basic availability, soft state and eventual consistency
- For distributed systems

Even if services are sharing the same database, we don't support ACID transactions

BASE Transactions and Eventual Consistency - https://www.youtube.com/watch?v=I47J2I-SVi0

From https://chrisrichardson.net/virtual-bootcamp-distributed-data-management.html

> To ensure a loose coupling, you can only use ACID transactions within a service. Between services, you must implement transactions using the Saga pattern and queries using the API Composition and CQRS patterns. As a result, it’s no longer straightforward to implement transactions and queries that are correct, efficient and resilient.

## Orchestration vs choreography coordination

Orchestration:

- The orchestrator owns the state. For example, the state of an order in the orchestrator can be created, payment_applied, order_shipped, order_complete...
- Each major workflow will have its own orchestrator.
- The orchestrator is a single point of failure. If it fails, nothing works. But if the state is persisted, we can continue processing when it's back.
- Each service is independent, and they do not communicate each other (the only talk to the orchestrator), so they are highly decoupled.
- Error handling is done by the orchestrator. For example, if there's no items to fulfill an order, it's the orchestrator who decides what to do. Services are simpler as a result.

Choreography:

- Services communicate directly. They need to know each other, and thus are more complex.
- Much more responsive, scalable and fault tolerant.
- Error workflows are very complex. They require additional communication between services. Error handling is an architectural concern.
  - We can extract error handling into an orchestrator for errors to simplify services and reduce its communication.
- It's difficult to know what's the overall state. For example, if we want to know the status of an order. There may be a service that is the state owner. State ownership is an architectural concern.

## Sagas

https://learn.microsoft.com/en-us/azure/architecture/patterns/saga

**Avoid atomic + async together, and choreography + sync.**

Epic

- All synchronous communication -> easy to communicate the end result (success/error) to the user.
- Blocking calls -> long time to run.
  - If there are 3 calls to be done, and each call takes x time, it will take 3x.
  - If there's an error and we have to compensate, it's 5x.
- Easy to understand because it mimics synchronous method calls, but difficult to implement.
- Most coupled solution, thus not scalable.
- Often the first thing you attempt.
- Sometimes the output of a step needs to be the input of another step, so synchronous is required.

Fantasy fiction story

- Much faster communication. No need to wait for a response. We can interact with various services in parallel.
  - If there are 3 calls to be done, and each one takes x time, it will take 1x.
- More responsive and better performance.
- There can be concurrency issues.
- Fix attempt at fixing the epic saga due to performance problems.
- Consistency hurts communication. Coordination to achieve atomic workflows.

Fairy tale

- Eventually consistent -> more responsive. We are doing an early return.
- When an error happens, if compensating updates fail, we are in an inconsistent state.
  - If there is an error and I have to compensate, and there are 3 calls to be done, and each call takes x time this case, total is 3x.
- Best simplicity and scalability.

Parallel

- Allows for complex workflows.
- Very responsive and scalable.

Phone tag

- Least common.

Horror story

- Hardest one to reason about.
- Anti-pattern.

Time travel

- No concurrency -> easy to reason about.

Anthology

- Opposite of epic
- Decoupled, responsive and scalable.

## Distributed Systems

Avoiding fallback in distributed systems - https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/ - https://d1.awsstatic.com/builderslibrary/pdfs/avoiding-fallback-in-distributed-systems.pdf

https://www.thoughtworks.com/radar/platforms/restate

> We still maintain that it's best to avoid distributed transactions in distributed systems, because of both the additional complexity and the inevitable additional operational overhead involved

Microservices first? https://arnon.me/2025/03/services-vs-monoliths-tradeoffs/

### The Eight Fallacies of Distributed Computing

1. The network is reliable
2. Latency is zero
3. Bandwidth is infinite
4. The network is secure
5. Topology doesn't change
6. There is one administrator
7. Transport cost is zero
8. The network is homogeneous

https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing

https://arnon.me/wp-content/uploads/Files/fallacies.pdf

https://www.researchgate.net/publication/322500050_Fallacies_of_Distributed_Computing_Explained

Mark Richards, Neal Ford. See Software Architecture Fundamentals 2nd Edition and https://www.developertoarchitect.com/lessons/lesson18.html

9. Versioning is easy
10. Compensating updates always work
11. Observability is optional

## Event-driven architecture

Event-driven microservices demo built with Golang. Nomad, Consul Connect, Vault, and Terraform for deployment - https://github.com/thangchung/go-coffeeshop

https://www.developertoarchitect.com/lessons-eda.html

https://en.wikipedia.org/wiki/Event-driven_architecture

## Microservices

Benefits of microservices - https://aws.amazon.com/microservices

https://microservices.io - https://chrisrichardson.net

https://www.developertoarchitect.com/lessons-microservices.html - Software Architecture Monday - Microservices Lessons

Implementing Microservices on AWS - https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/microservices-on-aws.html

How to Use Amazon EventBridge to Build Decoupled, Event-Driven Architectures - https://pages.awscloud.com/AWS-Learning-Path-How-to-Use-Amazon-EventBridge-to-Build-Decoupled-Event-Driven-Architectures_2020_LP_0001-SRV.html - The first video is very good at explaining why and how to decouple services with an event bus (is available [at YouTube](https://www.youtube.com/watch?v=TXh5oU_yo9M) too).

Decoupled: when the components can perform tasks independently.

DRY (don't repeat yourself) vs WET (write everything twice)

Self-contained Systems vs Microservices - https://scs-architecture.org/vs-ms.html

> SCSs should ideally not communicate with each other while this is fine for microservices.

### Antipatterns

https://microservices.io/microservices/antipatterns/-/the/series/2019/06/18/microservices-adoption-antipatterns.html

## Event Sourcing

Event Sourcing vs Event Driven Architecture difference - https://stackoverflow.com/questions/71083541/event-sourcing-vs-event-driven-architecture-difference

https://github.com/cer/event-sourcing-examples

https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing
