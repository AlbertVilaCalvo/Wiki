# kubectl

Allows you to interact with the cluster, eg to get the status of nodes, pods, and services.

Docs:

- https://kubectl.docs.kubernetes.io
- https://kubernetes.io/docs/reference/kubectl/

## Reference

- https://kubernetes.io/docs/reference/kubectl/generated/
- https://kubernetes.io/docs/reference/kubectl/quick-reference/
- https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands
- https://kubectl.docs.kubernetes.io/references/kubectl/

## Command families

From https://kubectl.docs.kubernetes.io/guides/introduction/kubectl/#command-families but modified:

| Type                            |                                          | Used For                           | Description                                                               |
| ------------------------------- | ---------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| Declarative Resource Management | `apply`                                  | Deployment and Operations (GitOps) | Declaratively manage Kubernetes Workloads using Resource Config files     |
| Imperative Resource Management  | `run`, `create`                          | Development Only                   | Run commands to manage Kubernetes Workloads using CLI arguments and flags |
| Printing Workload State         | `get`, `describe`, `explain`             | Debugging                          | Print information about Workloads                                         |
| Interacting with Containers     | `attach`, `cp`, `exec`, `events`, `logs` | Debugging                          | Commands for inspecting and debugging your applications                   |
| Cluster Management              | `cordon`, `drain`, `uncordon`            | Cluster Ops                        | Drain and Cordon Nodes                                                    |

## Basics

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

## Config

- Cluster: a connection endpoint for Kubernetes API of a cluster.
- User: credentials for connecting to cluster.
- Context: a cluster, a user and a namespace.

### kubeconfig - `~/.kube/config`

https://kubernetes.io/docs/reference/config-api/kubeconfig.v1/

Holds the information needed to connect to remote kubernetes clusters, and the permissions (what you can do) on those clusters.

Fields:

- `certificate-authority-data`: contains the TLS certificates required to authenticate and access the Kubernetes clusters.
- `context`: references to clusters we can connect and interact with. The `current-context` is the cluster you are connected to right now.
- `user`: how you authenticate to the cluster. There's one for each cluster.

[source](https://stackoverflow.com/questions/56299440/kubectl-context-vs-cluster)

`kubectl config view`

`kubectl config get-clusters`

`kubectl config get-contexts`

`kubectl config current-context` → What cluster we are connected to. Prints "minikube" or "error: current-context is not set" if we are not connected to a cluster

`kubectl config use-context <context>` → Connect to a cluster, eg a remote cluster, or local cluster like `minikube` or `docker-desktop`

`kubectl config delete-context <context>`

`kubectl config set-context --current --namespace myns` → Set namespace for all subsequent kubectl commands in the current context. To see the namespace run `kubectl config view | grep namespace:`

`kubectl cluster-info`

`kubectl cluster-info dump` → Check whether the cluster is configured properly

## Auth

```shell
kubectl auth whoami
kubectl --context <context> auth whoami
```

```shell
kubectl auth can-i '*' '*'
kubectl auth can-i create namespace
kubectl auth can-i create pods --all-namespaces
```

## Get

`kubectl get <resource-type> <resource-name>`

`kubectl get all` → List all in current (usually default) namespace

`kubectl get all -n <namespace>`

`kubectl get all -A` → List all of all namespaces

`kubectl get deployment,rs,pods`

`kubectl get configmap app-config -o yaml` → Adding `-o yaml` shows the details

`kubectl get nodes`

`kubectl get nodes --show-labels`

`kubectl get namespaces`

`kubectl get pod <pod-name> -n <namespace>`

`kubectl get pods`

`kubectl get pods -A` → List pods of all namespaces (`--all-namespaces`)

`kubectl get pods -o wide`

`kubectl get pods <pod-name>`

`kubectl get pods -n <namespace>`

`kubectl get pods -n kube-system` → List system pods (hidden by default)

`kubectl get pods -n <namespace> -o wide` → Get the IP

`kubectl get pods -n <namespace> -o wide -w` → Watch for changes (`--watch`)

`kubectl get pods -n <namespace> --show-labels`

`kubectl get pods -n <namespace> --show-labels -o wide`

`kubectl get pods -l <label>=<value>`

`kubectl get pods --all-namespaces -o wide --field-selector spec.nodeName=<node>` → Get pods running on a specific node. You can also check the section "Non-terminated Pods" of `kubectl describe node <node>`

`kubectl get deployments` → Verify the deployment

`kubectl get services`

`kubectl get events`

`kubectl get serviceaccounts` or `kubectl get sa`

`kubectl get ds`

`kubectl get jobs`

`kubectl get cronjobs`

`kubectl get configmaps`

`kubectl get secrets`

## Create vs Apply

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

## Create

Upsert with create:

```shell
kubectl create -f deployment.yaml --save-config --dry-run=client -o yaml | kubectl apply -f -
```

## Apply

Is declarative: we can apply the manifests multiple times and expect that, because the resources are already created, Kubernetes will take no action.

`kubectl apply -f deployment.yaml`

`kubectl apply -f <directory>` - To apply files in the current directory do `kubectl apply -f .`

## Delete

`kubectl delete -f deployment.yaml`

`kubectl delete pod <pod-name> --now` → Force kill, no graceful deletion

`kubectl delete pod --all -n <namespace>` → Kill all pods in namespace

## Describe

`kubectl describe <resource-type> <resource-name>`

`kubectl describe node <node-name>`

`kubectl describe pod <pod-name> -n <namespace>` → Useful to diagnose errors when creating a pod, like `ErrImagePull` or `FailedScheduling` (look at the Events section)

`kubectl describe services` → Show cluster services information

## Run

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

## Logs

:::tip
Use [stern](https://github.com/stern/stern) to get the logs of multiple pods. Instead of doing `kubectl logs gateway-867d76cc6-kwnjf`, which targets a single pod only, you can do `stern gateway`, which matches all the pods that start with gateway (that is, all the replicas), including new pods.
:::

`kubectl logs <pod-name>`

`kubectl logs -n catalog deployment/catalog`

Follow logs:

`kubectl logs -f <pod-name>`

Get logs of the previous container (eg if it crashed):

`kubectl logs --previous <pod-name>` or `kubectl logs -p <pod-name>`

## Namespace

We can use `ns` instead of `namespace`.

Create (imperative):

`kubectl create ns h92`

`kubectl get namespace <namespace>` or `kubectl get ns <namespace>`

`kubectl delete namespace <namespace>`

## Exec

Run a command in a container: `kubectl exec mypod -- <command>`

Shell into a container: `kubectl exec mypod -it -- /bin/sh` or `kubectl exec --stdin --tty mypod -- bash`. For example: `kubectl exec nginx -it -n h92 -- /bin/sh`. If the container does not provide shell access (is a [distroless container](https://github.com/GoogleContainerTools/distroless)), we get this error: "OCI runtime exec failed: exec failed: unable to start container process: exec: "env": executable file not found in $PATH: unknown command terminated with exit code 127". In this case, we can debug it with `kubectl debug -it <pod> --image=busybox --target=debian --share-processes` ([source](https://github.com/bmuschko/ckad-crash-course/blob/master/exercises/20-troubleshooting-pod/solution/solution.md)).

```shell
kubectl -n catalog exec -i \
  deployment/catalog -- curl catalog.catalog.svc/catalog/products | jq .
```

## Scale

```shell
kubectl scale deployment/catalog -n catalog --replicas 3
kubectl scale statefulset web --replicas 3
```

## Wait

`kubectl wait --for=condition=Ready pods --all -n catalog --timeout=180s`

`kubectl wait --for=condition=Ready --timeout=180s pods -l app.kubernetes.io/created-by=eks-workshop -A`

## Expose resource as a service

```shell
kubectl expose deployment <deployment> -n <namespace> --name <myapp-service> --port 8080 --type LoadBalancer
# service/myapp-service exposed
```
