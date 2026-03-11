---
title: Argo CD
---

https://argoproj.github.io/cd/

Docs - https://argo-cd.readthedocs.io/en/stable/

Demo - https://cd.apps.argoproj.io - https://github.com/argoproj/argoproj-deployments

https://github.com/argoproj/argo-cd

Helm chart - https://github.com/argoproj/argo-helm/tree/main/charts/argo-cd

Manifests - https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/

Examples - https://github.com/argoproj/argocd-example-apps (Helm, Kustomize, Jsonnet, plain YAML, etc.)

Best practices - https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/

EKS - https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#eks

https://learn.microsoft.com/en-us/azure/architecture/example-scenario/gitops-aks/gitops-blueprint-aks - See scenarios 3 and 4

https://github.com/akuity/awesome-argo

https://github.com/aws-samples/eks-blueprints-add-ons/tree/main/argocd

https://akuity.io

https://kargo.io - https://github.com/akuity/kargo

Survey results - https://blog.argoproj.io/argo-cd-2025-user-survey-results-ab045f7d5d9a

> Helm is by far the most popular Argo CD installation method (71%)

> More and more teams are following Argo CD’s recommended practices. App-of-Apps, ApplicationSets, and built-in self-healing are now widely used to manage complex GitOps setups.

> Image Updater is the most adopted sub-project (used by 34% of respondents).

:::tip
Karpenter and the bootstrap Nodepool is the only K8s resource I ran on Terraform. Everything else is ArgoCD. [source](https://www.reddit.com/r/kubernetes/comments/1itumdr/eks_auto_mode_aka_managed_karpenter/)
:::

## Install Argo CD

https://argo-cd.readthedocs.io/en/stable/getting_started/

https://www.systemx.io/blog/simple-argocd-install/

https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/

Installation types:

- Multi-Tenant: the common way to install. Can use the UI or CLI.
  - High Availability: recommended for production use.
    - ha/install.yaml: requires cluster-admin access. To deploy applications in the same cluster that Argo CD runs in.
    - ha/namespace-install.yaml: requires only namespace level privileges. To deploy applications to external clusters.
  - Non HA: to evaluate Argo.
    - install.yaml
    - namespace-install.yaml
- Core: headless mode. Does not include the API server or UI, and installs the lightweight (non-HA) version of each component. See https://argo-cd.readthedocs.io/en/stable/operator-manual/core/

### Install Argo CD using manifests

```shell
kubectl create namespace argocd
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/install.yaml
# or with HA:
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/ha/install.yaml
```

To expose the Argo CD web UI you have 3 options:

1. For production, it's recommended to [use an Ingress](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/) instead of exposing the service directly.
2. Port forwarding (for testing only): `kubectl port-forward service/argocd-server -n argocd 8080:443`. Then access the UI at `http://localhost:8080`.
3. Change the service type from `ClusterIP` to `LoadBalancer` or `NodePort` (for testing only):

```shell
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
# or edit the type at the service manifest with:
kubectl edit svc argocd-server -n argocd
```

- If using AWS and `LoadBalancer`, `EXTERNAL-IP` is like `a00c514b2b8402baff3e63ad1a2d812a-157193451.us-east-1.elb.amazonaws.com`. Get it with `kubectl get svc argocd-server -n argocd`.
- If using `NodePort`, the URL is `http://<NODE_IP>:<NODE_PORT>`. Get the `NODE_PORT` with `kubectl get svc argocd-server -n argocd` (will be a number from 30000 to 32767) and the `NODE_IP` with `kubectl get nodes -o wide` (is the `EXTERNAL-IP`). In AWS:
  - The node must be in a public subnet and have a public IP ("Public IPv4 address" at the console).
  - The `NODE_PORT` must be open in the security group, for example with an inbound rule that allows "Custom TCP" traffic at port `NODE_PORT` from source 0.0.0.0/0, or a rule with "All TCP" to avoid specifying the port.

At the browser, use `http://`, not `https://`. You'll need to trust the self-signed certificate.

To log in using the UI, the username is `admin` and the password is the field `password` of the secret `argocd-initial-admin-secret`. Get the password with either:

```shell
argocd admin initial-password -n argocd
# or
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d
# ignore the `%` at the end
```

Change the initial password from the UI (at User Info) or with `argocd account update-password` ([docs](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_update-password/)).

To log in using the CLI [see below](#cli).

#### Uninstall Argo CD using manifests

To uninstall Argo CD installed with manifests:

1. Delete all applications managed by Argo CD.
2. Delete the Argo CD resources using the same manifest used for installation (eg `install.yaml` or `ha/install.yaml`):

```shell
kubectl delete -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/install.yaml
# or with HA:
kubectl delete -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.3.0/manifests/ha/install.yaml
```

3. Delete the namespace:

```shell
kubectl delete namespace argocd
```

If using EKS with a `LoadBalancer` service, AWS will automatically delete the associated ELB when the service is removed.

### Install Argo CD using Helm

Helm chart - https://github.com/argoproj/argo-helm/tree/main/charts/argo-cd

```shell
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
helm search repo argo # List charts in the argo repo
helm search repo argo/argo-cd --versions # List all versions
helm install argocd argo/argo-cd -n argocd --create-namespace
```

We can also do:

```shell
helm upgrade argocd argo/argo-cd --version <version> --install -n argocd --create-namespace
```

#### Uninstall Argo CD using Helm

```shell
helm uninstall argocd -n argocd
kubectl delete namespace argocd
```

### Install using EKS Capabilities

https://docs.aws.amazon.com/eks/latest/userguide/argocd.html

> AWS handles security patching, updates, and operational management, freeing your teams to focus on building with AWS rather than on cluster operations. Unlike traditional Kubernetes add-ons that consume cluster resources, capabilities run in EKS rather than on your worker nodes.

> With the EKS Capability for Argo CD, the Argo CD software runs in the AWS control plane, not on your worker nodes. This means your worker nodes don’t need direct access to Git repositories or Helm registries—the capability handles source access from the AWS account.

> The UI integrates with AWS Identity Center (formerly AWS SSO) for seamless authentication and authorization, enabling you to control access using your existing identity management infrastructure.

## Components

https://argo-cd.readthedocs.io/en/stable/developer-guide/architecture/components/

- [`argocd-server`](https://argo-cd.readthedocs.io/en/stable/operator-manual/server-commands/argocd-server/): gRPC/REST server which exposes the API consumed by the Web UI, `argocd` CLI or any external system like a CI/CD systems.
  - The Swagger API documentation is available at `https://<ARGOCD_SERVER_URL>/swagger-ui`, for example http://localhost:8080/swagger-ui if using port forwarding.
- [`argocd-repo-server`](https://argo-cd.readthedocs.io/en/stable/operator-manual/server-commands/argocd-repo-server/): interacts with Git repositories, maintains a local cache of Git repositories and generates Kubernetes manifests.
- [`argocd-application-controller`](https://argo-cd.readthedocs.io/en/stable/operator-manual/server-commands/argocd-application-controller/): continuously monitors applications and performs actions like syncing and health checks. It runs lifecycle hooks.
- [`argocd-applicationset-controller`](https://argo-cd.readthedocs.io/en/stable/operator-manual/server-commands/argocd-applicationset-controller/): it continuously monitors/reconciles ApplicationSets.
- `argocd-dex-server`: an OpenID Connect (OIDC) identity provider for authentication with [Dex](https://github.com/dexidp/dex) ([see docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/)).
- `argocd-redis`: cache that stores the state of applications and manifests to reduce requests to the Kube API server and Git provider.

## Concepts

https://argo-cd.readthedocs.io/en/stable/core_concepts/

https://docs.aws.amazon.com/eks/latest/userguide/argocd-concepts.html

View CRDs: `kubectl get crds -n argocd` or `kubectl api-resources | grep argo`

Use `kubectl explain <crd_name>` to see the CRD fields. For example, `kubectl explain app` or `kubectl explain appproj`. To see the details of a specific field, use dot notation: `kubectl explain applications.spec.source`.

## Application

Specification - https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/

CRD - https://github.com/argoproj/argo-cd/blob/master/manifests/crds/application-crd.yaml

A CRD that represents a deployed instance of Kubernetes resources.

From https://github.com/PacktPublishing/GitOps-in-Practice-with-Argo-CD-and-Argo-Rollouts-The-Complete-Guide/blob/main/argocd-argo-rollouts-slides.pdf (slide 42):

|                 | Application CRD                                                          | Kubernetes resource                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`          | `Application`                                                            | `Deployment`, `Service`, `ConfigMap`...                                                                                                                                                         |
| Purpose         | Where is the code? Where should it be deployed? How should it be synced? | Which container image to run? How many replicas to create?                                                                                                                                      |
| `namespace`     | `argocd`                                                                 | `metadata.namespace` of the resource, or `spec.destination.namespace` of the Application if the resource does not have a `metadata.namespace` field                                             |
| Who manages it? | Argo CD Application controller                                           | [Kubernetes controllers](https://kubernetes.io/docs/concepts/architecture/controller/), like the [Deployment controller](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) |

Use `kubectl get app -n argocd -o wide` to list applications, and `kubectl describe app <app_name> -n argocd` to see an application details.

Use `kubectl explain applications` to see the Application CRD fields.

- [Source](https://github.com/argoproj/argo-cd/blob/a1d68ca46580f1326b499125df285350fd4ae61b/manifests/crds/application-crd.yaml#L1064-L1436): location where the manifest files are stored. A Git repository, Helm chart, Kustomize directory or jsonnet.
- [Destination](https://github.com/argoproj/argo-cd/blob/a1d68ca46580f1326b499125df285350fd4ae61b/manifests/crds/application-crd.yaml#L981-L1000): where the application contained in source is deployed. A Kubernetes cluster and namespace.

### Create an Application

There are 3 ways to create an Application: UI, `argocd` CLI and manifest.

CLI:

```shell
argocd app create demo --repo https://github.com/user/repo.git --path path/to/manifests --dest-server https://kubernetes.default.svc --dest-namespace default
```

Manifest:

```yaml title="application.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: demoapp # Must be lowercase, can contain - and .
spec:
  project: default
  source:
    repoURL: https://github.com/yogeshraheja/Argo-CD-for-the-Absolute-Beginners.git
    path: Section5_Argo_CD_Application
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc # Deploy to the same cluster that Argo CD runs in
```

Use `kubectl apply -f application.yaml -n argocd` to apply, `kubectl describe app <app_name> -n argocd` to view the created application and `kubectl delete -f application.yaml -n argocd` to delete it.

:::important
All Argo CD resources (Applications, ApplicationSets, etc.) have to be installed in the `argocd` namespace ([source](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#quick-reference)).

An Argo CD Application lives in the `argocd` namespace, but the Kubernetes resources it manages (like Deployments, Services, ConfigMaps, etc.) are deployed in the namespace set in `metadata.namespace` of the resource, or in the namespace set in `spec.destination.namespace` of the Application if the resource does not have a `metadata.namespace` field.
:::

### Delete an Application

https://argo-cd.readthedocs.io/en/stable/user-guide/app_deletion/

## Sync

Application sync status can be `Synced`, `OutOfSync` or `Unknown` (see [Go code](https://github.com/argoproj/argo-cd/blob/ff8305694f52b509fa2534fbf14d7d4e56657bf7/pkg/apis/application/v1alpha1/types.go#L1804-L1815) [TypeScript code](https://github.com/argoproj/argo-cd/blob/ff8305694f52b509fa2534fbf14d7d4e56657bf7/ui/src/app/shared/models.ts#L384-L390)).

Resource health status can be `Healthy`, `Suspended`, `Progressing`, `Missing`, `Degraded` or `Unknown` ([see Argo docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/), [AWS docs](https://github.com/awsdocs/amazon-eks-user-guide/blob/4087415baafa91baa8689987284b5c868ac62d75/latest/ug/capabilities/argocd-concepts.adoc?plain=1#L187-L192), [Go code](https://github.com/argoproj/argo-cd/blob/ff8305694f52b509fa2534fbf14d7d4e56657bf7/gitops-engine/pkg/health/health.go#L16-L31) and [TypeScript code](https://github.com/argoproj/argo-cd/blob/ff8305694f52b509fa2534fbf14d7d4e56657bf7/ui/src/app/shared/models.ts#L398)).

### Sync policy

#### Manual

The default. You need to click "Sync" at the UI or run `argocd app sync` at the CLI. Allows to rollback.

#### Automatic

https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/

When a change is detected in the Git repository, Argo CD automatically applies the changes to the cluster.

You cannot perform a rollback with automatic sync enabled, since reconciliation -which happens every 3 minutes- will override the rollback.

You can also configure:

- Prune resources. Delete resources automatically when they are deleted in the Git repository. False by default.
- Self heal. Automatically revert changes made to the cluster that are not in the Git repository, like manual changes done with `kubectl`. False by default. If you are changing something to debug or test, disable self heal to avoid your changes being reverted.
- Allow empty. Allows deleting all application resources during automatic syncing. False by default.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
spec:
  syncPolicy:
    automated:
      enabled: true
      prune: false
      selfHeal: false
      allowEmpty: false
```

### Sync options

- https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/
- https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/

`kubectl explain applications.spec.syncPolicy.syncOptions`

### Sync phases and hooks

https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/

Diagram - https://www.youtube.com/watch?v=usj6RP6uzUc&t=659s

You can use hooks to send notifications to Slack if the deployment succeeds or fails, run database migrations, send an event to PagerDuty, run tests, etc. during the sync process.

Hooks can be any type of Kubernetes resource kind, but usually are Job, Pod or Argo Workflows. You add the annotation `argocd.argoproj.io/hook: <hook_type>` to the resource manifest.

Hook resources are defined in your Git repository, together with the other app manifests (Deployment, Service, ConfigMap, etc.), not in the Argo CD configuration (ie the Application, AppProject and ApplicationSet manifests).

The annotation `argocd.argoproj.io/hook-delete-policy` controls how hook resources are deleted:

- `BeforeHookCreation` deletes the previous hook resource before creating a new one with the same `metadata.name`. This keeps the job until next execution. Is the default policy if not specified.
- `HookSucceeded` deletes the hook resource after it succeeds. Commonly used for tasks you don't need to keep after a successful rollout.
- `HookFailed` deletes the hook resource after it fails.

We can have multiple values in `argocd.argoproj.io/hook-delete-policy`, for example `BeforeHookCreation,HookSucceeded` to delete the previous hook resource either before creating a new one or after it succeeds. You can clean up a hook resource manually with `kubectl delete job <job_name>`.

:::warning
If you use `HookSucceeded` and `HookFailed` you will not have access to the resource logs to see what happened because the resource will be deleted after execution. For example, if you use `HookFailed` and the job fails, you will not be able to check the job logs to see why it failed unless you are sending the logs to an external system.
:::

:::warning
If you execute multiple times a job _with the same name_ without a `HookSucceeded` or `BeforeHookCreation` policy that deletes it after each execution, Kubernetes will run the job only the first time (unless you manually delete the previous job with `kubectl delete job <job_name>` or change the job manifest). This is because the Job resource remains in the cluster in a `Completed` status and Kubernetes sees it as already executed.

Note that most job fields are immutable, so if you change something in the job manifest (like the `command` argument) and the job is not deleted, the next time it runs Kubernetes will try to update the existing job and the sync may fail with an error like _"Sync operation to b2823d06ce0997dd37da8bb63a0bc88507cf5b6f failed: one or more objects failed to apply, reason: error when patching ... field is immutable"_.
:::

Watch the job execution with `kubectl get job -w -n <namespace>` (run this before a sync starts).

Test hooks with `argocd app sync <app_name> --dry-run` ([source](https://almogshoshan.dev/devops/argocd-hooks/)).

#### Examples

- https://codefresh.io/learn/argo-cd/argo-cd-hooks-the-basics-and-a-quick-tutorial/
- https://oneuptime.com/blog/post/2026-02-02-argocd-sync-hooks/view

Example from [here](https://github.com/PacktPublishing/GitOps-in-Practice-with-Argo-CD-and-Argo-Rollouts-The-Complete-Guide/blob/main/argocd-example-apps-labs-master/helm-guestbook/templates/db-migration.yaml) and [here](https://github.com/lm-academy/argocd-course/blob/main/sync-phases-hooks/external-job.yaml):

```yaml title="db-migration.yaml"
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/hook-delete-policy: BeforeHookCreation,HookSucceeded
spec:
  # If the job fails, Argo CD will retry it 2 times before consider it failed.
  # Since this is a PreSync hook, if the job fails the deployment will not take
  # place and the sync operation will be marked as failed.
  backoffLimit: 2
  template:
    spec:
      # We want the job to run only once and exit with an exit code, instead of being
      # restarted if it fails. If we set it to Always, the job will be restarted
      # indefinitely until it succeeds.
      restartPolicy: Never
      containers:
        - name: migration
          image: busybox
          command:
            - 'sh'
            - '-c'
            - "echo 'Running db migration...'; sleep 10; echo 'Done!'"
```

### Sync waves

https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/

https://github.com/argoproj/argocd-example-apps/tree/master/sync-waves

Example: https://redhat-scholars.github.io/argocd-tutorial/argocd-tutorial/04-syncwaves-hooks.html

Define the order of resource application during a sync phase using the `argocd.argoproj.io/sync-wave` annotation. Default value if not specified is 0, and can be negative. Resources with lower value are applied first. Resources with the same number are applied in parallel.

### Reconciliation interval

With automatic sync, Argo CD checks the Git repository every 3 minutes. Modify `timeout.reconciliation` and `timeout.reconciliation.jitter` at the [`argocd-cm` ConfigMap](https://argo-cd.readthedocs.io/en/stable/operator-manual/argocd-cm-yaml/) to adjust. The value is a [duration string](https://pkg.go.dev/time#ParseDuration), e.g `60s`, `1m` or `1h`.

The `argocd-repo-server` deployment and the `argocd-application-controller` statefulset (or deployment, if configured) must be manually restarted after changing the setting.

From [How often does Argo CD check for changes to my Git or Helm repository?](https://argo-cd.readthedocs.io/en/stable/faq/#how-often-does-argo-cd-check-for-changes-to-my-git-or-helm-repository):

> If you are using [webhooks](#webhook) and are interested in improving Argo CD performance / resource consumption, you can set `timeout.reconciliation` to a lower-frequency interval to reduce the frequency of explicit polling, for example `15m`, `1h` or other interval that is appropriate for your case.

View the current value of `timeout.reconciliation`:

```shell
kubectl get configmap argocd-cm -n argocd -o jsonpath="{.data.timeout\.reconciliation}"
# or
kubectl describe configmap argocd-cm -n argocd
```

Change the value of `timeout.reconciliation` to 1 hour:

```shell
kubectl patch configmap argocd-cm -n argocd --type merge -p '{"data":{"timeout.reconciliation":"1h"}}'
```

Edit the `argocd-cm` ConfigMap:

```shell
kubectl edit cm argocd-cm -n argocd
```

Restart the `argocd-repo-server` deployment and the `argocd-application-controller` statefulset:

```shell
kubectl rollout restart deployment argocd-repo-server -n argocd
# deployment.apps/argocd-repo-server restarted
kubectl rollout restart statefulset argocd-application-controller -n argocd
# statefulset.apps/argocd-application-controller restarted

# Verify argocd-repo-server and argocd-application-controller pods are running
kubectl get pods -n argocd
# NAME                                  READY   STATUS    RESTARTS   AGE
# argocd-repo-server-6f974cf47c-vhw8d   1/1     Running   0          66s
# argocd-application-controller-0       1/1     Running   0          45s
```

At the `argocd-application-controller` logs, check the value of `appResyncPeriod`, which is the value of `timeout.reconciliation`:

```shell
kubectl logs argocd-application-controller-0 -n argocd
# time="2026-02-19T11:46:13Z" level=info msg="appResyncPeriod=1m0s, appHardResyncPeriod=0s, appResyncJitter=1m0s"
```

## Project

https://argo-cd.readthedocs.io/en/stable/user-guide/projects/

Specification - https://argo-cd.readthedocs.io/en/stable/operator-manual/project-specification/

CRD - https://github.com/argoproj/argo-cd/blob/master/manifests/crds/appproject-crd.yaml

Example manifest - https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#projects

A project is a logical grouping of applications. It provides a way to organize applications and apply common policies to them.

Projects control the source repositories, destination clusters and namespaces, which resources can be deployed and roles.

By default, all applications belong to the `default` project, which is permissive and allows deployment from any source repo to any cluster.

You can see the default project manifest with `kubectl get appproj default -n argocd -o yaml`:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd # Must be argocd
spec:
  # Allowed source repositories for applications of this project
  sourceRepos:
    - '*'
  # Allowed destination clusters and namespaces for applications of this project
  destinations:
    - namespace: '*'
      server: '*'
  # Allowed resource types that can be deployed in applications of this project
  clusterResourceWhitelist:
    - group: '*'
      kind: '*'
```

Example ([source](https://github.com/lm-academy/argocd-course/tree/main/projects)):

```yaml title="project.yaml"
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-finance
  namespace: argocd
spec:
  description: Project for Finance team
  sourceRepos:
    - 'https://github.com/user/repo.git'
  destinations:
    - server: https://kubernetes.default.svc
      namespace: finance
  clusterResourceWhitelist:
    - group: '*'
      kind: '*'
  namespaceResourceWhitelist:
    - group: '*'
      kind: '*'
```

```yaml title="application.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
spec:
  # We are not using the default project
  project: team-finance
  source:
    repoURL: https://github.com/user/repo.git
    path: guestbook
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    # Must match the namespace defined in the project destinations.namespace
    namespace: finance
```

:::info
If you add resources to the "Namespace resource allow list", for example a Deployment, you also need to add a ReplicaSet (a Deployment manages ReplicaSets), otherwise the ReplicaSets will not show on the application diagram.
:::

With `kubectl`, use `appproj` or `appprojects` to refer to the AppProject CRD:

```shell
kubectl get appproj -n argocd
kubectl get appproj <project> -n argocd -o yaml
kubectl describe appproj <project> -n argocd
```

## Webhook

https://argo-cd.readthedocs.io/en/stable/operator-manual/webhook/

From [How often does Argo CD check for changes to my Git or Helm repository?](https://argo-cd.readthedocs.io/en/stable/faq/#how-often-does-argo-cd-check-for-changes-to-my-git-or-helm-repository)

> If you are using webhooks and are interested in improving Argo CD performance / resource consumption, you can set `timeout.reconciliation` to a lower-frequency interval to reduce the frequency of explicit polling, for example `15m`, `1h` or other interval that is appropriate for your case.

## Application with Helm source

https://argo-cd.readthedocs.io/en/stable/user-guide/helm/

https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#helm

https://github.com/argoproj/argocd-example-apps/tree/master/helm-guestbook

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/argoproj/argocd-example-apps.git
    path: helm-guestbook
    targetRevision: HEAD
    helm:
      valueFiles:
        - values.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: default
```

You can have multiple `valueFiles`, and the latest one has precedence:

```yaml
source:
  helm:
    valueFiles:
      - values.yaml
      - values-override.yaml
```

You can also provide values using `valuesObject`:

```yaml
spec:
  source:
    helm:
      valuesObject:
        replicaCount: 2
```

You can override any value with `parameters`:

```yaml
source:
  helm:
    parameters:
      - name: 'service.type'
        value: LoadBalancer
```

The order of precedence is ([see docs](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/#helm-value-precedence)):

1. valueFiles (lowest)
2. values
3. valuesObject
4. parameters (highest)

So parameters always win.

Best practices ([source](https://github.com/lm-academy/argocd-course/blob/7f0897606685d1e11911eb41500151d6de092337/setting-chart-values/lab.md?plain=1#L86-L91)):

- Use `valueFiles` for environment-specific configurations (dev, staging, prod).
- Use `valuesObject` for structured overrides that should be visible in the Application manifest.
- Use `parameters` sparingly, typically for single values that need to override everything else.

## Install a public Helm chart

https://argo-cd.readthedocs.io/en/stable/user-guide/helm/

https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#helm

Example application that demonstrates how an OTS (off-the-shelf) helm chart can be retrieved and pinned to a specific helm sem version from an upstream helm repository, and customized using a custom `values.yaml` in the private git repository: https://github.com/argoproj/argocd-example-apps/tree/master/helm-dependency

Instead of using `path` we use `chart`, and `targetRevision` is the chart version (not the Git commit, tag, branch or HEAD).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: redis
  namespace: argocd
spec:
  project: default
  source:
    # https://artifacthub.io/packages/helm/bitnami/redis
    repoURL: https://charts.bitnami.com/bitnami
    chart: redis
    targetRevision: 25.3.2
  destination:
    server: https://kubernetes.default.svc
    namespace: redis
```

## App of apps

https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/

Example: https://github.com/argoproj/argocd-example-apps/tree/master/apps - Live demo: https://cd.apps.argoproj.io/applications/sync-example-apps

```shell
argocd app create -f app-of-apps.yaml
```

## Private repositories

https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/

https://docs.aws.amazon.com/eks/latest/userguide/argocd-configure-repositories.html

https://docs.aws.amazon.com/eks/latest/userguide/argocd-concepts.html

> For private repositories, configure access using AWS Secrets Manager, CodeConnections, or Kubernetes Secrets.

> For AWS services (ECR for Helm charts, CodeConnections, and CodeCommit), you can reference them directly in Application resources without creating a Repository.

Argo CD looks for Kubernetes secrets in the `argocd` namespace with the label `argocd.argoproj.io/secret-type=repository`.

If we try to access a private repository without proper credentials we get this error:

- For HTTP: ComparisonError
  Failed to load target state: failed to generate manifest for source 1 of 1: rpc error: code = Unknown desc = failed to list refs: authentication required: Repository not found.
- For SSH: ComparisonError
  Failed to load target state: failed to generate manifest for source 1 of 1: rpc error: code = Unknown desc = failed to list refs: error creating SSH agent: "SSH agent requested but SSH_AUTH_SOCK not-specified"

### HTTPS with username and access token

https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/#access-token

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

At GitHub, navigate to Settings → Developer settings → Personal access tokens → Fine-grained tokens. Click "Generate new token".
Give it a name. Set an expiration date. At "Repository access" choose "Only select repositories", then select your repository.
At "Permissions", click "+ Add permissions" and select "Contents" with Access "Read-only".
Then click "Generate token" and copy the generated token.

Once we have the token, you can add the repository using the CLI or the UI.

1. Using the CLI ([docs](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_repo_add/)):

```shell
argocd repo add <repository_url> --username <username> --password <token>
```

We can add ` --type git`, but it's not necessary since it's the default.

2. Using the UI, go to Settings → Repositories, click "+ Connect Repo" and set:

- Connection method: VIA HTTP/HTTPS
- Type: git
- Repository URL: `https://github.com/user/repo.git`
- Username: the GitHub username
- Password: the generated token

After creating the repository, Argo CD creates a new secret. You can see it with `kubectl get secret -n argocd` and `kubectl describe secret <secret_name> -n argocd`. It has a name like 'repo-1699345013' and 4 data (password, type, url and username). It has a label `argocd.argoproj.io/secret-type=repository`.

You could also create the secret manually with:

```shell
kubectl create secret generic <secret_name> -n argocd \
  --from-literal type=git \
  --from-literal url=<repository_url> \
  --from-literal username=<username> \
  --from-literal password=<token> \
  --type Opaque
```

Then you must add the label:

```shell
kubectl label secret <secret_name> -n argocd argocd.argoproj.io/secret-type=repository
```

### SSH using deploy keys

:::important
GitHub recommends using [GitHub Apps](https://docs.github.com/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps) instead for fine grained control over repositories and [enhanced security](https://docs.github.com/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app#github-apps-offer-enhanced-security).

See https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/#github-app-credential
:::

The URL starts with `git@` or `ssh://` rather than `https://`.

Advantages of SSH over HTTPS:

- Not tied to an individual's user account. With HTTPS username + token, authentication is tied to your GitHub user account. If you leave the company and your account is removed from the organization or deactivated, Argo CD will lose access to the repository.
- Tokens expire, but SSH keys do not, so there's no need to update them.

Generate a new SSH key pair with `ssh-keygen -t ed25519 -C "Argo CD deploy key" -f argocd_deploy_key`. This creates two files: a private key (`argocd_deploy_key`) and a public key (`argocd_deploy_key.pub`). Go to the GitHub _repository settings_ (not the user settings!) → Deploy keys and click "Add deploy key". Give it a name and paste the public key content. Do _not_ allow write access. Then add the private key to Argo CD using the CLI or the UI.

You can add the repository using the CLI with:

```shell
argocd repo add git@github.com:user/repo.git --ssh-private-key-path path/to/argocd_deploy_key
```

And also using the UI. Go to the Argo CD Settings → Repositories, click "+ Connect Repo" and set:

- Connection method: VIA SSH
- Repository URL: `git@github.com:user/repo.git`
- SSH private key data: paste the content of the private key (`-----BEGIN OPENSSH PRIVATE KEY-----`...)

## CLI

Command reference - https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/

Run `argocd`, `argocd -h` or `argocd --help` to see the available commands.
To see help for a specific command, run `argocd <command> [subcommand] -h` or `argocd <command> [subcommand] --help`, for example `argocd app -h` or `argocd app create -h`.

Install

- https://argo-cd.readthedocs.io/en/stable/cli_installation/
- Install with brew: `brew install argocd` - Formulae: https://formulae.brew.sh/formula/argocd#default
- You can also download the binary from the [GitHub releases page](https://github.com/argoproj/argo-cd/releases) (arm64 for Apple Silicon) and move it to `/usr/local/bin`

```shell
argocd version
```

[context](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_context/)

```shell
argocd context
# Set context
argocd context <context>
# Delete context
argocd context <context> --delete
```

[login](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_login/)

```shell
# If using an Ingress
argocd login <ARGOCD_SERVER_URL> --username admin [--password <password>]

# If using port forwarding
# You need to run `kubectl port-forward service/argocd-server -n argocd 8080:443` first
argocd login localhost:8080 --username admin --insecure [--password <password>]

# If using NodePort
# Get the NODE_IP with `kubectl get nodes -o wide`
# Get the NODE_PORT with `kubectl get svc argocd-server -n argocd`
argocd login <NODE_IP>:<NODE_PORT> --username admin --insecure [--password <password>]

# We can provide a name and it will update the context name, otherwise the context name
# is the same as the server URL. Use `argocd context` to see the context name.
argocd login <ARGOCD_SERVER_URL> --username admin --name <context_name> [--password <password>]
# Context '<context_name>' updated
```

Once logged in you can do:

```shell
argocd cluster list
argocd proj list
argocd app list
argocd app get <app>
```

[Create app](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_app_create/):

```shell
argocd app create demo --repo https://github.com/user/repo.git --path path/to/manifests --dest-server https://kubernetes.default.svc --dest-namespace default [--project <project>]
```

You can get the destination server with `argocd cluster list`.

Once created, you can see it with `argocd app list` and `argocd app get <app>`.

[App operations](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_app/):

```shell
argocd app list
argocd app get <app>
argocd app diff <app>
argocd app sync <app> # Apply the manifests with `kubectl apply`
# After doing a sync, run `argocd app get <app>` to see the updated status
# If the sync was successful, the status should be `Synced` and `Healthy`
argocd app set <app> --sync-policy automated
argocd app delete <app>
```

[Create project](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_proj_create/):

```shell
argocd proj create <project_name> --description <description> --dest <server>,<namespace> --src <repo_url>
# Example:
argocd proj create demo --description 'Demo project for testing' --dest https://kubernetes.default.svc,'*' --src https://github.com/user/repo --allow-cluster-resource '*'/'*' --allow-namespaced-resource '*'/Pod --allow-namespaced-resource '*'/Deployment --allow-namespaced-resource '*'/ReplicaSet --allow-namespaced-resource '*'/Service
```

[Project operations](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_proj/):

```shell
argocd proj list
argocd proj get <project>
argocd proj delete <project>
```

## Learn

Argo CD: Up and Running - https://www.oreilly.com/library/view/argo-cd-up/9781098141998/

https://www.packtpub.com/en-es/product/argo-cd-for-the-absolute-beginners-hands-on-devops-9781806025510 - https://github.com/PacktPublishing/Argo-CD-for-the-Absolute-Beginners---Hands-On-DevOps - https://github.com/yogeshraheja/Argo-CD-for-the-Absolute-Beginners - https://github.com/yogeshraheja/Argo-CD-Capstone-Project

https://www.packtpub.com/en-es/product/gitops-in-practice-with-argo-cd-and-argo-rollouts-the-complete-guide-9781807302252

- https://github.com/PacktPublishing/GitOps-in-Practice-with-Argo-CD-and-Argo-Rollouts-The-Complete-Guide
- https://github.com/lm-academy/argocd-course
- https://github.com/lm-academy/argo-rollouts-course
- https://github.com/lm-academy/argocd-example-apps-labs
- https://github.com/lm-academy/argocd-example-apps

https://developers.redhat.com/courses/gitops/getting-started-argocd-and-openshift-gitops-operator

https://developers.redhat.com/devnation/devops-gitops

https://training.linuxfoundation.org/training/devops-and-workflow-management-with-argo-lfs256/

https://kodekloud.com/courses/argocd

https://leanpub.com/gitops-argocd

https://github.com/aws-ia/terraform-aws-eks-blueprints/tree/main/patterns/gitops/getting-started-argocd

https://codefresh.io/learn/argo-cd/

- https://learning.octopus.com/course/gitops-fundamentals
- https://learning.octopus.com/course/gitops-scale
- https://learning.octopus.com/course/gitops-enterprise

## Self managed Argo CD

https://medium.com/@jojoooo/deploy-infra-stack-using-self-managed-argocd-with-cert-manager-externaldns-external-secrets-op-640fe8c1587b

https://www.pimwiddershoven.nl/entry/building-self-managing-argocd-cluster/

## VS Flux

https://www.linkedin.com/posts/vtmocanu_wanted-to-test-out-flux-and-the-new-web-ui-activity-7432062173067218944-DLAM/

> After watching Scott Rosenberg being vehement so many times that ArgoCD is a bad implementation while Flux is the right way to do GitOps, I finally gave in and had to try it.
>
> What sold me:
>
> - Flux actually reconciles. ArgoCD gives up on failed syncs and waits. Flux keeps retrying until it converges. That's how GitOps > should work.
> - Helm charts are actual Helm releases. No more helm template + kubectl apply behind the scenes.
> - Proper dependsOn instead of sync waves. Explicit dependency graphs instead of numbering annotations and hoping for the best.
> - Runs as lightweight controllers, not a monolithic server with its own API, Redis, and Dex.
>
> Wrote about the full migration — the why, the how, and what I learned: https://hai.wxs.ro/migrations/argocd-to-flux/

Comparison with Flux - FluxCD: Why the GitOps Pioneer Remains Its Future - https://rawkode.academy/read/fluxcd-the-inevitable-choice/
