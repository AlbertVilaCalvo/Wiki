---
title: GitHub Actions
---

:::tip
Use the [YAML extension for VSCode](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) to have autocomplete and validation.
:::

:::warning
Always specify the action version, eg `actions/checkout@v3` instead of `actions/checkout`, otherwise the pipeline can suddenly break with a new release of the action. [Rationale](https://youtu.be/sIhm4YOMK6Q?t=2819)
:::

Docs: https://docs.github.com/en/actions

TODO Guide to learn: https://resources.github.com/learn/pathways/automation/. Has 3 levels: essentials, intermediate and advanced

Marketplace: https://github.com/marketplace?type=actions

Features: https://github.com/features/actions

Changelog: https://github.blog/changelog/label/githubactions/

https://github.com/topics/github-actions

https://github.com/sdras/awesome-actions

Run your GitHub Actions locally - https://github.com/nektos/act

GitHub hosted runners preinstalled software: https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software

Terraform module for scalable GitHub action runners on AWS - https://github.com/philips-labs/terraform-aws-github-runner

Roadmap: https://github.com/orgs/github/projects/4247/views/1?filterQuery=label%3Aactions

## Concepts

```yaml
name: Print CI environment variable
on: [push]
jobs:
  echo_ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: echo "$CI"
```

From [Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

Event - `on`

> GitHub Actions goes beyond just DevOps and lets you run workflows when other events happen in your repository. For example, you can run a workflow to automatically add the appropriate labels whenever someone creates a new issue in your repository.

> An event is a specific activity in a repository that triggers a workflow run. For example, activity can originate from GitHub when someone creates a pull request, opens an issue, or pushes a commit to a repository. You can also trigger a workflow run on a schedule, by [posting to a REST API](https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event), or manually.

> For a complete list of events that can be used to trigger workflows, see [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows).

Workflow

> Your workflow contains one or more _jobs_ which can run in sequential order or in parallel. Each job will run inside its own virtual machine _runner_, or inside a container, and has one or more _steps_.

Job - `jobs` → `steps` → `run`/`uses`

> A job is a set of _steps_ in a workflow that execute on the same runner. Each step is either a shell script that will be executed (`run`), or an _action_ that will be run (`uses`). Steps are executed in order and are dependent on each other. Since each step is executed on the same runner, you can share data from one step to another. For example, you can have a step that builds your application followed by a step that tests the application that was built.

> You can configure a job's dependencies with other jobs; by default, jobs have no dependencies and run in parallel with each other. When a job takes a dependency on another job, it will wait for the dependent job to complete before it can run.

Action - `uses`

> An _action_ is a custom application for the GitHub Actions platform that performs a complex but frequently repeated task. Use an action to help reduce the amount of repetitive code that you write in your workflow files. An action can pull your git repository from GitHub, set up the correct toolchain for your build environment, or set up the authentication to your cloud provider.

> You can write your own actions, or you can find actions to use in your workflows in the GitHub Marketplace.
> For more information, see "[Creating actions](https://docs.github.com/en/actions/creating-actions)."

Runner - `runs-on`

> A runner is a server that runs your workflows when they're triggered. Each runner can run a single job at a time. Each workflow run executes in a fresh, newly-provisioned virtual machine.

> GitHub provides Ubuntu Linux, Microsoft Windows, and macOS runners to run your workflows. If you need a different operating system or require a specific hardware configuration, you can [host your own runners](https://docs.github.com/en/actions/hosting-your-own-runners).

## Learn

Examples: https://docs.github.com/en/actions/examples

Midudev - GitHub Actions TUTORIAL Desde Cero - Integración continua (CI/CD) - https://www.youtube.com/watch?v=sIhm4YOMK6Q&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=62 - Repository: https://github.com/midudev/pokedex-for-ci/blob/main/.github/workflows/pipeline.yml

How to build a CI/CD pipeline with GitHub Actions in four simple steps: https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/

7 advanced workflow automation features with GitHub Actions: https://github.blog/2021-11-18-7-advanced-workflow-automation-features-with-github-actions/

GitHub Actions Pitfalls - https://news.ycombinator.com/item?id=32970198

## Secret vs variable

https://github.blog/changelog/2023-01-10-github-actions-support-for-configuration-variables-in-workflows/

- `secrets` context: https://docs.github.com/en/actions/learn-github-actions/contexts#secrets-context
- `vars` context: https://docs.github.com/en/actions/learn-github-actions/contexts#vars-context

```
${{ secrets.API_TOKEN }}
${{ vars.USERNAME }}
```

## Workflow examples and actions list

Marketplace: https://github.com/marketplace?type=actions

Repo: https://github.com/actions

Official starter workflows: https://github.com/actions/starter-workflows

https://docs.github.com/en/actions/examples

Awesome Actions (curated list): https://github.com/sdras/awesome-actions

## Commonly used actions

Marketplace most starred/installed actions: https://github.com/marketplace?category=&query=sort%3Apopularity-desc&type=actions&verification=

- Checkout: https://github.com/marketplace/actions/checkout
- Setup Node.js environment: https://github.com/marketplace/actions/setup-node-js-environment
- Upload artifact: https://github.com/actions/upload-artifact

### Useful actions

- [paths-filter](https://github.com/dorny/paths-filter): Conditionally run actions based on files modified by PR, feature branch or pushed commits
- [Secrets Sync Action](https://github.com/marketplace/actions/secrets-sync-action): Define and rotate secrets in a single repository and have them synced to all other repositories in the Github organization or beyond

### Interesting workflows

- https://github.com/SUI-Components/sui-components/tree/master/.github/workflows

### Node.js

- Node.js official starter: https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml
  - Note that it uses `continue-on-error: true`
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

## OpenID Connect

Use it to authenticate to cloud services (like AWS) without storing long-lived secrets (like access key ID and secret access key) in GitHub.

About security hardening with OpenID Connect - https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect

> using hardcoded secrets requires you to create credentials in the cloud provider and then duplicate them in GitHub as a secret.

> With OIDC, your cloud provider issues a short-lived access token that is only valid for a single job, and then automatically expires.

Configuring OpenID Connect in Amazon Web Services - https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services

See the examples at https://github.com/aws-actions/configure-aws-credentials/tree/master/examples. In particular see the workflow https://github.com/aws-actions/configure-aws-credentials/blob/master/examples/cfn-deploy-example/.github/workflows/deploy.yml

Creating OpenID Connect (OIDC) identity providers - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html

Creating a role for a third-party Identity Provider (federation) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp.html

## Manually triggered workflow

You need the on [`workflow_dispatch`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) event, see https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow

Note that the workflow needs to be merged on a main branch, otherwise you won't see it on the Actions page: _This event will only trigger a workflow run if the workflow file is on the default branch._ [source](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)

Example of a dropdown:

```yml
name: Native Apps Build

defaults:
  run:
    working-directory: apps/patient

on:
  workflow_dispatch:
    inputs:
      platform:
        description: 'iOS and/or Android'
        required: true
        type: choice
        default: 'ios'
        options:
          - ios
          - android
          - ios-and-android

jobs:
```

`type` can be `string`, `choice`, `boolean` and `environment` - see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_dispatchinputs

## Run a single job at a time

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

## Create custom actions and reuse workflows

Reusing workflows - https://docs.github.com/en/actions/using-workflows/reusing-workflows

About custom actions - https://docs.github.com/en/actions/creating-actions/about-custom-actions

GitHub Actions: reusable workflows is generally available - https://github.blog/2021-11-29-github-actions-reusable-workflows-is-generally-available/

You can call a workflow on the same repository with [`uses`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_iduses.

Overview: https://stackoverflow.com/questions/59757355/reuse-portion-of-github-action-across-jobs

https://cardinalby.github.io/blog/post/github-actions/dry-reusing-code-in-github-actions

https://stackoverflow.com/questions/65242830/in-a-github-actions-workflow-is-there-a-way-to-have-multiple-jobs-reuse-the-sam

https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/ci-cd/github-actions/reusable-workflows.html

### Composite actions

> A composite action allows you to combine multiple workflow steps within one action. For example, you can use this feature to bundle together multiple run commands into an action, and then have a workflow that executes the bundled commands as a single step using that action. [source](https://docs.github.com/en/actions/creating-actions/about-custom-actions#composite-actions)

Creating a composite action - https://docs.github.com/en/actions/creating-actions/creating-a-composite-action

GitHub Actions: Reduce duplication with action composition - https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/

It can be saved locally on the same repository, see [Example: Using an action in the same repository as the workflow](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-using-an-action-in-the-same-repository-as-the-workflow). The file name must be `action.yml`, eg `github/actions/lighthouse/action.yml`.

This is the local action:

```yml title="./.github/actions/lighthouse/action.yml"
name: 'Lighthouse'
description: 'Run Lighthouse'
inputs:
  some_parameter:
    description: 'The description'
    required: true
runs:
  using: 'composite'
  steps:
    - name: Run Lighthouse
      uses: treosh/lighthouse-ci-action@v10
    - name: Publish results
      uses: actions/github-script@v6
      with:
        script: |
        # ...
```

And this is how you call it:

<!-- prettier-ignore -->
```yml title="./.github/workflows/some-workflow.yml"
  lighthouse:
    name: Feature Environment Lighthouse
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist
      - name: Lighthouse
        uses: ./.github/actions/lighthouse
        with:
          some_parameter: "some_value"
```

## Setting output parameters with `$GITHUB_OUTPUT`

_This can be done for steps and for jobs._

Note that there is also `GITHUB_STATE`.

### For steps

https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/ci-cd/github-actions/persist.html

https://stackoverflow.com/questions/59191913/how-do-i-get-the-output-of-a-specific-step-in-github-actions

https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter

<!-- prettier-ignore -->
```yml
      - name: Set color
        id: color-selector
        run: echo "SELECTED_COLOR=green" >> "$GITHUB_OUTPUT"
      - name: Get color
        env:
          SELECTED_COLOR: ${{ steps.color-selector.outputs.SELECTED_COLOR }}
        run: echo "The selected color is $SELECTED_COLOR"
```

Use `printf` instead of `echo` to deal with new lines [source](https://stackoverflow.com/questions/8467424/echo-newline-in-bash-prints-literal-n):

<!-- prettier-ignore -->
```yml
  lighthouse:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # ...
      - name: Lighthouse
        id: lighthouse
        run: |
          npm install -g @lhci/cli@0.12.x --no-fund
          LHCI=$(lhci autorun --collect.staticDistDir=web-build)
          printf "$LHCI"
          LIGHTHOUSE_REPORT_URL=$(printf "$LHCI" | grep 'Open the report at' | awk '{print $NF}')
          printf "$LIGHTHOUSE_REPORT_URL"
          echo "LIGHTHOUSE_REPORT_URL=$LIGHTHOUSE_REPORT_URL" >> $GITHUB_OUTPUT
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
      - name: Comment Lighthouse report URL on pull-request
        uses: actions/github-script@v6
        env:
          LIGHTHOUSE_REPORT_URL: ${{ steps.lighthouse.outputs.LIGHTHOUSE_REPORT_URL }}
        with:
          script: |
            const { LIGHTHOUSE_REPORT_URL } = process.env
            console.log(`Lighthouse report URL: ${LIGHTHOUSE_REPORT_URL}`)
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `Check the [Lighthouse report](${LIGHTHOUSE_REPORT_URL})`
            })
```

### For jobs

https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs

## Setting environment variables with `$GITHUB_ENV`

https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-environment-variable

```yml
steps:
  - name: Set the value
    id: step_one
    run: |
      echo "action_state=yellow" >> "$GITHUB_ENV"
  - name: Use the value
    id: step_two
    run: |
      printf '%s\n' "$action_state" # This will output 'yellow'
```

From https://stackoverflow.com/a/66358561/4034572

```yml
steps:
  - name: Set the value
    id: step_one
    run: |
      echo "FOO=$(git status)" >> $GITHUB_ENV
  - name: Use the value
    id: step_two
    run: |
      echo "${{ env.FOO }}"
```

## Artifacts

https://github.com/actions/upload-artifact

https://github.com/actions/download-artifact

https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts

<!-- prettier-ignore -->
```yml
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Install dependencies
        run: npm ci --no-fund
      - name: Build
        run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: backend
          path: |
            backend/src/build
            !backend/src/build/**/*.md
          retention-days: 5
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      # ...
      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: backend
          path: backend/src/build
```

## Comment on a pull request

From https://github.com/actions/github-script/blob/main/.github/workflows/pull-request-test.yml

```yml
name: Pull Request Test

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize]

jobs:
  pull-request-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ./
        with:
          script: |
            // Get the existing comments.
            const {data: comments} = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.number,
            })

            // Find any comment already made by the bot.
            const botComment = comments.find(comment => comment.user.id === 41898282)
            const commentBody = "Hello from actions/github-script! (${{ github.sha }})"

            if (context.payload.pull_request.head.repo.full_name !== 'actions/github-script') {
              console.log('Not attempting to write comment on PR from fork');
            } else {
              if (botComment) {
                await github.rest.issues.updateComment({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  comment_id: botComment.id,
                  body: commentBody
                })
              } else {
                await github.rest.issues.createComment({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  issue_number: context.payload.number,
                  body: commentBody
                })
              }
            }
```

https://stackoverflow.com/questions/58066966/commenting-a-pull-request-in-a-github-action

https://dev.to/zirkelc/trigger-github-workflow-for-comment-on-pull-request-45l2

## JavaScript

https://github.com/actions/github-script

## Badge

Adding a workflow status badge - https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

Example of badge on the README: https://github.com/midudev/pokedex-for-ci/commit/04c0aa51329cd249e2283e907a33bf9ddf9da604

Badge actions on the marketplace: https://github.com/marketplace?category=&query=badge+sort%3Apopularity-desc&type=actions&verification=
