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

https://docs.github.com/en/authentication/connecting-to-github-with-ssh

To test if SSH is set up correctly run `ssh -T git@github.com`. It should say:

> Hi AlbertVilaCalvo! You've successfully authenticated, but GitHub does not provide shell access.

If it says "git@github.com: Permission denied (publickey).", it's not.

Doing `cat ~/.ssh/config` should show:

```shell
Host *.github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/github_personal
```

or

```shell
Host github.com bitbucket.org
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

### Misc

> If you haven't used your SSH key for a year, then GitHub will automatically delete your inactive SSH key as a security precaution. For more information, see [Deleted or missing SSH keys](https://docs.github.com/en/authentication/troubleshooting-ssh/deleted-or-missing-ssh-keys).

### Add new SSH key

Do this when you set up a new Mac.

If you already have an SSH key, you can use it - see [Checking for existing SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys). If you don't have a key or you don't want to use it, you need to generate a new key, add the private key (eg id_rsa) to the SSH agent, and add the public key (eg id_rsa.pub) to the account on GitHub.

You can optionally require a passphrase:

> With SSH keys, if someone gains access to your computer, the attacker can gain access to every system that uses that key. To add an extra layer of security, you can add a passphrase to your SSH key.

> When you generate an SSH key, you can add a passphrase to further secure the key. Whenever you use the key, you must enter the passphrase. If your key has a passphrase and you don't want to enter the passphrase every time you use the key, you can add your key to the SSH agent. The SSH agent manages your SSH keys and remembers your passphrase.

See [Working with SSH key passphrases](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/working-with-ssh-key-passphrases).

See detailed instructions for adding a new key at https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key

Create a new SSH key, using the email as a comment (a label):

```shell
ssh-keygen -t ed25519 -C "your_email@example.com" # default name is id_ed25519
ssh-keygen -t ed25519 -C "your_email@example.com" -f github_personal
# If Ed25519 is not supported use
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f github_personal
```

Start the ssh-agent in the background:

```shell
eval "$(ssh-agent -s)" # Agent pid 38878
```

Add the following to `~/.ssh/config` (omitting `UseKeychain` if there's no passphrase):

```shell
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519
```

Add the private key to the ssh-agent and, if there's a passphrase, store the passphrase in the keychain with `--apple-use-keychain` (you are prompted to enter the passphrase then):

```shell
# No passphrase
ssh-add ~/.ssh/id_ed25519
# With passphrase
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

It will say "Identity added: /Users/albert/.ssh/id_ed25519 (your_email@example.com)". For more info, see [How can I permanently add my SSH private key to Keychain so it is automatically available to ssh?](https://apple.stackexchange.com/questions/48502/how-can-i-permanently-add-my-ssh-private-key-to-keychain-so-it-is-automatically).

Finally, add the public key to GitHub.com. See instructions at https://docs.gzithub.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account. Go to https://github.com/settings/keys and click 'New SSH key'. Give it a name, choose 'Authentication Key' (we are not signing commits) and paste the public key:

```shell
pbcopy < ~/.ssh/id_ed25519.pub
```

### Multiple SSH keys (for different GitHub accounts) on the same computer

Eg if we have a work GitHub account and want to commit on a personal repository on the work computer.

Resources followed:

- https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca
- https://stackoverflow.com/questions/3225862/multiple-github-accounts-ssh-config
- https://stackoverflow.com/questions/29023532/how-do-i-use-multiple-ssh-keys-on-github

Here I assume that I already have the SSH setup for the work GitHub account.

Note that this approach does not use add multiple entries to the `~/.ssh/config` file. It's for specific repositories. It has the advantage that you don't need to change how you `git clone` a repository.

Create the new SSH key for the personal account: `ssh-keygen -t ed25519 -C "mypersonal@email.com" -f github_personal`. (If Ed25519 is not supported, use `ssh-keygen -t rsa -b 4096 -C "mypersonal@email.com" -f github_personal`.)

Copy `github_personal.pub` with `pbcopy < github_personal.pub` and add it at the GitHub website at https://github.com/settings/keys.

Add the SSH to keychain permanently with `ssh-add --apple-use-keychain github_personal` if there's a passphrase, otherwise use `ssh-add github_personal`. You'll need to type the passphrase if there's one. It will say "Identity added: github_personal (mypersonalemail@gmail.com)"

Update: to avoid the error "ERROR: Permission to AlbertVilaCalvo/XYZ.git denied to AlbertWork. fatal: Could not read from remote repository. Please make sure you have the correct access rights and the repository exists." I've had to add this line to the `~/.zshrc`: `ssh-add --apple-use-keychain ~/.ssh/github_personal`.

Update 2: instead of adding `ssh-add ...` to `~/.zshrc`, this error may be fixed by having a `~/.ssh/config` file with:

```shell
Host github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/github_personal
```

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
