---
title: Docker
---

https://www.docker.com

https://hub.docker.com - Pre-built container image registry

https://github.com/veggiemonk/awesome-docker

Just say no to :latest - https://news.ycombinator.com/item?id=30576443

Newsletter - https://www.docker.com/newsletter-subscription/

Dockerfile linters:

- https://github.com/hadolint/hadolint
- https://www.checkov.io - https://github.com/bridgecrewio/checkov

Colima - Docker Desktop alternative - https://github.com/abiosoft/colima - See Thoughworks Technology Radar 27:

> is becoming a popular open alternative to Docker Desktop. It provisions the Docker container
> run time in a Lima VM, configures the Docker CLI on macOS and handles port-forwarding and
> volume mounts. Colima uses containerd as its run time, which is also the run time on most managed
> Platform - improving the important dev-prod parity.

https://github.com/jesseduffield/lazydocker

https://frontendmasters.com/courses/complete-intro-containers-v2/

https://depot.dev

## Cheatsheets

- https://github.com/wsargent/docker-cheat-sheet
- https://docs.docker.com/get-started/docker_cheatsheet.pdf
- https://github.com/LeCoupa/awesome-cheatsheets/blob/master/tools/docker.sh
- https://dockerlabs.collabnix.com/docker/cheatsheet/
- https://people.redhat.com/tmichett/do180/docker_cheatsheet_r4v2.pdf

## Tools

[Stop Managing Docker Like It’s 2020: Three Tools That Changed Everything](https://aws.plainenglish.io/stop-managing-docker-like-its-2020-three-tools-that-changed-everything-29b33b505593) → Recommends LazyDocker, Dive, and WatchTower

https://github.com/jesseduffield/lazydocker

https://github.com/wagoodman/dive

https://github.com/containrrr/watchtower

https://github.com/GoogleContainerTools/container-diff

https://github.com/aquasecurity/trivy - https://trivy.dev/latest/docs/target/container_image/

## Learn

https://docs.docker.com/get-started/resources

How to Get Started with Docker - https://www.youtube.com/watch?v=iqqDU2crIEQ

https://labs.play-with-docker.com

https://leanpub.com/erase-una-vez-docker

https://www.amazon.com/Getting-Started-Docker-Nigel-Poulton/dp/1916585302/

https://learn.digitalcloud.training/course/docker-for-beginners

https://learn.cantrill.io/p/docker-fundamentals

## Best practices

https://nickjanetakis.com/blog/best-practices-around-production-ready-web-apps-with-docker-compose

https://testdriven.io/blog/docker-best-practices/

## Advantages

Containers provide consistency between environments (eg local development machine vs production cloud). They fix "It works on my machine" problems.

Avoid issues due to different programming language or database versions. Avoid having to install and configure specific development environments per project. On your local machine, each project's environment is isolated.

You can run different versions of the same app locally, side-by-side, each with a different MySQL version for example.

No need to install an OS (eg Linux/Windows), thus no need to patch/upgrade it when there are security vulnerabilities.

When you want to deploy new code you simply create a new image and deploy it; no need to individually configure/patch/update each server's app.

Can be easily replicated, ie deploy multiple copies.

Containers are ephemeral, short-lived. If they die we just replace them.

Phases:

1. Build Image (package the app)
2. Ship Image (to the cloud runtimes or local machine)
3. Run Image (execute the app)

## What is a container?

Container = App Code + Runtime + Libraries/Dependencies/Binaries + Configuration Files

What is a container? https://www.docker.com/resources/what-container

What are Linux containers? https://www.redhat.com/en/topics/containers

Why we have containers - https://jessitron.com/2022/08/07/why-we-have-containers

> Containers let us write code (a `Dockerfile`) to describe the computer an app needs to run on. Choose an operating system, install any runtimes and libraries needed, and populate the file system. This reduces many of the app’s expectations to one: a container runtime.

## Containers vs virtual machines

From https://www.docker.com/resources/what-container/

- Containers
  - All containers share the same OS kernel (host OS), running in isolated processes in user space
  - Abstraction at the app layer that packages code and dependencies together
  - Virtualize the OS, not the hardware
- Virtual Machines
  - Each VM has a complete copy of the operating system (guest OS)
  - Abstraction (virtualization) of physical hardware turning one server into many servers
  - Provide complete isolation from the host operating system and other VMs

> The key differentiator between containers and virtual machines is that virtual machines virtualize an entire machine down to the hardware layers and containers only virtualize software layers above the operating system level. [source](https://www.atlassian.com/microservices/cloud-computing/containers-vs-vms)

Containers are lightweight and more efficient, and they can boot faster. They are ephemeral/disposable.

You can run multiple containers in parallel, whereas to run multiple virtual machines in parallel you need a beefy host machine.

Also containers are easy to share amongst team members, and easy to modify and replicate the modifications amongst team members, whereas when a virtual machine is used at the same time it's difficult to share changes done by one person to the rest of the team.

Each VM needs to have an OS installed, and when there are security vulnerabilities we need to upgrade/patch the OS.

## Container engine/runtime

Similar role as hypervisors with virtual machines.

Examples:

- https://containerd.io
- https://www.docker.com/products/container-runtime

## Container vs image

From https://docs.docker.com/get-started/overview

- Image: read-only (ie immutable) template with instructions for creating a Docker container.
- Container: a runnable instance of an image. You can modify the contents of its filesystem.

Multiple instances of the same image can be created.

From https://docs.docker.com/get-started:

> What is a container?
>
> A container is a sandboxed process on your machine that is isolated from all other processes on the host machine. You can create, start, stop, move, or delete a container.
>
> What is a container image?
>
> When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image. Since the image contains the container’s filesystem, it must contain everything needed to run an application - all dependencies, configuration, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

From https://docs.docker.com/get-started/docker_cheatsheet.pdf

> Images are a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings.
>
> A container is a runtime instance of a docker image. A container will always run the same, regardless of the infrastructure. Containers isolate software from its environment and ensure that it works uniformly despite differences for instance between development and staging.

## Workflow

:::tip Local Workflow
**Dockerfile ——`docker build`——> Image ——`docker run`——> Container**

:::

:::tip Container Registry Workflow

**Dockerfile ——`docker build`——> Image ——`docker push`, `docker pull` (optional) and `docker run`——> Container**

1. Build image (package the app following the instructions in the `Dockerfile`).
2. Publish image to a registry.
3. Run image (run the app in a container).

:::

| Image        | Container | Process |
| ------------ | --------- | ------- |
| create →     |           |         |
|              | start →   |         |
|              |           | execute |
|              | stop ←    |         |
| remove ←     |           |         |
|              | run →→←   |         |
| run -rm →→←← |           |         |

[source](https://stackoverflow.com/a/61554030/4034572)

`run` vs `start`: https://stackoverflow.com/questions/34782678/difference-between-running-and-starting-a-docker-container

> run = create + start

> You can create N clones of the same image.

## CLI

List commands: `docker help`

Command help: `docker <command> --help`, eg `docker run --help`

Display system-wide information: `docker info`

Version: `docker version`

### Images

[Build](https://docs.docker.com/reference/cli/docker/buildx/build/) an image from a `Dockerfile`:

```shell
docker build -t <tagname> .
docker build --tag <tagname> .
```

[List](https://docs.docker.com/reference/cli/docker/image/ls/) local images:

```shell
docker images
docker image ls
docker image list

# Filter (-f, --filter)
docker images --filter reference=myapp
docker images --filter "dangling=true"

# Only show image ids (-q, --quiet)
docker images -q # 553707c4889c
# Useful for scripts, for example:
docker rmi $(docker images -f "dangling=true" -q)
docker stop $(docker ps -q)
```

[Remove](https://docs.docker.com/reference/cli/docker/image/rm/) image:

```shell
docker image rm <image>
docker image remove <image>
docker rmi <image>
```

You cannot remove an image of a running container unless you use the `-f`/`--force` option. To delete the image without using `--force`, run `docker stop <container>` and `docker rm <container>` first. Similarly, you cannot remove an image that has one or more tags referencing it unless you use the `--force` option (you get the error "image is referenced in multiple repositories"). In this case, to delete the image without using `--force`, remove the image with `docker rmi repository/image-name:tag`.

[Prune](https://docs.docker.com/reference/cli/docker/image/prune/) (remove) unused images:

```shell
docker image prune # Remove all dangling images
docker image prune --all # Remove all unused images, not just dangling ones
```

### Containers

[Create](https://docs.docker.com/reference/cli/docker/container/create/) a new container form an image: `docker create`

**run = create + start**

https://docs.docker.com/reference/cli/docker/container/run/

> Create and run a new container from an image

Run a container:

```shell
docker run <image>
docker run -d <image> # Run container in background (--detach)

# Set environment variables (-e, --env, --env-file)
docker run -e <name>=<value> <image>
docker run --env PORT=3000 <image>

# Bind, publish or expose port (-p, --expose)
docker run -p <host-port>:<container-port> <image>
docker run -p 3000:3000 <image>
docker run -p 127.0.0.1:80:8080/tcp <image>
```

`docker run` options:

- `-d`/`--detach`: run in the background, this way we can keep using the terminal session
- `--name`: assign a name to reference the container, eg `--name myapp`
- `-e`/`--env`: pass environment variables, eg `-e SOME_VAR=xyz`
- `-p`/`--publish`: publish a container's port to the host, eg `-p 5433:5432` or `-p 80:8080`
- `-rm`: automatically remove the container when it exits

[List](https://docs.docker.com/reference/cli/docker/container/ls/) running containers:

```shell
docker container ls
docker container list
docker ps

# List all containers (running and stopped)
docker container ls -a
docker ps -a
docker ps --all
```

[Start](https://docs.docker.com/reference/cli/docker/container/start/) a stopped container: `docker start <container-id>` or `docker start <container-name>`

[Stop](https://docs.docker.com/reference/cli/docker/container/stop/) a running container: `docker stop <container-id>` or `docker stop <container-name>` (get the container id/name with `docker ps`)

Stop all running containers: `docker stop $(docker ps -q)`

[Remove](https://docs.docker.com/reference/cli/docker/container/rm/) a stopped container: `docker rm <container>` or `docker container rm <container>`

Remove all containers: `docker rm $(docker ps -a -q)`

[Execute](https://docs.docker.com/reference/cli/docker/container/exec/) a command in a running container:

```shell
docker exec <container> <command>
docker container exec <container> <command>

# Open a shell inside a running container
docker exec -it <container> sh
# Run 'exit' to quit
```

Display container [logs](https://docs.docker.com/reference/cli/docker/container/logs/):

```shell
docker logs -f <container>
docker container logs -f <container>
```

### Registry

Docker Hub, ECR, Azure Container Registry etc.

[See this tutorial](https://www.youtube.com/watch?v=iqqDU2crIEQ)

[Login](https://docs.docker.com/reference/cli/docker/login/) (authenticate) to a registry:

```shell
docker login --username <username> --password-stdin <registry-url>
```

[Pull](https://docs.docker.com/reference/cli/docker/image/pull/) image from registry: `docker pull alpine:latest`

[Tag](https://docs.docker.com/reference/cli/docker/image/tag/) an image:

```shell
docker tag <image> <registry-url>/<image-name>:<version>

# ECR
docker tag <image> <account_id>.dkr.ecr.<region>.amazonaws.com/<repository>:<version>

# Azure
docker tag <image> <repository>.azurecr.io/<image>:<version>
```

[Push](https://docs.docker.com/reference/cli/docker/image/push/) image to registry:

- If we are logged in Docker Desktop: `docker push <repo-name>:<tag-name>`
- If we are not logged in Docker Desktop: `docker push <DockerHub-username>/<repo-name>:<tag-name>`

### Dockerfile workflow

On a directory with a `Dockerfile`, run:

- Build: `docker build --tag <image-name> .`
  - Doing `docker images` (or `docker image ls`) should show the image now
- Run: `docker run <image-name> [-rm]`
  - Doing `docker ps` (if running) or `docker ps -a` (if stopped) should show the container and it's ID, name etc.
- Stop container: `docker container stop <container>` and `docker container rm <container>`
  - Afterwards use `docker start <container-id>` or `docker start <container-name>` to start it again
- Delete image: `docker image rm <image-id>` (get the id with `docker images` or `docker image ls`)

### docker-compose workflow

docker-compose up, down, stop and start difference - https://stackoverflow.com/questions/46428420/docker-compose-up-down-stop-start-difference

Start with [up](https://docs.docker.com/engine/reference/commandline/compose_up/):

```shell
docker-compose up -d
docker-compose -f docker-compose.yml up
```

Connect to a container (use `docker ps` to get the name or id):

```shell
docker exec -it <container-id> /bin/sh
docker exec -it <container-name> /bin/sh
```

This also works sometimes:

```shell
docker exec -it <container-id> bash
docker exec -it <container-name> bash
```

To exit run `exit`.

[Stop](https://docs.docker.com/engine/reference/commandline/compose_stop/) services:

```shell
docker-compose stop
```

Shut [down](https://docs.docker.com/engine/reference/commandline/compose_down/):

:::danger Can delete volumes

Stops containers and removes containers, networks, volumes, and images created by `up`.

:::

```shell
docker-compose down
```

### Pruning

https://docs.docker.com/config/pruning

https://docs.docker.com/engine/manage-resources/pruning

https://docs.docker.com/reference/cli/docker/system/prune/

```shell
docker system prune # prune everything except volumes
docker system prune --volumes --all
```

Remove dangling images (images with `<none>` in `docker image ls`):

- `docker image prune [-a]` - https://docs.docker.com/reference/cli/docker/image/prune/
- `docker images -q --filter "dangling=true" | xargs docker rmi` - from https://dockerlabs.collabnix.com/beginners/components/container-vs-image.html

https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes

## Dockerfile

Set of instructions (list of commands) to create a container image.

> A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image.

From https://docs.docker.com/get-started/overview

> You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

Reference: https://docs.docker.com/engine/reference/builder

Examples: https://github.com/jessfraz/dockerfiles

Linter: https://github.com/hadolint/hadolint

Best practices:

- https://docs.docker.com/develop/develop-images/dockerfile_best-practices
- https://github.com/hexops/dockerfile

### Node.js Dockerfile

[source](https://www.youtube.com/watch?v=iqqDU2crIEQ)

```shell
# Base image form hub.docker.com. A verified image that has Node.js, npm and yarn installed
FROM node:12.16.3

# Create the 'code' directory and use is as working directory, ie all following commands
# run in this directory
WORKDIR /code

# Set an environment variable. Will be accessible to any process running inside the image
ENV PORT 80

COPY package.json /code/package.json

RUN npm install

# Copy everything in our current local directory and we put it inside the image's 'code' directory
# Use the a .dockerignore file to exclude files and directories:
# https://docs.docker.com/engine/reference/builder/#dockerignore-file
COPY . /code

# Command run when the container starts
CMD [ "node", "src/server.js" ]
```

The complexity of writing an efficient NodeJS Docker image - https://www.specfy.io/blog/1-efficient-dockerfile-nodejs-in-7-steps

### Python Dockerfile

```shell
# Base image
FROM python:3.10

# Copy everything in the current dir to the 'app' dir of the filesystem of the container
COPY . /app

# Directory in which the next commands are run
WORKDIR /app

# Run shell commands (upgrade pip and install flask)
RUN pip install --upgrade pip
RUN pip install flask

# Set an environment variable
ENV FLASK_ENV=production

# App/executable that will run when the container is run from the image
ENTRYPOINT ["python", "app.py"]
```

### `COPY` vs `ADD`

https://stackoverflow.com/questions/24958140/what-is-the-difference-between-the-copy-and-add-commands-in-a-dockerfile

https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy

> `COPY` is preferred. . That’s because it’s more transparent than `ADD`. `COPY` only supports the basic copying of local files into the container, while `ADD` has some features (like local-only tar extraction and remote URL support) that are not immediately obvious. Consequently, the best use for `ADD` is local tar file auto-extraction into the image, as in `ADD rootfs.tar.xz /`.

https://docs.docker.com/engine/reference/builder/#add

https://docs.docker.com/engine/reference/builder/#copy

### `ARG` vs `ENV`

https://stackoverflow.com/questions/39597925/how-do-i-set-environment-variables-during-the-build-in-docker

### `FROM scratch`

No-op.

https://hub.docker.com/_/scratch

## Multi-stage builds

Optimize images of compiled languages (C, C++, Go, Rust...).

https://docs.docker.com/build/building/multi-stage/

Example: https://github.com/victorgrubio/blog-projects/blob/main/react-nginx-dockerization/frontend/Dockerfile - https://mentorcruise.com/blog/how-to-dockerize-a-react-app-and-deploy-it-easily/

## Volumes

Containers are started and stopped as required (ie they have a lifecycle). Volumes provide persistent data storage to containers, independent of its lifecycle. Volumes can be shared with many containers. They avoid increasing the container size.

## docker-compose

https://docs.docker.com/compose

Commands: https://docs.docker.com/compose/reference

Samples: https://github.com/docker/awesome-compose

Cheatsheet: https://collabnix.com/docker-compose-cheatsheet

Oh My Zsh plugin: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose

Docker Compose best practices for dev and prod: https://news.ycombinator.com/item?id=32484008 / https://prod.releasehub.com/blog/6-docker-compose-best-practices-for-dev-and-prod

Example from https://www.youtube.com/watch?v=iqqDU2crIEQ

```yml
version: '2'

services:
  web:
    build:
      context:
      dockerfile: Dockerfile
    container_name: web
    ports:
      - '8080:80'

  db:
    image: mongo:3.6.1
    container_name: db
    volumes:
      - mongodb:/data/db
      - mongodb_config:/data/configdb
    ports:
      - 27017:27017
    command: mongod

volumes:
  mongodb:
  mongodb_config:
```

## Docker Desktop

https://docs.docker.com/desktop

Docker.raw (macOS):

- https://apple.stackexchange.com/questions/391377/what-is-the-purpose-of-docker-raw-file-on-mac-os-catalina
- Location of Docker.raw in macOS: ~/Library/Containers/com.docker.docker/Data/vms/0/ - see https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/

From "Known issues" https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/known-issues:

> Some command line tools do not work when Rosetta 2 is not installed.
>
> - The old version 1.x of `docker-compose`. Use Compose V2 instead - type `docker compose`.
>
> We recommend running arm64 containers on Apple silicon machines whenever possible.

## Docker Desktop alternatives

Docker Desktop provides (see [What's included in Docker Desktop](https://docs.docker.com/desktop/) and [10 Docker Myths Debunked](https://www.docker.com/blog/docker-myths-debunked/)):

- Docker daemon (`dockerd`), Docker client (the `docker` CLI), Docker Compose, Docker Build (BuildKit)...
- [Hyperkit](https://github.com/moby/hyperkit) hypervisor on macOS
- Developer tools like Docker Scout, Docker Debug...
- Kubernetes
- Kubernetes CLI (`kubectl`)

https://arnon.me/2021/09/replace-docker-with-minikube

https://medium.com/rahasak/replace-docker-desktop-with-minikube-and-hyperkit-on-macos-783ce4fb39e3

https://medium.com/rahasak/switching-from-docker-desktop-to-podman-on-macos-m1-m2-arm64-cpu-7752c02453ec

> Unlike Docker, Podman uses the Linux kernel’s containerization features, which means that it does not require a separate daemon process to be running in the background. This can result in improved performance and reduced resource consumption.

See [How is Podman different from Docker?](https://stackoverflow.com/questions/70798261/how-is-podman-different-from-docker)

https://itnext.io/goodbye-docker-desktop-hello-minikube-3649f2a1c469

https://www.bytebase.com/blog/top-docker-desktop-alternatives/

https://orbstack.dev

- VS Docker Desktop: https://docs.orbstack.dev/compare/docker-desktop
- VS Colima: https://docs.orbstack.dev/compare/colima

https://podman-desktop.io

https://rancherdesktop.io

https://github.com/abiosoft/colima - CLI only, not GUI

A Docker CLI alternative can be installed with `brew install podman`.
