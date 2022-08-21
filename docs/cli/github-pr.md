---
title: GitHub Pull Request
---

https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests

https://github.com/susam/gitpr

https://gist.github.com/Chaser324/ce0505fbed06b947d962

## Fork

Create the fork by clicking 'Fork' on the website.

Clone the repository locally: `git clone git@github.com:AlbertVilaCalvo/react.git`.

Add 'upstream' remote: `git remote add upstream https://github.com/facebook/react`

`git remote -v` should show:

```
origin	git@github.com:AlbertVilaCalvo/react.git (fetch)
origin	git@github.com:AlbertVilaCalvo/react.git (push)
upstream	https://github.com/AlbertVilaCalvo/react (fetch)
upstream	https://github.com/AlbertVilaCalvo/react (push)
```

## Create the PR

https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork

Create a branch and do the work.

(Optional) Before submitting the PR:

- [Update my fork](#update-my-fork) and rebase my branch (`git rebase main`).
- Squash the commits.

Finally, create the PR on the website.

## After the PR is merged

Checkout main/master, [update my fork](#update-my-fork) and delete the branch with `git push --delete origin branch`.

## Update my fork

```
git checkout main
git pull upstream main
git push origin main
```

Or [(source)](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork):

```
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```
