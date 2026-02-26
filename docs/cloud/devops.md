---
title: DevOps
---

https://www.reddit.com/r/devops/

https://www.gruntwork.io/fundamentals-of-devops

How they DevOps? - https://github.com/bregman-arie/howtheydevops

Reflections on 10,000 Hours of DevOps - https://matt-rickard.com/reflections-on-10-000-hours-of-devops

> The value of a CI/CD Pipeline is inversely proportional to how long the pipeline takes to run.

Introduction to DevOps on AWS - https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/introduction-to-devops.html

https://sprkl.dev/18-quick-tips-to-improve-developer-productivity

## Continuous integration

https://en.wikipedia.org/wiki/Continuous_integration

Developers integrate source code changes frequently into a central repository, after which automated builds and tests are run, ensuring that the integrated codebase is in a workable state.

## Continuous delivery

https://en.wikipedia.org/wiki/Continuous_delivery

Code changes are automatically built, tested and prepared for a release to production, but an actual release happens only after manual approval.

## Continuous deployment

https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment

> Continuous deployment goes one step further than continuous delivery. With this practice, every change that passes all stages of your production pipeline is released to your customers. There's no human intervention, and only a failed test will prevent a new change to be deployed to production.

https://www.oreilly.com/library/view/continuous-deployment/9781098146719/

## Deployment types

### In-place deployment

Modify a running server, by updating it's software version. The speed of the deployment is high, but there's some downtime. May be required if the application persist state in memory.

https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/in-place-deployments.html

> A deployment strategy that updates the application version without replacing any infrastructure components. In an in-place deployment, the previous version of the application on each compute resource is stopped, the latest application is installed, and the new version of the application is started and validated. This allows application deployments to proceed with minimal disturbance to underlying infrastructure.
>
> An in-place deployment allows you to deploy your application without creating new infrastructure; however, the availability of your application can be affected during these deployments.

### Rolling update

Launch a new instance of the virtual machine or container, and then delete the previous one.

https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/rolling-deployments.html

https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/

### Blue/green deployment

https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment

https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html

> A deployment strategy in which you create two separate, but identical environments. One environment (blue) is running the current application version and one environment (green) is running the new application version.

## Push vs pull model

https://itnext.io/gitops-pull-based-vs-push-based-959c50feca78 - See comments at https://www.reddit.com/r/kubernetes/comments/15jjv7d/gitops_pullbased_vs_pushbased/

Push:

- CI/CD has cluster credentials
- CI/CD pushes to cluster using `kubectl` or Helm

Pull:

- Cluster has Git repository credentials
- Argo CD runs in the cluster, monitoring the Git repository for changes continuously
- Cluster pulls from Git using Argo CD
- Self-healing: if a change is made directly to the cluster with `kubectl`, Argo CD will detect the drift and revert it to match the Git repository

## GitOps

https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/gitops-best-practices

### Principles

https://opengitops.dev

- Declarative: the desired state of the system is described in a declarative way, using configuration files like YAML or JSON.
- Versioned and immutable: the desired state is stored in a version control system (Git) and is immutable. Git history becomes your audit log.
- Pull-based: instead of CI pushing changes into a cluster, an agent inside the cluster pulls from Git, applies changes and keeps the system in sync.
- Continuously reconciled: the cluster continuously compares the actual state of the system with the desired state defined in the version control system, ensuring that the system is always in the desired state.

## Separate repo for configuration

https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories

https://stackoverflow.com/questions/63184279/gitops-config-in-same-repo-or-seperate-repo
