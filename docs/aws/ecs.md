---
title: ECS
---

# ECS - Elastic Container Service

https://aws.amazon.com/ecs/

Cheatseet - https://digitalcloud.training/amazon-ecs-and-eks/

https://aws.github.io/copilot-cli

ECS vs. Fargate: What's the difference? - https://cloudonaut.io/ecs-vs-fargate-whats-the-difference/

An ECS service is like an Auto Scaling group. It launches tasks, monitors and replaces failed tasks, distributes tasks among subnets to achieve high availability, registers and deregisters tasks at the load balancer and deploys new versions (rolling updates).

From https://cloudonaut.io/ecs-vs-kubernetes/

> ECS is offering the most seamless integration between your containers and other AWS services. A few examples working out of the box:
>
> - Assigning IAM roles to each container allows fine granular access control to other services.
> - Registering containers at external load balancers (Application Load Balancer).
> - Scaling EC2 instances based on cluster usage (Auto Scaling).
> - Collecting logs (CloudWatch Logs).

## Launch types

Runs in EC2 and Fargate.

https://cloudonaut.io/fargate-vs-apprunner

> What’s the simplest way to run containers on AWS? My first relevant container workload was running on a fleet of EC2 instances managed by ECS. Maintaining and scaling the needed EC2 instances was wasting a lot of my time. So I got very excited when AWS announced Fargate, a managed compute layer for ECS. Deploying a web application with ECS and Fargate felt quite simple to me. But then, I discovered App Runner, which adds another layer of abstraction and lifts the developer experience to a new level.

## Learn

https://github.com/azat-co/practicalnode/blob/master/chapter15/chapter15.md

## Pricing

Theoretical cost optimization by Amazon ECS launch type: Fargate vs EC2 - https://aws.amazon.com/blogs/containers/theoretical-cost-optimization-by-amazon-ecs-launch-type-fargate-vs-ec2/

> The pricing for the EC2-based launch type is fixed to the memory and capacity provisioned for a chosen instance type. You pay for a full instance regardless of how much of it is being used by the workload. In comparison, Fargate gives an alternative where pricing can often more closely match resource requirements. Fargate workloads are charged for the CPU and memory consumed for a single task, and AWS manages the allocation of these tasks on the underlying infrastructure. Up until a certain threshold, pricing specificity provided by Fargate becomes more cost effective over an EC2-based launch. However, there comes a point where managing your own EC2 fleet is more cost effective than using Fargate.

> As can be seen, the advantage of Fargate launch types decreases as the compute and memory usage approaches the capacity of the instance. For steady-state, predictable workload levels that use a higher proportion of the instance CPU and memory, EC2 can be a more cost-effective choice, as it is possible to simply select the instance type for which tasks can optimally use the available resources.

## IAM roles

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/security-ecs-iam-role-overview.html

### Task role

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html

Provides permissions to the container in the task to make API requests to AWS services such as S3, similar to the way that EC2 instance profiles provide credentials to EC2 instances.
