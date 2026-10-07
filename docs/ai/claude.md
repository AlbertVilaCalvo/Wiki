---
title: Claude
---

System prompts - https://platform.claude.com/docs/en/release-notes/system-prompts/overview - https://news.ycombinator.com/item?id=49319556 - With git history: https://github.com/simonw/research/tree/main/extract-system-prompts

From the release notes of the macOS app (September 21, 2026):

> Added `AGENTS.md` support: in a folder with no `CLAUDE.md`, Claude reads `AGENTS.md` for project instructions (not yet in third-party deployments).

## CLI

```shell
claude --help
claude doctor # diagnose issues with your setup
claude auth login
claude upgrade # 'claude update' also works
claude --resume # Interactive picker with sessions to resume
claude --resume 814f4f11-4aa1-4339-99da-7b1d098205b7
```

## Code review

### `/code-review`

The `/code-review` slash command runs locally.

```
/code-review  [low|medium|high|xhigh|max] [--fix] [--comment] [<pr#>|<branch>|<path>]
```

Options:

- `--fix` applies findings to the working tree.
- `--comment` posts findings as inline comments on the specific lines.

Effort levels:

- `low/medium`: fewer, high-confidence findings.
- `high/xhigh/max`: broader, more speculative, may include uncertain findings.
- `ultra`: same than `claude ultrareview`. Not available to me, see below.

### `claude ultrareview`

https://code.claude.com/docs/en/ultrareview

It doesn't run the review on your machine. It fires off a cloud session (the same infrastructure behind `claude --cloud`), which clones the repo remotely, fans out a multi-agent review — several agents reviewing along different dimensions, then an adversarial verify pass to kill false positives.

I tried, but it said it was unavailable. According to [the docs](https://code.claude.com/docs/en/ultrareview) it is not available to everybody, since it is a research preview feature.

If you run `claude --help` it says:

```
ultrareview [options] [target]        Run a cloud-hosted multi-agent code review of the current branch (or a PR number / base branch) and print the findings
```

Run `claude ultrareview 982 --timeout 45` to review PR #982 for example.

Options:

- `--timeout <minutes>`: sets a maximum wait time for the review to complete (default is 30 minutes). Increase it if the PR is large. It took 40 minutes to me to run `/code-review max`.
- `--post`: posts the findings to the PR as you, as one plain comment. Default is -`-no-post`, i.e. print only.
- `--json`: gives you the raw payload (`bugs.json`) instead of formatted text, which is handy if you want Claude triage the findings afterwards. False positives are likely on the parity rules.

## HANDOFF.md

https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md

`/handoff` is my new favourite skill - https://www.youtube.com/watch?v=dtAJ2dOd3ko

https://github.com/ykdojo/claude-code-tips/blob/main/skills/handoff/SKILL.md

https://github.com/willseltzer/claude-handoff

https://github.com/thepushkarp/handoff

## Notes from the course https://master.dev/courses/claude-code

### Model

The model (Opus, Sonnet or Haiku) reasons, but it can't do anything in your machine, it can't edit your files, it doesn't have your git history, etc. Is the [harness](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode) (Claude Code) that edits the files, runs commands, etc. Claude Code exposes the tools (like the shell) to the model.

Opus

- When a task needs deep reasoning: the answer isn't just in the code
- Problems with hidden causes
  - A failure that makes no sense logically. The cause can be multiple layers
- Hard design choices
  - Several requirements conflict, you need an approach that satisfies all
- Slowest and most expensive

Sonnet

- When the answer to a task needs to understand the code
- Everyday engineering
  - Build a feature, fix a bug, refactor a module, add a test
- Understanding what's happening
  - Following cause and effect through the codebase to explain what's happening
- Perfect balance between capability, speed, and cost

Haiku

- When a task has no real decisions, just steps to execute
- Mechanical work
  - Find, list, reformat, rename, extract, summarize. No judgment required
- Following simple steps
  - Tasks where the steps are already written out. The model only has to execute, not decide
- Not great at reasoning, but fast and cheap

### Stateless

The model is stateless. It doesn't remember anything between the calls. The harness (Claude Code) keeps track of the state and provides it to the model.

State is your files, conversation history, environment (eg OS), tone, etc.

:::important
Changing a model in a session breaks the cache. Don't switch models in the middle of a session; start a new session instead.
:::

## Notes from Mastering Claude Code in 30 minutes

https://www.youtube.com/watch?v=6eBSHbLKuN0

### Setup

Do this when you first install Claude Code ([source](https://www.youtube.com/live/6eBSHbLKuN0?t=192)):

- `/allowed-tools`
- `/terminal-setup`
- `/install-github-app`
- `/config`

Code is not indexed, is not uploaded anywhere, there is no remote database with your code. Thus, there is no setup, no wait for indexing, you can start using it right away.

