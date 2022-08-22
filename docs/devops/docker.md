---
title: Docker
---

https://www.docker.com

https://hub.docker.com - Pre-built container image registry

https://github.com/veggiemonk/awesome-docker

https://github.com/wsargent/docker-cheat-sheet

Just say no to :latest: https://news.ycombinator.com/item?id=30576443


## What is a container?

Container = App Code + Runtime + Libraries/Dependencies + Configuration Files

Containers provide consistency between environments (eg local development machine vs production cloud). They fix "It works on my machine" problems.

What is a container? https://www.docker.com/resources/what-container

What are Linux containers? https://www.redhat.com/en/topics/containers

## Containers vs virtual machines

- Containers
  - All them share the same OS kernel (host OS)
  - Do not virtualize hardware, they run in isolated processes
- Virtual Machines
  - Each VM has a complete copy of the operating system (guest OS)
  - Abstraction of physical hardware

Thus, containers are lightweight and more efficient, and they can boot faster.

**Dockerfile --`docker build`--> Image --`docker run`--> Container**

## Container engine/runtime

Similar role as hypervisors with virtual machines.

Examples:

- https://containerd.io
- https://www.docker.com/products/container-runtime

## Container vs image

From https://docs.docker.com/get-started/overview

- Image: read-only (ie immutable) template with instructions for creating a Docker container.
- Container: a runnable instance of an image.

Multiple instances of the same image can be created.

From https://docs.docker.com/get-started:

> What is a container?
>
> A container is a sandboxed process on your machine that is isolated from all other processes on the host machine. You can create, start, stop, move, or delete a container.
>
> What is a container image?
>
> When running a container, it uses an isolated filesystem. This custom filesystem is provided by a container image. Since the image contains the container’s filesystem, it must contain everything needed to run an application - all dependencies, configuration, scripts, binaries, etc. The image also contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

## Docker Desktop

https://docs.docker.com/desktop

Docker.raw (macOS):

- https://apple.stackexchange.com/questions/391377/what-is-the-purpose-of-docker-raw-file-on-mac-os-catalina
- Location of Docker.raw in macOS: ~/Library/Containers/com.docker.docker/Data/vms/0/ - see https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/

## CLI

List commands: `docker help`

Command help: `docker <command> --help`, eg `docker run --help`

`docker info`

Version: `docker version`

List images: `docker image ls`

Stop image: `docker image stop <image-id>`

Remove image: `docker image rm <image-id>`

### `docker build`

https://docs.docker.com/engine/reference/commandline/build

Build an image from a Dockefile: `docker build`

`docker build --tag <tagname> .` o `docker build -t <tagname> .`

Create a new container form an image: `docker create`

Pull image from registry: `docker pull alpine:latest`

Push image to registry (Docker Hub):

- If we are logged in Docker Desktop: `docker push <repo-name>:<tag-name>`
- If we are not logged in Docker Desktop: `docker push <DockerHub-username>/<repo-name>:<tag-name>`

### `docker run`

https://docs.docker.com/engine/reference/commandline/run

Run a container: `docker run -d <image>`

`docker run` options:

- `-d`/`--detach`: run in the background, this way we can keep using the terminal session
- `--name`: assign a name to reference the container, eg `--name myapp`
- `-e`/`--env`: pass environment variables, eg `-e SOME_VAR=xyz`
- `-p`/`--publish`: publish a container's port to the host, eg `-p 5433:5432` or `-p 80:8080`
- `-rm`: automatically remove the container when it exits

List running containers: `docker ps`

List all containers: `docker ps --all` or `docker ps -a`

Stop a running container: `docker stop <container-id>` (get the `<container-id>` with `docker ps`)

Remove a container: `docker container rm <container-id>`

### Workflow

On a directory with a Dockerfile run:

- Build: `docker build --tag <imagename> .`
- Doing `docker images` (or `docker image ls`) should show the image
- Run: `docker run <imagename> -rm`
- Doing `docker ps` (if running) or `docker ps -a` (if stopped) should show the container and it's ID
- Stop image: `docker container stop <container-id>` and `docker container rm <container-id>`
- Delete image: get the id with `docker image ls` and remove it with `docker image rm <image-id>`

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

### Pruning

https://docs.docker.com/config/pruning

`docker system prune` -> prune everything except volumes

Remove dangling images (images with `<none>` in `docker image ls`):

- `docker image prune` - https://docs.docker.com/engine/reference/commandline/image_prune/
- `docker images -q --filter "dangling=true" | xargs docker rmi` - from https://dockerlabs.collabnix.com/beginners/components/container-vs-image.html

## Dockerfile

Set of instructions to create a container image.

> A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image.

From https://docs.docker.com/get-started/overview

> You might create your own images or you might only use those created by others and published in a registry. To build your own image, you create a Dockerfile with a simple syntax for defining the steps needed to create the image and run it. Each instruction in a Dockerfile creates a layer in the image. When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt. This is part of what makes images so lightweight, small, and fast, when compared to other virtualization technologies.

Reference: https://docs.docker.com/engine/reference/builder

Examples: https://github.com/jessfraz/dockerfiles

Linter: https://github.com/hadolint/hadolint

Best practices:

- https://docs.docker.com/develop/develop-images/dockerfile_best-practices
- https://github.com/hexops/dockerfile

```dockerfile
# Base image
FROM python:3.10

# Copy everything in the current dir to the 'app' dir of the filesystem of the container
COPY . /app
# Directory in which the next commands are run
WORKDIR /app

# Run shell commands (upgrade pip and install flask)
RUN pip install --upgrade pip
RUN pip install flask

# App/executable that will run when the container is run from the image
ENTRYPOINT ["python", "app.py"]
```

## Volumes

Containers are started and stopped as required (ie they have a lifecycle). Volumes provide persistent data storage to containers, independent of its lifecycle. Volumes can be shared with many containers. They avoid increasing the container size.

## docker-compose

Commands: https://docs.docker.com/compose/reference

Oh My Zsh plugin: https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/docker-compose

Docker Compose best practices for dev and prod: https://news.ycombinator.com/item?id=32484008 / https://prod.releasehub.com/blog/6-docker-compose-best-practices-for-dev-and-prod
