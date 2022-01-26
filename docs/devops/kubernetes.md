---
title: Kubernetes
---

https://kubernetes.io


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

## Concepts and components

https://kubernetes.io/docs/concepts/overview/components

https://kubernetes.io/docs/reference/glossary/?fundamental=true

https://www.redhat.com/en/topics/containers/kubernetes-architecture

- Cluster: a set of worker machines (nodes).
- Node: a worker machine.
  - Can be virtual or physical.
  - Each node has a container runtine (eg Docker, containerd, CRI-O).
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
  - Since pods are ehpemeral, volumes provide a persistent way to store data.

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
