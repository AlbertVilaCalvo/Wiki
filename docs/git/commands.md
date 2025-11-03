---
title: Git Commands
sidebar_label: Commands
---

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

## `log`

Docs: https://git-scm.com/docs/git-log

Viewing the Commit History: https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History

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
git log -i --grep='Something' # Case insensitive. Matches 'something' too
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
