---
title: Claude
---

## CLI

```shell
claude --help
claude doctor # diagnose issues with your setup
claude auth login
claude upgrade # 'claude update' also works
claude --resume # Interactive picker with sessions to resume
claude --resume 814f4f11-4aa1-4339-99da-7b1d098205b7
```

## HANDOFF.md

https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md

`/handoff` is my new favourite skill - https://www.youtube.com/watch?v=dtAJ2dOd3ko

https://github.com/ykdojo/claude-code-tips/blob/main/skills/handoff/SKILL.md

https://github.com/willseltzer/claude-handoff

https://github.com/thepushkarp/handoff

## Notes from the course https://master.dev/courses/claude-code

### Model

The model (Opus, Sonnet or Haiku) reasons, but it can't do anything in your machine, it can't edit your files, it doesn't have your git history, etc. Is the harness (Claude Code) that edits the files, runs commands, etc. Claude Code exposes the tools (like the shell) to the model.

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

