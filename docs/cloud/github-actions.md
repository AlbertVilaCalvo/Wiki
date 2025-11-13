---
title: GitHub Actions
---

:::warning
Always specify the action version, eg `actions/checkout@v3` instead of `actions/checkout`, otherwise the pipeline can suddenly break with a new release of the action. [Rationale](https://youtu.be/sIhm4YOMK6Q?t=2819)
:::

Docs: https://docs.github.com/en/actions

Reference: https://docs.github.com/en/actions/reference

Copilot instructions - https://github.com/github/awesome-copilot/blob/main/instructions/github-actions-ci-cd-best-practices.instructions.md

TODO Guide to learn: https://resources.github.com/learn/pathways/automation/. Has 3 levels: essentials, intermediate and advanced

Marketplace: https://github.com/marketplace?type=actions

Features: https://github.com/features/actions

Changelog: https://github.blog/changelog/label/githubactions/

https://github.com/topics/github-actions

https://github.com/sdras/awesome-actions

Run your GitHub Actions locally - https://github.com/nektos/act

GitHub hosted runners preinstalled software: https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software

Terraform module for scalable GitHub action runners on AWS - https://github.com/philips-labs/terraform-aws-github-runner

Self-hosted GitHub runners on AWS - https://hyperenv.com

Roadmap: https://github.com/orgs/github/projects/4247/views/1?filterQuery=label%3Aactions

## Concepts

A workflow is triggered in response to an event (eg push to main or open a pull request), manually, on schedule or using the REST API.

- A workflow runs a series of jobs.
- A job runs a series of steps.
  - Jobs run in parallel by default, but they can depend on (wait for) other jobs.
- A step either `uses` an action or `run`s a command, a series of commands or a shell script.
  - Steps run sequentially.

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

From [Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions).

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

## Workflow examples

Official starter workflows: https://github.com/actions/starter-workflows

Examples: https://docs.github.com/en/actions/tutorials

Example workflows that demonstrate the features of GitHub Actions - https://docs.github.com/en/actions/examples - Link does not work now, see https://web.archive.org/web/20240807225554/https://docs.github.com/en/actions/examples

Awesome Actions (curated list): https://github.com/sdras/awesome-actions

### Node.js

- Node.js official starter workflow: https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml
  - Note that it uses `continue-on-error: true`
- Node.js with Webpack official starter workflow: https://github.com/actions/starter-workflows/blob/main/ci/webpack.yml

### ESLint

- Official starter workflow: https://github.com/actions/starter-workflows/blob/main/code-scanning/eslint.yml. Note that it doesn't use `actions/setup-node`
- Using `actions/setup-node`: https://github.com/midudev/pokedex-for-ci/blob/main/.github/workflows/pipeline.yml#L20-L33

### Interesting workflows

- https://github.com/SUI-Components/sui-components/tree/master/.github/workflows

## Actions

Marketplace: https://github.com/marketplace?type=actions

Marketplace most starred/installed actions: https://github.com/marketplace?category=&query=sort%3Apopularity-desc&type=actions&verification=

Awesome Actions (curated list): https://github.com/sdras/awesome-actions

Curated list of useful Github actions - https://github.com/GuillaumeFalourd/useful-actions

### Commonly used actions

- Checkout: https://github.com/marketplace/actions/checkout ([code](https://github.com/actions/checkout))
- Setup Node.js environment: https://github.com/marketplace/actions/setup-node-js-environment ([code](https://github.com/actions/setup-node/))
- Upload artifact: https://github.com/actions/upload-artifact

### Useful actions

- [paths-filter](https://github.com/dorny/paths-filter): Conditionally run actions based on files modified by PR, feature branch or pushed commits
- [Secrets Sync Action](https://github.com/marketplace/actions/secrets-sync-action): Define and rotate secrets in a single repository and have them synced to all other repositories in the Github organization or beyond

### AWS actions

Note that GitHub runners already come with the AWS CLI installed, see https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software

- https://github.com/aws-actions
- Official starter workflow: https://github.com/actions/starter-workflows/blob/main/deployments/aws.yml
- https://github.com/clowdhaus/aws-github-actions

### AWS S3 actions

- GitHub Action to sync a directory with a remote S3 bucket - https://github.com/jakejarvis/s3-sync-action - https://github.com/marketplace/actions/s3-sync
- Easily deploy a static website to AWS S3 and invalidate CloudFront distribution - https://github.com/Reggionick/s3-deploy - https://github.com/marketplace/actions/s3-deploy
- Synchronize a local directory to an AWS S3 bucket: https://github.com/clowdhaus/aws-github-actions/tree/main/s3_sync - They also have CloudFront invalidation: https://github.com/clowdhaus/aws-github-actions/tree/main/cloudfront_invalidate

### Terraform actions

https://github.com/marketplace?type=actions&query=terraform+

- HashiCorp - Setup Terraform: https://github.com/marketplace/actions/hashicorp-setup-terraform
- Official starter workflow: https://github.com/actions/starter-workflows/blob/main/deployments/terraform.yml
- TFLint: https://github.com/terraform-linters/setup-tflint - https://github.com/marketplace/actions/setup-tflint

## Learn

Examples: https://docs.github.com/en/actions/tutorials

Midudev - GitHub Actions TUTORIAL Desde Cero - Integración continua (CI/CD) - https://www.youtube.com/watch?v=sIhm4YOMK6Q&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=62 - Repository: https://github.com/midudev/pokedex-for-ci/blob/main/.github/workflows/pipeline.yml

How to build a CI/CD pipeline with GitHub Actions in four simple steps: https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/

7 advanced workflow automation features with GitHub Actions: https://github.blog/2021-11-18-7-advanced-workflow-automation-features-with-github-actions/

GitHub Actions Pitfalls - https://news.ycombinator.com/item?id=32970198

https://kodekloud.com/courses/github-actions

https://kodekloud.com/courses/github-actions-certification

## Run

Run multiple commands with `|`:

```yaml
name: Multiline
on: [push]
jobs:
  echo_ci:
    runs-on: ubuntu-latest
    steps:
      - name: 'Print files'
        run: |
          echo "Print files"
          ls -la
```

Run a script file:

```yaml
name: Script file
on: [push]
jobs:
  run_script:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run shell script
        run: ./my-script.sh
```

The script lives at the root of the git repository. You need to get the code fist.

## Contexts

https://docs.github.com/en/actions/reference/contexts-reference

https://docs.github.com/en/actions/reference/workflows-and-actions/contexts

```
${{ github.sha }}
${{ github.ref }}
${{ secrets.API_TOKEN }}
${{ vars.USERNAME }}
${{ inputs.app_version }}
```

Secrets are encrypted, whereas variables are shown as plain text. See https://github.blog/changelog/2023-01-10-github-actions-support-for-configuration-variables-in-workflows/

## Environment variables

https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables

Environment variables available by default (`$GITHUB_ENV`, `$GITHUB_OUTPUT` etc.) - https://docs.github.com/en/actions/reference/workflows-and-actions/variables#default-environment-variables

You can set environment variables scoped to the entire workflow, a job or a step.
Often you set environment variables from secrets and variables.

Inside `run` we can use the runner environment variables using bash shell interpolation (`$AWS_REGION`), and in most cases also use contexts (`${{ env.AWS_REGION }}`). The difference is that the context will be interpolated and replaced by a string before the job is sent to a runner. However, at the other parts of the workflow you need to use context, not the runner environment variables.

```yaml
env:
  ENVIRONMENT: staging

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      AWS_REGION: ${{ vars.AWS_REGION }}
      API_TOKEN: ${{ secrets.API_TOKEN }}
    steps:
      - name: Say hello
        env:
          Name: Albert
        # In run we can use both {{ contexts }} and bash $substitution
        run: |
          echo "Hello $Name! The environment is $ENVIRONMENT and the region is $AWS_REGION."
          if [[ ${{ github.ref_name }} == 'main' ]]; then
            echo "Branch is main"
          fi
      - name: Say hello if N. Virginia
        # But here we can only use the {{ contexts }}
        if: ${{ env.AWS_REGION == 'useast' }}
        run: echo "Hi N. Virginia!"
```

### Set environment variables with `$GITHUB_ENV`

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-environment-variable

You can use this to pass values to subsequent steps. (You can also use `$GITHUB_OUTPUT`, see below.) From https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables#passing-values-between-steps-and-jobs-in-a-workflow

> If you generate a value in one step of a job, you can use the value in subsequent steps of the same job by assigning the value to an existing or new environment variable and then writing this to the `GITHUB_ENV` environment file.

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

## Functions

https://docs.github.com/en/actions/reference/evaluate-expressions-in-workflows-and-actions#functions

- `contains('xyz', 'y')` is `true`
- `startsWith('xyz', 'y')` is `false`
- `endsWith('xyz', 'y')` is `false`

```
environment: ${{ contains(inputs.profile, 'dev') && 'dev' || inputs.profile }}
```

## Environments

:::info
When environments are used in workflows or in OIDC policies, we recommend adding protection rules to the environment for additional security. For example, you can configure deployment rules on an environment to restrict which branches and tags can deploy to the environment or access environment secrets. For more information, see [Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/managing-environments-for-deployment#deployment-protection-rules). [source](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws#configuring-the-role-and-trust-policy)

Also see [Deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments) for information about deployment protection rules.
:::

## Status check functions

https://docs.github.com/en/actions/reference/evaluate-expressions-in-workflows-and-actions#status-check-functions

- `success()`
- `failure()`
- `always()`
- `cancelled()`

It's important to note that `failure()`:

- Returns `true` when any previous step of a job fails. If you have a chain of dependent jobs, `failure()` returns `true` if any ancestor job fails.
- You can include extra conditions for a step to run after a failure, but you must still include `failure()` to override the default status check of `success()` that is automatically applied to if conditions that don't contain a status check function.

```shell
jobs:
  xyz:
    steps:
      - name: Step 1
        run: npm run step1
      - name: Step 2
        id: step_2
        run: npm run step2
      - name: Send slack notification _only_ if step 2 fails
        uses: slackapi/slack-github-action@v1.23.0
        if: ${{ failure() && steps.step_2.conclusion == 'failure' }}
        with:
          payload: |
            {
              "app": "${{ github.repository }}",
              "environment": "${{ env.ENV }}",
              "version": "RC/Tag/Commit: ${{ env.checkout_ref || github.sha }}",
              "branch": "${{ github.ref_name }}",
              "execution_url": "https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}",
              "html_report": "https://${{ env.REPORTS_PAGES_SUBDOMAIN }}/${{ env.REPORTS_PAGES_PATH }}/${{ env.FEATURE_BRANCH_NAME }}/"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

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

## Run a single workflow or job at a time

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

Creating and publishing actions - https://docs.github.com/en/actions/how-tos/creating-and-publishing-actions

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

https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-output-parameter

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
        run: npm ci --no-fund --omit=dev
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

## OIDC

OpenID Connect

Use it to authenticate to cloud services (like AWS) without storing long-lived secrets (like access key ID and secret access key) in GitHub.

https://docs.github.com/en/actions/concepts/security/openid-connect (In the past was [About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect))

> Using hardcoded secrets requires you to create credentials in the cloud provider and then duplicate them in GitHub as a secret.

> After you have established a trust connection with a cloud provider that supports OIDC, you can configure your workflow to request a short-lived access token directly from the cloud provider.

> With OIDC, your cloud provider issues a short-lived access token that is only valid for a single job, and then automatically expires.

GitHub Actions: Secure cloud deployments with OpenID Connect - https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/

AWS, Azure, GCP, etc. how to: https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments

> Add `/.well-known/openid-configuration` to the end of your OIDC identity provider's URL to see the provider's publicly available configuration document and metadata. You must have a discovery document in JSON format with the provider's configuration document and metadata that can be retrieved from the [OpenID Connect provider discovery endpoint URL](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)

For example: https://token.actions.githubusercontent.com/.well-known/openid-configuration

Also see: https://token.actions.githubusercontent.com/.well-known/jwks

## OIDC AWS

Configuring OpenID Connect in Amazon Web Services - https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws

https://github.com/aws-actions/configure-aws-credentials

See the examples at https://github.com/aws-actions/configure-aws-credentials/tree/master/examples. In particular, see the workflow https://github.com/aws-actions/configure-aws-credentials/blob/master/examples/cfn-deploy-example/.github/workflows/deploy.yml

Create an OpenID Connect (OIDC) identity provider in IAM - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html

OIDC identity provider's publicly available configuration document and metadata. - https://token.actions.githubusercontent.com/.well-known/openid-configuration

Create a role for a third-party identity provider (federation) - https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp.html

https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/

### Step 1. Create an IAM Identity Provider in your AWS account for GitHub OIDC

Create an IAM Identity Provider (IdP) that trusts GitHub's OIDC endpoint.

- Using the management console ([docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html#manage-oidc-provider-console)). Go to the [IAM console](https://console.aws.amazon.com/iam#/identity_providers) → Identity providers, click **Add provider** and set:
  - Provider type: OpenID Connect.
  - Provider URL: `https://token.actions.githubusercontent.com`
  - Audience: `sts.amazonaws.com`. This allows the AWS Security Token Service (STS) API to be called by this IdP.
- Using the CLI ([see `create-open-id-connect-provider` docs](https://docs.aws.amazon.com/cli/latest/reference/iam/create-open-id-connect-provider.html)):

```shell
# There's no need to pass ‐‐thumbprint-list
aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com
```

Validate that the OIDC IdP was successfully created with [`list-open-id-connect-providers`](https://docs.aws.amazon.com/cli/latest/reference/iam/list-open-id-connect-providers.html):

```shell
aws iam list-open-id-connect-providers
```

Get the details of the OIDC IdP with [`get-open-id-connect-provider`](https://docs.aws.amazon.com/cli/latest/reference/iam/get-open-id-connect-provider.html):

```shell
aws iam get-open-id-connect-provider --open-id-connect-provider-arn arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com
```

### Step 2. Create an IAM Role in your AWS account with a trust policy that allows GitHub Actions to assume it

Assign an IAM role to your identity provider to give external user identities managed by your identity provider permissions to access AWS resources in your account. To learn more about creating roles for identity federation, see [Create a role for a third-party identity provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp.html).

Note: OIDC IdPs used in a role trust policy must be in the same account as the role that trusts it.

> To use an identity provider (IdP), you create an IAM identity provider resource and then set up a role to establish a trust relationship between your AWS account and the IdP. (From the console right sidebar at the "Add Identity provider" page.)

> After you create an IAM OIDC identity provider, you must create one or more IAM roles. A role is an identity in AWS that doesn't have its own credentials (as a user does). But in this context, a role is dynamically assigned to an OIDC federated principal that is authenticated by your organization's IdP. The role permits your organization's IdP to request temporary security credentials for access to AWS. The policies assigned to the role determine what users are allowed to do in AWS. [source](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)

To create the role using the management console, go to the [IAM console](https://console.aws.amazon.com/iam#/roles) → Roles, click **Create role** and set:

- Trusted entity type: Web identity (Allows users federated by the specified external web identity provider to assume this role to perform actions in this account.)
- Identity provider: `token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`
- The GitHub organization is required, but the repository and the git branch are optional.

If you set a repository but leave the branch empty, the console creates a role with this trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": ["sts.amazonaws.com"]
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:<GITHUB_USER_OR_ORGANIZATION>/<GITHUB_REPOSITORY>:*",
            "repo:<GITHUB_USER_OR_ORGANIZATION>/<GITHUB_REPOSITORY>:*"
          ]
        }
      }
    }
  ]
}
```

_Note: it doesn't make sense to have `"repo:<GITHUB_USER_OR_ORGANIZATION>/<GITHUB_REPOSITORY>:*"` twice here._

Alternatively, when creating a role, instead of choosing a "Trusted entity type" of "Web identity", choose "Custom trust policy" and paste this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:<GITHUB_ORG>/<GITHUB_REPOSITORY>:ref:refs/heads/<GITHUB_BRANCH>"
        }
      }
    }
  ]
}
```

Or this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Principal": {
        "Federated": "arn:aws:iam::725270464668:oidc-provider/token.actions.githubusercontent.com"
      },
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<GITHUB_ORG>/<GITHUB_REPOSITORY>:*"
        }
      }
    }
  ]
}
```

Modify the "token.actions.githubusercontent.com:sub" as needed:

- Allow any branch: `"repo:<ORG>/<REPO>:*"`
- Allow specific branch: `"repo:<ORG>/<REPO>:ref:refs/heads/main"`
- Allow specific branch pattern: `"repo:<ORG>/<REPO>:ref:refs/heads/feature/*"`
- Allow pull requests: `"repo:<ORG>/<REPO>:pull_request"`

Two important things from [the docs](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws#configuring-the-role-and-trust-policy):

- Evaluating the condition key `token.actions.githubusercontent.com:sub` in the role trust policy limits which GitHub actions are able to assume the role.
- If you use a workflow with an **environment**, the `sub` field must reference the environment name: `repo:ORG-NAME/REPO-NAME:environment:ENVIRONMENT-NAME`.

### Step 3. Attach permissions to the IAM Role

To allow the role to access the AWS resources, set the permissions policies (eg `AmazonS3FullAccess`).

### Step 4. Modify the GitHub Actions workflow

https://docs.github.com/en/actions/reference/security/oidc#workflow-permissions-for-the-requesting-the-oidc-token

You can request permissions at the workflow level or job level:

```yaml
# Workflow level
permissions:
  id-token: write

jobs:
  deploy:
    name: Deploy website
    # Job level
    # Permissions needed to interact with GitHub’s OIDC Token endpoint
    # https://docs.github.com/en/actions/reference/security/oidc#workflow-permissions-for-the-requesting-the-oidc-token
    permissions:
      id-token: write # Allows the job to request the JWT token from GitHub's OIDC provider
      contents: read # Allows the action to clone your repository code. Required for actions/checkout
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: 'npm'
          cache-dependency-path: 'web/package-lock.json'
      - name: Install dependencies
        run: npm ci --no-fund --no-audit
      - name: Build React web app
        run: npm run build
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v5.1.0 # https://github.com/aws-actions/configure-aws-credentials
        with:
          aws-region: ${{ vars.AWS_REGION }}
          role-to-assume: ${{ vars.AWS_GITHUB_ACTIONS_OIDC_ROLE_ARN }}
          # You can also do:
          # role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/${{ secrets.AWS_DEPLOY_ROLE }}
      - name: Upload build folder files to S3
        run: aws s3 sync build s3://${{ vars.WEB_S3_BUCKET }} --delete
      - name: Invalidate CloudFront distribution
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ vars.WEB_CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths '/*'
```

Permissions requested at the workflow level are inherited by all the jobs. If you request only `id-token: write` at the workflow level and you want to use `actions/checkout` in a job, it won't work unless you explicitly request `contents: read` at the job to override the inherited permissions. To avoid this issue, it's better to request permissions at the job level.

### CloudTrail

See how to do this at https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/

Once the setup is done and you trigger the workflow, you can see the events at CloudTrail. Filter by "Event source" with value "sts.amazonaws.com":

| Event name                | User name                                          | Event source      |
| ------------------------- | -------------------------------------------------- | ----------------- |
| AssumeRoleWithWebIdentity | repo:AlbertVilaCalvo/RecipeManager:environment:dev | sts.amazonaws.com |
| GetCallerIdentity         | GitHubActions                                      | sts.amazonaws.com |

Or filter by "User name" with value "GitHubActions":

| Event name         | User name     | Event source             |
| ------------------ | ------------- | ------------------------ |
| CreateInvalidation | GitHubActions | cloudfront.amazonaws.com |
| GetCallerIdentity  | GitHubActions | sts.amazonaws.com        |

:::tip
You can change the default "User name" (GitHubActions) in CloudTrail events with `role-session-name`:

```shell
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v5.1.0
        with:
          aws-region: ${{ vars.AWS_REGION }}
          role-to-assume: ${{ vars.AWS_GITHUB_ACTIONS_OIDC_ROLE_ARN }}
          role-session-name: "GitHubActions-web-deploy-dev"
```

:::

### OIDC AWS with Terraform

https://github.com/terraform-module/terraform-aws-github-oidc-provider

https://github.com/philips-labs/terraform-aws-github-oidc

Thumbprint:

- Recommended values: https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/
- Script to generate thumbprints: https://github.com/philips-labs/terraform-aws-github-oidc/blob/main/bin/generate-thumbprint.sh
- How to obtain the thumbprints: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html

```hcl title="main.tf"
# Data source for the GitHub OIDC provider thumbprint
data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = [
    "sts.amazonaws.com"
  ]
  thumbprint_list = [
    # From https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
    # Keep the dynamic lookup as a fallback
    data.tls_certificate.github.certificates[0].sha1_fingerprint
  ]
}

resource "aws_iam_role" "github_actions" {
  name = "${var.app_name}-github-actions-oidc-role-${var.environment}"
  # Trust policy allowing GitHub Actions (the trusted entity) to assume this role
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_org}/${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

# Inline permissions policy for the GitHub Actions role
resource "aws_iam_role_policy" "github_actions" {
  name = "${var.app_name}-github-actions-oidc-policy-${var.environment}"
  role = aws_iam_role.github_actions.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = [
          var.website_s3_bucket_arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "${var.website_s3_bucket_arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation"
        ]
        Resource = [
          var.website_cloudfront_distribution_arn
        ]
      }
    ]
  })
}
```

```hcl title="variables.tf"
variable "environment" {
  description = "The deployment environment (dev, staging, prod)"
  type        = string
  validation {
    condition     = can(regex("^(dev|staging|prod)$", var.environment))
    error_message = "The environment must be one of: dev, staging, prod."
  }
}

variable "app_name" {
  description = "The application name"
  type        = string
}

variable "aws_region" {
  description = "The AWS region to deploy the resources to"
  type        = string
  validation {
    condition     = can(regex("^(us|eu|ap|sa|ca|me|af)-(east|west|north|south|central|northeast|southeast|northwest|southwest)-[1-3]$", var.aws_region))
    error_message = "The region must be a valid AWS region (e.g., us-east-1, eu-west-2)."
  }
}

variable "default_tags" {
  description = "Common tags to be applied to all resources"
  type        = map(string)
}

variable "github_org" {
  description = "GitHub organization or username"
  type        = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9-]+$", var.github_org))
    error_message = "GitHub organization must contain only alphanumeric characters and hyphens."
  }
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9-_\\.]+$", var.github_repo))
    error_message = "GitHub repository name must contain only alphanumeric characters, hyphens, underscores, and dots."
  }
}

variable "website_s3_bucket_arn" {
  description = "ARN of the S3 bucket that contains the website files"
  type        = string
  validation {
    condition     = can(regex("^arn:aws:s3:::[a-z0-9.-]{3,63}$", var.website_s3_bucket_arn))
    error_message = "The S3 bucket ARN must be a valid ARN (e.g., arn:aws:s3:::my-bucket)."
  }
}

variable "website_cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution of the website"
  type        = string
}
```

```hcl title="outputs.tf"
output "oidc_role_arn" {
  description = "ARN of the IAM role for OIDC authentication with GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}
```

## Badge

Adding a workflow status badge - https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge

Example of badge on the README: https://github.com/midudev/pokedex-for-ci/commit/04c0aa51329cd249e2283e907a33bf9ddf9da604

Badge actions on the marketplace: https://github.com/marketplace?category=&query=badge+sort%3Apopularity-desc&type=actions&verification=
