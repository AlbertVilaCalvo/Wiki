---
title: Git
---

## Undo last commit

If not pushed yet
```shell
# keep changes
git reset --soft HEAD^

# discard changes
git reset --hard HEAD^
```
[source](https://stackoverflow.com/a/6376039/4034572)

On a public commit
```
git revert HEAD
```

Also see: [git undo: We can do better](https://blog.waleedkhan.name/git-undo/)

## Merge changes from remote master branch to a feature branch without switching to master
```shell
git checkout some-branch
git fetch origin # gets you up to date with origin by getting all commits on all branches, but named 'origin/branch'
git merge origin/master # brings all commits in 'origin/master' to whatever branch we are; we could use --ff-only
git fetch origin master:master # update master if we have a feature branch checked out
```
[source-part-1](https://stackoverflow.com/a/20103414/4034572)
[source-part-2](https://stackoverflow.com/a/17722977/4034572)

## Revert the changes done on a file (or files) in a branch, so that it's content is the same than develop or master

`git checkout <branch> -- <filename>`

Eg: `git checkout develop -- buildsystem/versions.gradle`

This leaves in the staging area the changes that bring the file to the same contents than develop. You need to commit then.

Note that you can put as many files as you want: `git checkout <branch> -- <filename> ... <filename>`

[source1](https://stackoverflow.com/q/215718/4034572) [source2](https://stackoverflow.com/q/1817766/4034572)

## View file line history/changes

Show the changes from line 135 to 140:

`git log --pretty=short -u -L 135,140:file/path/something.txt`

[source](https://stackoverflow.com/a/19757493/4034572)

## GitHub pull request

https://gist.github.com/Chaser324/ce0505fbed06b947d962

http://blog.davidecoppola.com/2016/11/howto-contribute-to-open-source-project-on-github/

```
git remote add upstream git@github.com:Kotlin/kotlinx.coroutines.git
```

### Incorporating upstream changes
```
git fetch upstream master
git log --oneline --graph --decorate --all
git checkout master`
git merge upstream/master
git push origin master
```

## Rebase interactive

https://git-scm.com/docs/git-rebase

```
git rebase -i <commit you want to amend>^
// or with the alias
grbi <commit you want to amend>^
```
**r or reword** - amend commit message (note that if we are only rewording we don't need to do any of the following commands, just save the new commit message and we are done)
```
gc! (git commit --amend)
grbc (git rebase --continue)
```
**e or edit** - modify commit
```
// edit file(s)...
gaa (or) ga some/file.txt
gc! (git commit --amend)
grbc (git rebase --continue)
```

### Rebase until first (root) commit

`git rebase -i --root`


## Amend

https://git-scm.com/docs/git-commit

`-a`/`--all`: Automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected

`--no-edit`: Use the selected commit message without launching an editor. For example, git commit --amend --no-edit amends a commit without changing its commit message.

`alias | grep amend`:

```
'gc!'='git commit -v --amend'
'gcn!'='git commit -v --no-edit --amend'

'gca!'='git commit -v -a --amend'
'gcan!'='git commit -v -a --no-edit --amend'
```

### Amend undo

https://stackoverflow.com/questions/1459150/how-to-undo-git-commit-amend-done-instead-of-git-commit


## Fix conflict 'both added'

https://stackoverflow.com/questions/9823692/resolving-a-both-added-merge-conflict-in-git

Estic a una branca i faig merge de `dev` a la meva branca. Si vull lo de `dev` faig:
```
git checkout --theirs <filename>
git add <filename>
```
I si vull lo de la meva branca:
```
git checkout --ours <filename>
git add <filename>
```
Nota: pel `<filename>` es pot fer servir `*` per seleccionar varis fitxers alhora, i també pot ser una carpeta.


## Misc

### Reset local branch like remote branch

```
git reset --hard @{u}
```
or
```
git fetch origin
git reset --hard origin/mybranch
```

[source](https://stackoverflow.com/q/1628088/4034572)

### Remove untracked files
```
git clean -f -d
```

### Prune
```
git remote prune origin
```

### Ensure merge without merge commit with `--ff-only`

From the [docs](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff):

> `--ff` is the default...
>
> With `--ff`, when possible resolve the merge as a fast-forward (only update the branch pointer to match the merged branch; do not create a merge commit). When not possible (when the merged-in history is not a descendant of the current history), create a merge commit.
>
> With `--ff-only`, resolve the merge as a fast-forward when possible. When not possible, refuse to merge and exit with a non-zero status.

```
git checkout -b feature-branch

# make some commits

git rebase main
git checkout main
git merge --ff-only feature-branch
```
[scource](https://stackoverflow.com/a/16358699/4034572)

[--ff-only docs](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff-only)

### See commit and code differences between two branches

```bash
# commits
git log main..feature-branch
# code
git diff main..feature-branch
# files changed
git diff --name-status main..feature-branch
```
Note that you can have 3 dots (`...`). And if you've already switched to `feature-branch` you can use `git log main..`.

[See source](https://stackoverflow.com/q/13965391/4034572)

### Squash all commits on a branch
```
git checkout your-branch
git reset $(git merge-base master-or-develop your-branch-name)
```
This leaves all changes on the branch at the staging area. Then you can `git add .` and `git commit`.

[source](https://stackoverflow.com/a/25357146/4034572)

### Stash with message
```
git stash push -m "Some message"
```
https://git-scm.com/docs/git-stash

### Always use annotated tags
```
git tag -a v1.0
```

They have extra information like author, date, SHA and message ([more info](https://stackoverflow.com/q/4971746/4034572)).

### Search string on git history
```
git log -S something
git log -p -S something
```

[source](https://stackoverflow.com/a/4472267/4034572)

### Remove carriage return

If you see `^M` run `sed -i.bak $'s/\r//' filename` (with backup) or `sed -i '' -e $'s/\r//' filename` (no backup).

[source](https://stackoverflow.com/a/21622340/4034572)

### Rename local branch only

Eg rename master to main.

`git branch (-m | -M) [<oldbranch>] <newbranch>`

If you are in master: `git branch -m main`. If you are not do `git branch -m master main`.

Set the default branch name for new repositories: `git config --global init.defaultBranch <name>`

### Rename local _and_ remote branch

Note that this assumes that we are on the branch that we want to rename. If we are not do `git branch -m old-name new-name`.

```bash
# Rename:
git branch -m new-name # if we are on the branch
git branch -m old-name new-name # if we are not

# Delete the old-name remote branch and push the new-name local branch:
git push origin :old-name new-name
```

[source and more info](https://stackoverflow.com/a/45561865/4034572)

### Ignore mass reformatting with `--ignore-rev` and `git config blame.ignoreRevsFile`

https://news.ycombinator.com/item?id=27643608

https://akrabat.com/ignoring-revisions-with-git-blame/
