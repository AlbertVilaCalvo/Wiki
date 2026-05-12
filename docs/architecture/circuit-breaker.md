---
title: Circuit Breaker
---

https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker

https://learn.microsoft.com/en-us/dotnet/architecture/microservices/implement-resilient-applications/implement-circuit-breaker-pattern

> However, there can also be situations where faults are due to unanticipated events that might take much longer to fix. These faults can range in severity from a partial loss of connectivity to the complete failure of a service. In these situations, it might be pointless for an application to continually retry an operation that's unlikely to succeed.

> Using Http retries carelessly could result in creating a Denial of Service (DoS) attack within your own software. As a microservice fails or performs slowly, multiple clients might repeatedly retry failed requests. That creates a dangerous risk of exponentially increasing traffic targeted at the failing service.

https://www.baeldung.com/cs/microservices-circuit-breaker-pattern

> It monitors communication between microservices and temporarily halts requests to a failing service, giving it time to recover. This helps avoid further strain on the failing service and prevents a domino effect.

https://github.com/App-vNext/Polly - https://www.pollydocs.org

> Stop trying if something is broken or busy. This can benefit you by avoiding wasting time and making things worse. It can also support the system to recover.

https://microservices.io/patterns/reliability/circuit-breaker.html

https://github.com/netflix/hystrix

https://www.linkedin.com/posts/alexandre-zajac_dont-learn-system-design-from-textbooks-share-7444767730609799168-iTLF/

> When a downstream service fails, Netflix stops calling it instead of cascading failures. Every microservice has a circuit breaker. No exceptions.
