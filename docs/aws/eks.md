---
title: EKS
---

# EKS - Elastic Kubernetes Service

https://aws.amazon.com/eks/

Console: https://console.aws.amazon.com/eks/home

The control plane components (etcd, API server, Scheduler...) runs in AWS-owned accounts. Worker nodes run in customer accounts.

Terraform infrastructure for building an EKS cluster. Infrastructure includes a VPC, EKS cluster, and EC2 worker nodes: https://github.com/AJarombek/global-aws-infrastructure/tree/master/eks
