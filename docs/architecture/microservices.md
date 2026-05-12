---
title: Microservices
---

Benefits of microservices - https://aws.amazon.com/microservices

Chris Richardson - https://chrisrichardson.net - https://microservices.io - https://microservices.matrixlms.com - https://eventuate.io

https://martinfowler.com/articles/microservices.html

https://www.developertoarchitect.com/lessons-microservices.html - Software Architecture Monday - Microservices Lessons

David Farley - https://www.youtube.com/playlist?list=PLwLLcwQlnXBxyKJ7Bsr5AtpQrhgFHdSRf

Microservices interview questions - https://www.linkedin.com/posts/petarivanovv9_ive-been-building-microservices-for-5-years-share-7455951504722583553-ETvj/

https://pact.io - Contract testing framework for HTTP APIs and non-HTTP asynchronous messaging systems

Demos:

- https://github.com/topics/microservices-demo
- https://github.com/aws-containers/retail-store-sample-app

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

## Antipatterns

https://microservices.io/microservices/antipatterns/-/the/series/2019/06/18/microservices-adoption-antipatterns.html
