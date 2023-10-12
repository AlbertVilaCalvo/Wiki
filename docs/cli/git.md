---
title: Git
---

Source code mirror: https://github.com/git/git

Ask HN: Apps that are built with Git as the back end? - https://news.ycombinator.com/item?id=33261862

https://github.com/github/git-sizer. Compute various size metrics for a Git repository, flagging those that might cause problems. This tools is referenced in https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github.

## Branch models

Trunk Based Development - https://trunkbaseddevelopment.com

git-flow - https://nvie.com/posts/a-successful-git-branching-model

GitHub flow - https://docs.github.com/en/get-started/quickstart/github-flow

## Upstream branch

_Important: 'upstream' is about branches, not repositories_ - [see this](https://stackoverflow.com/questions/17122245/what-is-a-git-upstream#comment24775853_17122257).

Documentation of `git push -u`: https://git-scm.com/docs/git-push#Documentation/git-push.txt--u

```shell
git push -u origin main
git push --set-upstream origin main
```

To avoid having to do this we can set `autoSetupRemote` to true:

```shell
# Set value
git config --global push.autoSetupRemote true
git config --global --add --bool push.autoSetupRemote true

# Get value
git config --global push.autoSetupRemote
```

See https://twitter.com/JI/status/1546948817462800384 and https://stackoverflow.com/a/72401899/4034572.

## Clone a single branch only

This can be used for exampe to build a Docker container on some specific branch, in order to avoid fetching all the other -unnecessary- branches.

```shell
git clone git@github.com:SomeOrg/some-repository.git --branch branch_name --single-branch <local-folder>
```

https://stackoverflow.com/questions/1778088/how-do-i-clone-a-single-branch-in-git

https://stackoverflow.com/questions/1911109/how-do-i-clone-a-specific-git-branch

`--[no-]single-branch` docs: https://www.git-scm.com/docs/git-clone#Documentation/git-clone.txt---no-single-branch

## Undo last commit

If not pushed yet:

```shell
# keep changes
git reset --soft HEAD^

# discard changes - IMPORTANT: THIS ALSO DISCARDS ANYTHING NOT STAGED
git reset --hard HEAD^
```

[source](https://stackoverflow.com/a/6376039/4034572)

On a public commit:

```shell
git revert HEAD
```

Also see: [git undo: We can do better](https://blog.waleedkhan.name/git-undo/)

## Undo merge (eg if we commit on the `main` branch by mistake)

If not pushed yet:

```shell
# IMPORTANT: THIS ALSO DISCARDS ANYTHING NOT STAGED
git reset --hard HEAD^
```

https://stackoverflow.com/questions/5623162/undo-last-commit-merge

If pushed:

https://www.git-tower.com/learn/git/faq/undo-git-merge/

https://stackoverflow.com/questions/12534312/revert-a-merge-after-being-pushed

## Revert the changes done on a file (or files) in a branch, so that it's content is the same as develop or master

`git checkout <branch> -- <filename>`

Eg: `git checkout develop -- buildsystem/versions.gradle`

This leaves in the staging area the changes that bring the file to the same contents as develop. You need to commit then.

Note that you can put as many files as you want: `git checkout <branch> -- <filename> ... <filename>`.

You can also specify an entire folder: `git checkout main -- config/sync`.

And you can specify a file extension in a folder: `git checkout main -- seed_data/*.json`

[source1](https://stackoverflow.com/q/215718/4034572) [source2](https://stackoverflow.com/q/1817766/4034572)

## Merge changes from remote master branch to a feature branch without switching to master

```shell
git checkout some-branch
git fetch origin # gets you up to date with origin by getting all commits on all branches, but named 'origin/branch'
git merge origin/master # brings all commits in 'origin/master' to whatever branch we are; we could use --ff-only
git fetch origin master:master # update master if we have a feature branch checked out
```

```shell
git fetch origin && git merge origin/main && git fetch origin main:main
```

[source-part-1](https://stackoverflow.com/a/20103414/4034572)
[source-part-2](https://stackoverflow.com/a/17722977/4034572)

## View file line history/changes

Show the changes from line 135 to 140:

`git log --pretty=short -u -L 135,140:file/path/something.txt`

[source](https://stackoverflow.com/a/19757493/4034572)

## View log (commits) for files on a specific folder

```shell
git log -- path/to/folder
```

https://stackoverflow.com/questions/11950037/view-git-history-for-folder

## `git show`

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

## Referencing previous commits

https://stackoverflow.com/questions/16062358/referring-to-the-previous-next-commit-in-git

https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection

## GitHub pull request

https://gist.github.com/Chaser324/ce0505fbed06b947d962

http://blog.davidecoppola.com/2016/11/howto-contribute-to-open-source-project-on-github/

```
git remote add upstream git@github.com:Kotlin/kotlinx.coroutines.git
```

### Incorporating upstream changes

```shell
git fetch upstream master
git log --oneline --graph --decorate --all
git checkout master
git merge upstream/master
git push origin master
```

## error: pathspec 'some-remote-branch' did not match any file(s) known to git

When trying to checkout a remote branch (eg when reviewing a pull request), sometimes we get the error "error: pathspec 'some-remote-branch' did not match any file(s) known to git".

To fix it run `git fetch --all`.

More info: https://stackoverflow.com/questions/30800454/error-pathspec-test-branch-did-not-match-any-files-known-to-git

## Rebase

Squash, Merge, or Rebase? https://matt-rickard.com/squash-merge-or-rebase

Rebase Considered Harmful: https://www.fossil-scm.org/home/doc/trunk/www/rebaseharm.md - See [discussion on HN](https://news.ycombinator.com/item?id=32808229)

### Golden Rule of Rebasing

> The golden rule of `git rebase` is to never use it on _public_ branches.

https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing

### `--update-refs`

https://github.blog/2022-10-03-highlights-from-git-2-38/#rebase-dependent-branches-with-update-refs - https://news.ycombinator.com/item?id=33071275

## Rebase interactive

https://git-scm.com/docs/git-rebase

```shell
git rebase -i <commit you want to amend>^
# or with the alias
grbi <commit you want to amend>^
```

**r or reword** - amend commit message (note that if we are only rewording we don't need to do any of the following commands, just save the new commit message and we are done)

```shell
gc! (git commit --amend)
grbc (git rebase --continue)
```

**e or edit** - modify commit

```shell
// edit file(s)...
gaa (or) ga some/file.txt
gc! (git commit --amend)
# it's also possible to do just do gcan!, or gaa and then gcn!
grbc (git rebase --continue)
```

### Rebase until first (root) commit

`git rebase -i --root`

## Amend

https://git-scm.com/docs/git-commit

`-a`/`--all`: Automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected

`--no-edit`: Use the selected commit message without launching an editor. For example, git commit --amend --no-edit amends a commit without changing its commit message.

`alias | grep amend`:

```shell
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

```shell
git checkout --ours <filename>
git add <filename>
```

Nota: pel `<filename>` es pot fer servir `*` per seleccionar varis fitxers alhora, i també pot ser una carpeta.

## Overwrite/reset local branch like remote branch

```shell
git reset --hard @{u}
```

or

```shell
git fetch origin
git reset --hard origin/mybranch
```

[source1](https://stackoverflow.com/q/1628088/4034572), [source2](https://stackoverflow.com/a/8888015/4034572)

## Remove untracked files

```shell
git clean -f -d
```

## Prune

```shell
git remote prune origin
```

## Ensure merge without merge commit with `--ff-only`

From the [docs](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff):

> `--ff` is the default...
>
> With `--ff`, when possible resolve the merge as a fast-forward (only update the branch pointer to match the merged branch; do not create a merge commit). When not possible (when the merged-in history is not a descendant of the current history), create a merge commit.
>
> With `--ff-only`, resolve the merge as a fast-forward when possible. When not possible, refuse to merge and exit with a non-zero status.

```shell
git checkout -b feature-branch

# make some commits

git rebase main
git checkout main
git merge --ff-only feature-branch
```

[source](https://stackoverflow.com/a/16358699/4034572)

[--ff-only docs](https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff-only)

## See commit and code differences between two branches

```shell
# commits
git log main..feature-branch
# code
git diff main..feature-branch
# code for specific file, if we are on the feature-branch
git diff main.. path/to/file.ts
# files changed
git diff --name-status main..feature-branch
```

Note that you can have 3 dots (`...`). And if you've already switched to `feature-branch` you can use `git log main..`.

[See source](https://stackoverflow.com/q/13965391/4034572)

## Squash all commits on a branch

Can be used to split a big pull request into various PR by creating several commits.

```shell
git checkout your-branch
git reset $(git merge-base master-or-develop your-branch-name)
```

This leaves all changes on the branch at the staging area. Then you can `git add .` and `git commit`.

[source](https://stackoverflow.com/a/25357146/4034572)

## Stash

https://git-scm.com/docs/git-stash

### Stash with message

```shell
git stash push -m "Some message"
```

### Stash only staged changes

https://git-scm.com/docs/git-stash#Documentation/git-stash.txt---staged

```shell
git stash push --staged
git stash push -S
git stash save --staged
git stash save -S
```

## Tags

View: `git show 2.4.0`

Delete local tag: `git tag -d 2.4.0`

Delete remote tag: `git push -d origin 2.4.0`

Push single tag: `git push origin <tag_name>`

Push _all_ tags (warning: should not be used generally, [see why in this comment](https://stackoverflow.com/questions/5195859/how-do-you-push-a-tag-to-a-remote-repository-using-git#comment40809114_5195913)): `git push -–tags` or `git push origin --tags`

### Always use annotated tags

```shell
git tag -a v1.0
```

They have extra information like author, date, SHA and message ([more info](https://stackoverflow.com/q/4971746/4034572)).

## Search string on git history

```shell
git log -S something
git log -p -S something
```

[source](https://stackoverflow.com/a/4472267/4034572)

## Search by commit message

```shell
git log --all --grep='Something'
```

[source](https://stackoverflow.com/a/7124949/4034572)

## Remove carriage return

If you see `^M` run `sed -i.bak $'s/\r//' filename` (with backup) or `sed -i '' -e $'s/\r//' filename` (no backup).

[source](https://stackoverflow.com/a/21622340/4034572)

## Branch name

### Set the default branch name for new repositories

`git config --global init.defaultBranch <name>`

### Rename local branch only

`git branch (-m | -M) [<oldbranch>] <newbranch>`

Eg to rename master to main:

- If you are in master: `git branch -m main`.
- If you are not in master `git branch -m master main`.

### Rename local and remote branch

```shell
# Rename:
git branch -m new-name # if we are on the branch
git branch -m old-name new-name # if we are not

# Delete the old-name remote branch and push the new-name local branch:
git push origin :old-name new-name
```

[source and more info](https://stackoverflow.com/a/45561865/4034572)

#### Fix error

When doing `git push origin :master main` sometimes we get this error:

```
 ! [remote rejected] master (refusing to delete the current branch: refs/heads/master)
error: failed to push some refs to 'github.com:AlbertVilaCalvo/JavaScript-Udacity-Memory-Game.git'
```

This happens when eg we are renaming the branch `master` to `main` on a GitHub/Bitbucket repository that has `master` set as the default branch. To fix this, go to the GitHub website -> navigate to the repository -> Settings tab -> Branches, and change the 'Default branch'. After doing this, try again and it will work. (On Bitbucket, to change the default branch go to the repository -> Repository settings -> Repository details tab, expand the ADVANCED section and change 'Main branch'.)

## Prevent commiting on main/master branch by mistake

Add this `.git/hooks/pre-commit`.

```shell
#!/bin/sh

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "main" ]; then
  echo "You can't commit directly to main branch"
  exit 1
fi
```

Then make it executable with `chmod +x .git/hooks/pre-commit`.

From https://stackoverflow.com/questions/40462111/prevent-commits-in-master-branch and https://stackoverflow.com/questions/17293938/prevent-commits-in-a-local-branch.

## Merge 2 git repositories

From https://stackoverflow.com/a/10548919/4034572

Merge `project-A` into `project-B`.

```shell
cd /path/to/project-B
git fetch /path/to/project-A main
git merge --allow-unrelated-histories FETCH_HEAD
```

Seguint aquest post: https://stackoverflow.com/a/10548919/4034572. Commands:

```shell
git remote add backblaze ../Backblaze_exclusion_rule
git fetch backblaze --tags
git merge --allow-unrelated-histories backblaze/main
```

Be careful with conflicts! Eg if both projects have a README.md, it's better to re-name one of them first (do commit), otherwise you'll have to deal with conflicts.

To put `project-A` into a **subfolder** of `project-B` in a simple way, before running the commands above, first create a folder inside `project-B`, move all the files there, and then commit. Afterwards run the commands above.

`--allow-unrelated-histories` documentation: https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---allow-unrelated-histories

More info:

- https://medium.com/@checko/merging-two-git-repositories-into-one-preserving-the-git-history-4e20d3fafa4e
- https://blog.jdriven.com/2021/04/how-to-merge-multiple-git-repositories/

## Ignore mass reformatting with `--ignore-rev` and `git config blame.ignoreRevsFile`

https://news.ycombinator.com/item?id=27643608

https://akrabat.com/ignoring-revisions-with-git-blame/

## Config

`git config` REFERENCE - https://git-scm.com/docs/git-config

Customizing Git - Git Configuration - https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration

Git Commands - Setup and Config - https://git-scm.com/book/en/v2/Appendix-C%3A-Git-Commands-Setup-and-Config

There are 3 type of settings:

|                                     | Location         | `git config` option |
| ----------------------------------- | ---------------- | ------------------- |
| System-wide (applies to every user) | `/etc/gitconfig` | `--system`          |
| User-specific                       | `~/.gitconfig`   | `--global`          |
| Repo-specific                       | `.git/config`    | `--local`           |

Show global config:

```shell
git config --list
git config -l
less ~/.gitconfig
bat ~/.gitconfig
```

```shell title="~/.gitconfig"
[core]
        editor = emacs -nw
[user]
        name = Albert Vila Calvo
        email = my@email.com
[init]
        defaultBranch = main
```

### First time setup

Getting Started - First-Time Git Setup - https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup

```shell
git config --global user.name "Albert Vila Calvo"
git config --global user.email my@email.com
git config --global core.editor "emacs -nw"
git config --global init.defaultBranch main
git config --global push.autoSetupRemote true
```

### Change email on a specific repo only

Useful if you are using your personal computer for work or vice versa.

```shell
git config --local user.email my@email.com
```

## Change colors

All the things that can be customized are listed at https://git-scm.com/docs/git-config. Search for eg "color.diff".

Accepted color values: https://git-scm.com/docs/git-config#Documentation/git-config.txt-color

You can give it numbers, from 0 to 255, using the ANSI 256-color mode.
Tip: test the color with `echo $(git config --get-color "" "120 bold reverse") color test $(git config --get-color "" reset)` ([source](https://stackoverflow.com/questions/21539607/git-color-ui-support-for-256-colors#comment34541387_22674150)).

Default color values: https://shallowsky.com/blog/programming/gitcolors.html

### diff

Available slots:

- https://git-scm.com/docs/git-config#Documentation/git-config.txt-colordiffltslotgt
- https://github.com/git/git/blob/79f2338b3746d23454308648b2491e5beba4beff/diff.c#L88-L109

```shell
[color "diff"]
    meta = blue
```

## Diff customization

- https://github.com/so-fancy/diff-so-fancy
- https://github.com/dandavison/delta
- https://github.com/Wilfred/difftastic
  - `GIT_EXTERNAL_DIFF=difft git diff`
  - `GIT_EXTERNAL_DIFF=difft git log -p --ext-diff`
  - `GIT_EXTERNAL_DIFF=difft git show --ext-diff`

## Commit message format

Conventional Commits: https://www.conventionalcommits.org

Semantic Commit Messages: https://sparkbox.com/foundry/semantic_commit_messages

https://github.com/conventional-changelog/commitlint

Extra info:

- https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/
- https://stackoverflow.com/questions/26944762/when-to-use-chore-as-type-of-commit-message
- https://karma-runner.github.io/6.3/dev/git-commit-msg.html

## Shell script execution permissions

Make a shell script executable when you pull a repository.

https://stackoverflow.com/questions/40978921/how-to-add-chmod-permissions-to-file-in-git

Note: after running `git update-index --chmod=+x path/to/file`, then you need to commit.

After making the file executable, when doing `git ls-files --stage` it should have 100755.
