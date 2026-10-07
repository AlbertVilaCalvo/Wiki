---
title: GitHub Pull Request
---

https://docs.github.com/en/pull-requests/collaborating-with-pull-requests

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

## Clean up commits in a second pull request after the first one was squash-merged

Sometimes a large change is split into multiple GitHub pull requests so it can be reviewed and merged incrementally. For example:

- The `pr-1` branch contains the first set of changes and its pull request targets `main`.
- The `pr-2` branch is created from `pr-1` and contains the next part of the work. While the first pull request is open, the second pull request can target `pr-1` so GitHub shows only its additional changes.

The resulting history looks like this:

```text
main
  \
   pr-1
       \
        pr-2
```

If the first pull request is squash-merged into `main`, GitHub creates a new commit containing the combined changes from `pr-1`. The original commits retain different hashes and are not ancestors of the updated `main` branch.

Changing the second pull request's base branch to `main`, or merging `main` into `pr-2`, does not remove the original `pr-1` commits from `pr-2`'s history. GitHub may therefore show commits and changes from the already-merged first pull request as part of the second pull request.

A clean solution is to create a replacement `pr-2` branch from the updated `main` and cherry-pick only the commits added for the second pull request.

First, inspect the commits that are reachable from `pr-2` but not from `pr-1`:

```shell
git log \
  --reverse \
  --first-parent \
  --no-merges \
  --oneline \
  pr-1..pr-2
```

- `--reverse` lists the commits from oldest to newest, which is the order required by `git cherry-pick`.
- `--first-parent` follows `pr-2`'s main line of development instead of traversing commits introduced through merged branches.
- `--no-merges` excludes merge commits.
- `pr-1..pr-2` selects commits reachable from `pr-2` but not from `pr-1`.

Make sure the working tree is clean before continuing, otherwise `git stash` your changes. Then update `main` and create the replacement branch:

```shell
git switch main
git pull --ff-only origin main
git switch -c pr-2-clean
```

After checking that the commit list is correct, generate the same list using `git rev-list` and pass it to `git cherry-pick`:

```shell
git cherry-pick $(git rev-list \
  --reverse \
  --first-parent \
  --no-merges \
  pr-1..pr-2)
```

This is equivalent to running `git cherry-pick <commit>` separately for every listed commit, in order. The single command lets Git manage the complete sequence: after resolving a conflict and running `git cherry-pick --continue`, Git proceeds with the remaining commits automatically.

GitHub commonly deletes a pull request's branch after it is merged. If `pr-1` has been deleted, use the SHA of its final commit as the lower boundary:

```shell
git log \
  --reverse \
  --first-parent \
  --no-merges \
  --oneline \
  <pr-1-tip-sha>..pr-2
```

The corresponding cherry-pick command is:

```shell
git cherry-pick $(git rev-list \
  --reverse \
  --first-parent \
  --no-merges \
  <pr-1-tip-sha>..pr-2)
```

If a conflict occurs, resolve it using the squash-merged implementation on `main` as the foundation, stage the resolved files, and continue:

```shell
git status
git add <resolved-files>
git cherry-pick --continue
```

To cancel the complete cherry-pick sequence:

```shell
git cherry-pick --abort
```

Finally, verify the commits and combined code changes that the new pull request will contain:

```shell
git log --reverse --oneline main..HEAD
git diff --stat main...HEAD
git diff main...HEAD
```

Cherry-picking creates new commits, so their hashes will differ from the original `pr-2` commits even though their changes and commit messages correspond. Push `pr-2-clean` and use it for the second GitHub pull request. Creating a replacement branch also avoids rewriting and force-pushing the existing public branch.

[git cherry-pick documentation](https://git-scm.com/docs/git-cherry-pick) · [git rev-list documentation](https://git-scm.com/docs/git-rev-list)
