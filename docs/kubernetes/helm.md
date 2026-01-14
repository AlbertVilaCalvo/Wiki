---
title: Helm
---

https://helm.sh

https://artifacthub.io

- Charts: https://artifacthub.io/packages/search?kind=0
  - AWS: https://artifacthub.io/packages/search?page=1&repo=aws
- Plugins: https://artifacthub.io/packages/search?kind=6

EKS Charts - https://github.com/aws/eks-charts

https://helmfile.readthedocs.io - https://github.com/helmfile/helmfile

https://hypper.io

https://github.com/bmuschko/ckad-crash-course/tree/master/exercises/14-helm-consume-chart

https://github.com/bmuschko/ckad-crash-course/tree/master/exercises/15-helm-build-chart

https://github.com/arttor/helmify - Creates Helm chart from Kubernetes yaml

See comments at https://news.ycombinator.com/item?id=45902604 about using CUE or Terraform

## Commands

https://docs.helm.sh/docs/helm/

Cheatsheet - https://helm.sh/docs/intro/cheatsheet/

To get **help** on a command just run the command, for example `helm get`. Adding `-h` or `--help` also works, eg `helm get -h`.

```shell
helm version
helm version --template='{{ .Version }}{{ "\n" }}'
```

Add a repository and list its charts:

```shell
helm repo add eks https://aws.github.io/eks-charts
helm repo list
# NAME	URL
# eks 	https://aws.github.io/eks-charts
helm search repo eks
```

Install a chart release:

```shell
# Get the latest list of charts
helm repo update

helm install <release> <chart> [-n <namespace>] [--create-namespace]
# Install with custom values
helm install <release> <chart> -f <values-file.yaml> [-n <namespace>] [--create-namespace]
helm install <release> <chart> --set <key1>=<value1> --set <key2>=<value2> [-n <namespace>] [--create-namespace]
helm install <release> <chart> --set <key1>=<value1>,<key2>=<value2> [-n <namespace>] [--create-namespace]

# Installing can take some time. Check the installation status
helm status -n <namespace> <release>

# Verify installation (list releases)
helm list # Current namespace
helm list -A # --all-namespaces
helm list -n <namespace>

# Check the deployments created by the release
kubectl get deployment -n <namespace> -l app.kubernetes.io/instance=<release> -o wide
```

Upgrade a release:

```shell
helm upgrade <release> <chart> [-n <namespace>]
# Upgrade with custom values
helm upgrade <release> <chart> -f <values-file.yaml> [-n <namespace>]
helm upgrade <release> <chart> --set <key1>=<value1>,<key2>=<value2> [-n <namespace>]
```

View release history (revisions):

```shell
helm history <release> -n <namespace>
```

Roll back a release to a previous revision (revision is a number, eg 1, 2 or 3):

```shell
helm rollback <release> <revision-number> -n <namespace>
```

If we omit the revision number or use 0, it will roll back to the previous revision. A rollback creates a new revision.

Uninstall a release:

```shell
helm uninstall <release> -n <namespace>
helm uninstall <release> -n <namespace> --keep-history # Keep release history (secrets/configmaps)

# If you created a namespace during install, you may want to delete it too
kubectl delete namespace <namespace>

# Verify uninstall with list releases (should not appear)
helm list -n <namespace>
helm list --uninstalled # Only shows releases that were uninstalled with --keep-history
```

Search public charts in [Artifact Hub](https://artifacthub.io/):

```shell
# Lists *all* available charts (floods the terminal)
helm search hub
helm search hub --list-repo-url

# Search for specific keyword
helm search hub <keyword>
helm search hub <keyword> --list-repo-url
# For example
helm search hub eks
helm search hub nginx --list-repo-url
```

Search charts in added repositories:

```shell
helm search repo eks
```

Show chart details:

```shell
helm show chart eks/aws-calico
```

Show values you can override:

```shell
helm show values eks/aws-calico
```

Get user supplied values (during install/upgrade):

```shell
helm get values -n <namespace> <release>
helm get values -n <namespace> <release> --all # Include default values (computed)
```

Show secrets (where releases are stored):

```shell
# You can use secret or secrets
kubectl get secret -n <namespace>
kubectl get secrets -A -l owner=helm
kubectl describe secret -n <namespace>
kubectl describe secret -n <namespace> <secret-name>
```

Extract data from a secret (it's a JSON, Base64-encoded twice and gzipped):

```shell
kubectl get secret <secret-name> -n <namespace> -o jsonpath="{.data.release}" | base64 --decode | base64 --decode | gunzip | jq
kubectl get secret <secret-name> -n <namespace> -o jsonpath="{.data.release}" | base64 --decode | base64 --decode | gunzip | jq > secret.json
# Get the chart manifest (YAML)
kubectl get secret <secret-name> -n <namespace> -o jsonpath="{.data.release}" | base64 --decode | base64 --decode | gunzip | jq .manifest -r > secret.yaml
```

## How it works

https://docs.helm.sh/docs/intro/using_helm/

A chart is a package (an archive file, `.tgz`) that contains all of the Kubernetes resource definitions necessary to run an application, tool or service inside a Kubernetes cluster.

A release is an instance of a chart running in a Kubernetes cluster. You can have multiple releases with the same name as long they are stored in different namespaces.

The state of a Helm release is stored in the cluster as a Secret or ConfigMap in the namespace where the chart is deployed.
For example, if we [install the Load Balancer Controller using Helm](./eks.md#install-using-helm-and-irsa) and we do `kubectl describe secret -n kube-system`, we get two secrets:

```
Name:         aws-load-balancer-tls
Namespace:    kube-system
Labels:       app.kubernetes.io/instance=aws-load-balancer-controller
              app.kubernetes.io/managed-by=Helm
              app.kubernetes.io/name=aws-load-balancer-controller
              app.kubernetes.io/version=v2.14.1
              helm.sh/chart=aws-load-balancer-controller-1.14.1
Annotations:  meta.helm.sh/release-name: aws-load-balancer-controller
              meta.helm.sh/release-namespace: kube-system

Type:  kubernetes.io/tls

Data
====
ca.crt:   1188 bytes
tls.crt:  1428 bytes
tls.key:  1675 bytes


Name:         sh.helm.release.v1.aws-load-balancer-controller.v1
Namespace:    kube-system
Labels:       modifiedAt=1762887786
              name=aws-load-balancer-controller
              owner=helm
              status=deployed
              version=1
Annotations:  <none>

Type:  helm.sh/release.v1

Data
====
release:  79768 bytes
```

## Create a chart

Create a directory with the chart files:

```shell
helm create <chart-name>
```

Package the chart into a versioned chart archive file (`.tgz`):

```shell
helm package <chart-directory>
```

Lint the chart to verify it is valid:

```shell
helm lint <chart-directory>
```

## Install

https://docs.helm.sh/docs/intro/install

https://docs.aws.amazon.com/eks/latest/userguide/helm.html

Install using Homebrew:

```shell
brew install helm
```

https://formulae.brew.sh/formula/helm#default

## Releases

### Helm 3

https://github.com/helm/helm/releases/tag/v3.0.0

https://helm.sh/docs/v3/faq/changes_since_helm2/

https://helm.sh/docs/v3/topics/v2_v3_migration/

Helm 2 used a server-side component called Tiller to manage releases inside the Kubernetes cluster.
Helm 3 is client-side only and does not require a cluster component.

Uses a new version of Helm Chart format (v2).

### Helm 4

https://github.com/helm/helm/releases/tag/v4.0.0

https://news.ycombinator.com/item?id=45902604

https://helm.sh/docs/overview/

## Terraform Helm Provider

https://www.terraform.io/docs/providers/helm/

https://github.com/hashicorp/terraform-provider-helm

From https://news.ycombinator.com/item?id=45902604

> It might feels natural to try and use terraform to deploy kubernetes resources since you’ve likely configured the cluster using it, but the helm/kubeneters/kubectl providers are limited by terraform’s way of working. So whilst the providers try to marry the two when deploying anything complex it generally ends up feels like a hack and you lose a lot of the benefits of using terraform in the first place.
>
> In my experience, it’s best to bootstrap ArgoCD/flux, rbac and cloud permissions those services need in Terraform and then move on to do everything else can via Kustomize via gitop. This keeps everything sane and relatively easy to debug on the fly, using the right tool for the job.
