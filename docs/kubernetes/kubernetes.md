---
title: Kubernetes
---

https://kubernetes.io

Docs - https://kubernetes.io/docs/home/

Definitions:

- Distributed operating system.
- Operating system for distributed computing.
- Universal computing platform.
- An open-source system for automating deployment, scaling, and management of containerized applications.

https://github.com/kubernetes

https://github.com/kubernetes-sigs

Copilot instructions - https://github.com/github/awesome-copilot/blob/main/instructions/kubernetes-deployment-best-practices.instructions.md

https://github.com/kelseyhightower/kubernetes-the-hard-way

https://github.com/dennyzhang/cheatsheet-kubernetes-A4

https://github.com/ramitsurana/awesome-kubernetes

OWASP Kubernetes Top 10 - https://github.com/OWASP/www-project-kubernetes-top-ten

Deploy a Production Ready Kubernetes Cluster - https://github.com/kubernetes-sigs/kubespray - https://kubespray.io

minikube - https://minikube.sigs.k8s.io/docs

Local Kubernetes Development - https://github.com/GoogleContainerTools/skaffold - https://skaffold.dev

Examples - https://github.com/AdminTurnedDevOps/kubernetes-examples

https://github.com/nigelpoulton/TheK8sBook

https://github.com/MichaelCade/90DaysOfDevOps#kubernetes

https://github.com/bregman-arie/devops-exercises/blob/master/topics/kubernetes/README.md

https://github.com/siderolabs/talos - https://www.talos.dev

https://readmedium.com/top-10-kubernetes-pod-concepts-that-confuse-beginners-8c0954021f3f

The History of Kubernetes on a Timeline - https://blog.risingstack.com/the-history-of-kubernetes

Kubernetes Distributions & Platforms - https://docs.google.com/spreadsheets/d/1uF9BoDzzisHSQemXHIKegMhuythuq_GL3N1mlUUK2h0/edit?usp=sharing

https://github.com/GoogleCloudPlatform/microservices-demo - Sample cloud-first application with 10 microservices showcasing Kubernetes, Istio, and gRPC

For the Love of God, Stop Using CPU Limits on Kubernetes - https://home.robusta.dev/blog/stop-using-cpu-limits

Does Kubernetes really give you multicloud portability? - https://medium.com/digital-mckinsey/does-kubernetes-really-give-you-multicloud-portability-476270a0acc7

Y tú, ¿odias o amas Kubernetes? - https://dev.to/aws-espanol/y-tu-odias-o-amas-kubernetes-ind - https://www.paradigmadigital.com/dev/odias-amas-kubernetes

> Se ha dado tanta flexibilidad a Kubernetes que se puede ejecutar cualquier carga. Esto en principio parece bueno, pero el que se pueda ejecutar, no significa que sea lo más optimo, y menos si queremos evolucionar. Un claro ejemplo serían las BBDD en Kubernetes. Es posible ejecutar una BBDD en Kubernetes, pero no tiene sentido. Al final no estás contenerizado un microservicio, sino que estás contenerizado un servidor entero de BBDD.
>
> Otro ejemplo horrible son los famosos “Lift and Shift to Kubernetes”, ¿qué sentido tiene pasar de un servidor virtualizado a un pod en Kubernetes? Es posible hacerlo, pero solamente estamos generando problemas y utilizando la tecnología de contenedores para algo que no es su propósito.
>
> El problema no es que Kubernetes pueda ejecutar estas cargas, el problema es que es un mal caso de uso, que se está generalizando demasiado.

> Es muy habitual que empecemos por montar un cluster de Kubernetes para ejecutar nuestras futuras cargas de trabajo, sin tener en cuenta las cargas de trabajo en sí. Primero montamos el cluster y luego ya definimos las cargas. También existe la variante de directamente desarrollar en Kubernetes sin tener en cuenta si va a ser lo más optimo.
>
> Estamos en 2023, la división entre infraestructura y desarrollo es algo del pasado, debemos de pensar en la carga que vamos a desarrollar y elegir el lugar más optimo para ejecutarla.

> Aunque ECS, EKS y Kubernetes permiten montar discos persistentes en los pods no es algo recomendado, es más se debería de evitar al máximo.

## Validators / linters / vulnerabilities

https://github.com/stackrox/kube-linter

https://github.com/datreeio/datree

Static analysis to find misconfigurations and vulnerabilities - https://www.checkov.io - https://github.com/bridgecrewio/checkov

Security risk analysis for Kubernetes resources - https://kubesec.io - https://github.com/controlplaneio/kubesec

https://github.com/aquasecurity/trivy - https://trivy.dev/latest/tutorials/kubernetes/cluster-scanning/

## What is Kubernetes?

https://kubernetes.io/docs/concepts/overview/what-is-kubernetes

> Kubernetes comprises a set of independent, composable control processes that continuously drive the current state towards the provided desired state.

https://www.redhat.com/en/topics/containers/what-is-kubernetes

https://cloud.google.com/learn/what-is-kubernetes

History: https://cloud.google.com/blog/products/containers-kubernetes/from-google-to-the-world-the-kubernetes-origin-story

## Benefits

- Automatic scaling management
- Secrets and configuration management
- Service discovery (DNS service for internal communication)
- Load balancing
- Container health checks and automatic replacement. Self-healing, high availability
- Rolling updates and rollbacks. Zero downtime deployment
- Persistent storage
- Network management
- Efficient cluster utilization
- Workload balance across servers
- Open source. Large community
- Extensible

https://jessitron.com/2022/10/02/why-we-use-kubernetes

What is Kubernetes? - https://www.youtube.com/watch?v=a2gfpZE8vXY

## Concepts and components

https://kubernetes.io/docs/concepts/overview/components

https://kubernetes.io/docs/reference/glossary/?fundamental=true

https://www.redhat.com/en/topics/containers/kubernetes-architecture

https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html

[Kubernetes – Architecture and main components overview](https://github.com/NotHarshhaa/kubernetes-projects-learning/tree/master/learning/Kubernetes-components-overview)

- Cluster: a set of worker machines (nodes).
- Node: a worker machine.
  - Can be virtual or physical.
  - Each node has a container runtime (eg Docker, containerd, CRI-O).
- Pod: a set of running containers.
  - https://kubernetes.io/docs/concepts/workloads/pods
  - The smallest deployable unit of computing that you can create and manage in Kubernetes.
  - A pod can have 1 or more containers (eg application, logging...).
  - Pods are replicated across multiple nodes, providing high availability.
  - Pods are disposable and replaceable (ephemeral, nonpermanent, not persistent), and can be created and terminated by the control plane.
  - All containers in a pod share an IP address, IPC, hostname, and other resources. ([source](https://www.redhat.com/en/topics/containers/what-is-kubernetes))
- Service: An abstract way to expose an application running on a set of Pods as a network service
  - https://kubernetes.io/docs/concepts/services-networking/service
  - Since pods are ephemeral, services provide a persistent way to communicate with them.
  - Load balances pods.
- Volume: a directory containing data, accessible to the containers in a Pod.
  - Since pods are ephemeral, volumes provide a persistent way to store data.
- Namespace: a virtual grouping of objects.
  - Kubernetes resources are either namespace or cluster-scoped (non-namespaced).
    - Namespaced: Pod, ReplicaSet, Deployment, StatefulSet, DaemonSet, Service, Ingress, ConfigMap, Secret, PersistentVolumeClaim...
    - Non-namespaced: Namespace, Node, PersistentVolume, ClusterRole, ClusterRoleBinding, IngressClass, StorageClass, CustomResourceDefinition...
    - Use `kubectl api-resources --namespaced=true` and `kubectl api-resources --namespaced=false` to list all resources.
  - Built-in namespaces: default, kube-system, kube-public, kube-node-lease.
  - Names of resources need to be unique within a namespace, but not across namespaces.

<figure>
  <img src="/img/Kubernetes-objects.png" alt="Kubernetes objects" title="Kubernetes objects" width="850" loading="lazy"/>
  <figcaption>Source: <a href="https://aws-experience.com/emea/iberia/learning-hub/media/88a07ed3-47b4-459a-bbab-7527bd7c6497">AWS Experience</a></figcaption>
</figure>

### Hierarchy

- A cluster has many nodes
- A node has many pods
- A pod has many containers

### Glossary

https://kubernetes.io/docs/reference/glossary/?all=true

From https://kubectl.docs.kubernetes.io/guides/introduction/resources_controllers:

- Resource Config: declarative files with resources that are written to a cluster.
- Resources: instances of Kubernetes objects, which are declared as json or yaml and applied to a cluster. For example: deployment, services, namespaces, etc.
  - Resources are uniquely identified by:
    - `apiVersion`: API Type Group and Version
    - `kind`: API Type Name
    - `metadata.namespace`: Instance namespace
    - `metadata.name`: Instance name
- Controllers: actuate Kubernetes APIs. They observe the state of the system and look for changes either to desired state of Resources (create, update, delete) or the system (Pod or Node dies).
- Workloads: resources which run containers. For example: Deployments, StatefulSets, Jobs, CronJobs and DaemonSets.

| Workload API |                        |                                                        |
| ------------ | ---------------------- | ------------------------------------------------------ |
| Deployments  | Stateless Applications | replication + rollouts                                 |
| StatefulSets | Stateful Applications  | replication + rollouts + persistent storage + identity |
| Jobs         | Batch Work             | run to completion                                      |
| CronJobs     | Scheduled Batch Work   | scheduled run to completion                            |
| DaemonSets   | Per-Machine            | per-Node scheduling                                    |

## Control plane

A cluster is managed by the control plane (called master in the past), which exposes an API that allows for example to interact with the scheduler.

The control plane is responsible for maintaining the desired state of the cluster, such as which applications are running and which container images they use. ([source](https://www.redhat.com/en/topics/containers/what-is-kubernetes))

<figure>
  <img src="/img/Kubernetes-components.png" alt="Kubernetes components" title="Kubernetes components" loading="lazy"/>
  <figcaption>Source: <a href="https://aws-experience.com/emea/iberia/learning-hub/media/88a07ed3-47b4-459a-bbab-7527bd7c6497">AWS Experience</a></figcaption>
</figure>

Components:

- [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/): exposes the Kubernetes REST API used to connect to Kubernetes and deploy workloads.
- [etcd](https://etcd.io): key-value store for all cluster data. Database for non-ephemeral data.
  - etcd can run on a different server than the control plane, and communicate with it.
  - https://github.com/spurin/etcd-snapshot-to-json
- [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/): watches for newly created Pods with no assigned node, and selects a worker node for them to run on.
- [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/): runs controller processes, which confirms that the current state is the desired state for all the running workloads.
- cloud-controller-manager (optional): embeds cloud-specific control logic. Lets you link your cluster into your cloud provider's API.

See https://kubernetes.io/docs/concepts/architecture/#control-plane-components and https://kubernetes.io/docs/concepts/overview/components/#control-plane-components.

You want to have a minimum of 3 control planes, since etcd uses the RAFT consensus algorithm, which requires leader election. One of them will be the main control plane.

### API Server

https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/

What you use to interact with Kubernetes.

What you will be working with the most, since the operations you do with `kubectl` interact with this API. For example, when you run `kubectl apply -f manifest.yaml`, you are doing a POST request that sends the `manifest.yaml` to the API server. And when you run `kubectl get pods` you are doing a GET request.

## Worker Nodes

Also called data plane.

Components:

- [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/): agent that runs on each node and makes sure that containers are running in a Pod.
- [kube-proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/) (optional): does internal networking. See https://kubernetes.io/docs/reference/glossary/?all=true#term-kube-proxy
- Container Runtime: software that is responsible for running containers, eg Docker or containerd. Kubernetes doesn't know about containers, so it relies on a plugin for this. containerd is the default. Docker is not supported anymore ([source](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/)). Needs to support the [Container Runtime Interface](https://kubernetes.io/docs/concepts/architecture/cri/) (CRI).

See https://kubernetes.io/docs/concepts/architecture/#node-components and https://kubernetes.io/docs/concepts/overview/components/#node-components.

The recommended number of nodes is between 3 and 5. It needs to have high availability and scaling, otherwise the pods won't have a place to move to if a worker node fails.

## Addons

https://kubernetes.io/docs/concepts/overview/components/#addons

- [CoreDNS](https://coredns.io): internal DNS.

## kubeconfig - `~/.kube/config`

https://kubernetes.io/docs/reference/config-api/kubeconfig.v1/

Holds the information needed to connect to remote kubernetes clusters, and the permissions (what you can do) on those clusters.

Fields:

- `certificate-authority-data`: contains the TLS certificates required to authenticate and access the Kubernetes clusters.
- `context`: references to clusters we can connect and interact with. The `current-context` is the cluster you are connected to right now.
- `user`: how you authenticate to the cluster. There's one for each cluster.

## `kubectl`

Allows you to interact with the cluster, eg to get the status of nodes, pods, and services.

Docs:

- https://kubectl.docs.kubernetes.io
- https://kubernetes.io/docs/reference/kubectl/

Reference:

- https://kubernetes.io/docs/reference/kubectl/generated/
- https://kubernetes.io/docs/reference/kubectl/quick-reference/
- https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands
- https://kubectl.docs.kubernetes.io/references/kubectl/

Command families, from https://kubectl.docs.kubernetes.io/guides/introduction/kubectl/#command-families but modified:

| Type                            |                                          | Used For                           | Description                                                               |
| ------------------------------- | ---------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| Declarative Resource Management | `apply`                                  | Deployment and Operations (GitOps) | Declaratively manage Kubernetes Workloads using Resource Config files     |
| Imperative Resource Management  | `run`, `create`                          | Development Only                   | Run commands to manage Kubernetes Workloads using CLI arguments and flags |
| Printing Workload State         | `get`, `describe`, `explain`             | Debugging                          | Print information about Workloads                                         |
| Interacting with Containers     | `attach`, `cp`, `exec`, `events`, `logs` | Debugging                          | Commands for inspecting and debugging your applications                   |
| Cluster Management              | `cordon`, `drain`, `uncordon`            | Cluster Ops                        | Drain and Cordon Nodes                                                    |

Change the editor:

```shell
export KUBE_EDITOR="vim"
```

`kubectl --help` (or just `kubectl`) → List commands

`kubectl get --help` → Help for a command

`kubectl options` → List global command-line options that apply to all commands

`kubectl api-resources` → List all resources and its short names. Also available at https://kubernetes.io/docs/reference/kubectl/#resource-types

`kubectl api-resources --namespaced=true` → Namespaced objects

`kubectl api-resources --namespaced=false` → Cluster-scoped objects

`kubectl explain pod.spec.restartPolicy` → Get documentation for a resource - [see this](https://www.linkedin.com/posts/carlosbedoya_kubernetes-activity-7208528891882209280-ryFq)

`kubectl version`

### Config

- Cluster: a connection endpoint for Kubernetes API of a cluster.
- User: credentials for connecting to cluster.
- Context: a cluster, a user and a namespace.

[source](https://stackoverflow.com/questions/56299440/kubectl-context-vs-cluster)

`kubectl config view`

`kubectl config get-clusters`

`kubectl config get-contexts`

`kubectl config current-context` → What cluster we are connected to. Prints "minikube" or "error: current-context is not set" if we are not connected to a cluster

`kubectl config use-context <context>` → Connect to a cluster, eg a remote cluster, or local cluster like `minikube` or `docker-desktop`

`kubectl config delete-context <context>`

`kubectl config set-context --current --namespace=myns` → Set namespace for all subsequent kubectl commands in the current context. To see the namespace run `kubectl config view | grep namespace:`

`kubectl cluster-info`

`kubectl cluster-info dump` → Check whether the cluster is configured properly

### Auth

```shell
kubectl auth whoami
kubectl --context <context> auth whoami
```

```shell
kubectl auth can-i '*' '*'
kubectl auth can-i create namespace
kubectl auth can-i create pods --all-namespaces
```

### Get

`kubectl get <resource-type> <resource-name>`

`kubectl get all` → List all

`kubectl get all -A` → List all of all namespaces

`kubectl get nodes`

`kubectl get nodes --show-labels`

`kubectl get namespaces`

`kubectl get pod <pod-name> -n <namespace>`

`kubectl get pods`

`kubectl get pods -A` → List pods of all namespaces

`kubectl get pods -o wide`

`kubectl get pods <pod-name>`

`kubectl get pods -n <namespace>`

`kubectl get pods -n kube-system` → List system pods (hidden by default)

`kubectl get pods -n <namespace> -o wide` → Get the IP

`kubectl get pods -n <namespace> -o wide -w` → Watch for changes (`--watch`)

`kubectl get pods -n <namespace> --show-labels`

`kubectl get pods -n <namespace> --show-labels -o wide`

`kubectl get pods -l <label>=<value>`

`kubectl get deployments` → Verify the deployment

`kubectl get services`

`kubectl get events`

`kubectl get ds`

`kubectl get jobs`

`kubectl get cronjobs`

`kubectl get configmaps`

`kubectl get deployment,rs,pods`

`kubectl get configmap app-config -o yaml` → Adding `-o yaml` shows the details

### Create vs Apply

> Apply is the preferred mechanism for managing Resources in a Kubernetes cluster. [source](https://kubectl.docs.kubernetes.io/guides/introduction/kubectl/#declarative-application-management)

[`kubectl create`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/)

- Creates a new resource from a manifest or command-line flags.
- Fails with an error (AlreadyExists) if the resource already exists.
- Imperative, not idempotent.
- `kubectl create -f deployment.yaml`
- `kubectl create deployment my-dep --image=nginx --replicas=3`

[`kubectl apply`](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/)

- Creates _or updates_ resources declaratively based on manifest files.
- Creates the resource if it doesn’t exist, or updates it if it does (upsert).
- Declarative, idempotent.
- `kubectl apply -f deployment.yaml`

### Create

Upsert with create:

```shell
kubectl create -f deployment.yaml --save-config --dry-run=client -o yaml | kubectl apply -f -
```

### Apply

Is declarative: we can apply the manifests multiple times and expect that, because the resources are already created, Kubernetes will take no action.

`kubectl apply -f deployment.yaml`

`kubectl apply -f <directory>` - To apply files in the current directory do `kubectl apply -f .`

### Delete

`kubectl delete -f deployment.yaml`

`kubectl delete pod <pod-name> --now` → Force kill, no graceful deletion

### Describe

`kubectl describe <resource-type> <resource-name>`

`kubectl describe node <node-name>`

`kubectl describe pod <pod-name> -n <namespace>` → Useful to diagnose errors when creating a pod, like `ErrImagePull` or `FailedScheduling` (look at the Events section)

`kubectl describe services` → Show cluster services information

### Run

Imperative.

`kubectl run my-nginx --image=nginx:1.19.2 --port 80` - Similar to `docker run --name my-nginx -p 80 nginx:1.19.2`

```shell
kubectl run hazelcast \
--image=hazelcast/hazelcast \
--restart=Never \
--port=5701 \
--env="DNS_DOMAIN=cluster" \
--labels="app=hazelcast,env=prod"
```

Use `--rm` to delete the pod after it exits:

```shell
kubectl run busybox --image=busybox --rm -it --restart=Never -- wget 10.1.0.41
```

Tip to create a yaml file:

```shell
kubectl run nginx --image=nginx --dry-run=client -o yaml > nginx-pod.yaml
```

### Logs

:::tip
Use [stern](https://github.com/stern/stern) to get the logs of multiple pods. Instead of doing `kubectl logs gateway-867d76cc6-kwnjf`, which targets a single pod only, you can do `stern gateway`, which matches all the pods that start with gateway (that is, all the replicas), including new pods.
:::

`kubectl logs <pod-name>`

`kubectl logs -n catalog deployment/catalog`

Follow logs:

`kubectl logs -f <pod-name>`

Get logs of the previous container (eg if it crashed):

`kubectl logs --previous <pod-name>` or `kubectl logs -p <pod-name>`

### Namespace

We can use `ns` instead of `namespace`.

Create (imperative):

```shell
kubectl create ns h92
```

`kubectl get namespace <namespace>` or `kubectl get ns <namespace>`

`kubectl delete namespace <namespace>`

### Exec

Run a command in a container: `kubectl exec mypod -- <command>`

Shell into a container: `kubectl exec mypod -it -- /bin/sh` or `kubectl exec --stdin --tty mypod -- bash`. For example: `kubectl exec nginx -it -n h92 -- /bin/sh`. If the conatiner does not provide shell access (is a [distroless container](https://github.com/GoogleContainerTools/distroless)), we get this error: "OCI runtime exec failed: exec failed: unable to start container process: exec: "env": executable file not found in $PATH: unknown command terminated with exit code 127". In this case, we can debug it with `kubectl debug -it <pod> --image=busybox --target=debian --share-processes` ([source](https://github.com/bmuschko/ckad-crash-course/blob/master/exercises/20-troubleshooting-pod/solution/solution.md)).

```shell
kubectl -n catalog exec -i \
  deployment/catalog -- curl catalog.catalog.svc/catalog/products | jq .
```

### Scale

`kubectl scale -n catalog --replicas 3 deployment/catalog`

### Wait

`kubectl wait --for=condition=Ready pods --all -n catalog --timeout=180s`

`kubectl wait --for=condition=Ready --timeout=180s pods -l app.kubernetes.io/created-by=eks-workshop -A`

## Kustomize

https://kustomize.io

https://www.eksworkshop.com/docs/introduction/kustomize/

## Port forward

Expose an internal pod locally.

`kubectl port-forward <pod-name> 6000:80` → We can access the service locally at http://localhost:6000, and requests are forwarded to port 80 on the pod in our cluster

`kubectl port-forward <pod-name> [<local-port>:]<pod-port>`

### Other

Show all events: `kubectl get events -w`

Show component status (deprecated in 1.19): `kubectl get componentstatuses`

Check the rollout status: `kubectl rollout status deployment/simple-flask-deployment`

Get external IP address: `kubectl get services <service-name> -o wide`

### kubectl plugins

Plugin manager - https://krew.sigs.k8s.io - https://github.com/kubernetes-sigs/krew

- https://github.com/ahmetb/kubectx
- https://github.com/ahmetb/kubectl-tree

## Pod

https://kubernetes.io/docs/concepts/workloads/pods/

Lifecycle - https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/

### Container probes

https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/

- Readiness probe: the container is ready to accept requests
- Liveness probe: the container is still accepting requests
- Startup probe: the application is started

### Resource limits

https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

Requests a specific amount of CPU and memory so the Kubernetes scheduler can place it on a node with enough available resources.

## Deployment

https://kubernetes.io/docs/concepts/workloads/controllers/deployment/

Manage one or more replicas of a pod, allowing it to scale horizontally. A Deployment manages [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) automatically.

Provides update strategies: Recreate or RollingUpdate.

## Namespace

To group objects and avoid name collisions.

Deleting a namespace deletes all its objects.

The Namespaces are a logical grouping of the resources for each microservice and also act as a soft isolation boundary, which can be used to effectively implement controls using Kubernetes RBAC and Network Policies. [source](https://www.eksworkshop.com/docs/introduction/getting-started/microservices)

## Labels

Recommended Labels - https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/

## Service

https://kubernetes.io/docs/concepts/services-networking/service/

The IP address of a pod is not stable, for example, it changes when a pod is restarted. A service load balances a set of pods matching labels, and exposes them over a network. Allows an application running as a set of pods to be called by other components inside the Kubernetes cluster. Each service is given its own virtual IP and DNS entry.

Transport layer (4): TCP, UDP and TLS.

Types:

- ClusterIP: internal, not accessible from outside the cluster.
- NodePort: accessible from outside the cluster. For development.
- LoadBalancer: external load balancer, of a cloud provider.

ClusterIP services are internal to the cluster, so we cannot access them from the Internet or even the VPC. However, we can use exec to access an existing pod in the EKS cluster to check the catalog API is working ([source](https://www.eksworkshop.com/docs/introduction/getting-started/first)):

```shell
kubectl -n catalog exec -i \
  deployment/catalog -- curl catalog.catalog.svc/catalog/products | jq .
```

https://github.com/kubernetes-sigs/aws-load-balancer-controller

- AWS Application Load Balancer → Kubernetes Ingress
- AWS Network Load Balancer → Kubernetes Service

## Ingress

https://kubernetes.io/docs/concepts/services-networking/ingress/

Sits in front of a service. Application layer (7): HTTP and HTTPS.

Acts as the entry point for your cluster. Lets you consolidate your routing rules into a single resource, so that you can expose multiple components of your workload, running separately in your cluster, behind a single listener.

To be replaced by the [Gateway API](#gateway-api).

https://www.f5.com/products/nginx/nginx-ingress-controller

## Gateway API

The Gateway API is going to replace the Ingress in the long term.

https://gateway-api.sigs.k8s.io

## Network Policy

https://kubernetes.io/docs/concepts/services-networking/network-policies/

https://github.com/ahmetb/kubernetes-network-policy-recipes

https://cilium.io

## DeamonSet

https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/

Ensures that a set of worker nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them.

Use case: logging agents, node monitoring deamon, etc.

## StatefulSet

https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/

Runs a group of Pods, and maintains a sticky identity for each of those Pods. Guarantees a unique network ID and startup order.

Used to manage stateful workloads, for example a MySQL database that runs inside a Kubernetes cluster.

## Job

https://kubernetes.io/docs/concepts/workloads/controllers/job/

One-off tasks that run to completion and then stop. Can run in parallel.

## CronJob

https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/

For performing regular scheduled actions such as backups, report generation, etc.

## ServiceAccount

https://kubernetes.io/docs/concepts/security/service-accounts/

## ConfigMap

https://kubernetes.io/docs/concepts/configuration/configmap/

Used to store non-confidential data in key-value pairs, and expose it to a pod.

## Secrets

https://kubernetes.io/docs/concepts/configuration/secret/

To avoid including confidential data in application code or a container image.

## Volume

https://kubernetes.io/docs/concepts/storage/volumes/

A directory accessible to the containers in a pod. Volumes provide data persistance and shared storage for pods.

- Static provisioning: done by the cluster administrator. Explicitly refers to physical storage.
- Dynamic provisioning: done by the application developer. Requires a StorageClasses.

### PersistentVolume

https://kubernetes.io/docs/concepts/storage/persistent-volumes/

A `persistentVolumeClaim` volume is used to mount a PersistentVolume into a Pod. PersistentVolumeClaims are a way for users to "claim" durable storage (such as an iSCSI volume) without knowing the details of the particular cloud environment.

## RBAC

https://kubernetes.io/docs/reference/access-authn-authz/rbac/

ClusterRole is a non-namespaced resource, it applies to all namespaces.

## Tools

https://collabnix.github.io/kubetools

https://velero.io - Backup and migrate Kubernetes resources and persistent volumes

Lens (GUI) - https://k8slens.dev - https://www.mirantis.com/blog/getting-started-with-lens

Secrets management - https://external-secrets.io/latest

TLS certificates management - https://cert-manager.io

https://github.com/stern/stern - Logs

### Dashboard

https://github.com/kubernetes/dashboard

https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/

## Learn

- https://github.com/topics/kubernetes-learning
- https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices/
- https://www.sharelearn.net/practice/k8slabs/
- https://diveinto.com
- https://github.com/kelseyhightower/kubernetes-the-hard-way
  - https://www.pluralsight.com/cloud-guru/courses/kubernetes-the-hard-way
  - https://napo.io/posts/kubernetes-the-real-hard-way-on-aws/ - https://github.com/hajowieland/cdk-py-k8s-the-real-hard-way-aws
- https://github.com/stefanprodan/podinfo - Go microservice template for Kubernetes

## Security

https://github.com/controlplaneio/simulator

## Node.js

https://blog.platformatic.dev/the-myths-and-costs-of-running-nodejs-on-kubernetes

https://www.linkedin.com/posts/matteocollina_last-month-a-cto-friend-called-me-in-a-panic-activity-7375937934878912512-4LtP/

> Node.js applications are (usually!!) single-threaded and event-driven, while Kubernetes was built for heavyweight Java applications.

> We're using CPU metrics when we should watch event loop lag.

> One team I know switched their scaling metrics to event loop lag and cut response times in half. Another reduced their cloud bill by 60 percent just by understanding how V8 uses memory versus what Kubernetes assumes.

> The companies winning at this have stopped trying to force Node.js to behave like Java. They scale on metrics that actually matter for event-driven architectures. They've stopped blindly trusting Kubernetes defaults.

## Terraform

https://medium.com/devops-mojo/terraform-provision-amazon-eks-cluster-using-terraform-deploy-create-aws-eks-kubernetes-cluster-tf-4134ab22c594

TODO mirar

- Keynote: The Challenges of Migrating 150+ Microservices to Kubernetes, Sarah Wells https://www.youtube.com/watch?v=H06qrNmGqyE
- Kubernetes Deconstructed: Understanding Kubernetes by Breaking It Down Carson Anderson, DOMOc https://www.youtube.com/watch?v=90kZRyPcRZw
- Containers From Scratch • Liz Rice • GOTO 2018 https://www.youtube.com/watch?v=8fi7uSYlOdc
- Kubernetes: The Documentary https://news.ycombinator.com/item?id=30323432 https://www.youtube.com/watch?v=BE77h7dmoQU
- https://news.ycombinator.com/item?id=30413263 Kubernetes Documentary: A Critical Review https://www.cloudcritical.org/article/kubernetes-documentary-part-1/
