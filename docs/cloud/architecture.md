---
title: Architecture
---

https://c4model.com

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

Sync (request/response):

- Usually done with REST over HTTP or RPC.
- Easy to communicate the end result (success or error) to the receiver, and therefore to the end user.
- Messages are _pushed_ (by the sender to the receiver).
- The sender knows the receiver.
- The message is handled immediately.
- The receiver needs to respond, but if it doesn't the sender will know.
- The receiver returns a direct response to the sender.
- Direct coupling.

Async (event-driven):

- Fire and forget.
- Messages are stored in a queue or a stream (a middleman).
- Messages are _pulled_ by the receiver.
- Both the sender and the receiver don't know each other.
- Because the receiver doesn't know the sender, it can't send a direct reply.
- Messages are not handled immediately. The consumer processes messages as its own pace.
- More resilient: if the consumer of the event is down, we can buffer the events in a queue and continue later.
- Complex to build and debug.
- Communication between services is not obvious.
- Error handling is difficult.
- Transactions are difficult.
- Highly decoupled systems.
- Performance hit due to communication, work done in multiple services etc.
- High performance and scalability.
- Respond with HTTP status code 202 Accepted.

## Atomic vs Eventual consistency

Atomicity: we do it at the application layer, not the database.

Compensating updates can fail.

https://aphyr.com/posts/313-strong-consistency-models

https://jepsen.io/consistency

## ACID vs BASE transactions

ACID:

- Atomicity, consistency, isolation and durability
- All updates or nothing

BASE:

- Basic availability, soft state and eventual consistency
- For distributed systems

Even if services are sharing the same database, we don't support ACID transactions

BASE Transactions and Eventual Consistency - https://www.youtube.com/watch?v=I47J2I-SVi0

Prefer ACID over BASE - https://microservices.io/articles/dark-energy-dark-matter/dark-matter/prefer-acid-over-base.html

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

https://microservices.io/patterns/data/saga.html

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

## CQRS

https://microservices.io/patterns/data/cqrs.html

## Distributed Systems

Avoiding fallback in distributed systems - https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/ - https://d1.awsstatic.com/builderslibrary/pdfs/avoiding-fallback-in-distributed-systems.pdf

https://www.thoughtworks.com/radar/platforms/restate

> We still maintain that it's best to avoid distributed transactions in distributed systems, because of both the additional complexity and the inevitable additional operational overhead involved

Microservices first? https://arnon.me/2025/03/services-vs-monoliths-tradeoffs/

https://www.manning.com/books/think-distributed-systems

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

An event is a fact that something has happened.

Event-driven microservices demo built with Golang. Nomad, Consul Connect, Vault, and Terraform for deployment - https://github.com/thangchung/go-coffeeshop

https://www.developertoarchitect.com/lessons-eda.html

https://en.wikipedia.org/wiki/Event-driven_architecture

## Microservices

Benefits of microservices - https://aws.amazon.com/microservices

Chris Richardson - https://chrisrichardson.net - https://microservices.io - https://microservices.matrixlms.com - https://eventuate.io

https://martinfowler.com/articles/microservices.html

https://www.developertoarchitect.com/lessons-microservices.html - Software Architecture Monday - Microservices Lessons

Microservices Granularity Tradeoffs - https://arnon.me/2025/03/microservice-granularity-tradeoffs

> A related issue is excessive inter-service communication, particularly for retrieving essential data elements, which introduces latency and reduces system throughput. Tight data dependencies suggest that services are improperly delineated and that data co-location would enhance performance (note that an alternative here, at least sometimes, is to cache some of the other service data).

> When we find out that changes in one service almost always lead to updates in other services, or any business flow always needs changes in the same chain of services, it is probably a good time to check if these are indeed independent services.
>
> Remember that the whole point of going to services (e.g., breaking a monolith) is to allow teams the freedom to evolve functionality with minimal dependencies – if we still have all the dependencies and also need to deal with the complexities and performance overhead of distributed systems, we’re doing it wrong.

> Accidental complexity (as opposed to essential complexity) is another important aspect. If you try to decompose a system into services _before_ you fully understand the problem domain, it can easily result in over-engineered architectures with unnecessary complexity.
>
> The key takeaway is to start simple and only introduce complexity when concrete business requirements and measurable improvements in performance, scalability, or resilience demonstrably justify it. Over-engineering is a form of accidental complexity and can lead to maintainability nightmares.

> Splitting services can improve team autonomy, scalability, and security isolation; too many services can be just as detrimental to these goals, driving more dependencies and coordination between teams.

> Remember these key principles when making granularity decisions:
>
> - Start simple and evolve based on concrete needs
> - Watch for signs of friction in either direction
> - Consider the full operational cost of each service
> - Focus on business value over technical purity
> - Avoid premature optimization

Implementing Microservices on AWS - https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/microservices-on-aws.html

How to Use Amazon EventBridge to Build Decoupled, Event-Driven Architectures - https://pages.awscloud.com/AWS-Learning-Path-How-to-Use-Amazon-EventBridge-to-Build-Decoupled-Event-Driven-Architectures_2020_LP_0001-SRV.html - The first video is very good at explaining why and how to decouple services with an event bus (is available [at YouTube](https://www.youtube.com/watch?v=TXh5oU_yo9M) too).

https://github.com/GoogleCloudPlatform/microservices-demo - Sample cloud-first application with 10 microservices showcasing Kubernetes, Istio, and gRPC

Monolith: a single change requires the whole system to be redeployed. You can build a modular monolith, but you'll do meetings frequently to coordinate releases, because there's no independent deployability. See https://www.youtube.com/watch?v=5OjqD-ow8GE

Independently deployable. This is the most important characteristic of microservices. Benefits:

- No need to coordinate releases.
- More frequent releases. Makes it easier to deploy new versions and roll back.
- Reduced downtime when deploying.
- The scope (amount) of changes deployed tends to be smaller, so there's a lower risk to introduce defects/regressions.

Is a distributed system. Each microservice is a different process.

Boundaries are defined by _business_ domain, not by technical domain. Use DDD to find the boundaries.

Microservices often depend on other microservices. Communication is done via network calls (REST or RPC usually).

We hide the data that a microservice owns inside it. Is like a black box. We don't have direct database access to the data. Hidden (internal) things can change over time without breaking the consumer, shared things can't. This is important for backwards compatibility. Information hiding is key to create boundaries in our system that can be changed independently. Information hiding is key to avoiding a [big ball of mud](http://www.laputan.org/mud/):

> Information is shared promiscuously among distant elements of the system, often to the point where nearly all the important information becomes global or duplicated.

There's no metric (lines of code, number of endpoints) to measure if a services is small or big. Instead of the size, focus on the number of services. The easier is for you to have more services (due to infrastructure setup or devops, for example), the more microservices you'll have, and the smaller they will be.

You usually have multiple copies of a service running, for scaling and/or robustness. Each copy uses a single, shared, private database.

Services can be scaled independently.

Services can use different tech stacks.

Decoupled: when the components can perform tasks independently.

DRY (don't repeat yourself) vs WET (write everything twice)

Self-contained Systems vs Microservices - https://scs-architecture.org/vs-ms.html

> SCSs should ideally not communicate with each other while this is fine for microservices.

Microservice Prerequisites - https://martinfowler.com/bliki/MicroservicePrerequisites.html

The False Dichotomy of Monolith vs Microservices - https://www.codecapers.com.au/the-false-dichotomy-of-microservices-vs-monolith

How to fail at microservices - https://www.codecapers.com.au/how-to-fail-at-microservices

Even Amazon can't make sense of serverless or microservices (DHH) - https://world.hey.com/dhh/even-amazon-can-t-make-sense-of-serverless-or-microservices-59625580

> Replacing method calls and module separations with network invocations and service partitioning within a single, coherent team and application is madness in almost all cases.

Documenting a service using the microservice canvas - https://microservices.io/post/microservices/general/2019/02/27/microservice-canvas.html

Microservices rules - https://microservices.io/articles/microservices-rules/index.html

### Antipatterns

https://microservices.io/microservices/antipatterns/-/the/series/2019/06/18/microservices-adoption-antipatterns.html

## Event Sourcing

https://microservices.io/patterns/data/event-sourcing.html

Event Sourcing vs Event Driven Architecture difference - https://stackoverflow.com/questions/71083541/event-sourcing-vs-event-driven-architecture-difference

https://github.com/cer/event-sourcing-examples

https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing

## Circuit Breaker

https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-circuit-breaker-pattern

> However, there can also be situations where faults are due to unanticipated events that might take much longer to fix. These faults can range in severity from a partial loss of connectivity to the complete failure of a service. In these situations, it might be pointless for an application to continually retry an operation that's unlikely to succeed.

> Using Http retries carelessly could result in creating a Denial of Service (DoS) attack within your own software. As a microservice fails or performs slowly, multiple clients might repeatedly retry failed requests. That creates a dangerous risk of exponentially increasing traffic targeted at the failing service.

https://www.baeldung.com/cs/microservices-circuit-breaker-pattern

> It monitors communication between microservices and temporarily halts requests to a failing service, giving it time to recover. This helps avoid further strain on the failing service and prevents a domino effect.

https://github.com/App-vNext/Polly - https://www.pollydocs.org

> Stop trying if something is broken or busy. This can benefit you by avoiding wasting time and making things worse. It can also support the system to recover.

https://microservices.io/patterns/reliability/circuit-breaker.html

https://github.com/netflix/hystrix
