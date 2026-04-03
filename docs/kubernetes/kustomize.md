---
title: Kustomize
---

https://kustomize.io

https://github.com/kubernetes-sigs/kustomize

https://www.eksworkshop.com/docs/introduction/kustomize/

Kustomization resource schema - https://www.schemastore.org/kustomization.json

Tutorial

- https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/
- https://kubectl.docs.kubernetes.io/guides/introduction/kustomize/

It's like `make`, in that what it does is declared in a file, and it's like `sed`, in that it emits edited text.

Examples:

- https://github.com/kubernetes-sigs/kustomize/tree/master/examples

Install it with Brew: `brew install kustomize`

Use `kubectl kustomize` to render the final output of an overlay without applying it.

```shell
# Render the dev overlay
kubectl kustomize server/kubernetes/overlays/dev

# Render the prod overlay
kubectl kustomize server/kubernetes/overlays/prod
```

Save the rendered output to a file:

```shell
kubectl kustomize server/kubernetes/overlays/dev > dev-manifest.yaml
```

Generate a ConfigMap from a file:

```yaml title="kustomization.yaml"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

configMapGenerator:
  - name: my-config
    behavior: create
    literals:
      - NODE_ENV=production
      - DB_NAME=app_dev

generatorOptions:
  disableNameSuffixHash: true
```
