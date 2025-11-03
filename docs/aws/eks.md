---
title: EKS
---

# EKS - Elastic Kubernetes Service

https://aws.amazon.com/eks/

Console: https://console.aws.amazon.com/eks/home

The control plane components (etcd, API server, Scheduler...) runs in AWS-owned accounts. Worker nodes run in customer accounts.

Terraform infrastructure for building an EKS cluster. Infrastructure includes a VPC, EKS cluster, and EC2 worker nodes: https://github.com/AJarombek/global-aws-infrastructure/tree/master/eks

Amazon EKS Blueprints for Terraform - https://github.com/aws-ia/terraform-aws-eks-blueprints - https://www.youtube.com/watch?v=DhoZMbqwwsw

Amazon EKS Helm chart repository - https://github.com/aws/eks-charts

AWS Controllers for Kubernetes (ACK) - Manage AWS services from Kubernetes - https://github.com/aws-controllers-k8s - https://aws-controllers-k8s.github.io/community/

https://www.eksworkshop.com

Containers roadmap - https://github.com/orgs/aws/projects/244 - https://github.com/aws/containers-roadmap

https://github.com/kubernetes-sigs/aws-iam-authenticator - Use AWS IAM credentials to authenticate to a Kubernetes cluster

What's New with Containers? https://aws.amazon.com/about-aws/whats-new/containers/?whats-new-content.sort-by=item.additionalFields.postDateTime&whats-new-content.sort-order=desc&awsf.whats-new-products=*all

https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/

https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts

## Features

- On AWS and on-premises.
- Certified Kubernetes-conformant.
- Amazon manages, scales, backups, upgrades and patches the control plane. Control plane components (API server, etcd) are deployed to multiple AZs for high availability and fault tolerance, and EKS actively monitors and adjusts control plane instances to maintain peak performance. Control plane components run in AWS-owned accounts.
- Integration with ELB, IAM for access and RBAC, VPC for isolation, CloudTrail for logging, ECR for container images, KMS for encrypting secrets...
- Cluster Autoscaler, Karpenter.
- Volumes with EBS, EFS, FSx, S3...
- Monitoring with CloudWatch container insights, Prometheus, AWS Distro for OpenTelemetry (ADOT)...
- On-prem and edge locations.

Amazon EKS Explained - https://www.youtube.com/watch?v=E956xeOt050

## Glossary

- Data plane: the worker nodes where containers run.
- Node group: think of it like an EC2 Auto Scaling group.

## Concepts

The control plane runs in a VPC managed by AWS, in an AWS-owned account. The data plane runs in your VPC, in a customer account.

## Learn

https://d1.awsstatic.com/training-and-certification/ramp-up_guides/Ramp-Up_Guide_Containers.pdf

https://aws.amazon.com/architecture/containers

Skill Builder: https://skillbuilder.aws/search?searchText=eks&page=1

- https://github.com/topics/amazon-eks
- https://github.com/aws-containers/retail-store-sample-app
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
- https://workshops.aws/categories/Containers?tag=EKS
- https://workshops.aws/?tag=EKS
  - EKS Immersion Workshop - https://catalog.workshops.aws/eks-immersionday/en-US
  - https://catalog.workshops.aws/eks-saas-gitops/en-US - https://github.com/aws-samples/eks-saas-gitops - Argo Workflows, Flux, Helm
  - https://catalog.workshops.aws/eks-security-immersionday/en-US - https://github.com/aws-samples/amazon-eks-security-immersion-day
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

### EKS Workshop

https://www.eksworkshop.com - https://github.com/aws-samples/eks-workshop-v2 - Source code of the app: https://github.com/aws-containers/retail-store-sample-app

> You should start each lab from the page indicated by this badge. Starting in the middle of a lab will cause unpredictable behavior.

If the cluster is not functioning, run the command `prepare-environment` to reset it.

## IAM roles

AWS managed policies for Amazon Elastic Kubernetes Service - https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html

| IAM Role              | Used On (EKS Mode)  | Assumed By                   | Principal                                                                                            | Purpose                                                              | Permissions Policy                                                                        |
| --------------------- | ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Cluster role          | All clusters        | EKS control plane            | `Service: eks.amazonaws.com`                                                                         | Allow EKS to manage cluster resources (EC2, Auto Scaling, ELB, ENIs) | `AmazonEKSClusterPolicy`, `AmazonEKSVPCResourceController`                                |
| Node instance role    | EC2-based nodes     | Worker nodes (EC2 instances) | `Service: ec2.amazonaws.com`                                                                         | Allow EC2 instances to access AWS (pull ECR images, CNI, etc.)       | `AmazonEKSWorkerNodePolicy`, `AmazonEKS_CNI_Policy`, `AmazonEC2ContainerRegistryPullOnly` |
| Fargate pod execution | Fargate profiles    | Fargate infrastructure       | `Service: eks-fargate-pods.amazonaws.com`                                                            | Pull images, CloudWatch logs, network setup                          | `AmazonEKSFargatePodExecutionRolePolicy`, `CloudWatchLogsFullAccess` (optional)           |
| IRSA                  | EC2 or Fargate pods | Pods (via service accounts)  | `Federated: arn:aws:iam::<account-id>:oidc-provider/oidc.eks.<region>.amazonaws.com/id/<cluster-id>` | Allow pods (apps) fine-grained access to AWS services (S3, DynamoDB) | Custom (eg S3, DynamoDB)                                                                  |
| EKS Pod Identity      | EC2 or Fargate pods | Pods (via EKS agent)         | `Service: pods.eks.amazonaws.com`                                                                    | App-level AWS API access without OIDC                                | Custom (eg S3, DynamoDB)                                                                  |

Note: to run Pods on Fargate you need a [Pod execution IAM role](https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html).

### Cluster role

https://docs.aws.amazon.com/eks/latest/userguide/cluster-iam-role.html

Allows the cluster Kubernetes control plane to manage AWS resources on your behalf. Clusters use this role to manage nodes. The role has the AWS managed permission policy [AmazonEKSClusterPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSClusterPolicy.html), which allows the control plane to interact with the following AWS services: EC2, Elastic Load Balancing, Auto Scaling and KMS ([see explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksclusterpolicy)). We can optionally attach [AmazonEKSVPCResourceController](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSVPCResourceController.html) to manage ENIs and IP addresses for worker nodes ([see explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksvpcresourcecontroller)).

To create this role using the console, go to IAM → Roles, click "Create role" and set:

- Trusted entity type: AWS service
- Service or use case: EKS - Cluster. Allows the cluster Kubernetes control plane to manage AWS resources on your behalf.

The wizard attaches the AWS managed permission policy [AmazonEKSClusterPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSClusterPolicy.html). After the role is created, go to the role page and at the Permissions tab, do "Add permissions" → "Attach policies" and attach [AmazonEKSVPCResourceController](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSVPCResourceController.html).

Trust policy (trusted entities):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Node role

https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html

The node role is assumed by EC2 instances, the worker nodes. Is like an [EC2 instance profile](/aws/iam#ec2-instance-profile).

Gives permissions to the kubelet running on the node to make calls to the Kubernetes API and other AWS APIs on your behalf. This includes permissions to access container registries where your application containers are stored.

To create this role using the console, go to IAM → Roles, click "Create role" and set:

- Trusted entity type: AWS service
- Service or use case: EC2. Allows EC2 instances to call AWS services on your behalf.

At the "Add permissions" page, filter by "EKS" and attach these policies:

- [AmazonEKSWorkerNodePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSWorkerNodePolicy.html). Allows Amazon EKS worker nodes to connect to Amazon EKS Clusters. [See explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksworkernodepolicy).
- [AmazonEKS_CNI_Policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKS_CNI_Policy.html). Allows the nodes to configure the Elastic Network Interfaces and IP addresses on your EKS worker nodes. [See explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneks-cni-policy) (optional).

Then filter by "ec2containerregistry" and attach the policy [AmazonEC2ContainerRegistryPullOnly](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ContainerRegistryPullOnly.html), which allows the nodes to pull images from ECR. You can also use [AmazonEC2ContainerRegistryReadOnly](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ContainerRegistryReadOnly.html), which allows to list repositories, describe images, ect.

Trust policy (trusted entities):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### IRSA (IAM roles for service accounts)

:::tip
Is recommended to use [pod identity](#pod-identity) instead.
:::

https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

Enables Kubernetes [service accounts](https://kubernetes.io/docs/concepts/security/service-accounts/) to assume IAM roles. Allows individual pods to assume IAM roles and securely access AWS services (like S3 or DynamoDB) without giving permissions to the node role, which would grant permissions to all nodes. Eliminates the need to store static credentials (access keys) inside containers.

Uses an OIDC provider, which has a URL.

Trust policy (trusted entities):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/oidc.eks.<region>.amazonaws.com/id/<cluster-id>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.<region>.amazonaws.com/id/<cluster-id>:sub": "system:serviceaccount:namespace:service-account-name"
        }
      }
    }
  ]
}
```

Note that the `Principal` is `Federated`, not `Service`.

### Pod Identity

https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html

https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-eks-pod-identity/

> Makes it easy to use an IAM role across multiple clusters without the need to update the role trust policy and simplifies policy management by enabling the reuse of permission policies across IAM roles

https://aws.amazon.com/blogs/containers/amazon-eks-pod-identity-a-new-way-for-applications-on-eks-to-obtain-iam-credentials/

Does the same than service accounts, but with less config and doesn't require OIDC.

Roles can be used in multiple clusters. Is backwards compatible with IRSA.

EKS Pod Identity vs IRSA - https://www.youtube.com/watch?v=aUjJSorBE70

You need to install the EKS Pod Identity Agent, an EKS Add-on, which is an agent pod that runs on each node. It's pre-installed on EKS Auto Mode clusters.

Source code: https://github.com/aws/eks-pod-identity-agent

## Security groups

### Cluster security group

Allows communication between the control plane (API server) and worker nodes:

- Control plane ↔ kubelet communication (API, health checks)
- Control plane ↔ cluster add-ons (CNI plugin, CoreDNS, etc.)

Is created by EKS automatically when you create a cluster (unless you specify one).

Name is like: `eks-cluster-sg-<cluster-name>-<random-id>`. For example, `eks-cluster-sg-MyCluster-303637302`.

Inbound rules:

| Source              | Port | Purpose                            |
| ------------------- | ---- | ---------------------------------- |
| Node security group | 443  | kubelet API traffic                |
| Self                | All  | Node-to-node cluster communication |

The cluster SG it's used as the source in an inbound rule on the node's SG. EKS automatically updates the node's security group inbound rules to allow inbound traffic on TCP 443 from the cluster security group. That rule is what lets the control plane (which uses the cluster SG) reach each node's kubelet API.

```
   +---------------------------+
   |      EKS Control Plane    |
   |  (AWS-managed ENIs w/     |
   |   Cluster Security Group) |
   +-------------+-------------+
                 |
    TCP 443      |
 (kubelet API)   |
                 v
     +-----------+-----------+
     |      Worker Node      |
     |    (EC2 + Node SG)    |
     +-----------------------+
      Inbound rule: Allow 443
          from Cluster SG
```

### Node security group

Controls inbound/outbound traffic for worker nodes (EC2 instances). Attached to all EC2 instances in your EKS managed node group or self-managed node group.

Used for:

- Allow inbound SSH (for admin access).
- Allow node-to-node and pod-to-pod traffic.
- Allow outbound internet traffic (to pull images, call AWS APIs, software updates, etc.).

The node SG must allow outbound traffic on 443 to reach the control plane API server.

## API server access

Cluster API endpoint access:

- Public: the API server is reachable over the Internet, from outside the VPC. Worker node traffic leaves the VPC to communicate to the endpoint.
- Private: restrict API server to internal VPC traffic only. External access requires VPN, bastion host or private link. Worker node traffic to the endpoint will stay within your VPC.
- Public and private: the API server is publicly accessible for admin tasks. Worker nodes communicate privately with the control plane, and communication stays within the VPC.

## Cluster access with kubectl

https://www.eksworkshop.com/docs/security/cluster-access-management/

Connect kubectl to an EKS cluster by creating a kubeconfig file - https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html

Use [update-kubeconfig docs](https://docs.aws.amazon.com/cli/latest/reference/eks/update-kubeconfig.html) to configure kubectl so that you can connect to an EKS cluster:

```shell
aws eks update-kubeconfig --name <cluster>
# Added new context arn:aws:eks:us-east-1:111222333444:cluster/My-EKS-Cluster to /Users/albert/.kube/config
```

This updates the kubeconfig file (`~/.kube/config`), adding a new entry. (Use `kubectl config get-contexts` and `kubectl config current-context` to view the new context, and `kubectl cluster-info` to view the cluster info.)

At the `~/.kube/config` file, the value of `cluster.server` will match the value of the "API server endpoint" at the management console, and the value of `cluster.certificate-authority-data` will match the "Certificate authority". (Use `kubectl config view` to view the kubeconfig.)

### Authorization error

Initially, only the IAM principal that created the cluster has cluster administrator access. You can run `kubectl version` to check if your AWS CLI profile has access to the cluster. If the output says `Server Version: v1.34.1-eks-d96d92f`, then you have access. But if it says "error: You must be logged in to the server (the server has asked for the client to provide credentials)", you don't.

To fix access see:

- Unauthorized or access denied (kubectl) - https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html#unauthorized
- https://repost.aws/knowledge-center/eks-api-server-unauthorized-error
- https://www.youtube.com/watch?v=GI4Kt8gBIA0
- https://stackoverflow.com/questions/50791303/kubectl-error-you-must-be-logged-in-to-the-server-unauthorized-when-accessing

You can also give a principal administrator access using the management console. To configure a new IAM access entry, go to the cluster → "Access" tab → "IAM access entries" and click "Create". Select the "IAM principal ARN". Set "Type" to "Standard". Select the access policy [AmazonEKSClusterAdminPolicy](https://docs.aws.amazon.com/eks/latest/userguide/access-policy-permissions.html#access-policy-permissions-amazoneksclusteradminpolicy).

## CLI

https://docs.aws.amazon.com/cli/latest/reference/eks/

List of available access policies (AmazonEKSAdminPolicy, AmazonEKSClusterAdminPolicy, etc.) in your account:

```shell
aws eks list-access-policies
```

```shell
aws eks describe-cluster --name <name>
aws eks describe-cluster --name $EKS_CLUSTER_NAME --query 'cluster.accessConfig'
```

```shell
VPC_ID=$(aws eks describe-cluster --name $EKS_CLUSTER_NAME
  --query 'cluster.resourcesVpcConfig.vpcId' --output text)
```

## eksctl

https://eksctl.io - https://github.com/eksctl-io/eksctl

## Load Balancer Controller

https://github.com/kubernetes-sigs/aws-load-balancer-controller

https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html

https://docs.aws.amazon.com/eks/latest/userguide/lbc-manifest.html

You can define rules to route requests to different services based on URL paths.

## Compute options

https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html

https://docs.aws.amazon.com/eks/latest/userguide/eks-architecture.html#nodes

- Self-managed nodes
  - Managed EC2 instances for total control.
  - You are responsible of the OS, kubelet, CRI and AMI configuration.
- Managed node groups
  - AWS is responsible of the OS, kubelet, CRI and AMI configuration.
- Karpenter
  - Continuous cost optimization. The right nodes at the right time.
  - Configure for On-Demand and Spot purchasing options, diversify instance types and handle Spot interruptions.
  - AWS is responsible of worker node scaling and configuration.
- Auto Mode
  - AWS manages both control plane and worker nodes.
  - AWS handles EC2 provisioning, scaling, patching, and security.
- Fargate serverless compute
  - No need to manage EC2 nodes, even managed node groups.
  - Only pay for what you use.
  - Fargate compute runs in AWS owned accounts (in contrast with EC2 worker nodes, which run in customer accounts).
  - Has limitations (eg no DaemonSets).

## Node group

A node group is a group of EC2 instances that supply compute capacity to your Amazon EKS cluster. You can add multiple node groups to your cluster. Node groups implement basic compute scaling through EC2 Auto Scaling groups.

> Amazon EKS managed node groups make it easy to provision compute capacity for your cluster. managed node groups consist of one or more Amazon EC2 instances running the latest EKS-optimized AMIs. All nodes are provisioned as part of an Amazon EC2 Auto Scaling group that is managed for you by Amazon EKS and all resources including EC2 instances and autoscaling groups run within your AWS account.

Think of a node group like an EC2 Auto Scaling group. Indeed, when you create a node group using the console, it automatically creates an Auto Scaling group and a launch template (you can see them at the EC2 console).

You can define a custom launch template to customize the configuration of the EC2 instances.

The nodes in a node group use the [node IAM role](#node-role).

```shell
kubectl get nodes
kubectl get nodes --show-labels
```

## Karpenter

https://karpenter.sh

Optimize node usage.

Run Kubernetes Clusters for Less with Amazon EC2 Spot and Karpenter - https://community.aws/tutorials/run-kubernetes-clusters-for-less-with-amazon-ec2-spot-and-karpenter

https://github.com/aws-samples/karpenter-blueprints

Karpenter vs Cluster Autoscaler - https://www.youtube.com/watch?v=FIBc8GkjFU0

## Auto Mode

https://docs.aws.amazon.com/eks/latest/userguide/automode.html

https://catalog.workshops.aws/eks-auto-mode/en-US

https://www.youtube.com/watch?v=IQjsFlkqWQY

EKS automates routine cluster tasks for compute, storage, and networking. When a new pod can't fit onto existing nodes, EKS creates a new node.

Capabilities:

- Application load balancing
- Block Storage
- Compute Autoscaling
- GPU support
- Cluster DNS
- Pod and service networking

### Standard mode vs Auto Mode

See [Compare compute options](https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html#_compare_compute_options) and [Shared responsibility model](https://docs.aws.amazon.com/eks/latest/userguide/automode.html#_shared_responsibility_model).

- Standard mode:
  - AWS manages the control plane, you manage the worker nodes.
  - Custom AMI nodes.
  - Must update node Kubernetes version yourself.
- Auto Mode:
  - AWS manages both control plane and worker nodes.
  - AWS handles EC2 provisioning, scaling, OS patching and security.

<figure>
  <img src="/img/EKS-without-Auto-Mode.png" alt="EKS without Auto Mode" title="EKS without Auto Mode" loading="lazy"/>
  <figcaption>Source: <a href="https://aws-experience.com/emea/iberia/learning-hub/media/446c94fd-5626-42e1-a96e-5dd327f0ae2b">AWS Experience</a></figcaption>
</figure>

<figure>
  <img src="/img/EKS-with-Auto-Mode.png" alt="EKS with Auto Mode" title="EKS with Auto Mode" loading="lazy"/>
  <figcaption>Source: <a href="https://aws-experience.com/emea/iberia/learning-hub/media/446c94fd-5626-42e1-a96e-5dd327f0ae2b">AWS Experience</a></figcaption>
</figure>

To use Auto Mode, the cluster role permissions policy needs to have the following managed policies (or equivalent permissions):

- AmazonEKSBlockStoragePolicy
- AmazonEKSComputePolicy
- AmazonEKSLoadBalancingPolicy
- AmazonEKSNetworkingPolicy

And the cluster role trust policy needs to have the action `sts:TagSession`.

## Fargate

https://docs.aws.amazon.com/eks/latest/userguide/fargate.html

No need to manage nodes. AWS manages everything below the pod. You simply define the CPU and memory, and AWS takes care of the rest.

Fargate compute runs in AWS owned accounts (in contrast with EC2 worker nodes, which run in customer accounts).

Better suited for stateless apps.

### Pricing

https://aws.amazon.com/blogs/containers/saving-money-pod-at-time-with-eks-fargate-and-aws-compute-savings-plans/

Pricing is calculated per second with a 1-minute minimum. Duration is calculated from the time you start to download your container image (Docker pull) until the task terminates, rounded up to the nearest second. [source](https://aws.amazon.com/fargate/pricing/)

### Limitations

See docs for more: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#fargate-consideration

- Private subnets only → No public IPs, and outbound internet traffic must use a NAT Gateway.
- No SSH.
- No EC2 instance metadata service (IMDS) available to pods.
- No DaemonSets.
- No dynamic persistent volumes (PV).
- Can’t mount EBS volumes to Fargate pods.
- No GPU.

### Pod execution role

https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html

Fargate uses a Pod execution IAM role for defining pod-level permissions, instead of a node instance role.

This role is used by the components running on the Fargate infrastructure to make calls to AWS APIs on your behalf. For example, to pull images from ECR, send logs to CloudWatch, etc.

To create this role using the console, go to IAM → Roles, click "Create role" and set:

- Trusted entity type: AWS service
- Service or use case: EKS - Cluster. Allows access to other AWS service resources that are required to run Amazon EKS pods on AWS Fargate.

The wizard attaches the AWS managed permission policy [AmazonEKSFargatePodExecutionRolePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSFargatePodExecutionRolePolicy.html). To have CloudWatch logging, after the role is created, go to the role page and at the Permissions tab, do "Add permissions" → "Attach policies" and attach [CloudWatchLogsFullAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchLogsFullAccess.html). You can alternatively attach [these permissions](https://raw.githubusercontent.com/aws-samples/amazon-eks-fluent-logging-examples/mainline/examples/fargate/cloudwatchlogs/permissions.json).

Trust policy (trusted entities):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks-fargate-pods.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Fargate profile

https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html

Tells EKS which pods should be scheduled on Fargate when launched.

You declare which pods run on Fargate using selectors (namespace and labels). You create a profile that matches the namespace and labels defined as part of your pod. You can have up to 5 selectors. Each selector must contain a namespace. A pod must have all of the label keys and values that you provide in order to match with the profile.

When you create a Fargate profile, you must specify a Pod execution role. This execution role is for the EKS components that run on the Fargate infrastructure using the profile. When new pods are started, they will run on Fargate using the execution role and subnets defined in your profile.

Note that you can only use private subnets.

A profile cannot be edited after creation, you need to create a new one.

### Run a pod

Say that we have a pod selector with namespace `my-namespace` and label `fargate`. To run a pod we can do:

```shell
kubectl run httpd --image httpd:latest -n my-namespace --labels type=fargate
```

Initially it appears as "NOMINATED NODE", until the new node is ready.

```shell
kubectl get pods -n my-namespace -o wide
# NAME    READY   STATUS    RESTARTS   AGE     IP       NODE     NOMINATED NODE                                READINESS GATES
# httpd   0/1     Pending   0          7s      <none>   <none>   99476e54e7-a33fecd824b94f25a22a8ceaeee39e69   <none>

kubectl get pods -n my-namespace -o wide
# NAME    READY   STATUS    RESTARTS   AGE     IP               NODE                                     NOMINATED NODE   READINESS GATES
# httpd   1/1     Running   0          60s     172.31.100.212   fargate-ip-172-31-100-212.ec2.internal   <none>           <none>
```

Note that you need a [NAT Gateway](./vpc.md#nat-gateway) to pull the Docker image, otherwise you get the errors ErrImagePull and ImagePullBackOff.

Note that Fargate allocates a node for every pod. For example, if we have 2 pods running we have 2 nodes:

```shell
kubectl get nodes -n my-namespace
# NAME                                     STATUS   ROLES    AGE     VERSION
# fargate-ip-172-31-100-212.ec2.internal   Ready    <none>   42m     v1.34.0-eks-2bf45b0
# fargate-ip-172-31-121-49.ec2.internal    Ready    <none>   2d18h   v1.34.0-eks-2bf45b0
```

Deleting a pod (`kubectl delete pod httpd -n my-namespace`) also deletes the corresponding node.

### CloudWatch logging

https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html

To enable CloudWatch logging on Fargate pods, we need to create a ConfigMap named `aws-logging` at the namespace `aws-observability`.

When checking the Events section of `kubectl describe pod httpd -n my-namespace`, we see this event:

```
Events:
  Type     Reason           Age   From               Message
  ----     ------           ----  ----               -------
  Warning  LoggingDisabled  47s   fargate-scheduler  Disabled logging because aws-logging configmap was not found. configmap "aws-logging" not found
```

Note that we need to have CloudWatch permissions at the pod execution role. You can attach the AWS managed policy [CloudWatchLogsFullAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/CloudWatchLogsFullAccess.html), or create a policy with these permissions ([source](https://github.com/aws-samples/amazon-eks-fluent-logging-examples/blob/mainline/examples/fargate/cloudwatchlogs/permissions.json)):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:CreateLogGroup",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents",
        "logs:PutRetentionPolicy"
      ],
      "Resource": "*"
    }
  ]
}
```

Create the namespace:

```shell
kubectl apply -f aws-observability-namespace.yaml
```

```yaml title="aws-observability-namespace.yaml"
kind: Namespace
apiVersion: v1
metadata:
  name: aws-observability
  labels:
    aws-observability: enabled
```

Create the ConfigMap:

```shell
kubectl apply -f aws-logging-cloudwatch-configmap.yaml
```

```yaml title="aws-logging-cloudwatch-configmap.yaml"
kind: ConfigMap
apiVersion: v1
metadata:
  name: aws-logging
  namespace: aws-observability
data:
  flb_log_cw: 'true' # Set to true to ship Fluent Bit process logs to CloudWatch.
  filters.conf: |
    [FILTER]
        Name parser
        Match *
        Key_name log
        Parser crio
    [FILTER]
        Name kubernetes
        Match kube.*
        Merge_Log On
        Keep_Log Off
        Buffer_Size 0
        Kube_Meta_Cache_TTL 300s
  output.conf: |
    [OUTPUT]
        Name cloudwatch_logs
        Match   kube.*
        region us-east-1
        log_group_name my-logs
        log_stream_prefix from-fluent-bit-
        log_retention_days 60
        auto_create_group true
  parsers.conf: |
    [PARSER]
        Name crio
        Format Regex
        Regex ^(?<time>[^ ]+) (?<stream>stdout|stderr) (?<logtag>P|F) (?<log>.*)$
        Time_Key    time
        Time_Format %Y-%m-%dT%H:%M:%S.%L%z
```

Modify the yaml to set `region` to the AWS Region that your cluster is in, and `my-logs` to a better log group name. Once created, use `kubectl get configmap app-config -o yaml` to see the details.

Run a new pod:

```shell
kubectl run httpd --image httpd:latest -n my-namespace --labels type=fargate
```

Doing `kubectl describe pod httpd -n my-namespace` shows that logging is enabled:

```
Annotations:          CapacityProvisioned: 0.25vCPU 0.5GB
                      Logging: LoggingEnabled

Events:
  Type    Reason          Age   From               Message
  ----    ------          ----  ----               -------
  Normal  LoggingEnabled  68s   fargate-scheduler  Successfully enabled logging for pod
```

At the [CloudWatch console](https://console.aws.amazon.com/cloudwatch) you'll find a new log group named `my-logs`.
