---
title: Docker
---

https://www.docker.com

https://hub.docker.com - Pre-built container image registry


## Container

Container = App Code + Runtime + Libraries/Dependencies + Configuration Files

Containers provide consistency between environments (eg local development machine vs production cloud). They fix "It works on my machine" problems.

What is a container? https://www.docker.com/resources/what-container

What are Linux containers? https://www.redhat.com/en/topics/containers

Containers are lightweight and more efficient than VMs, since they share the same OS kernel.


## Container engine/runtime

Examples:
- https://containerd.io
- https://www.docker.com/products/container-runtime


## CLI

Start:
```bash
docker-compose -f docker-compose.yml up
```
Or:
```bash
docker-compose up -d
```

Connect to a container:
```bash
docker exec -ti sense_app bash
```

Shut down:
```bash
docker-compose down
```


## Dockerfile

To create a container image.

> A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image.

Reference: https://docs.docker.com/engine/reference/builder

Examples: https://github.com/jessfraz/dockerfiles

Linter: https://github.com/hadolint/hadolint

Best practices:
- https://docs.docker.com/develop/develop-images/dockerfile_best-practices
- https://github.com/hexops/dockerfile


## docker-compose

Commands: https://docs.docker.com/compose/reference

Oh My Zsh plugin: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose
