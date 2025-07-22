---
title: Azure
---

AWS to Azure services comparison - https://learn.microsoft.com/en-us/azure/architecture/aws-professional/services

Microsoft Azure in Plain English - https://web.archive.org/web/20190321175020/https://www.expeditedssl.com/azure-in-plain-english - https://news.ycombinator.com/item?id=13442597

## CLI

https://learn.microsoft.com/en-us/cli/azure

```shell
az --help
az <command> --help
az <command> <subcommand> --help
```

```shell
az --version
```

### Output formats

```shell
az account list
az account list -o table
az account list --output table
az account list --output tsv
az account list --output yaml
```

### Query

https://learn.microsoft.com/en-us/cli/azure/use-azure-cli-successfully-query?view=azure-cli-latest&tabs=examples%2Cbash

```shell
az account list-locations --query "[].displayName"
az account list-locations --query "[5]" # 5th item
az account list-locations --query "[-1]" # last item
az account list-locations --query "[5].displayName"
az account show --query "{tenantId:tenantId,subscriptionId:id}"
```

### Account

```shell
az login
```

This opens the browser to sign in. Then you need to select a subscription.

List subscriptions:

```shell
az account list
az account list -o table
```

See which subscription you are using:

```shell
az account show
```

It will have `"isDefault": true`.

Change active subscription:

```shell
az account set --subscription <subscription-id>
```

List regions:

```shell
az account list-locations -o table
az account list-locations -o table | grep Europe
```

### Resource Group

```shell
az group create --name <name> --location <region>
```

```shell
az group list --output table
```

### Resource

```shell
az resource list
az resource list --output table
az resource list --resource-group <resource-group> --output table
```

## ACR

Get registry details (name, resource group, location, URL etc.):

```shell
az acr show --name <registry-name> --output table
```

Get username and password to authenticate to the registry (required for `docker login`):

```shell
az acr credential show --name <registry-name> --output table
```

Show tags for a repository:

```shell
az acr repository show-tags --name <registry-name> --repository <repository-name> --output tsv
```

`<repository-name>` is the image name.

## AKS

https://learn.microsoft.com/en-us/azure/aks/

The quick guide to creating a production Kubernetes cluster - https://www.codecapers.com.au/kub-cluster-quick-2/

Authenticate to the cluster:

```shell
az aks get-credentials --resource-group <resource-group> --name <cluster> [--overwrite-existing]
```

You can also get this command at the console (click "Connect"). Credentials are saved at `.kube/config`. After running the command, doing `kubectl config current-context` should print the cluster name. Using `--overwrite-existing` is required if, for example, we've recreated the cluster with Terraform and we had previously saved the credentials.

Allow a cluster to get images from an Azure container registry ([docs](https://learn.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-update)):

```shell
az aks update --resource-group <resource-group> --name <cluster> --attach-acr <registry>
```

Validate that a cluster can pull images from a registry ([source](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-kubernetes/extensions/cannot-pull-image-from-acr-to-aks-cluster)):

```shell
az aks check-acr --resource-group <resource-group> --name <cluster> --acr <registry-name>.azurecr.io
```

If it works, it says "Your cluster can pull images from xyz.azurecr.io!".

Get Kubernetes versions of a region:

```shell
az aks get-versions --location <region> --output table
```

### Deployment process

```shell
# Authenticate to the cluster. This modifies `.kube/config`
az aks get-credentials --resource-group <resource-group> --name <cluster> [--overwrite-existing]

# Validate that we are using the AKS cluster (should print the cluster name)
kubectl config current-context

# Build and tag the image
# When building on an ARM Mac (Apple Silicon), you need to add --platform linux/amd64,
# otherwise you get the error ErrImagePull (no match for platform in manifest: not found,
# failed to pull and unpack image xyz) when doing 'kubectl apply'.
docker build -t <name>:<version> --platform linux/amd64 --file Dockerfile-prod .
docker tag <name>:<version> <registry-name>.azurecr.io/<name>:<version>

# Authenticate to the registry
# Get the username + password
az acr credential show --name <registry-name> -o table
# Get the registry URL (<registry-name>.azurecr.io)
az acr show --name <registry-name> -o table
docker login <registry-url>

# Push the image
docker push <registry-url>/<image>:<version>

# Deploy. Set 'image' to <registry-name>.azurecr.io/<name>:<version>
kubectl apply -f deployment.yaml
```
