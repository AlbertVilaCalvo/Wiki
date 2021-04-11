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
// or
grbi <commit you want to amend>^
```
**r reword** - amend commit message
```
gc!
grbc
```
**e edit** - modify commit
```
// edit file(s)
gaa (or) ga some/file.txt
gc!
grbc
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

## Misc

### Remove untracked files
```
git clean -f -d
```

### Prune
```
git remote prune origin
```

### See commit differences between two branches
```
git log master..feature-branch
```
If you've already switched to `feature-branch` you can use `git log master..`.

[source](https://stackoverflow.com/q/13965391/4034572)

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

### Rename branch, eg master to main

`git branch (-m | -M) [<oldbranch>] <newbranch>`

If you are in master: `git branch -M main`

Set the default branch name for new repositories: `git config --global init.defaultBranch <name>`
