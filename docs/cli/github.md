---
title: GitHub
---

Status - ttps://www.githubstatus.com

Command palette (Command+K) - https://docs.github.com/en/get-started/using-github/github-command-palette

Code search:

- https://cs.github.com - New!
- https://github.com/search
- https://github.com/search/advanced

Locking down your GitHub-hosted Domains - https://news.ycombinator.com/item?id=32435134

Desktop app: https://desktop.github.com - https://github.com/desktop/desktop

View raw commit/patch: add `.patch` to the commit URL, eg https://github.com/AlbertVilaCalvo/Android-Udacity-Popular-Movies/commit/5c1218db157fc6ce5dfd9c9e98f0522c67241963.patch

List of cool features of Git and GitHub - https://github.com/tiimgreen/github-cheat-sheet

Hub CLI - https://github.com/mislav/hub

## SSH

Doing `ssh -T git@github.com` should say:

> Hi AlbertVilaCalvo! You've successfully authenticated, but GitHub does not provide shell access.

Doing `cat ~/.ssh/config` should show:

```shell
Host *.github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/github_personal
```

### Multiple SSH keys (for different GitHub accounts) on the same computer

Eg if we have a work GitHub account and want to commit on a personal repository on the work computer.

Resources followed:

- https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca
- https://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config
- https://stackoverflow.com/questions/29023532/how-do-i-use-multiple-ssh-keys-on-github

Here I assume that I already have the SSH setup for the work GitHub account.

Note that this approach does not use add multiple entries to the `~/.ssh/config` file. It's for specific repositories. It has the advantage that you don't need to change how you `git clone` a repository.

Create the new SSH key for the personal account: `ssh-keygen -t rsa -C "mypersonal@email.com" -f github_personal`

Copy `github_personal.pub` with `pbcopy < github_personal.pub` and add it at the GitHub website at https://github.com/settings/keys.

Add the SSH to keychain permanently with `ssh-add github_personal`. You'll need to type the passphrase. It will say "Identity added: github_personal (mypersonalemail@gmail.com)"

Update: to avoid the error "ERROR: Permission to AlbertVilaCalvo/XYZ.git denied to AlbertWork. fatal: Could not read from remote repository. Please make sure you have the correct access rights and the repository exists." I've had to add this line to the `~/.zshrc`: `ssh-add --apple-use-keychain ~/.ssh/github_personal`.

Clone the personal repository you want to contribute to. If you get the error "Please make sure you have the correct access rights and the repository exists", clone the repo with a specific SSH key with `GIT_SSH_COMMAND="ssh -i ~/.ssh/github_personal" git clone git@github.com:AlbertVilaCalvo/zshrc.git`. [source](https://superuser.com/questions/232373/how-to-tell-git-which-private-key-to-use)

Once the repo is cloned, configure it to use the personal SSH key: `git config core.sshCommand 'ssh -i ~/.ssh/github_personal'`. I took this from https://stackoverflow.com/a/50746763/4034572

Important: don't forget to set the personal email on that repository, otherwise the work account will appear as a contributor on the personal repository: `git config --local user.email mypersonal@email.com`

## Hide personal email address

:::tip
Change the author of the last commit with `git commit --amend --reset-author`.
:::

Check "Block command line pushes that expose my email" in https://github.com/settings/emails.

To change the email _for a particular repository_ (not globally), go to https://github.com/settings/emails, copy the GitHub-provided `noreply` email address and then do:

```shell
git config user.email "{ID}+{username}@users.noreply.github.com "
```

You can check the current email with `git config [--global] user.email`.

Docs:

- https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/blocking-command-line-pushes-that-expose-your-personal-email-address
- https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address

## Trending

Trending repositories this week: https://github.com/trending?since=weekly&spoken_language_code=en

Alternatives (from https://news.ycombinator.com/item?id=32681319):

- https://github.com/explore
- https://ossinsight.io/
- https://trends.vercel.app/
- https://github.com/vitalets/github-trending-repos (they use https://github.com/trending/ according to https://news.ycombinator.com/item?id=32687015)

## Shortcuts

https://docs.github.com/en/get-started/using-github/keyboard-shortcuts

Press ? to view the shortcuts.

### Browse code in web editor

- Click '.' - Announcement: https://twitter.com/github/status/1425505817827151872
- Add '1s' - For example: https://github1s.com/Microsoft/TypeScript/

Docs: https://docs.github.com/en/codespaces/the-githubdev-web-based-editor

## CLI

https://cli.github.com/

https://docs.github.com/en/github-cli

https://github.com/cli/cli
