---
title: Codex
---

https://openai.com/codex/

https://developers.openai.com/codex

https://github.com/openai/codex

Is like Claude Code + Cowork, but better [source](https://youtu.be/LWx4FGam2aQ?t=478)

It can ([source](https://www.youtube.com/watch?v=LWx4FGam2aQ)):

- Build an app
- Control your computer
- Create automations ([example](https://youtu.be/LWx4FGam2aQ?t=1786))
- Create any type of document (Excel, Word, PowerPoint, etc)
- Create videos with Remotion (like [this one](https://x.com/vibecodeapp_/status/2011962194993561934))

See what it can do at https://www.instagram.com/p/DYGEioihGfw/

Cmd + G opens the terminal. You can run Claude Code there.

## Codex vs Claude

https://steipete.me/posts/2025/shipping-at-inference-speed

> I’m writing this post here while codex crunches through a huge, multi-hour refactor and un-slops older crimes of Opus 4.0. People on Twitter often ask me what’s the big difference between Opus and codex and why it even matters because the benchmarks are so close. **IMO it’s getting harder and harder to trust benchmarks - you need to try both to really understand.** Whatever OpenAI did in post-training, **codex has been trained to read LOTS of code before starting.**
>
> **Sometimes it just silently reads files for 10, 15 minutes before starting to write any code.** On the one hand that’s annoying, on the other hand that’s amazing because **it greatly increases the chance that it fixes the right thing**. **Opus on the other hand is much more eager - great for smaller edits - not so good for larger features or refactors**, it often doesn’t read the whole file or misses parts and then delivers inefficient outcomes or misses sth. I noticed that **even tho codex sometimes takes 4x longer than Opus for comparable tasks, I’m often faster because I don’t have to go back and fix the fix**, sth that felt quite normal when I was still using Claude Code.

## `~/.codex/config.toml`

From https://steipete.me/posts/2025/shipping-at-inference-speed

```toml
model = "gpt-5.2-codex"
model_reasoning_effort = "high"
tool_output_token_limit = 25000
# Leave room for native compaction near the 272–273k context window.
# Formula: 273000 - (tool_output_token_limit + 15000)
# With tool_output_token_limit=25000 ⇒ 273000 - (25000 + 15000) = 233000
model_auto_compact_token_limit = 233000
[features]
ghost_commit = false
unified_exec = true
apply_patch_freeform = true
web_search_request = true
skills = true
shell_snapshot = true

[projects."/Users/steipete/Projects"]
trust_level = "trusted"
```
