---
title: EKS
---

# EKS - Elastic Kubernetes Service

https://aws.amazon.com/eks

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

https://github.com/awslabs/eksdemo - Application catalog (Argo, Cilium, Crossplane, Flux, Itio...)

EKS Node Viewer - https://github.com/awslabs/eks-node-viewer/

Find Amazon EKS optimized AMI IDs - https://github.com/guessi/eks-ami-finder

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
- https://github.com/guessi/eks-tutorials
- https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices

### EKS Workshop

https://www.eksworkshop.com - https://github.com/aws-samples/eks-workshop-v2 - Source code of the app: https://github.com/aws-containers/retail-store-sample-app

> You should start each lab from the page indicated by this badge. Starting in the middle of a lab will cause unpredictable behavior.

If the cluster is not functioning, run the command `prepare-environment` to reset it.

## IAM roles

AWS managed policies for Amazon Elastic Kubernetes Service - https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html

| IAM Role              | Used On (EKS Mode)  | Assumed By                   | Principal                                                            | Purpose                                                              | Permissions Policy                                                                        |
| --------------------- | ------------------- | ---------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Cluster role          | All clusters        | EKS control plane            | `Service: eks.amazonaws.com`                                         | Allow EKS to manage cluster resources (EC2, Auto Scaling, ELB, ENIs) | `AmazonEKSClusterPolicy`, `AmazonEKSVPCResourceController`                                |
| Node instance role    | EC2-based nodes     | Worker nodes (EC2 instances) | `Service: ec2.amazonaws.com`                                         | Allow EC2 instances to access AWS (pull ECR images, CNI, etc.)       | `AmazonEKSWorkerNodePolicy`, `AmazonEKS_CNI_Policy`, `AmazonEC2ContainerRegistryPullOnly` |
| Fargate pod execution | Fargate profiles    | Fargate infrastructure       | `Service: eks-fargate-pods.amazonaws.com`                            | Pull images, CloudWatch logs, network setup                          | `AmazonEKSFargatePodExecutionRolePolicy`, `CloudWatchLogsFullAccess` (optional)           |
| IRSA                  | EC2 or Fargate pods | Pods (via service accounts)  | `Federated: arn:aws:iam::<account-id>:oidc-provider/<oidc-provider>` | Allow pods (apps) fine-grained access to AWS services (S3, DynamoDB) | Custom (eg S3, DynamoDB)                                                                  |
| EKS Pod Identity      | EC2 or Fargate pods | Pods (via EKS agent)         | `Service: pods.eks.amazonaws.com`                                    | App-level AWS API access without OIDC                                | Custom (eg S3, DynamoDB)                                                                  |

Note: to run Pods on Fargate you need a [Pod execution IAM role](https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html).

### Cluster role

https://docs.aws.amazon.com/eks/latest/userguide/cluster-iam-role.html

Allows the cluster Kubernetes control plane to manage AWS resources on your behalf. Clusters use this role to manage nodes. The role has the AWS managed permission policy [AmazonEKSClusterPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSClusterPolicy.html), which allows the control plane to interact with the following AWS services: EC2, Elastic Load Balancing, Auto Scaling and KMS ([see explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksclusterpolicy)). We can optionally attach [AmazonEKSVPCResourceController](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSVPCResourceController.html) to manage ENIs and IP addresses for worker nodes ([see explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksvpcresourcecontroller)).

To create this role using the console, go to IAM → Roles, click "Create role" and set:

- Trusted entity type: AWS service
- Service or use case: EKS - Cluster. Allows the cluster Kubernetes control plane to manage AWS resources on your behalf.

The wizard attaches the AWS managed permission policy [AmazonEKSClusterPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSClusterPolicy.html). After the role is created, go to the role page and at the Permissions tab, do "Add permissions" → "Attach policies" and attach [AmazonEKSVPCResourceController](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSVPCResourceController.html).

Trust policy (trusted entities):

```json title="eks-cluster-role-trust-policy.json"
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

To create this role using the CLI run ([source](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-create-cluster)):

```shell
aws iam create-role \
  --role-name MyAmazonEKSClusterRole \
  --assume-role-policy-document file://"eks-cluster-role-trust-policy.json"
```

```shell
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy \
  --role-name MyAmazonEKSClusterRole
```

### Node role

https://docs.aws.amazon.com/eks/latest/userguide/create-node-role.html

The node role is assumed by EC2 instances, the worker nodes. Is like an [EC2 instance profile](../aws/iam#ec2-instance-profile). You can see the role at the [EC2 console](https://console.aws.amazon.com/ec2/home#Instances) → Instances → select an instance → IAM Role.

Gives permissions to the kubelet running on the node to make calls to the Kubernetes API and other AWS APIs on your behalf. This includes permissions to access container registries like ECR where your application container images are stored.

To create this role using the console, go to IAM → Roles, click "Create role" and set:

- Trusted entity type: AWS service
- Service or use case: EC2. Allows EC2 instances to call AWS services on your behalf.

At the "Add permissions" page, filter by "EKS" and attach these policies:

- [AmazonEKSWorkerNodePolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSWorkerNodePolicy.html). Allows Amazon EKS worker nodes to connect to Amazon EKS Clusters. [See explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneksworkernodepolicy).
- [AmazonEKS_CNI_Policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKS_CNI_Policy.html). Allows the nodes to configure the Elastic Network Interfaces and IP addresses on your EKS worker nodes. [See explanation](https://docs.aws.amazon.com/eks/latest/userguide/security-iam-awsmanpol.html#security-iam-awsmanpol-amazoneks-cni-policy) (optional).

Then filter by "ec2containerregistry" and attach the policy [AmazonEC2ContainerRegistryPullOnly](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ContainerRegistryPullOnly.html), which allows the nodes to pull images from ECR. You can also use [AmazonEC2ContainerRegistryReadOnly](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ContainerRegistryReadOnly.html), which allows to list repositories, describe images, ect. By adding this permission policy, we can use private ECR repositories without having to [specify `imagePullSecrets`](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) in the Kubernetes pod spec.

Trust policy (trusted entities):

```json title="node-role-trust-policy.json"
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

To create this role using the CLI run ([source](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-launch-workers)):

```shell
aws iam create-role \
  --role-name MyAmazonEKSNodeRole \
  --assume-role-policy-document file://"node-role-trust-policy.json"
```

```shell
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy \
  --role-name MyAmazonEKSNodeRole
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPullOnly \
  --role-name MyAmazonEKSNodeRole
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy \
  --role-name MyAmazonEKSNodeRole
```

### IRSA (IAM roles for service accounts)

:::tip
Is recommended to use [pod identity](#pod-identity) instead.
:::

https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/

https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/

https://www.eksworkshop.com/docs/security/iam-roles-for-service-accounts/

Enables Kubernetes [service accounts](https://kubernetes.io/docs/concepts/security/service-accounts/) to assume IAM roles. Allows individual pods to assume IAM roles and securely access AWS services (like S3 or DynamoDB) without giving permissions to the node role, which would grant permissions to all nodes. Eliminates the need to store static credentials (access keys) inside containers.

Uses an OIDC provider, which has a URL like `https://oidc.eks.<region>.amazonaws.com/id/<id>`. You can find the URL at the EKS console → your cluster → Overview tab → Details section → OpenID Connect provider URL, or by running `aws eks describe-cluster --name MyCluster --region us-east-1 --query "cluster.identity.oidc.issuer" --output text`.

#### Setup using the Console

First, you need to create an OIDC Identity Provider. This is done only once per cluster.

See instructions at [Create an IAM OIDC provider for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).

At the IAM console → Identity providers, click "Add provider" and set:

- Provider type: OpenID Connect.
- Provider URL: the OIDC provider URL of your cluster (`https://oidc.eks.<region>.amazonaws.com/id/<id>`).
- Audience: `sts.amazonaws.com`.

Next, create an IAM role to be used by a Kubernetes service account. Go to the IAM console → Roles and click "Create role". Set:

- Trusted entity type: Custom trust policy.
- Paste this trust policy (trusted entities), replacing `<account-id>`, `<oidc-provider>`, `<namespace>` and `<service-account-name>`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/<oidc-provider>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "<oidc-provider>:aud": "sts.amazonaws.com",
          "<oidc-provider>:sub": "system:serviceaccount:<namespace>:<service-account-name>"
        }
      }
    }
  ]
}
```

Note that the `Principal` is `Federated`, not `Service`. The `<oidc-provider>` is `oidc.eks.<region>.amazonaws.com/id/<id>`. You can get it at the console, at the cluster Overview tab → Details section → OpenID Connect provider URL (remove `https://`), or by running `aws eks describe-cluster --name MyCluster --region us-east-1 --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\/\///"`.

Select any permissions policy you need, eg to access S3.

Once the role is created, annotate the service account to link it to the IAM role:

```shell
kubectl annotate serviceaccount <service-account-name> -n <namespace> eks.amazonaws.com/role-arn=arn:aws:iam::<account-id>:role/MyEKSServiceAccountRole
```

To see the annotation, run `kubectl get serviceaccount <service-account-name> -n kube-system -o yaml` or `kubectl describe serviceaccount <service-account-name> -n kube-system`.

You may need to create a Kubernetes service account:

```shell
kubectl create serviceaccount <service-account-name> -n <namespace>
```

### Pod Identity

https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html

https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-eks-pod-identity/

> Makes it easy to use an IAM role across multiple clusters without the need to update the role trust policy and simplifies policy management by enabling the reuse of permission policies across IAM roles

https://aws.amazon.com/blogs/containers/amazon-eks-pod-identity-a-new-way-for-applications-on-eks-to-obtain-iam-credentials/

https://www.eksworkshop.com/docs/security/amazon-eks-pod-identity/

Does the same than service accounts, but with less config and doesn't require OIDC.

Roles can be used in multiple clusters. Is backwards compatible with IRSA.

EKS Pod Identity vs IRSA - https://www.youtube.com/watch?v=aUjJSorBE70

You need to install the EKS Pod Identity Agent, an EKS Add-on, which is an agent pod that runs on each node. It's pre-installed on EKS Auto Mode clusters.

Source code: https://github.com/aws/eks-pod-identity-agent

Trust policy (trusted entities):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "pods.eks.amazonaws.com"
      },
      "Action": ["sts:AssumeRole", "sts:TagSession"]
    }
  ]
}
```

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

## API server endpoint access

https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html

https://www.eksworkshop.com/docs/security/cluster-access-management/

Cluster API server endpoint access:

- Public only (default): the API server is reachable over the Internet, from outside the VPC. Worker node traffic leaves the VPC (but not Amazon’s network) to communicate to the endpoint.
- Private only: restrict API server to internal VPC traffic only. External access requires VPN, bastion host or private link. Worker node traffic to the endpoint will stay within your VPC.
- Public and private: the API server is publicly accessible from outside your VPC, for example for admin tasks. Worker node traffic to the endpoint will stay within your VPC.

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

List available commands: `aws eks help`

[List clusters](https://docs.aws.amazon.com/cli/latest/reference/eks/list-clusters.html):

```shell
aws eks list-clusters
```

[Describe a cluster](https://docs.aws.amazon.com/cli/latest/reference/eks/describe-cluster.html):

```shell
aws eks describe-cluster --name MyCluster
aws eks describe-cluster --name $EKS_CLUSTER_NAME --query 'cluster.accessConfig'
```

Get the OIDC provider URL (`--region` is optional if you have set a default region in your AWS CLI config file):

```shell
aws eks describe-cluster --name MyCluster --region us-east-1 --query "cluster.identity.oidc.issuer" --output text
```

Save to a variable:

```shell
VPC_ID=$(aws eks describe-cluster --name $EKS_CLUSTER_NAME --query 'cluster.resourcesVpcConfig.vpcId' --output text)
```

[List the available access policies](https://docs.aws.amazon.com/cli/latest/reference/eks/list-access-policies.html) (AmazonEKSAdminPolicy, AmazonEKSClusterAdminPolicy, etc.) in your account:

```shell
aws eks list-access-policies
```

All the policies ARN are `arn:aws:eks::aws:cluster-access-policy/XYZ`.

## eksctl

https://eksctl.io - https://github.com/eksctl-io/eksctl

You can install it using a [script](https://docs.aws.amazon.com/eks/latest/eksctl/installation.html#_for_unix). To install with [Homebrew](https://docs.aws.amazon.com/eks/latest/eksctl/installation.html#_homebrew) there are 3 options:

- `brew tap weaveworks/tap` and `brew install weaveworks/tap/eksctl`: https://github.com/weaveworks/homebrew-tap/blob/master/Formula/eksctl.rb
- `brew tap aws/tap` and `brew install aws/tap/eksctl`: https://github.com/aws/homebrew-tap/blob/master/Formula/eksctl.rb → Still not offering the latest release after 2 weeks of being out :/
- `brew install eksctl`: https://formulae.brew.sh/formula/eksctl#default → I've used this

ClusterConfig file examples: https://github.com/guessi/eks-tutorials/tree/main/cluster-config

```yaml title"cluster.yaml"
# Adapted from https://github.com/guessi/eks-tutorials/blob/main/cluster-config/cluster-full.yaml

apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: My-EKS-Cluster
  region: us-east-1
  version: '1.34'

availabilityZones:
  - us-east-1a
  - us-east-1b

privateCluster:
  enabled: false

kubernetesNetworkConfig:
  ipFamily: IPv4

vpc:
  cidr: 192.168.0.0/16
  clusterEndpoints:
    privateAccess: true
    publicAccess: true
  manageSharedNodeSecurityGroupRules: true
  nat:
    gateway: Single # Options: HighlyAvailable, Disable, Single (default)
  publicAccessCIDRs: # you should configured a proper CIDR list here
    - 0.0.0.0/0

accessConfig:
  authenticationMode: API_AND_CONFIG_MAP
  bootstrapClusterCreatorAdminPermissions: true

iam:
  withOIDC: true

managedNodeGroups:
  - name: mng-1
    amiFamily: AmazonLinux2023
    minSize: 2
    maxSize: 3
    desiredCapacity: 2
    volumeSize: 20
    volumeType: gp3
    instanceTypes:
      - 't3.small'
    enableDetailedMonitoring: true
    privateNetworking: true
    disableIMDSv1: true
    disablePodIMDS: false
    spot: true
    ssh:
      allow: false
    # availabilityZones:
    # - us-east-1a
    iam:
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPullOnly
        - arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
        # (Optional) Only required if you need "EC2 Instance Connect"
        - arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
        # (Optional) Only required if you are using "SSM"
        - arn:aws:iam::aws:policy/AmazonSSMPatchAssociation
        # (Optional) Only required if you have "Amazon CloudWatch Observability" setup
        - arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy
        - arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess

addonsConfig:
  autoApplyPodIdentityAssociations: true

addons:
  - name: kube-proxy
    version: latest
  - name: vpc-cni
    version: latest
    useDefaultPodIdentityAssociations: true
  - name: coredns
    version: latest
  - name: eks-pod-identity-agent
    version: latest
  - name: metrics-server
    version: latest

cloudWatch:
  # ref: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
  clusterLogging:
    logRetentionInDays: 90
    enableTypes:
      - 'api'
      - 'audit'
      - 'authenticator'
      - 'controllerManager'
      - 'scheduler'
```

### `--dry-run`

Use `--dry-run` to validate a cluster configuration file:

```shell
eksctl create cluster -f cluster.yaml --dry-run
```

You can also use `--dry-run` to generate a YAML file (note that there are options that cannot be represented in the ClusterConfig file, [see the docs](https://docs.aws.amazon.com/eks/latest/eksctl/dry-run.html)):

```shell
eksctl create cluster --name development --dry-run > cluster.yaml
eksctl create cluster -f cluster.yaml
```

Create cluster:

```shell
eksctl create cluster --name MyCluster --region us-east-1 # Managed nodes
eksctl create cluster --name MyCluster --region us-east-1 --fargate
eksctl create cluster -f cluster.yaml
```

```shell
eksctl delete cluster --name MyCluster --region us-east-1
```

## Add ons

https://docs.aws.amazon.com/eks/latest/userguide/workloads-add-ons-available-eks.html

See the required platform version:

```shell
aws eks describe-addon-versions --addon-name aws-ebs-csi-driver
```

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

:::info
EKS suggests using private subnets for worker nodes. (From the console Info sidebar.)
:::

## Managed node groups

https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html

https://www.eksworkshop.com/docs/fundamentals/compute/managed-node-groups/

A node group is a group of EC2 instances that supply compute capacity to your Amazon EKS cluster. You can add multiple node groups to your cluster. Node groups implement basic compute scaling through EC2 Auto Scaling groups.

> Amazon EKS managed node groups make it easy to provision compute capacity for your cluster. managed node groups consist of one or more Amazon EC2 instances running the latest EKS-optimized AMIs. All nodes are provisioned as part of an Amazon EC2 Auto Scaling group that is managed for you by Amazon EKS and all resources including EC2 instances and autoscaling groups run within your AWS account.

Think of a node group like an EC2 Auto Scaling group. Indeed, when you create a node group using the console, it automatically creates an Auto Scaling group and a launch template (you can see both at the EC2 console).

You can define a custom launch template to customize the configuration of the EC2 instances.

The nodes in a node group use the [node IAM role](#node-role).

```shell
kubectl get nodes
kubectl get nodes --show-labels
```

## Karpenter

https://karpenter.sh

https://github.com/aws/karpenter-provider-aws

https://github.com/kubernetes-sigs/karpenter

Optimize node usage.

Run Kubernetes Clusters for Less with Amazon EC2 Spot and Karpenter - https://community.aws/tutorials/run-kubernetes-clusters-for-less-with-amazon-ec2-spot-and-karpenter

https://github.com/aws-samples/karpenter-blueprints

Karpenter vs Cluster Autoscaler - https://www.youtube.com/watch?v=FIBc8GkjFU0

https://www.udemy.com/course/karpenter-masterclass-for-kubernetes

## Auto Mode

https://docs.aws.amazon.com/eks/latest/userguide/automode.html

https://docs.aws.amazon.com/eks/latest/best-practices/automode.html

https://catalog.workshops.aws/eks-auto-mode/en-US

https://www.youtube.com/watch?v=IQjsFlkqWQY

Auto Mode automates routine cluster tasks for compute, storage, and networking.

Amazon EKS Auto Mode automatically scales cluster compute resources. If a pod can’t fit onto existing nodes, EKS Auto Mode creates a new one. EKS Auto Mode also consolidates workloads and deletes nodes. EKS Auto Mode builds upon Karpenter. [source](https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html)

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

https://www.eksworkshop.com/docs/fundamentals/compute/fargate/

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

Note that you need a [NAT Gateway](../aws/vpc.md#nat-gateway) to pull the Docker image, otherwise you get the errors ErrImagePull and ImagePullBackOff.

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

## Load Balancer Controller

From https://kubectl.docs.kubernetes.io/guides/introduction/resources_controllers/#service-discovery-and-load-balancing

- Services Resources (L4) may expose Pods internally within a cluster or externally through an HA proxy.
- Ingress Resources (L7) may expose URI endpoints and route them to Services.

https://github.com/kubernetes-sigs/aws-load-balancer-controller

Route internet traffic with AWS Load Balancer Controller - https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html

The Load Balancer Controller manages Elastic Load Balancers for a Kubernetes cluster.
The controller continuously monitors the Kubernetes API for objects of type Ingress (for ALB) and Service of type LoadBalancer (for NLB).
It provisions AWS load balancers that point to cluster Service or Ingress resources.
In other words, the controller creates a single IP address or DNS name that points to multiple pods in your cluster.

Correspondence:

- Kubernetes [Service](https://kubernetes.io/docs/concepts/services-networking/service/): LBC provisions a [Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html) (default) or [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html)
- Kubernetes [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/): LBC provisions an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
- Kubernetes [Gateway](https://kubernetes.io/docs/concepts/services-networking/gateway/): LBC provisions an [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)

Note that at the [cluster role](#cluster-role) we have the policy [AmazonEKSClusterPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEKSClusterPolicy.html), which has many `elasticloadbalancing` permissions like `elasticloadbalancing:CreateLoadBalancer`. This allows EKS to create the load balancers.

### Install using Helm

Instructions:

- https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html
- https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
- https://github.com/aws/eks-charts/tree/master/stable/aws-load-balancer-controller

Steps:

1. Create IAM permissions policy `AWSLoadBalancerControllerIAMPolicy`.
2. Create the IAM role that uses the IAM policy.
3. Create the Kubernetes service account and annotate it with the IAM role ARN, so that the service account assumes the IAM role.
4. Install the AWS Load Balancer Controller using Helm.
   - Apply the CRDs if updating.

The policy `AWSLoadBalancerControllerIAMPolicy` can be reused across multiple EKS clusters in the same AWS account. If you already have it, skip next steps.

Go to the [IAM console](https://console.aws.amazon.com/iam/home#/policies) → Policies and click "Create policy". Switch to the JSON tab and paste this IAM policy: https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.14.1/docs/install/iam_policy.json. Name it `AWSLoadBalancerControllerIAMPolicy`.

You can also do:

```shell
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.14.1/docs/install/iam_policy.json
aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json
```

Make sure you use the latest tag, [see releases](https://github.com/kubernetes-sigs/aws-load-balancer-controller/releases/).

If the cluster is new and you don't have an OIDC identity provider yet, create one following [this instructions](#irsa-iam-roles-for-service-accounts).

Next, create an IAM role to be used by the Kubernetes service account. Go to the IAM console → Roles and click "Create role". Set:

- Trusted entity type: Custom trust policy.
- Paste this trust policy (trusted entities), replacing `<account-id>` and `<oidc-provider>` (`oidc.eks.<region>.amazonaws.com/id/<id>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/<oidc-provider>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "<oidc-provider>:aud": "sts.amazonaws.com",
          "<oidc-provider>:sub": "system:serviceaccount:kube-system:aws-load-balancer-controller"
        }
      }
    }
  ]
}
```

You can also choose Trusted entity type "Web identity" and select the OIDC IdP for your cluster from the list, but then you need to add the condition `sub` to the trust policy, for example by editing the trust policy JSON when the role is created.

The `sub` condition ensures that only the service account `aws-load-balancer-controller` in the `kube-system` namespace can assume this role. The service account name (`aws-load-balancer-controller`) can be anything, but it must match the value used when deploying the controller.

At the "Add permissions" page, attach the permissions policy `AWSLoadBalancerControllerIAMPolicy` created before. Name the role `AmazonEKSLoadBalancerControllerRole-<cluster-name>`.

Now that the IAM role is created, create the Kubernetes service account that uses this IAM role:

```shell
kubectl create serviceaccount aws-load-balancer-controller -n kube-system
```

To tell Kubernetes which IAM role should the service account use, annotate the service account with the ARN of the IAM role created before:

```shell
kubectl annotate serviceaccount aws-load-balancer-controller -n kube-system \
  eks.amazonaws.com/role-arn=arn:aws:iam::<account-id>:role/AmazonEKSLoadBalancerControllerRole-<cluster-name>
```

See the annotation with:

```shell
kubectl get serviceaccount aws-load-balancer-controller -n kube-system -o yaml
kubectl describe serviceaccount aws-load-balancer-controller -n kube-system
```

Finally, install the AWS Load Balancer Controller using Helm. See details at:

- https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html#lbc-helm-install
- https://github.com/aws/eks-charts/tree/master/stable/aws-load-balancer-controller

```shell
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=<my-cluster> \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=<us-east-1> \
  --set vpcId=<vpc-id>
```

Verify the installation with:

```shell
helm list -A
# NAME                        	NAMESPACE  	REVISION	UPDATED                             	STATUS  	CHART                              	APP VERSION
# aws-load-balancer-controller	kube-system	1       	2025-11-11 20:03:00.575674 +0100 CET	deployed	aws-load-balancer-controller-1.14.1	v2.14.1

kubectl get ingressclass
# NAME   CONTROLLER            PARAMETERS   AGE
# alb    ingress.k8s.aws/alb   <none>       16m

kubectl get deployment -n kube-system aws-load-balancer-controller
# NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
# aws-load-balancer-controller   2/2     2            2           72m

kubectl get pods -n kube-system | grep aws-load-balancer-controller
# aws-load-balancer-controller-65dcc7d589-tt6sr   1/1     Running   0          76m
# aws-load-balancer-controller-65dcc7d589-xtkpt   1/1     Running   0          76m
```

:::important
The deployed chart doesn’t receive security updates automatically. You need to manually upgrade to a newer chart when it becomes available. When upgrading, change `install` to `upgrade` in the previous command.

The `helm install` command automatically installs the custom resource definitions (CRDs) for the controller, but `helm upgrade` does not. When using `helm upgrade`, you must manually install the CRDs with:

```shell
wget https://raw.githubusercontent.com/aws/eks-charts/master/stable/aws-load-balancer-controller/crds/crds.yaml
kubectl apply -f crds.yaml
```

The two CRDs are `ingressclassparams.elbv2.k8s.aws` and `targetgroupbindings.elbv2.k8s.aws`. See them with `kubectl get crd`.
:::

## Classic Load Balancer - Service

Run this command to expose a deployment as a service and create a load balancer:

```shell
kubectl expose deployment <deployment> -n <namespace> --name myapp-service --port 8080 --type LoadBalancer
# service/myapp-service exposed
```

By default, creating this service creates a Classic Load Balancer with an "Internet-facing" scheme. A the [EC2 console](https://console.aws.amazon.com/ec2/home#LoadBalancers) → Load Balancers, each EC2 instance registered at the "Target instances" tab are the EC2 nodes of the cluster. The CLB listens on TCP:8080 and forwards the request to registered EC2 instances using the instance protocol and port (eg TCP:30709) configured at the listener.

You can open the "DNS name" at the browser, for example `http://ad4003564c7424c7a8991d29de4be1a7-2108949974.us-east-1.elb.amazonaws.com:8080/`.

If you get this error when doing `kubectl describe service myapp-service`:

```
Events:
  Type     Reason                  Age                From                Message
  ----     ------                  ----               ----                -------
  Normal   EnsuringLoadBalancer    28s (x4 over 63s)  service-controller  Ensuring load balancer
  Warning  SyncLoadBalancerFailed  27s (x4 over 63s)  service-controller  Error syncing load balancer: failed to ensure load balancer: could not find any suitable subnets for creating the ELB
```

You need to tag subnets to tell EKS what subnets to use to deploy the load balancer. Add a tag to each subnet with the name `kubernetes.io/cluster/<cluster-name>` and value `shared`. See https://stackoverflow.com/questions/62468996/eks-could-not-find-any-suitable-subnets-for-creating-the-elb and https://repost.aws/knowledge-center/eks-vpc-subnet-discovery.

Deleting the service (`kubectl delete service myapp-service -n <namespace>`) also deletes the load balancer.

## Network Load Balancer - Service

Route TCP and UDP traffic with Network Load Balancers - https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html

Auto Mode - Use Service Annotations to configure Network Load Balancers - https://docs.aws.amazon.com/eks/latest/userguide/auto-configure-nlb.html

By default, it creates a Classic Load Balancer. To create a Network Load Balancer instead, add this annotation to the Service manifest:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
```

[Scheme](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/service/annotations/#lb-scheme) can be `internal` (default) or `internet-facing`. To create an Internet-facing NLB, add this annotation:

```yaml
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
```

[Target type](https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/service/annotations/#nlb-target-type) can be `instance` (default) or `ip`. You can customize it using this annotation:

```yaml
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip
```

With target type `ip`, the NLB routes traffic directly to the pod IP addresses, instead of the node IP addresses. Network plugin must use native AWS VPC networking configuration for pod IP, for example [Amazon VPC CNI plugin](https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html) or an [alternative CNI plugin](https://docs.aws.amazon.com/eks/latest/userguide/alternate-cni-plugins.html).

## Application Load Balancer - Ingress

Route application and HTTP traffic with Application Load Balancers - https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html

ALB with Auto Mode - https://docs.aws.amazon.com/eks/latest/userguide/auto-configure-alb.html - https://docs.aws.amazon.com/eks/latest/userguide/auto-elb-example.html

You can define rules to route requests to different services based on URL paths and hostnames. For example, requests to `/api` can be routed to one service, while requests to `/web` go to another.

It can route traffic to pods running on EC2 and Fargate.

You can deploy an ALB to public or private subnets ([source](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html)). Use public subnets to create an Internet-facing ALB, and private subnets to create an internal ALB.

Ingress specification - https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/guide/ingress/spec/

Example: https://github.com/kubernetes-sigs/aws-load-balancer-controller/blob/v2.14.1/docs/examples/2048/2048_full.yaml

How it works:

1. The Load Balancer Controller watches the Kubernetes API for new Ingress resources with the annotation `kubernetes.io/ingress.class: alb` or `ingressClassName: alb`. When a new Ingress is created or updated, the controller reacts accordingly.
2. Provisions a new Application Load Balancer (ALB) automatically. Based on the Ingress specification, it calls the AWS Elastic Load Balancing API to create or modify an ALB in your AWS account. It can reuse existing ALBs if configured (via Ingress annotations), or spin up new ones.
3. Configures listeners. The ALB typically has two listeners on port 80 (HTTP) and port 443 (HTTPS, with ACM certificate). The controller can automatically handle HTTPS by attaching certificates from AWS Certificate Manager (ACM).
4. For each `backend` `service` declared at the Ingress, the controller creates a Target Group, which is responsible for routing requests to the appropriate targets and health checking. The target group contains the pod IPs of your Kubernetes Service endpoints. It updates targets dynamically as pods scale up/down.
5. Sets up routing rules (host/path-based). It translates the rules section of your Ingress spec (hostnames and paths) into ALB listener rules.

Traffic modes (target types):

- `alb.ingress.kubernetes.io/target-type: instance`. The default. Registers nodes as targets for the ALB. ALB routes traffic to your service NodePort and then is proxied to node IPs. The nodes then forward traffic to pods.
- `alb.ingress.kubernetes.io/target-type: ip`. Registers pods as targets for the ALB. ALB routes traffic directly to pod IPs. Service NodePort is bypassed. More efficient. Requires VPC CNI plugin or compatible CNI. Required for Fargate or EKS Hybrid Nodes.

You can add tags to the ALB with `alb.ingress.kubernetes.io/tags: Environment=dev,Team=test`.

Setup:

1. Install the AWS Load Balancer Controller using Helm [following these instructions](#install-using-helm).
2. Deploy a sample application with a Service of type ClusterIP.
3. Deploy an Ingress resource that points to the Service.

Deploy an application. For example, create a deployment and service:

```yaml title="alb-app.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: my-namespace
  labels:
    app: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: hashicorp/http-echo:1.0.0
          args:
            - '-text=Hello from my-app'
          ports:
            - containerPort: 5678
              name: http
---
apiVersion: v1
kind: Service
metadata:
  name: my-service
  namespace: my-namespace
  labels:
    app: my-app
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: http
```

Deploy an Ingress resource with the necessary annotations, rules and backend services. For example:

```yaml title="alb-ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  namespace: my-namespace
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/subnets: subnet-07a3aa527ccdabc36,subnet-05bc3627ccda7a3aa
    alb.ingress.kubernetes.io/target-type: ip
spec:
  ingressClassName: alb
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-service
                port:
                  number: 80
```

Note: don't use `kubernetes.io/ingress.class: alb` because is deprecated, use `ingressClassName: alb`.

After creating it with `kubectl apply -f alb-ingress.yaml`, check the status with `kubectl get ingress -n my-namespace`:

```shell
NAME         CLASS   HOSTS   ADDRESS                                                                   PORTS   AGE
my-ingress   alb     *       k8s-albingre-demoalbi-2062cf2532-1738990837.us-east-1.elb.amazonaws.com   80      14m
```

The `ADDRESS` column shows the DNS name of the ALB created. The `HOSTS` column `*` means it accepts requests for any hostname.

At the [EC2 console](https://console.aws.amazon.com/ec2/home#LoadBalancers) → Load Balancers, you can see the ALB. The ALB was automatically created by the AWS Load Balancer Controller after deploying the Ingress resource with the appropriate annotations.

The [Target Groups page](https://console.aws.amazon.com/ec2/home#TargetGroups) shows the target group created for the backend service, with the pod IPs registered as targets (use `kubectl get pods -o wide` to see the pod IPs). We can scale the deployment with `kubectl scale deployment my-app --replicas 3` and see the target group updated automatically, with the new pod IP added as a target.

Delete the ingress (`kubectl delete ingress my-ingress -n my-namespace` or `kubectl delete -f alb-ingress.yaml`) to delete the ALB and target group. Delete the deployment and service with `kubectl delete -f alb-sample-app.yaml`.

## Volumes

https://docs.aws.amazon.com/eks/latest/userguide/storage.html

You can use S3, EBS, EFS, FSX and Amazon File Cache using Container Storage Interface (CSI) drivers. CSI drivers allow you to expose storage systems to your Kubernetes cluster as persistent volumes. Each CSI driver is [an add-on](https://docs.aws.amazon.com/eks/latest/userguide/workloads-add-ons-available-eks.html) that you need to install.

CSI driver needs AWS IAM Permissions. You can use IRSA or EKS Pod Identities.

| Feature         | EBS                      | EFS                  |
| --------------- | ------------------------ | -------------------- |
| Type            | Block                    | File                 |
| Pod attachment  | Single                   | Multiple             |
| Access mode     | ReadWriteOnce            | ReadWriteMany        |
| Fargate support | No                       | Yes                  |
| Storage         | Provisioned upfront      | Scales automatically |
| Performance     | High IOPS and throughput | Scalable performance |

### EBS CSI driver with IRSA

https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html

https://github.com/kubernetes-sigs/aws-ebs-csi-driver

Note that you can’t mount Amazon EBS volumes to Fargate Pods, only to EC2 worker nodes.

Steps:

1. Create the Identity Provider for your cluster.
2. Create an IAM role for the EBS CSI driver with the permissions policy [AmazonEBSCSIDriverPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEBSCSIDriverPolicy.html).
3. Install the EBS CSI Driver add-on at the cluster. This creates the service accounts used by the driver.
4. Annotate the service account to link it to the IAM role.
5. Create a PersistentVolumeClaim (PVC) that uses an EBS volume as storage for your pods.
6. Create a pod that uses the PVC.

If you haven't already, create an Identity provider. [See steps above at IRSA](#irsa-iam-roles-for-service-accounts).

Then create the role that the CSI driver will use. Go to the IAM console → Roles and click "Create role". Set:

- Trusted entity type: Custom trust policy.
- Paste this trust policy, replacing `<account-id>` and `<oidc-provider>`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/<oidc-provider>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "<oidc-provider>:aud": "sts.amazonaws.com",
          "<oidc-provider>:sub": "system:serviceaccount:kube-system:ebs-csi-controller-sa"
        }
      }
    }
  ]
}
```

The `<oidc-provider>` is `oidc.eks.<region>.amazonaws.com/id/<id>`. You can get it at the console, at the cluster Overview tab → Details section → OpenID Connect provider URL (remove `https://`), or by running `aws eks describe-cluster --name MyCluster --region us-east-1 --query "cluster.identity.oidc.issuer" --output text | sed -e "s/^https:\/\///"`.

At the next page, attach the permissions policy [AmazonEBSCSIDriverPolicy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEBSCSIDriverPolicy.html) to the role, which "allows the CSI driver service account to make calls to related services such as EC2 on your behalf". Name the role `AmazonEKS_EBS_CSI_DriverRole` as suggested in the docs.

Install the EBS CSI Driver add-on. At the EKS console, go to your cluster → "Add-ons" tab → click "Get more add-ons". Select "Amazon EBS CSI Driver". Select the latest version. For "Add-on access", choose "IAM roles for service accounts (IRSA)". Select the role `AmazonEKS_EBS_CSI_DriverRole` just created.

After installing the add-on, run `kubectl get serviceaccounts -n kube-system | grep ebs` to see the service account used by the driver, which is created automatically when installing the add-on. This returns `ebs-csi-controller-sa` and `ebs-csi-node-sa`.

We need to annotate the service account to link it to the IAM role. Run:

```shell
kubectl annotate serviceaccount ebs-csi-controller-sa -n kube-system eks.amazonaws.com/role-arn=arn:aws:iam::<account-id>:role/AmazonEKS_EBS_CSI_DriverRole
```

To see the annotation, run `kubectl get serviceaccount ebs-csi-controller-sa -n kube-system -o yaml` or `kubectl describe serviceaccount ebs-csi-controller-sa -n kube-system`.

This setup allows the service account used by the EBS CSI driver to assume the IAM role with the necessary permissions to manage EBS volumes on your behalf.

Once the driver is installed and the service account is annotated, define a PersistentVolumeClaim (PVC) that uses an EBS volume as storage for your pods:

```yaml title="ebs-pvc.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ebs-pvc
spec:
  storageClassName: gp2
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

EBS volumes can only be attached (mounted) to a single node at a time, so we set `accessModes: ReadWriteOnce`.

We set `storageClassName: gp2`, which is the default StorageClass created by the EBS CSI driver add-on. You can check it with `kubectl get storageclass` or `kubectl get storageclasses.storage.k8s.io`:

```
NAME   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
gp2    kubernetes.io/aws-ebs   Delete          WaitForFirstConsumer   false                  7d17h
```

The reclaim policy `Delete` means that when the PVC is deleted, the underlying EBS volume is also deleted. The other option is `Retain`, which keeps the volume even after the PVC is deleted.

The `WaitForFirstConsumer` volume binding mode ensures that the volume is not created until a pod that uses the PVC is scheduled. This is important for EBS volumes because they need to be created in the same availability zone as the node where the pod will run. We also avoid provisioning unnecessary volumes, to save costs (in EBS you pay for provisioned storage, even if unused).

Create the PVC with `kubectl apply -f ebs-pvc.yaml`. Check it with `kubectl get pvc` or `kubectl describe pvc ebs-pvc`.

```
Name:          ebs-pvc
Namespace:     my-namespace
StorageClass:  gp2
Status:        Pending
Volume:
Labels:        <none>
Annotations:   <none>
Finalizers:    [kubernetes.io/pvc-protection]
Capacity:
Access Modes:
VolumeMode:    Filesystem
Used By:       <none>
Events:
  Type    Reason                Age                From                         Message
  ----    ------                ----               ----                         -------
  Normal  WaitForFirstConsumer  9s (x8 over 110s)  persistentvolume-controller  waiting for first consumer to be created before binding
```

Note that it says "waiting for first consumer to be created before binding". This is because no pod is using the PVC yet.

Create this pod manifest that uses the PVC:

```yaml title="ebs-pod.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: ebs-app
  namespace: my-namespace
spec:
  volumes:
    - name: ebs-volume
      persistentVolumeClaim:
        claimName: ebs-pvc
  containers:
    - name: app
      volumeMounts:
        - name: ebs-volume
          mountPath: /opt
      image: ubuntu:24.04
      command:
        - sh
        - -c
        - while date; do echo "Hi at `date`" >> /opt/demo.out; sleep 30; done
```

The `claimName` needs to match the PVC name.

Create the pod that uses the persistent volume claim with `kubectl apply -f ebs-pod.yaml`. If we do `kubectl get pvc ebs-pvc` we see that the PVC status changes from `Pending` to `Bound`:

```
NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
ebs-pvc   Bound    pvc-c223eab5-bad5-458a-af4b-0d16ecacd589   1Gi        RWO            gp2            <unset>                 107m
```

Now you can run `kubectl get pv` to see the created persistent volume that uses an EBS volume:

```
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
pvc-c223eab5-bad5-458a-af4b-0d16ecacd589   1Gi        RWO            Delete           Bound    my-namespace/ebs-pvc   gp2            <unset>                          25m
```

At the EC2 console → Elastic Block Store → Volumes, you see a new EBS volume created. From there you can go to the EC2 instance, by clicking the instance id at "Attached resources". At the instance Storage tab, you can see the root volume (20 GiB) and the new EBS volume (1 GiB) attached.

You can also run this command to see the EBS volume details:

```shell
aws ec2 describe-volumes --filters Name=tag:kubernetes.io/created-for/pvc/name,Values=ebs-pvc
```

To clean up, delete the pod _and_ the PVC. Just deleting the pod leaves the PVC and the EBS volume intact. Because the PV reclaim policy is `Delete`, the EBS volume is deleted when the PVC is deleted.

```shell
kubectl delete -f ebs-pod.yaml

kubectl get pvc
# NAME      STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
# ebs-pvc   Bound    pvc-c223eab5-bad5-458a-af4b-0d16ecacd589   1Gi        RWO            gp2            <unset>                 175m
kubectl get pv
# NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
# pvc-c223eab5-bad5-458a-af4b-0d16ecacd589   1Gi        RWO            Delete           Bound    my-namespace/ebs-pvc   gp2            <unset>                          96m

kubectl delete -f ebs-pvc.yaml

kubectl get pvc
# No resources found in my-namespace namespace.
kubectl get pv
# No resources found
```

Verify that the EBS volume is deleted with (response should be an empty array):

```shell
aws ec2 describe-volumes --filters Name=tag:kubernetes.io/created-for/pvc/name,Values=ebs-pvc
```

### Volume Claim Templates

In the previous section [EBS CSI driver with IRSA](#ebs-csi-driver-with-irsa) we show how to _manually_ create a PersistentVolumeClaim (PVC) to use EBS storage for a _single_ pod. In this section we see how to use VolumeClaimTemplates to request dynamic storage for multiple pods in a StatefulSet.

With StatefulSets, each pod has its own persistent storage. You can use VolumeClaimTemplates to request dynamic storage for each pod in the StatefulSet. Each pod gets its own PersistentVolumeClaim (PVC) based on the template, allowing for unique storage per pod. Even if the pod is deleted and recreated (rescheduled), it gets the same PVC and retains its data.

Stateful set manifest example:

```yaml title="ebs-statefulset.yaml"
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: nginx
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.25
          ports:
            - containerPort: 80
              name: web
          volumeMounts:
            - name: www
              mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
    - metadata:
        name: www
      spec:
        storageClassName: gp2
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 1Gi
```

Instead of creating a PVC manually and then referencing it at the pod manifest, we define a `volumeClaimTemplates` section in the StatefulSet spec. Each pod in the StatefulSet gets its own PVC based on this template. Each PVC will create a PV and provision an EBS volume.

Note that the `volumeClaimTemplates` spec is the same than a regular PVC spec.

Create the StatefulSet with `kubectl apply -f ebs-statefulset.yaml`. This creates 1 pod, 1 PVC and 1 PV. Use `kubectl get pod,pvc,pv` to see them. Use `aws ec2 describe-volumes --filters Name=tag:kubernetes.io/created-for/pvc/name,Values="www-web-*"` to see the created EBS volume.

Scale the StatefulSet to 2 replicas with `kubectl scale statefulset web --replicas 2`. This creates one more pod, which dynamically creates a PVC, which in turns provisions an EBS volume for that pod using the CSI driver. Each pod has its own volume. The volume is attached to the node where the pod is running.

Delete the StatefulSet set with `kubectl delete -f ebs-statefulset.yaml`. We are using persistent volumes, so deleting the StatefulSet deletes the pods but does not delete the PVCs, PVs and EBS volumes (that's the point of persistent volumes). However, note that after deleting the pods the state of EBS volumes is now "Available" at the EC2 console, because the volumes are no longer attached to a node. At the EC2 instance Storage tab, the EBS volumes are gone. You need to delete the PVCs manually with `kubectl delete pvc <pvc-name>` or `kubectl delete pvc --all`. Deleting the PVC deletes the PV and the underlying EBS volume, because the PV reclaim policy is `Delete`.

### EFS CSI driver with Pod Identity

https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html

https://github.com/kubernetes-sigs/aws-efs-csi-driver

EFS nodes can be shared across multiple pods simultaneously. We can set `accessModes: ReadWriteMany` in the PVC.

Instead of using [IRSA](#irsa-iam-roles-for-service-accounts), we use [Pod Identity](#pod-identity) to grant the necessary IAM permissions to the EFS CSI driver.

Unlike EBS, which can only be used in node groups, EFS can be mounted to Fargate pods.

Unlike EBS, in EFS volume binding is immediate, so the volume is created as soon as the PVC is created, not when the pod is scheduled.

Steps:

1. Create the IAM role with the [`AmazonEFSCSIDriverPolicy`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEFSCSIDriverPolicy.html) policy.
2. Install the EFS CSI Driver add-on at the cluster.
   - This creates the service accounts used by the driver.
3. Use Pod Identity to bind the role to the service account.
   - If using the console to install the add-on, this step is done automatically when installing the CSI driver, when selecting "EKS Pod Identity" as "Add-on access". Check the "Access" tab at the cluster, under "Pod Identity associations".
4. Create the EFS file system.
   - This is an important difference with EBS, where the volume is created dynamically when the PVC is created. With EFS we need to create the file system beforehand.
5. Define a StorageClass that references the EFS file system.
6. Create a PersistentVolume (PV) that uses the StorageClass and ReadWriteMany access mode.
7. Create a PersistentVolumeClaim (PVC) that uses the StorageClass and ReadWriteMany access mode.
8. Create a pod that uses the PVC.

Create the role that the CSI driver will use. Go to the IAM console → Roles and click "Create role". Set:

- Trusted entity type: AWS service.
- Service or use case: EKS - Pod Identity. Allows pods running in Amazon EKS cluster to access AWS resources.

Attach the AWS managed policy [`AmazonEFSCSIDriverPolicy`](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEFSCSIDriverPolicy.html), which "provides management access to EFS resources and read access to EC2". Name the role `AmazonEKS_EFS_CSI_DriverRole` as suggested in the docs.

At the cluster, install the EFS CSI Driver add-on. At the EKS console, go to your cluster → "Add-ons" tab → click "Get more add-ons". Select "Amazon EFS CSI Driver". Select the latest version. For "Add-on access", choose "EKS Pod Identity". Select the role `AmazonEKS_EFS_CSI_DriverRole` just created.

After installing the driver, run `kubectl get serviceaccounts -n kube-system | grep efs` to see the service account used by the driver, which is created automatically when installing the add-on. This returns `efs-csi-controller-sa` and `efs-csi-node-sa`.

There is an important difference with EBS. In EBS the volumes are automatically created when the pods are scheduled with a PVC, but in EFS we need to create the file system beforehand, it won't be created automatically.

You need to create the EFS file system in the same VPC as your EKS cluster (you can also use VPC peering). The EC2 nodes and the subnets used in the Fargate profile need to have network access to the EFS mount targets. You need to create a mount target for each subnet that your nodes are in. The security group used by the EFS mount targets must allow inbound NFS traffic (TCP port 2049) from the CIDR block of the cluster's VPC.

You can create the EFS filesystem at the [EFS console](https://console.aws.amazon.com/efs/home), or using the AWS CLI, following these steps: https://github.com/kubernetes-sigs/aws-efs-csi-driver/blob/master/docs/efs-create-filesystem.md

Check the current storage classes with `kubectl get storageclass` or `kubectl get storageclasses.storage.k8s.io`. There should be none related to EFS. Output is:

```
NAME   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
gp2    kubernetes.io/aws-ebs   Delete          WaitForFirstConsumer   false                  5h1m
```

Create a StorageClass that references the EFS file system:

```yaml title="efs-storageclass.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: efs-sc
provisioner: efs.csi.aws.com
```

Create the StorageClass with `kubectl apply -f efs-storageclass.yaml`. Now there should be two storage classes:

```
NAME     PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
efs-sc   efs.csi.aws.com         Delete          Immediate              false                  6s
gp2      kubernetes.io/aws-ebs   Delete          WaitForFirstConsumer   false                  5h3m
```

The volume binding mode is `Immediate`, so the volume binding and dynamic provisioning occurs once the PersistentVolumeClaim is created. In contrast, `WaitForFirstConsumer` delays the binding and provisioning of a PersistentVolume until a Pod using the PersistentVolumeClaim is created.

Create a PersistentVolume:

```yaml title="efs-pv.yaml"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: efs-pv
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: efs-sc # StorageClass created earlier
  csi:
    driver: efs.csi.aws.com
    volumeHandle: fs-02dc12e5f3d8805eb # Replace with your EFS file system ID
```

With `ReadWriteMany`, multiple nodes can access the volume simultaneously. With `Retain`, the PV and underlying EFS file system are retained when the PVC is deleted.

Create the PV with `kubectl apply -f efs-pv.yaml`. Check it with `kubectl get pv` or `kubectl describe pv efs-pv`. The status is `Available`:

```
NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
efs-pv   5Gi        RWX            Retain           Available           efs-sc         <unset>                          6s
```

Create a PersistentVolumeClaim (PVC) that uses the StorageClass:

```yaml title="efs-pvc.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: efs-pvc
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: efs-sc
  resources:
    requests:
      storage: 5Gi
```

Create the PVC with `kubectl apply -f efs-pvc.yaml`. Check it with `kubectl get pvc` or `kubectl describe pvc efs-pvc`. Now the status of the PV changes to `Bound`, since the PVC is bound to it:

```shell
kubectl get pvc
# NAME      STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
# efs-pvc   Bound    efs-pv   5Gi        RWX            efs-sc         <unset>                 6s

kubectl get pv
# NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
# efs-pv   5Gi        RWX            Retain           Bound    demo/efs-pvc   efs-sc         <unset>                          4m30s
```

Create a Deployment to test that the EFS volume can be mounted on multiple pods:

```yaml title="efs-deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: efs-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: efs-app
  template:
    metadata:
      labels:
        app: efs-app
    spec:
      containers:
        - name: app
          image: busybox
          command: ['/bin/sh']
          args:
            [
              '-c',
              'while true; do echo Hello at `date` from `hostname` >> /data/out1.txt; sleep 5; done',
            ]
          volumeMounts:
            - name: efs-volume
              mountPath: /data
      volumes:
        - name: efs-volume
          persistentVolumeClaim:
            claimName: efs-pvc
```

Create the Deployment with `kubectl apply -f efs-deployment.yaml`. Check the pods with `kubectl get pods`. Once the pods are running, shell into one of them and check that the file is being written:

```shell
kubectl exec -it <pod-name> -- /bin/sh
cat /data/out1.txt
# Hello at Tue Nov 11 11:07:30 UTC 2025 from efs-app-7b9b97ccbd-99jc5
# Hello at Tue Nov 11 11:07:31 UTC 2025 from efs-app-7b9b97ccbd-7nb2x
# Hello at Tue Nov 11 11:07:31 UTC 2025 from efs-app-7b9b97ccbd-2chds
# ...
df -ah /data
# Filesystem                Size      Used Available Use% Mounted on
# 127.0.0.1:/               8.0E         0      8.0E   0% /data
```

We can also launch pods on Fargate that use the same EFS PVC. The EFS file system can be shared between EC2 nodes and Fargate pods simultaneously.

To clean up, delete the Deployment, the PVC, the PV and the EFS file system (the file system is not deleted automatically):

```shell
kubectl delete -f efs-deployment.yaml
kubectl delete -f efs-pvc.yaml # Or kubectl delete pvc efs-pvc

# Deleting the PVC changes the PV status from "Bound" to "Released", but the PV is not
# deleted because the reclaim policy is "Retain".
kubectl get pv
# NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM          STORAGECLASS   VOLUMEATTRIBUTESCLASS   REASON   AGE
# efs-pv   5Gi        RWX            Retain           Released   demo/efs-pvc   efs-sc         <unset>                          39m

kubectl delete -f efs-pv.yaml # Or kubectl delete pv efs-pv
# Deleting the PV does not delete the underlying EFS file system nor the StorageClass.
# You can delete the StorageClass with `kubectl delete -f efs-storageclass.yaml` or `kubectl delete storageclass efs-sc`.
```

Finally, delete the EFS file system at the EFS console. If using the CLI, you need to delete the mount targets first (otherwise you get the error FileSystemInUse).

## Autoscaling

https://docs.aws.amazon.com/eks/latest/userguide/autoscaling.html

https://www.eksworkshop.com/docs/fundamentals/workloads/

https://kubernetes.io/docs/concepts/cluster-administration/node-autoscaling/

## Cluster Autoscaler

https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler

https://docs.aws.amazon.com/eks/latest/best-practices/cas.html

Cluster Autoscaler on AWS - https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md

When you create a node group, it creates an Auto Scaling group (and its corresponding launch template). The node group has a desired, minimum, and maximum size. The Auto Scaling group simply maintains the number of EC2 nodes in the group based on the desired size, replacing any unhealthy instances, but it doesn't do any scaling based on workload, because there are no scaling policies in the Auto Scaling group.

We want to scale up the number of nodes when new pods are scheduled and there are not enough resources in the cluster, and scale down the number of nodes when there are idle nodes. This is done with the Kubernetes Cluster Autoscaler, which adjusts the desired size of the Auto Scaling group.

Nodes are not terminated abruptly. The Cluster Autoscaler first cordons and drains the node, evicting the pods running on it by rescheduling them to other nodes. Once the node is empty, it is terminated.

The Cluster Autoscaler runs as a **Deployment** in the `kube-system` namespace. Only 1 replica (ie one pod) runs. It needs an IAM role with the necessary permissions to manage the Auto Scaling groups. You can use IRSA to assign the role to the Cluster Autoscaler service account.

> If you are using the Kubernetes Cluster Autoscaler and running stateful pods, you should create one Node Group for each availability zone using a single subnet and enable the `--balance-similar-node-groups` feature in cluster autoscaler. (From the console Info sidebar.)

### Setup Cluster Autoscaler with IRSA and Auto-Discovery

Resources:

- https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/CA_with_AWS_IAM_OIDC.md
- https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md#auto-discovery-setup
- https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml

> Auto-Discovery Setup is the preferred method to configure Cluster Autoscaler.

The Auto Scaling group has 2 tags that allow the Cluster Autoscaler to discover and manage it:

- Key: `k8s.io/cluster-autoscaler/enabled` - Value: `true`
- Key: `k8s.io/cluster-autoscaler/<cluster-name>` - Value: `owned`

You use the CLI flag `--node-group-auto-discovery` to set these tags. Note that the value will be ignored, only the tag name matters.

Create the permissions policy. At the [IAM console](https://console.aws.amazon.com/iam#/policies) → Policies, click "Create policy". Switch to the JSON tab and paste the policy from https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/README.md#full-cluster-autoscaler-features-policy-recommended, replacing `<asg-arn>` and `<my-cluster>`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:DescribeAutoScalingGroups",
        "autoscaling:DescribeAutoScalingInstances",
        "autoscaling:DescribeLaunchConfigurations",
        "autoscaling:DescribeScalingActivities",
        "ec2:DescribeImages",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeLaunchTemplateVersions",
        "ec2:GetInstanceTypesFromInstanceRequirements",
        "eks:DescribeNodegroup"
      ],
      "Resource": ["*"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:SetDesiredCapacity",
        "autoscaling:TerminateInstanceInAutoScalingGroup"
      ],
      "Resource": ["<asg-arn>"],
      "Condition": {
        "StringEquals": {
          "aws:ResourceTag/k8s.io/cluster-autoscaler/enabled": "true",
          "aws:ResourceTag/k8s.io/cluster-autoscaler/<my-cluster>": "owned"
        }
      }
    }
  ]
}
```

Important: I've modified the _second_ `"Resource": ["*"]` by setting the ASG ARN to restrict access to only a specific Auto Scaling group, as suggested in the docs (_only the second block of actions should be updated to restrict the resources/add conditionals_). I've also added the Condition block, as shown at https://docs.aws.amazon.com/eks/latest/best-practices/cas.html, which _prevents a Cluster Autoscaler running in one cluster from modifying nodegroups in a different cluster even if the `--node-group-auto-discovery` argument wasn’t scoped down to the nodegroups of the cluster using tags_.

Name the permissions policy `AmazonEKS_ClusterAutoscalerPolicy-<cluster-name>`.

Create a Role with "Trusted entity type" "Custom trust policy". Set this trust policy, replacing `<account-id>` and `<oidc-provider>` (`oidc.eks.<region>.amazonaws.com/id/<id>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/<oidc-provider>"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "<oidc-provider>:aud": "sts.amazonaws.com",
          "<oidc-provider>:sub": "system:serviceaccount:kube-system:cluster-autoscaler"
        }
      }
    }
  ]
}
```

The service account name (`cluster-autoscaler`) in the policy needs to match the value in the Kubernetes manifest. Attach the permissions policy just created (`AmazonEKS_ClusterAutoscalerPolicy-<cluster-name>`) to the role. Name the role `AmazonEKS_ClusterAutoscalerRole-<cluster-name>`.

To deploy the Cluster Autoscaler, download the file from https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml, then make the following changes:

1. At the Deployment, at the `--node-group-auto-discovery` command line flag, replace `<YOUR CLUSTER NAME>` for the tag `k8s.io/cluster-autoscaler/<cluster-name>`.
2. At the ServiceAccount, add this annotation so that the service account uses the IAM role just created:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<account-id>:role/AmazonEKS_ClusterAutoscalerRole-<cluster-name>
```

Deploy the Cluster Autoscaler with `kubectl apply -f cluster-autoscaler-autodiscover.yaml`.

- View the pod with `kubectl get pods -n kube-system | grep cluster-autoscaler`.
- Inspect the pod with `kubectl describe pod -n kube-system cluster-autoscaler-<xyz>`.
- Check the logs with `kubectl logs -n kube-system deployment/cluster-autoscaler` or `kubectl logs -n kube-system cluster-autoscaler-<xyz>`.

To test the Cluster Autoscaler, create a deployment and then scale it to many pods that request enough resources to require more nodes than currently available. The Cluster Autoscaler will then scale up the Auto Scaling group by increasing the desired capacity, launching new EC2 nodes. Once the new nodes are ready, the pending pods will be scheduled.

```yaml title="cluster-autoscaler-test-deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler-test
  labels:
    app: cluster-autoscaler-test
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler-test
  template:
    metadata:
      labels:
        app: cluster-autoscaler-test
    spec:
      containers:
        - name: httpd
          image: httpd
          resources:
            limits:
              memory: 512Mi
              cpu: 500m
```

Do the following:

- Check the current number of nodes and pods with `kubectl get nodes` and `kubectl get pods`.
- Open two terminal windows and watch new nodes and pods being created with `kubectl get nodes -w` and `kubectl get pods -w`.
- Apply the deployment with `kubectl apply -f cluster-autoscaler-test-deployment.yaml`.
- Scale up the deployment to 5 or 10 replicas with `kubectl scale deployment cluster-autoscaler-test --replicas=5`.
- Check the Cluster Autoscaler logs to see the scaling activity with `kubectl logs [--follow] -n kube-system deployment/cluster-autoscaler`. You can see logs like "Scale up in group eks-My-EKS-Node-Group-d6cd375e-e065-401f-769b-58cdc5869a47 finished successfully in 50.165152427s".

Initially the new pods will be in `Pending` state because there are not enough resources. When new nodes are ready (its status changes from `NotReady` to `Ready`), the pod state changes from `Pending` to `ContainerCreating` and then `Running`.

Doing `kubectl describe pod cluster-autoscaler-test-<xyz>` shows the `TriggeredScaleUp` event due to "Insufficient memory":

```
Events:
  Type     Reason            Age    From                Message
  ----     ------            ----   ----                -------
  Warning  FailedScheduling  2m53s  default-scheduler   0/4 nodes are available: 1 Too many pods, 4 Insufficient memory. no new claims to deallocate, preemption: 0/4 nodes are available: 4 No preemption victims found for incoming pod.
  Warning  FailedScheduling  2m19s  default-scheduler   0/5 nodes are available: 1 Too many pods, 1 node(s) had untolerated taint {node.cloudprovider.kubernetes.io/uninitialized: true}, 4 Insufficient memory. no new claims to deallocate, preemption: 0/5 nodes are available: 1 Preemption is not helpful for scheduling, 4 No preemption victims found for incoming pod.
  Warning  FailedScheduling  2m18s  default-scheduler   0/5 nodes are available: 1 Too many pods, 1 node(s) had untolerated taint {node.kubernetes.io/not-ready: }, 4 Insufficient memory. no new claims to deallocate, preemption: 0/5 nodes are available: 1 Preemption is not helpful for scheduling, 4 No preemption victims found for incoming pod.
  Warning  FailedScheduling  2m14s  default-scheduler   0/5 nodes are available: 1 Too many pods, 1 node(s) had untolerated taint {node.kubernetes.io/not-ready: }, 4 Insufficient memory. no new claims to deallocate, preemption: 0/5 nodes are available: 1 Preemption is not helpful for scheduling, 4 No preemption victims found for incoming pod.
  Normal   Scheduled         2m     default-scheduler   Successfully assigned demo/cluster-autoscaler-test-5cf8cdc587-jvzrj to ip-172-31-46-244.ec2.internal
  Normal   TriggeredScaleUp  2m48s  cluster-autoscaler  pod triggered scale-up: [{eks-My-EKS-Node-Group-d6cd375e-e065-401f-769b-58cdc5869a47 4->5 (max: 5)}]
  Normal   Pulling           119s   kubelet             Pulling image "httpd"
```

Test the scale down/in by scaling down the deployment to 1 replica with `kubectl scale deployment cluster-autoscaler-test --replicas=1`.

Pods are terminated immediately, in a few seconds, but nodes are not, it takes about 10 minutes. There is a **cool down period** before idle nodes are terminated, which can be configured with the `--scale-down-unneeded-time` flag.

Check the Cluster Autoscaler logs to see the scale down activity. You should see logs like "node ip-172-31-46-244.ec2.internal may be removed", "Starting scale down" and "Considering node ip-172-31-46-244.ec2.internal for standard scale down".

The node status changes from `Ready` to `Ready,SchedulingDisabled` and then `NotReady,SchedulingDisabled`. At the state `Ready,SchedulingDisabled`, the node is cordoned (which prevents new pods from being scheduled on it) and drained. Once all pods are evicted, the node is terminated.

Delete the deployment with `kubectl delete -f cluster-autoscaler-test-deployment.yaml`. Optionally delete the Cluster Autoscaler with `kubectl delete -f cluster-autoscaler-autodiscover.yaml`.

## Horizontal Pod Autoscaler

https://docs.aws.amazon.com/eks/latest/userguide/horizontal-pod-autoscaler.html

https://www.eksworkshop.com/docs/fundamentals/workloads/horizontal-pod-autoscaler/

## Cluster Proportional Autoscaler

https://www.eksworkshop.com/docs/fundamentals/workloads/cluster-proportional-autoscaler/

## Vertical Pod Autoscaler

https://docs.aws.amazon.com/eks/latest/userguide/vertical-pod-autoscaler.html

## Kubernetes Event-Driven Autoscaler (KEDA)

https://www.eksworkshop.com/docs/fundamentals/workloads/keda/

## Amazon Managed Service for Prometheus

https://medium.com/@galazkaryan/help-i-deleted-an-amazon-managed-prometheus-workspace-am-still-being-charged-for-it-92f9effaecdc

https://repost.aws/questions/QUNH2lwf9xT9GbXEt4RGk7Cg/deciphering-aws-billing-understanding-charges-for-amazon-managed-service-for-prometheus

```shell
aws amp list-scrapers
aws amp delete-scraper --scraper-id <scraper-id>
```
