---
title: System Design
---

https://bytebytego.com - https://highscalability.com

https://github.com/donnemartin/system-design-primer

https://github.com/karanpratapsingh/system-design - https://www.karanpratapsingh.com/courses/system-design - https://leanpub.com/systemdesign

https://github.com/bregman-arie/system-design-notebook

https://github.com/binhnguyennus/awesome-scalability

Engineering at N26: a Tour of our Tech Stack and Architecture - https://medium.com/insiden26/engineering-at-n26-a-tour-of-our-tech-stack-and-architecture-9e58ce96f889

Event-driven microservices demo built with Golang. Nomad, Consul Connect, Vault, and Terraform for deployment - https://github.com/thangchung/go-coffeeshop

https://github.com/ByteByteGoHq/system-design-101

:::tip
If you want to make a process asynchronous, you must manage the way the process initiator tracks the process status. One way of doing that is to return an ID to the initiator that can be used to look up the process. During the process, this ID is passed from step to step. (AWS in Action p. 401.)

When designing an asynchronous process, it’s important to keep track of the process. You need some kind of identifier for it. (AWS in Action p. 441.)
:::

Loose coupling benefit: reduce interdependencies so a failure in one component does not cascade to other components.

Virtual Waiting Room on AWS - To sell concert tickets. Uses an SQS queue - https://aws.amazon.com/solutions/implementations/virtual-waiting-room-on-aws/

Avoiding fallback in distributed systems - https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/ - https://d1.awsstatic.com/builderslibrary/pdfs/avoiding-fallback-in-distributed-systems.pdf
