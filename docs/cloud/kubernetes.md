---
title: Kubernetes
---

https://kubernetes.io

https://github.com/kelseyhightower/kubernetes-the-hard-way

https://github.com/dennyzhang/cheatsheet-kubernetes-A4

https://github.com/ramitsurana/awesome-kubernetes

OWASP Kubernetes Top 10 - https://github.com/OWASP/www-project-kubernetes-top-ten

https://github.com/kubernetes-sigs

Deploy a Production Ready Kubernetes Cluster - https://github.com/kubernetes-sigs/kubespray - https://kubespray.io

Local Kubernetes Development - https://github.com/GoogleContainerTools/skaffold - https://skaffold.dev

Examples - https://github.com/AdminTurnedDevOps/kubernetes-examples

https://github.com/MichaelCade/90DaysOfDevOps#kubernetes

https://github.com/bregman-arie/devops-exercises/blob/master/topics/kubernetes/README.md

https://velero.io

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

### Control plane

A cluster is managed by the control plane (called master in the past), which exposes an API that allows for example to interact with the scheduler.

The control plane is responsible for maintaining the desired state of the cluster, such as which applications are running and which container images they use. ([source](https://www.redhat.com/en/topics/containers/what-is-kubernetes))

Components:

- kube-apiserver: exposes the Kubernetes API.
- etcd: key value store for all cluster data.
- kube-scheduler: watches for newly created Pods with no assigned node, and selects a node for them to run on.
- kube-controller-manager: runs controller processes.
- cloud-controller-manager: embeds cloud-specific control logic. Lets you link your cluster into your cloud provider's API.

See https://kubernetes.io/docs/concepts/overview/components/#control-plane-components for more details.

### Node

- kubelet: agent that runs on each node and makes sure that containers are running in a Pod.
- kube-proxy: https://kubernetes.io/docs/reference/glossary/?all=true#term-kube-proxy
- Container runtime: software that is responsible for running containers, eg Docker.

## `kubectl`

Allows you to interact with the cluster, eg to get the status of nodes, pods, and services.

Docs: https://kubectl.docs.kubernetes.io

Overview: https://kubernetes.io/docs/reference/kubectl/overview/

Cheatsheet: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

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

## Certifications

https://www.whizlabs.com/certified-kubernetes-application-developer/

https://www.whizlabs.com/certified-kubernetes-administrator/

## Terraform

https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594

TODO mirar

- Keynote: The Challenges of Migrating 150+ Microservices to Kubernetes, Sarah Wells https://www.youtube.com/watch?v=H06qrNmGqyE
- Kubernetes Deconstructed: Understanding Kubernetes by Breaking It Down Carson Anderson, DOMOc https://www.youtube.com/watch?v=90kZRyPcRZw
- Containers From Scratch • Liz Rice • GOTO 2018 https://www.youtube.com/watch?v=8fi7uSYlOdc
- Kubernetes: The Documentary https://news.ycombinator.com/item?id=30323432 https://www.youtube.com/watch?v=BE77h7dmoQU
- https://news.ycombinator.com/item?id=30413263 Kubernetes Documentary: A Critical Review https://www.cloudcritical.org/article/kubernetes-documentary-part-1/
