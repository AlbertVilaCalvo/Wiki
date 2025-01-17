---
title: EKS
---

# EKS - Elastic Kubernetes Service

https://aws.amazon.com/eks/

Console: https://console.aws.amazon.com/eks/home

The control plane components (etcd, API server, Scheduler...) runs in AWS-owned accounts. Worker nodes run in customer accounts.

Terraform infrastructure for building an EKS cluster. Infrastructure includes a VPC, EKS cluster, and EC2 worker nodes: https://github.com/AJarombek/global-aws-infrastructure/tree/master/eks

Amazon EKS Blueprints for Terraform - https://github.com/aws-ia/terraform-aws-eks-blueprints

Amazon EKS Helm chart repository - https://github.com/aws/eks-charts

https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/

https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/

## Learn

- Amazon EKS - Knowledge Badge Readiness Path (learning plan) - https://explore.skillbuilder.aws/learn/public/learning_plan/view/1931/amazon-eks-knowledge-badge-readiness-path
- https://workshops.aws/categories/Containers
- https://workshops.aws/categories/Amazon%20EKS
- https://workshops.aws/?tag=EKS
  - EKS Immersion Workshop - https://catalog.workshops.aws/eks-immersionday/en-US
  - https://www.eksworkshop.com
  - EKS Terraform Workshop - https://tf-eks-workshop.workshop.aws/
  - Web Application Hosts on EKS Workshop - https://catalog.us-east-1.prod.workshops.aws/workshops/a1101fcc-c7cf-4dd5-98c4-f599a65056d5/en-US
- Deploy a Container Web App on Amazon EKS - https://aws.amazon.com/getting-started/guides/deploy-webapp-eks
- Guidance for Monitoring Amazon EKS Workloads Using Amazon Managed Services for Prometheus & Grafana - https://aws.amazon.com/solutions/guidance/monitoring-amazon-eks-workloads-using-amazon-managed-services-for-prometheus-and-grafana/
- Host a Dynamic Application with Kubernetes and AWS EKS, Helm, ECR, Secrets Manager - https://www.aosnote.com/offers/sQZUgFJY/checkout
- https://kodekloud.com/courses/aws-eks

## Karpenter

https://karpenter.sh/

Run Kubernetes Clusters for Less with Amazon EC2 Spot and Karpenter - https://community.aws/tutorials/run-kubernetes-clusters-for-less-with-amazon-ec2-spot-and-karpenter
