---
title: Cloud
---

https://steampipe.io - https://github.com/turbot/steampipe - Use SQL to instantly query your cloud services

## Types of cloud

- Public: AWS, GCP, Azure, DigitalOcean... Shares compute resources among different customers.
- Private (on-premises): OpenStack, VMware...
- Hybrid: private & public clouds connected together. See https://aws.amazon.com/hybrid

https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html

https://www.redhat.com/en/topics/cloud-computing/public-cloud-vs-private-cloud-and-hybrid-cloud

## Types of cloud services

TODO

- IaaS
  - EC2
- PaaS
- SaaS

## Cloud Native

https://aws.amazon.com/what-is/cloud-native

> The CNCF lists immutable infrastructure, microservices, declarative APIs, containers, and service meshes as the technological blocks of cloud-native architecture.

## Tools

### Server Images

Snapshot of the OS, software, files...

Two categories: Virtual Machines and Containers.

- Docker
- Packer
- Vagrant. For local development environments.

### Configuration Management

Install software on existing servers.

- Ansible
- Chef
- Puppet

More tools: https://en.wikipedia.org/wiki/Comparison_of_open-source_configuration_management_software

Note that Ansible can do some provisioning too (_automates provisioning, configuration management, application deployment, orchestration, and many other IT processes_ - [source](https://www.ansible.com/)), but it's better to use a provisioning tool.

:::info
If you use server images (Docker, Packer), you don't have much need for configuration management tools, you only need provisioning tools. For example, use **Terraform** and **Docker** together.

If you don't use server images, it's common to use provisioning and configuration tools together. For example, use **Terraform** to provision the servers and **Ansible** to configure them.
:::

### Provisioning

To create the actual infrastructure (servers, databases, queues, load balancers, firewalls, SSL certificates etc.).

- Terraform
- CloudFormation
- Pulumi
- Azure Resource Manager

:::info
Provisioning tools can also do some configuration. For example, you can run user data scripts on an EC2 machine using CloudFormation and Terraform.
:::

### Orchestration

- Kubernetes
- ECS
- Docker Swarm
- Nomad
- Heat (OpenStack)

## High availability, fault tolerance and disaster recovery

- High availability ($): a system with minimal (but not zero) downtime. For example, availability of 99.99%. It can recover from failure automatically with some downtime.
- Fault tolerance ($$): a system that can continue to operate without interruption in case of failure.
- Disaster recovery: recover from major failures like data centers or region disasters.

https://www.freecodecamp.org/news/high-availability-fault-tolerance-and-disaster-recovery-explained/

https://www.geeksforgeeks.org/high-availability-vs-fault-tolerance-vs-disaster-recovery/

## Diagrams

https://c4model.com/diagrams

Mermaid architecture diagrams - https://mermaid.js.org/syntax/architecture

https://github.com/excalidraw/mermaid-to-excalidraw

https://diagrams.mingrammer.com - https://github.com/mingrammer/diagrams

https://app.diagrams.net - https://www.drawio.com

https://www.cloudcraft.co

https://www.ilograph.com

https://github.com/stan-smith/FossFLOW - Uses https://github.com/markmanx/isoflow

https://isoflow.io - They offer it as an open source library: https://github.com/markmanx/isoflow

https://cloudairy.com - Easy to use and also allows animated gif export - [see example here](https://www.linkedin.com/posts/amir-malaeb_aws-cloudformation-wordpress-activity-7247376508095188994-AnML/)

https://pragprog.com/titles/apdiag/creating-software-with-modern-diagramming-techniques

AWS icons - https://awsicons.dev
