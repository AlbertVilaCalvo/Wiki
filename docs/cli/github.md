---
title: GitHub
---

Command palette (Command+K): https://docs.github.com/en/get-started/using-github/github-command-palette

Code search:

- https://cs.github.com - New!
- https://github.com/search
- https://github.com/search/advanced

Locking down your GitHub-hosted Domains - https://news.ycombinator.com/item?id=32435134

Desktop app: https://desktop.github.com - https://github.com/desktop/desktop

View raw commit/patch: add `.patch` to the commit URL, eg https://github.com/AlbertVilaCalvo/Android-Udacity-Popular-Movies/commit/5c1218db157fc6ce5dfd9c9e98f0522c67241963.patch

## Hide personal email address

:::tip
Change the author of the last commit with `git commit --amend --reset-author`.
:::

Check "Block command line pushes that expose my email" in https://github.com/settings/emails.

To change the email _for a particular repository_ (not globally), go to https://github.com/settings/emails, copy the GitHub-provided `noreply` email address and then do:

```bash
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
