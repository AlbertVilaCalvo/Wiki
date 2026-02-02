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
- [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/): runs controller processes, a control loop that ensures that the current state is the desired state for all the running workloads.
  - Controller types: node, replication, endpoints, job, namespace, service accounts, token...
  - https://kubernetes.io/docs/concepts/architecture/controller/
  - Note: There are also [admission controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/), but it is an interceptor in the API server.
- cloud-controller-manager (optional): embeds cloud-specific control logic. Lets you link your cluster into your cloud provider's API.

See https://kubernetes.io/docs/concepts/architecture/#control-plane-components and https://kubernetes.io/docs/concepts/overview/components/#control-plane-components.

You want to have a minimum of 3 control planes, since etcd uses the RAFT consensus algorithm, which requires leader election. One of them will be the main control plane.

### API Server

https://kubernetes.io/docs/concepts/overview/kubernetes-api/

https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/

What you use to interact with Kubernetes.

What you will be working with the most, since the operations you do with `kubectl` interact with this API. For example, when you run `kubectl apply -f manifest.yaml`, you are doing a POST request that sends the `manifest.yaml` to the API server. And when you run `kubectl get pods` you are doing a GET request.

All operations on the cluster go through the API server, which reads and updates the objects in etcd. The cluster components can only communicate with each other through the API server.

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

## Service Mesh

- https://linkerd.io - https://github.com/linkerd/linkerd2
- https://istio.io
- https://kuma.io
- Cilium Service Mesh - https://isovalent.com/blog/post/cilium-service-mesh/

## Kustomize

https://kustomize.io

https://www.eksworkshop.com/docs/introduction/kustomize/

## Pod

https://kubernetes.io/docs/concepts/workloads/pods/

Lifecycle - https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/

A pod is one or more containers that share the same Linux namespace (process isolation), cgroups (host resource limits), storage (volumes), IP address, port space and other resources. Containers in a pod run on the same node.

### Probes

https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/

https://stackoverflow.com/questions/65858309/why-do-i-need-3-different-kind-of-probes-in-kubernetes-startupprobe-readinessp

| Probe          | Question it answers                                                      | What Kubernetes does                                                                                   |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| startupProbe   | “Has the app _finished starting_?”                                       | Until it succeeds, other probes are ignored. If it fails too long → container is killed and restarted. |
| readinessProbe | “Can this pod _serve traffic right now_?”                                | If it fails → pod is removed from Service endpoints (no traffic), but not restarted.                   |
| livenessProbe  | “Is this container _still alive / not stuck_? Should it be _restarted_?” | If it fails → container is restarted.                                                                  |

Never restart just because dependency is down → that’s readiness, not liveness.

#### startupProbe - slow startup

Use when your app needs a long time to boot (database migrations, JVM apps, large ML models, etc.).

Without it, liveness checks can fail during startup, and Kubernetes may think the app is dead and restart it before it finishes starting.

Once startupProbe succeeds, liveness and readiness probes start working.

For fast startup apps, you may skip it.

`/health/startup` waits for migrations and to connect to DB and Redis, returns 503 while not ready. Once connected, returns 200 OK.

#### readinessProbe - traffic routing control

Tells Kubernetes whether the pod should receive requests.

If it fails, the Pod is removed from Service/LoadBalancer but stays running, not restarted.

Use cases:

- App depends on a database, cache or queue which is temporarily down.
- App is overloaded and wants to stop taking traffic.
- During rolling updates.

`/health/ready` checks DB, cache, message broker connectivity.

#### livenessProbe - crash recovery

Detects if the process is stuck: app hangs but not crashes, thread pool deadlock, infinite loop, event loop frozen, memory corruption, unrecoverable state, etc.

If it fails, Kubernetes restarts the container.

`/health/live` should be very cheap and simple. Never put heavy external dependency checks (DB, Kafka), it will cause many restarts.

#### Example

```yaml
startupProbe:
  httpGet:
    path: /health/startup
    port: 8080
  failureThreshold: 20
  periodSeconds: 5

readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  periodSeconds: 5
  failureThreshold: 2
  successThreshold: 2

livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  periodSeconds: 10
  failureThreshold: 3
```

1. Startup phase

- Loads config, warms cache, connects to DB (takes 60s)
- `startupProbe` prevents liveness from killing it

2. Normal operation

- `readinessProbe` checks DB + Redis
- `livenessProbe` checks internal heartbeat

3. DB goes down

- readiness fails → traffic stops
- liveness still OK → pod not restarted

4. App deadlocks

- readiness might still say OK
- liveness fails → pod restarted

### Resource limits

https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

Requests a specific amount of CPU and memory so the Kubernetes scheduler can place it on a node with enough available resources.

### Topology spread constraints

https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/

Use topology spread constraints to distribute pods across failure domains, for example multiple AWS AZs and EC2 nodes. This helps achieve high availability.

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

https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/

Sits in front of a service. Application layer (7): HTTP and HTTPS.

Acts as the entry point for your cluster. Lets you consolidate your routing rules into a single resource, so that you can expose multiple components of your workload, running separately in your cluster, behind a single listener.

To be replaced by the [Gateway API](#gateway-api).

https://www.f5.com/products/nginx/nginx-ingress-controller

## Gateway API

The Gateway API is going to replace the Ingress in the long term.

https://gateway-api.sigs.k8s.io

https://kubernetes.io/docs/concepts/services-networking/gateway/

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

Runs a group of Pods, and maintains a sticky identity for each of those Pods. Guarantees a unique network ID and startup order, and provides stable storage (PersistentVolume).

Used to manage stateful workloads, for example a MySQL or Redis database that runs inside a Kubernetes cluster.

## Job

https://kubernetes.io/docs/concepts/workloads/controllers/job/

One-off tasks that run to completion and then stop. Can run in parallel.

## CronJob

https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/

For performing regular scheduled actions such as backups, report generation, etc.

## ServiceAccount

https://kubernetes.io/docs/concepts/security/service-accounts/

Is an identity used by applications running inside Pods to authenticate and access Kubernetes API resources or, when configured, external cloud resources (eg AWS S3 or DynamoDB) without static credentials.

It’s like a "user" account, but for workloads (Pods), not humans.

Use cases:

- Pod-to-K8s API access. Give an app permission to list/watch ConfigMaps, Secrets, or Pods.
- Pod-to-cloud access. For example, with AWS IRSA, access AWS resources securely (S3, DynamoDB, Secrets Manager, etc.) without embedding static credentials.
- Fine-grained security. Restrict what workloads can do in Kubernetes (eg read-only, namespace-limited).
- Automation tools. CI/CD or monitoring agents (eg ArgoCD, Prometheus) use ServiceAccounts for scoped permissions.

Every namespace gets a `default` ServiceAccount upon creation (run `kubectl get serviceaccounts -n <namespace>` and `kubectl describe sa default` to see it). If you don't manually assign a ServiceAccount to a Pod, Kubernetes assigns the `default` ServiceAccount for that namespace to the Pod.

Kubernetes automatically mounts a JWT token for the ServiceAccount into the Pod at `/var/run/secrets/kubernetes.io/serviceaccount`, which the application can use to authenticate to the Kubernetes API server. To see it run:

```shell
kubectl exec -n <namespace> <pod-name> -- cat /var/run/secrets/kubernetes.io/serviceaccount/token
```

## ConfigMap

https://kubernetes.io/docs/concepts/configuration/configmap/

Used to store non-confidential data in key-value pairs, and expose it to a pod.

## Secrets

https://kubernetes.io/docs/concepts/configuration/secret/

https://github.com/bitnami-labs/sealed-secrets

https://external-secrets.io/latest/

To avoid including confidential data in application code or a container image.

## Volume

https://kubernetes.io/docs/concepts/storage/volumes/

A directory accessible to the containers in a pod. Volumes provide data persistence and shared storage for pods.

A volume can be:

- [Ephemeral](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/). Lifetime linked to a specific pod. Data is lost when the pod stops, but survives container restarts.
  - emptyDir
  - configMap
  - secret
- [Persistent](https://kubernetes.io/docs/concepts/storage/persistent-volumes/). Data stays even after the pod ends, surviving pod restarts.
  - csi
  - nfs
  - iscsi
  - local
  - hostPath
  - awsElasticBlockStore
  - azureDisk
  - gcePersistentDisk

[Provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioning):

- Static provisioning: done by the cluster administrator. Explicitly refers to physical storage.
- Dynamic provisioning: done by the application developer. Requires a StorageClasses.

### PersistentVolume

https://kubernetes.io/docs/concepts/storage/persistent-volumes/

As the name implies, persistent volumes are retained after the pod that uses them is deleted. They exist independently of pods.

A `persistentVolumeClaim` volume is used to mount a PersistentVolume into a Pod. PersistentVolumeClaims are a way for users to "claim" durable storage (such as an iSCSI volume) without knowing the details of the particular cloud environment.

Access modes:

- ReadOnlyMany: the volume can be mounted as read-only by many nodes.
- ReadWriteOnce: the volume can be mounted as read-write by a single node.
- ReadWriteMany: the volume can be mounted as read-write by many nodes.

## RBAC

https://kubernetes.io/docs/reference/access-authn-authz/rbac/

ClusterRole is a non-namespaced resource, it applies to all namespaces.

`system:masters` is a group which allows for unrestricted access to the Kubernetes API server without the need for any roles or rolebindings. [source](https://medium.com/@JoooostB/kubernetes-how-to-create-a-system-masters-user-and-why-you-really-shouldnt-8c17d19e7b8e)

https://github.com/kubernetes/kubernetes/blob/8d450ef773127374148abad4daaf28dac6cb2625/staging/src/k8s.io/apiserver/pkg/authentication/user/user.go#L70

https://github.com/kubernetes/kubernetes/blob/8d450ef773127374148abad4daaf28dac6cb2625/pkg/registry/rbac/escalation_check.go#L38-L39

## Tools

https://collabnix.github.io/kubetools

https://velero.io - Backup and migrate Kubernetes resources and persistent volumes

Secrets management - https://external-secrets.io/latest

TLS certificates management - https://cert-manager.io

https://github.com/stern/stern - Logs

### Local Kubernetes clusters

https://kubernetes.io/docs/tasks/tools/

- minikube - https://minikube.sigs.k8s.io/docs - [See minikube](./minikube.md)
- kind - https://kind.sigs.k8s.io - https://github.com/kubernetes-sigs/kind/
  - Brew formula: https://formulae.brew.sh/formula/kind#default
- k3s - https://k3s.io - https://github.com/k3s-io/k3s (winner)
  - Does not support macOS
- Skaffold - https://skaffold.dev - https://github.com/GoogleContainerTools/skaffold

### Lens (GUI)

https://k8slens.dev

https://www.mirantis.com/blog/getting-started-with-lens

```shell
open -a lens
```

Extensions - Not working in latest Lens version - https://github.com/lensapp/lens-extensions - Lens Resource Map - https://github.com/nevalla/lens-resource-map-extension

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
