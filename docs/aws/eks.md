---
title: EKS
---

# EKS - Elastic Kubernetes Service

https://aws.amazon.com/eks/

Console: https://console.aws.amazon.com/eks/home

The control plane components (etcd, API server, Scheduler...) runs in AWS-owned accounts. Worker nodes run in customer accounts.

Terraform infrastructure for building an EKS cluster. Infrastructure includes a VPC, EKS cluster, and EC2 worker nodes: https://github.com/AJarombek/global-aws-infrastructure/tree/master/eks

## Learn

- https://workshops.aws/?tag=EKS
  - EKS Immersion Workshop - https://catalog.workshops.aws/eks-immersionday/en-US
  - https://www.eksworkshop.com
  - EKS Terraform Workshop - https://tf-eks-workshop.workshop.aws/
  - Web Application Hosts on EKS Workshop - https://catalog.us-east-1.prod.workshops.aws/workshops/a1101fcc-c7cf-4dd5-98c4-f599a65056d5/en-US
- Deploy a Container Web App on Amazon EKS - https://aws.amazon.com/getting-started/guides/deploy-webapp-eks
