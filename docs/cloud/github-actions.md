---
title: GitHub Actions
---

:::tip
Use the [YAML extension for VSCode](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) to have autocomplete and validation.
:::

Docs: https://docs.github.com/en/actions

Marketplace: https://github.com/marketplace?type=actions

Features: https://github.com/features/actions

https://github.com/topics/github-actions

https://github.com/sdras/awesome-actions

Run your GitHub Actions locally - https://github.com/nektos/act

GitHub hosted runners preinstalled software: https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software

Roadmap: https://github.com/orgs/github/projects/4247/views/1?filterQuery=label%3Aactions

## Learn

Midudev - GitHub Actions TUTORIAL Desde Cero - Integración continua (CI/CD) - https://www.youtube.com/watch?v=sIhm4YOMK6Q&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=62

How to build a CI/CD pipeline with GitHub Actions in four simple steps: https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/

7 advanced workflow automation features with GitHub Actions: https://github.blog/2021-11-18-7-advanced-workflow-automation-features-with-github-actions/

GitHub Actions Pitfalls - https://news.ycombinator.com/item?id=32970198

## Commonly used actions

Marketplace most starred/installed actions: https://github.com/marketplace?category=&query=sort%3Apopularity-desc&type=actions&verification=

- Checkout: https://github.com/marketplace/actions/checkout
- Setup Node.js environment: https://github.com/marketplace/actions/setup-node-js-environment

## Sample and available actions

Marketplace: https://github.com/marketplace?type=actions

Repo: https://github.com/actions

Official starter workflows: https://github.com/actions/starter-workflows

https://docs.github.com/en/actions/examples

### Node.js

- Node.js official starter: https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml
- Node.js with Webpack official starter: https://github.com/actions/starter-workflows/blob/main/ci/webpack.yml

### ESLint actions

- Official starter: https://github.com/actions/starter-workflows/blob/main/code-scanning/eslint.yml
- https://github.com/midudev/pokedex-for-ci/blob/main/.github/workflows/pipeline.yml#L20-L33

### AWS actions

Note that GitHub runners already come with the AWS CLI installed, see https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software

- https://github.com/aws-actions
- Official starter: https://github.com/actions/starter-workflows/blob/main/deployments/aws.yml
- https://github.com/clowdhaus/aws-github-actions

### AWS S3 actions

- GitHub Action to sync a directory with a remote S3 bucket - https://github.com/jakejarvis/s3-sync-action - https://github.com/marketplace/actions/s3-sync
- Easily deploy a static website to AWS S3 and invalidate CloudFront distribution - https://github.com/Reggionick/s3-deploy - https://github.com/marketplace/actions/s3-deploy
- Synchronize a local directory to an AWS S3 bucket: https://github.com/clowdhaus/aws-github-actions/tree/main/s3_sync - They also have CloudFront invalidation: https://github.com/clowdhaus/aws-github-actions/tree/main/cloudfront_invalidate

### Terraform

https://github.com/marketplace?type=actions&query=terraform+

- HashiCorp - Setup Terraform: https://github.com/marketplace/actions/hashicorp-setup-terraform
- Official starter: https://github.com/actions/starter-workflows/blob/main/deployments/terraform.yml

## Run a single job

https://docs.github.com/en/actions/using-jobs/using-concurrency

https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#concurrency

Example from https://github.com/actions/starter-workflows/blob/68abeab3718d5d2d5f224103b807c547467e27f3/pages/static.yml#L18-L21 that ensures only one GitHub pages concurrent deployment:

```yml
# Allow only one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true
```

## Run only if a folder or file has changed

Use the `paths` filter:

```yml
on:
  push:
    branches: [main]
    paths:
      - src/**
      - package.json
```

See [Patterns to match file paths](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#patterns-to-match-file-paths) for how to write the paths.

Docs: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onpushpull_requestpull_request_targetpathspaths-ignore

Run job only when a folder changes - https://github.com/orgs/community/discussions/25669

There's also `paths-ignore` that instead excludes.

Note that "You cannot use both the `paths` and `paths-ignore` filters for the same event in a workflow", but you can use `!` to negate/exclude and achieve the same.

## Change directory

Use `working-directory`, eg:

```yml
# If you use 'defaults' it applies to all 'run' steps in a workflow
defaults:
  run:
    working-directory: web
```

Running actions in another directory - https://stackoverflow.com/questions/58139175/running-actions-in-another-directory

Docs (search for `working-directory`):

- https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- Default values: https://docs.github.com/en/actions/using-jobs/setting-default-values-for-jobs

## Badge

Adding a workflow status badge - https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

Example of badge on the README: https://github.com/midudev/pokedex-for-ci/commit/04c0aa51329cd249e2283e907a33bf9ddf9da604

Badge actions on the marketplace: https://github.com/marketplace?category=&query=badge+sort%3Apopularity-desc&type=actions&verification=
