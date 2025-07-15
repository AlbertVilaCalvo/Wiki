---
title: Azure
---

AWS to Azure services comparison - https://learn.microsoft.com/en-us/azure/architecture/aws-professional/services

Microsoft Azure in Plain English - https://web.archive.org/web/20190321175020/https://www.expeditedssl.com/azure-in-plain-english - https://news.ycombinator.com/item?id=13442597

## CLI

https://learn.microsoft.com/en-us/cli/azure

```shell
az --version
```

```shell
az login
```

This opens the browser to sign in. Then you need to select a subscription.

List subscriptions:

```shell
az account list
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

## AKS

https://learn.microsoft.com/en-us/azure/aks/

Authenticate to the cluster:

```shell
az aks get-credentials --resource-group <resource-group> --name <cluster> --overwrite-existing
```

You can also get this command at the console (click "Connect"). Credentials are saved at `.kube/config`. Doing `kubectl config current-context` should print the cluster name.

Allow a cluster to get images from an Azure container registry ([docs](https://learn.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest#az-aks-update)):

```shell
az aks update --resource-group <resource-group> --name <cluster> --attach-acr <registry>
```
