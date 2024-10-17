---
title: Kubernetes
---

https://kubernetes.io

Docs - https://kubernetes.io/docs/home/

https://github.com/kelseyhightower/kubernetes-the-hard-way

https://github.com/dennyzhang/cheatsheet-kubernetes-A4

https://github.com/ramitsurana/awesome-kubernetes

OWASP Kubernetes Top 10 - https://github.com/OWASP/www-project-kubernetes-top-ten

https://github.com/kubernetes-sigs

Deploy a Production Ready Kubernetes Cluster - https://github.com/kubernetes-sigs/kubespray - https://kubespray.io

minikube - https://minikube.sigs.k8s.io/docs

Local Kubernetes Development - https://github.com/GoogleContainerTools/skaffold - https://skaffold.dev

Examples - https://github.com/AdminTurnedDevOps/kubernetes-examples

https://github.com/MichaelCade/90DaysOfDevOps#kubernetes

https://github.com/bregman-arie/devops-exercises/blob/master/topics/kubernetes/README.md

https://kustomize.io

## Validators / linters

https://github.com/stackrox/kube-linter

https://github.com/datreeio/datree

Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov

## What is Kubernetes?

https://kubernetes.io/docs/concepts/overview/what-is-kubernetes

> Kubernetes comprises a set of independent, composable control processes that continuously drive the current state towards the provided desired state.

https://www.redhat.com/en/topics/containers/what-is-kubernetes

https://cloud.google.com/learn/what-is-kubernetes

History: https://cloud.google.com/blog/products/containers-kubernetes/from-google-to-the-world-the-kubernetes-origin-story

## Benefits

- Scaling management
- Secrets and configuration management
- Service discovery
- Load balancing
- Container health checks and management

https://jessitron.com/2022/10/02/why-we-use-kubernetes

## Concepts and components

https://kubernetes.io/docs/concepts/overview/components

https://kubernetes.io/docs/reference/glossary/?fundamental=true

https://www.redhat.com/en/topics/containers/kubernetes-architecture

- Cluster: a set of worker machines (nodes).
- Node: a worker machine.
  - Can be virtual or physical.
  - Each node has a container runtime (eg Docker, containerd, CRI-O).
- Pod: a set of running containers.
  - https://kubernetes.io/docs/concepts/workloads/pods
  - Is the smallest object in Kubernetes.
  - A pod can have 1 or more containers (eg application, logging...).
  - Pods are replicated across multiple nodes, providing high availability.
  - Pods are disposable and replaceable (ephemeral, nonpermanent, not persistent), and can be created and terminated by the control plane.
  - All containers in a pod share an IP address, IPC, hostname, and other resources. ([source](https://www.redhat.com/en/topics/containers/what-is-kubernetes))
- Service: An abstract way to expose an application running on a set of Pods as a network service
  - https://kubernetes.io/docs/concepts/services-networking/service
  - Since pods are ephemeral, services provide a persistent way to communicate with them.
  - Load balances pods.
- Volume: A directory containing data, accessible to the containers in a Pod.
  - Since pods are ephemeral, volumes provide a persistent way to store data.

Hierarchy:

- A cluster has many nodes
- A node has many pods
- A pod has many containers

## Control plane

A cluster is managed by the control plane (called master in the past), which exposes an API that allows for example to interact with the scheduler.

The control plane is responsible for maintaining the desired state of the cluster, such as which applications are running and which container images they use. ([source](https://www.redhat.com/en/topics/containers/what-is-kubernetes))

Components:

- [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/): exposes the Kubernetes REST API used to connect to Kubernetes and deploy workloads.
- [etcd](https://etcd.io): key-value store for all cluster data. Database for non-ephemeral data.
  - etcd can run on a different server than the control plane, and communicate with it.
- [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/): watches for newly created Pods with no assigned node, and selects a worker node for them to run on.
- [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/): runs controller processes, which confirms that the current state is the desired state for all the running workloads.
- cloud-controller-manager: embeds cloud-specific control logic. Lets you link your cluster into your cloud provider's API.

See https://kubernetes.io/docs/concepts/overview/components/#control-plane-components for more details.

You want to have a minimum of 3 control planes, since etcd uses the RAFT consensus algorithm, which requires leader election. One of them will be the main control plane.

### API Server

https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/

What you use to interact with Kubernetes.

What you will be working with the most, since the operations you do with `kubectl` interact with this API. For example, when you run `kubectl apply -f manifest.yaml`, you are doing a POST request that sends the `manifest.yaml` to the API server. And when you run `kubectl get pods` you are doing a GET request.

## Worker Nodes

- [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/): agent that runs on each node and makes sure that containers are running in a Pod.
- [kube-proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/): does internal networking. See https://kubernetes.io/docs/reference/glossary/?all=true#term-kube-proxy
- Container Runtime: software that is responsible for running containers, eg Docker or containerd. Kubernetes doesn't know about containers, so it relies on a plugin for this. containerd is the default. Docker is not supported anymore ([source](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/)). Needs to support the [Container Runtime Interface](https://kubernetes.io/docs/concepts/architecture/cri/) (CRI).
- [CoreDNS](https://coredns.io): internal DNS.

The recommended number is between 3 and 5. It needs to have high availability and scaling, otherwise the pods won't have a place to move to if a worker node fails.

## kubeconfig - `~/.kube/config`

https://kubernetes.io/docs/reference/config-api/kubeconfig.v1/

Holds the information needed to connect to remote kubernetes clusters, and the permissions (what you can do) on those clusters.

Fields:

- `certificate-authority-data`: contains the TLS certificates required to authenticate and access the Kubernetes clusters.
- `context`: references to clusters we can connect and interact with. The `current-context` is the cluster you are connected to right now.
- `user`: how you authenticate to the cluster. There's one for each cluster.

## `kubectl`

Allows you to interact with the cluster, eg to get the status of nodes, pods, and services.

Docs: https://kubectl.docs.kubernetes.io

Overview: https://kubernetes.io/docs/reference/kubectl/overview/

Quick Reference: https://kubernetes.io/docs/reference/kubectl/quick-reference/

Explain: `kubectl explain pod.spec.restartPolicy` [see this](https://www.linkedin.com/posts/carlosbedoya_kubernetes-activity-7208528891882209280-ryFq)

`kubectl version`

`kubectl cluster-info`

`kubectl get nodes`

`kubectl get pods`

List all namespaces and pods: `kubectl get all -A`

Show cluster services: `kubectl describe services`

Verify the deployment: `kubectl get deployments`

Show all events: `kubectl get events -w`

Show component status (deprecated in 1.19): `kubectl get componentstatuses`

Check the rollout status: `kubectl rollout status deployment/simple-flask-deployment`

Get external IP address: `kubectl get services <service-name> -o wide`

## Tools

https://velero.io - Backup and migrate Kubernetes resources and persistent volumes

Lens (GUI) - https://k8slens.dev - https://www.mirantis.com/blog/getting-started-with-lens

## Learn

- https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices/
- https://www.sharelearn.net/practice/k8slabs/

## Certifications

Curriculum - https://github.com/cncf/curriculum

Simulator - https://killer.sh

### KCNA - Kubernetes and Cloud Native Associate

https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate

A light version of the CKA. Multiple-choice questions, theoretical.

> A pre-professional certification designed for candidates interested in advancing to the professional level...

### KCSA - Kubernetes and Cloud Native Security Associate

https://training.linuxfoundation.org/certification/kubernetes-and-cloud-native-security-associate-kcsa

A light version of the CKS. Multiple-choice questions, theoretical.

### CKA - Certified Kubernetes Administrator

https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka

Focuses on infrastructure. For sysadmins. Much harder than the KCNA.

Only covers on-prem Kubernetes clusters, no cloud provider Kubernetes environments.

Hands-on. The CKA (and the CKAD and CKS too) exam environment does not offer a UI for interacting with a Kubernetes cluster. You can only use `kubectl` and other command line-based tools.

Changes - https://training.linuxfoundation.org/certified-kubernetes-administrator-cka-program-changes/

https://www.whizlabs.com/certified-kubernetes-administrator/

### CKAD - Certified Kubernetes Application Developer

https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/

https://github.com/bmuschko/ckad-crash-course

https://www.whizlabs.com/certified-kubernetes-application-developer/

### CKS - Certified Kubernetes Security Specialist

https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist/

Must have taken and passed the CKA exam prior to attempting the CKS exam.

## Terraform

https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594

TODO mirar

- Keynote: The Challenges of Migrating 150+ Microservices to Kubernetes, Sarah Wells https://www.youtube.com/watch?v=H06qrNmGqyE
- Kubernetes Deconstructed: Understanding Kubernetes by Breaking It Down Carson Anderson, DOMOc https://www.youtube.com/watch?v=90kZRyPcRZw
- Containers From Scratch • Liz Rice • GOTO 2018 https://www.youtube.com/watch?v=8fi7uSYlOdc
- Kubernetes: The Documentary https://news.ycombinator.com/item?id=30323432 https://www.youtube.com/watch?v=BE77h7dmoQU
- https://news.ycombinator.com/item?id=30413263 Kubernetes Documentary: A Critical Review https://www.cloudcritical.org/article/kubernetes-documentary-part-1/
