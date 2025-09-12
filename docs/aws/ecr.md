---
title: ECR
---

# ECR - Elastic Container Registry

https://aws.amazon.com/ecr

https://gallery.ecr.aws/eks-distro/

## Workflow

From https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html

Create a `Dockerfile`.

Build the image:

```shell
docker build -t myapp .
```

[Create a repository](https://docs.aws.amazon.com/cli/latest/reference/ecr/create-repository.html):

```shell
aws ecr create-repository \
--repository-name my-repository \
--region us-east-1 \
--image-tag-mutability IMMUTABLE
```

The default mutability is MUTABLE.

Authenticate to the ECR registry (with [`get-login-password`](https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html) and [`docker login`](https://docs.docker.com/reference/cli/docker/login/)):

```shell
aws ecr get-login-password --region us-east-1 \
| docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com
# Login Succeeded
```

Push the image to ECR:

```shell
docker tag myapp:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository
docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```

After tagging the image, `docker images` should show a new entry. Note that the AWS user needs to have rights to push.

Pull the image:

```shell
docker pull <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```

Run the image:

```shell
docker run -d -p 3000:3000 <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```
