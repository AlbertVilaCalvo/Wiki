---
title: Git Commands
sidebar_label: Commands
---

https://github.com/GitAlias/gitalias - Aliases for Git commands

## The git commands I run before reading any code

https://piechowski.io/post/git-commands-before-reading-code - https://news.ycombinator.com/item?id=47687273

Who built this. Every contributor ranked by commit count. If one person accounts for 60% or more, that’s your bus factor.

```shell
git shortlog -sn --no-merges
```

Also see https://github.com/GitAlias/gitalias/tree/main/doc/git-who and https://github.com/GitAlias/gitalias/tree/main/doc/git-chart

What changes the most. The 20 most-changed files in the last year. Run this from `app/` or `src/`, not the repo root, otherwise lockfiles, changelogs and generated code will dominate the list.

```shell
git log --format=format: --name-only --since="1 year ago" | sort | uniq -c | sort -nr | head -20
```

Also see https://github.com/GitAlias/gitalias/tree/main/doc/git-churn

Where do bugs cluster:

```shell
git log -i -E --grep="fix|bug|broken" --name-only --format='' | sort | uniq -c | sort -nr | head -20
```

Is this project accelerating or dying. Commit count by month, for the entire history of the repo:

```shell
git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c
```

How often is the team firefighting:

```shell
git log --oneline --since="1 year ago" | grep -iE 'revert|hotfix|emergency|rollback'
```

## `remote`

View:

```shell
git remote -v
```

Set:

```shell
git remote set-url origin git@github.com:AlbertVilaCalvo/Wiki.git
```

Change:

```shell
git remote set-url origin git@github.com:AlbertVilaCalvo/Wiki.git
```

Remove:

```shell
git remote remove origin
```

## `diff`

View number of lines added and removed in the staged files:

```shell
# Per file
git diff --cached --numstat
git diff --staged --numstat
# 177     10      src/logic.test.ts
# 82      35      src/logic.ts
# 6       1       src/types.ts

# Total
git diff --cached --shortstat
git diff --staged --shortstat
# 3 files changed, 265 insertions(+), 46 deletions(-)

git diff --cached --stat
# src/logic.test.ts | 187 ++++++++++++++++++++++++++++++++++++++++++---
# src/logic.ts      | 117 +++++++++++++++++--------
# src/types.ts      |   7 ++++-
# 3 files changed, 265 insertions(+), 46 deletions(-)
```

### `diff` between two branches

:::tip
If we are on the feature-branch, we can use `HEAD` instead of the branch name:

```shell
git diff dev...HEAD
git diff --stat dev...HEAD
```

:::

View **code** difference between two branches:

```shell
git diff dev...feature-branch
```

View **file** difference between two branches:

```shell
git diff --stat dev...feature-branch
# src/hooks/useCheckStatus.ts   | 135 +++++++++++++++++-----------
# src/core/utils/string.ts      |  45 ++++++--
# 2 files changed, 140 insertions(+), 40 deletions(-)
```

View **size** difference between two branches:

```shell
git diff --shortstat dev...HEAD
# 29 files changed, 3992 insertions(+), 406 deletions(-)

# To compare with a remote branch, use origin/ref:
git diff --shortstat origin/dev...HEAD
```

### `git diff A..B` vs `git diff A...B`

https://www.baeldung.com/ops/git-double-vs-triple-dot

https://www.dolthub.com/blog/2022-11-11-two-and-three-dot-diff-and-log

In `git diff`, the two-dot (`..`) and three-dot (`...`) notations determine which commits are compared to show changes.

- Two-dot (`git diff A..B`): Shows _all_ the differences between the final states of branch A and branch B. This is equivalent to `git diff A B`. Displays all changes between the two tips, **including changes made to A** after the branches diverged.
- Three-dot (`git diff A...B`): Shows the difference between the tip of branch B and the common ancestor (merge base) of A and B. This isolates **only the changes introduced by B since it branched off**, excluding any changes made to A. This is used in **pull requests**.

Note that `git log` uses these notations in the opposite manner: `git log A..B` shows commits in B but not A, while `git log A...B` shows commits in either A or B but not both. See [Two dot vs three dot diff and log](https://www.reddit.com/r/git/comments/ysgu23/two_dot_vs_three_dot_diff_and_log/).

## `log`

Docs: https://git-scm.com/docs/git-log

Viewing the Commit History: https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History

### View commit difference between two branches

```shell
git log --oneline main..HEAD
git log --oneline main..feature-branch
```

### View file line history/changes

Show the changes from line 135 to 140:

```shell
git log --pretty=short -u -L 135,140:file/path/something.txt
```

[source](https://stackoverflow.com/a/19757493/4034572)

### View log (commits) for a file or folder

```shell
# file
git log package.json
git log -- package.json

# folder
git log path/to/folder
git log -- path/to/folder
```

https://stackoverflow.com/questions/11950037/view-git-history-for-folder

### Search string on git history

```shell
git log -S something
git log -p -S something
```

[source](https://stackoverflow.com/a/4472267/4034572)

### Search by commit message

```shell
git log --all --grep='Something' # Commits whose message contain 'Something'
git log -i --grep='Something' # Case insensitive. Matches 'something' too
git log --invert-grep --grep='Something' # Commits whose message don't contain 'Something'

# Can have multiple patterns
git log --grep=<pattern1> --grep=<pattern2> # Commits whose message matches _any_ of the patterns
git log --all-match --grep=<pattern1> --grep=<pattern2> # Commits whose message matches _all_ of the patterns
```

[source](https://stackoverflow.com/a/7124949/4034572)

### Show author, author date, commit and commit date

```shell
git log --pretty=fuller
```

Output:

```
Author:     Albert Vila Calvo <albert@gmail.com>
AuthorDate: Sun Jun 2 20:41:28 2024 +0200
Commit:     Albert Vila Calvo <albert@gmail.com>
CommitDate: Sun Jun 2 20:42:45 2024 +0200
```

For the difference see:

- https://stackoverflow.com/questions/18750808/difference-between-author-and-committer-in-git
- https://stackoverflow.com/questions/11856983/why-is-git-authordate-different-from-commitdate
- https://stackoverflow.com/questions/6755824/what-is-the-difference-between-author-and-committer-in-git

## `show`

https://git-scm.com/docs/git-show

```shell
git show
git show HEAD~1
git show HEAD@{5} # Use 'git reflog' to see the reflog
git show @~1 # @ is the most recent commit
git show -2 # Last 2 commits, both
git show --summary # Do not show file changes, only header info
git show 2.4.0 # A tag
git show branch:file # Eg 'git show main:README.md'
git show main@{yesterday}
```

### Referencing previous commits

https://stackoverflow.com/questions/16062358/referring-to-the-previous-next-commit-in-git

https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection

## `add`

https://git-scm.com/docs/git-add

Stage all (new, modified and deleted): `git add -A` or `git add --all`

Stage new and modified files, but not deleted, in the current directory: `git add .`

Stage modified and deleted files, but not new files: `git add -u`

Add portions of file: `git add -p` [see commands here](https://stackoverflow.com/a/1085191/4034572)

## `reset`

https://git-scm.com/docs/git-reset

Unstage _all_ staged files:

```shell
git reset
```

Reset parts of a file: `git reset -p`

## `stash`

https://git-scm.com/docs/git-stash

### Stash with message

```shell
git stash push -m "Some message"
```

### Stash single file

```shell
git stash -- path/filename.txt
git stash -- path/filename1.txt path/filename2.txt
git stash -m "Some message" -- path/filename.txt
```

[source](https://stackoverflow.com/questions/5506339/how-can-i-git-stash-a-specific-file)

### Stash only staged changes

https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---staged

```shell
git stash push --staged
git stash push -S
git stash save --staged
git stash save -S
```

## `commit`

Multiline commit in the terminal:

```shell
git commit -F - <<'EOF'
The title
The description
More description
EOF
```

Useful for scripts. You can also do:

```shell
git commit -m "The title" -m "The description" -m "More description"
```

## `checkout`, `switch` and `restore`

What's the difference between 'git switch' and 'git checkout' `<branch>`? - https://stackoverflow.com/questions/57265785/whats-the-difference-between-git-switch-and-git-checkout-branch

https://www.infoq.com/news/2019/08/git-2-23-switch-restore/

https://github.com/git/git/blob/v2.23.0/Documentation/RelNotes/2.23.0.txt?plain=1#L61-L65

> Two new commands "git switch" and "git restore" are introduced to
> split "checking out a branch to work on advancing its history" and
> "checking out paths out of the index and/or a tree-ish to work on
> advancing the current history" out of the single "git checkout"
> command.

Docs:

- https://git-scm.com/docs/git-switch
- https://git-scm.com/docs/git-restore
- https://git-scm.com/docs/git-checkout

```shell
git checkout <branch>
git switch <branch>
```

```shell
git checkout -b <branch>
git switch -c <branch>
```
