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

https://d1.awsstatic.com/training-and-certification/ramp-up_guides/Ramp-Up_Guide_Containers.pdf

https://aws.amazon.com/architecture/containers

Skill Builder: https://skillbuilder.aws/search?searchText=eks&page=1

- Online Course Supplement: Running Containers on Amazon Elastic Kubernetes Service (Amazon EKS) - 18 h - Free - https://explore.skillbuilder.aws/learn/courses/19007/online-course-supplement-running-containers-on-amazon-elastic-kubernetes-service-amazon-eks
- AWS Modernization Pathways: Move to Containers with Amazon EKS (includes labs) - 6.6 h - https://explore.skillbuilder.aws/learn/learning-plans/1981/plan
- Deploy and debug Amazon EKS clusters - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-and-debug-amazon-eks-clusters.html
- Deploy Kubernetes resources and packages using Amazon EKS and a Helm chart repository in Amazon S3 - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-kubernetes-resources-and-packages-using-amazon-eks-and-a-helm-chart-repository-in-amazon-s3.html
- Lab - Building and Deploying a Containerized Application with Amazon Elastic Kubernetes Service - 1 h - https://explore.skillbuilder.aws/learn/courses/13993/building-and-deploying-a-containerized-application-with-amazon-elastic-kubernetes-service
- Lab - Deploy Applications on Amazon Elastic Kubernetes Service (EKS) - 1 h - https://explore.skillbuilder.aws/learn/courses/22325/lab-deploy-applications-on-amazon-elastic-kubernetes-service-eks
- Digital Classroom - Running Containers on Amazon Elastic Kubernetes Service (Amazon EKS) - 18 h - Requires an AWS Skill Builder _annual_ subscription - https://explore.skillbuilder.aws/learn/courses/17210/digital-classroom-running-containers-on-amazon-elastic-kubernetes-service-amazon-eks
- Amazon EKS - Knowledge Badge Readiness Path (learning plan) - https://explore.skillbuilder.aws/learn/public/learning_plan/view/1931/amazon-eks-knowledge-badge-readiness-path
- https://workshops.aws/categories/Containers
- https://workshops.aws/categories/Amazon%20EKS
- https://workshops.aws/?tag=EKS
  - EKS Immersion Workshop - https://catalog.workshops.aws/eks-immersionday/en-US
  - https://www.eksworkshop.com
  - EKS Terraform Workshop - https://tf-eks-workshop.workshop.aws/
  - Web Application Hosts on EKS Workshop - https://catalog.us-east-1.prod.workshops.aws/workshops/a1101fcc-c7cf-4dd5-98c4-f599a65056d5/en-US
- Deploy a Container Web App on Amazon EKS - https://aws.amazon.com/getting-started/guides/deploy-webapp-eks
- Guidance for Automated Provisioning of Application-Ready Amazon EKS Clusters - https://aws.amazon.com/solutions/guidance/automated-provisioning-of-application-ready-amazon-eks-clusters/ - https://aws-solutions-library-samples.github.io/compute/automated-provisioning-of-application-ready-amazon-eks-clusters.html
- Guidance for Monitoring Amazon EKS Workloads Using Amazon Managed Services for Prometheus & Grafana - https://aws.amazon.com/solutions/guidance/monitoring-amazon-eks-workloads-using-amazon-managed-services-for-prometheus-and-grafana/
- Host a Dynamic Application with Kubernetes and AWS EKS, Helm, ECR, Secrets Manager - https://www.aosnote.com/offers/sQZUgFJY/checkout
- https://kodekloud.com/courses/aws-eks
- Mastering Elastic Kubernetes Service on AWS: Deploy and manage EKS clusters to support cloud-native applications in AWS - https://www.packtpub.com/en-us/product/mastering-elastic-kubernetes-service-on-aws-9781803231211
- Designing for high availability and resiliency in Amazon EKS applications - https://docs.aws.amazon.com/prescriptive-guidance/latest/ha-resiliency-amazon-eks-apps/introduction.html
- Examples of golden paths for internal development platforms - https://docs.aws.amazon.com/prescriptive-guidance/latest/internal-developer-platform/examples.html#example-eks
- Place Kubernetes Pods on Amazon EKS by using node affinity, taints, and tolerations - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/place-kubernetes-pods-on-amazon-eks-by-using-node-affinity-taints-and-tolerations.html
- Deploy a gRPC-based application on an Amazon EKS cluster and access it with an Application Load Balancer - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-a-grpc-based-application-on-an-amazon-eks-cluster-and-access-it-with-an-application-load-balancer.html
- Access container applications privately on Amazon EKS using AWS PrivateLink and a Network Load Balancer - https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/access-container-applications-privately-on-amazon-eks-using-aws-privatelink-and-a-network-load-balancer.html
- Scaling Amazon EKS infrastructure to optimize compute, workloads, and network performance - https://docs.aws.amazon.com/prescriptive-guidance/latest/scaling-amazon-eks-infrastructure/introduction.html

## Load Balancer Controller

https://github.com/kubernetes-sigs/aws-load-balancer-controller

https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html

https://docs.aws.amazon.com/eks/latest/userguide/lbc-manifest.html

## Karpenter

https://karpenter.sh/

Run Kubernetes Clusters for Less with Amazon EC2 Spot and Karpenter - https://community.aws/tutorials/run-kubernetes-clusters-for-less-with-amazon-ec2-spot-and-karpenter

## Pricing

https://aws.amazon.com/blogs/containers/saving-money-pod-at-time-with-eks-fargate-and-aws-compute-savings-plans/
