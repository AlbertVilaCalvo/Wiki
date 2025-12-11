---
title: Minikube
---

https://minikube.sigs.k8s.io/docs/

CLI commands: https://minikube.sigs.k8s.io/docs/commands/

Tutorial: https://kubernetes.io/docs/tutorials/hello-minikube/

The configuration is located at `~/.kube/config`.

## Install

Install it with [Brew](https://formulae.brew.sh/formula/minikube#default): `brew install minikube`. This installs [`kubernetes-cli`](https://formulae.brew.sh/formula/kubernetes-cli) (kubectl) as a dependency.

Also see [the FAQs](https://minikube.sigs.k8s.io/docs/faq/#do-i-need-to-install-kubectl-locally):

> Do I need to install kubectl locally?
>
> No, minikube comes with a built-in kubectl installation. See [minikube’s kubectl documentation](https://minikube.sigs.k8s.io/docs/handbook/kubectl/).

But you need to do `minikube kubectl -- <kubectl commands>` to use it.

## Push images

Pushing images - https://minikube.sigs.k8s.io/docs/handbook/pushing/

Push images from Docker to minikube’s registry - https://minikube.sigs.k8s.io/docs/handbook/registry/#docker-on-macos

## docker-env

Docs: https://minikube.sigs.k8s.io/docs/commands/docker-env/

Point your terminal's Docker CLI to the Docker instance inside minikube ([source](https://minikube.sigs.k8s.io/docs/tutorials/docker_desktop_replacement/)):

```shell
eval $(minikube -p minikube docker-env)
```

Note that you need to run `minikube start` before.

To unset run:

```shell
eval $(minikube docker-env --unset)
```

## Usage

[Start](https://minikube.sigs.k8s.io/docs/commands/start/) a local Kubernetes cluster:

```shell
minikube start
```

```shell
minikube start --nodes 3
```

To change the number of nodes for an existing cluster use `minikube node add`. Or delete the cluster (`minikube delete`) and create it again (`minikube start --nodes 3`).

```shell
minikube dashboard
```

```shell
minikube stop
```

Delete your local cluster:

```shell
minikube delete
```

Delete all local clusters and profiles:

```shell
minikube delete --all
```

To run commands like `docker ps`, SSH into minikube:

```shell
minikube ssh
docker build -t my-app:1 --file Dockerfile-prod .
docker ps
exit
```

When you have a service of type `LoadBalancer` or `NodePort`, make the app available with:

```shell
minikube service my-service
```

This opens a browser. Alternatively, use kubectl to forward the port:

```shell
kubectl port-forward service/my-service 7080:8080
```

The app is available at http://localhost:7080/. See [Accessing apps](https://minikube.sigs.k8s.io/docs/handbook/accessing/).

List the services:

```shell
minikube service list
```

## Addons

https://kubernetes.io/docs/concepts/cluster-administration/addons/

```shell
minikube addons list
```

[Metrics server](https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/):

```shell
minikube addons enable metrics-server
```

Automatically pause Kubernetes after a certain amount of inactivity:

```shell
minikube addons enable auto-pause
```
