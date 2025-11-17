---
title: ECR
---

# ECR - Elastic Container Registry

https://aws.amazon.com/ecr

https://gallery.ecr.aws/eks-distro/

- OCI compliant.
- Accessible over VPC endpoints.
- Cross-region replication.

Amazon Inspector provides advanced image scanning capabilities.

## Workflow

:::tip
At the [ECR console](https://console.aws.amazon.com/ecr/private-registry/repositories), you can click the "View push commands" button to get the commands to authenticate and push an image to your repository.
:::

From https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html

Note that to do this the AWS user needs to have rights to [create a repository](https://docs.aws.amazon.com/AmazonECR/latest/APIReference/API_CreateRepository.html), [push images](https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-push-iam.html), etc. For example, with the [AmazonEC2ContainerRegistryFullAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2ContainerRegistryFullAccess.html) managed policy.

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

The repository name can be a single word (eg `my-app`) or can have a namespace prefix (eg `my-project/my-app`).
The default mutability is MUTABLE, which allows to overwrite existing images with the same tag.

Authenticate to the ECR registry (with [`get-login-password`](https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html) and [`docker login`](https://docs.docker.com/reference/cli/docker/login/)):

```shell
aws ecr get-login-password --region us-east-1 \
| docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com
# Login Succeeded
```

> After you have authenticated to an Amazon ECR registry with this command, you can use the client to push and pull images from that registry as long as your IAM principal has access to do so until the token expires. The authorization token is valid for 12 hours. [source](https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html)

Tag and push the image to ECR:

```shell
docker tag myapp:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository
docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```

After tagging the image, `docker images` should show a new entry.

Pull the image:

```shell
docker pull <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```

Run the image:

```shell
docker run -d -p 3000:3000 <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/my-repository:latest
```

## CLI

https://docs.aws.amazon.com/cli/latest/reference/ecr/

[List repositories](https://docs.aws.amazon.com/cli/latest/reference/ecr/describe-repositories.html):

```shell
aws ecr describe-repositories --region us-east-1
```

[Delete repository](https://docs.aws.amazon.com/cli/latest/reference/ecr/delete-repository.html) (use `--force` to delete a repository that contains images):

```shell
aws ecr delete-repository --repository-name my-repository --region us-east-1 [--force]
```
