---
title: AI Tools
---

https://github.com/open-webui/open-webui

https://github.com/openai/codex

https://opencode.ai - https://github.com/sst/opencode - The open source coding agent.

https://www.cursor.com - Standalone editor based on VSCode

https://windsurf.com - Standalone editor based on VSCode, but you can use the Cascade agentic AI on JetBrains and VSCode with plugins:

- VSCode plugin - https://marketplace.visualstudio.com/items?itemName=Codeium.codeium
- JetBrains plugin - https://plugins.jetbrains.com/plugin/20540-windsurf-plugin-formerly-codeium-for-python-js-java-go--

https://www.augmentcode.com

- VSCode plugin - https://marketplace.visualstudio.com/items?itemName=augment.vscode-augment
- JetBrains plugin - https://plugins.jetbrains.com/plugin/24072-augment

https://kiro.dev - Standalone editor based on VSCode. By AWS

https://aws.amazon.com/q/developer

https://aistudio.google.com/prompts/new_chat - https://gemini.google.com/?hl=en - https://ai.google.dev

https://devin.ai

https://cline.bot - https://github.com/cline/cline - VSCode plugin

https://roocode.com - https://github.com/RooVetGit/Roo-Code - VSCode plugin

https://aider.chat - https://github.com/Aider-AI/aider - AI pair programming in your terminal

https://github.com/block/goose - Local AI agent

https://lovable.dev - Create apps and websites by chatting with AI

https://bolt.new

https://replit.com

https://www.blackbox.ai

https://github.com/spark - https://docs.github.com/en/copilot/tutorials/easy-apps-with-spark - https://docs.github.com/en/copilot/tutorials/build-apps-with-spark

Why I'm Betting Against AI Agents in 2025 (Despite Building Them) - https://utkarshkanwat.com/writing/betting-against-agents

## Models

**AI model comparison** - https://docs.github.com/en/copilot/reference/ai-models/model-comparison

https://docs.github.com/en/copilot/tutorials/compare-ai-models

https://code.visualstudio.com/docs/copilot/language-models#_choose-the-right-model-for-your-task

OpenVLM Leaderboard - https://huggingface.co/spaces/opencompass/open_vlm_leaderboard

GPT-4o → o means omni. Is [multimodal](https://en.wikipedia.org/wiki/Multimodal_learning): it accepts as input any combination of text, audio, image and video and generates any combination of text, audio and image outputs.

## Prompts

Use English.

https://www.promptingguide.ai

Examples of prompts - https://docs.github.com/en/copilot/tutorials/copilot-chat-cookbook

https://github.com/github/awesome-copilot/tree/main/prompts

Effective Prompt Engineering in 2025 - Igor Kupczyński - https://kupczynski.info/posts/prompt-engineering-in-2025/Effective%20Prompt%20Engineering%20in%202025.pdf

Everything I'll forget about prompting LLMs - https://olickel.com/everything-i-know-about-prompting-llms

Prompt engineering - https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview

Prompt engineering for GitHub Copilot Chat - https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering

> First give Copilot a broad description of the goal or scenario. Then list any specific requirements.

> Use examples to help Copilot understand what you want. You can provide example input data, example outputs, and example implementations.
>
> Unit tests can also serve as examples. Before writing your function, you can use Copilot to write unit tests for the function. Then, you can ask Copilot to write a function described by those unit tests.

> If you want Copilot to complete a complex or large task, break the task into multiple simple, small tasks.

> Avoid ambiguous terms. Instead, be specific. What does the `createUser` function do? What does the code in your last response do?

> If you want to use a specific library, set the import statements at the top of the file or specify what library you want to use.

> To get suggestions as you code, open any relevant files and close irrelevant files. Copilot will use the open files to understand your request.
>
> Open the file or highlight the code that you want Copilot to reference. You can also use keywords to manually supply context to Copilot Chat. For example, you can add the `@workspace` chat participant in VS Code, or `@project` in JetBrains IDEs.

> If you don’t get the result that you want, iterate on your prompt and try again.
>
> You can delete the suggestion entirely and start over. Or you can keep the suggestion and request modifications.
>
> You can reference the previous response in your next request. Or, you can delete the previous response and start over.

> Copilot Chat uses the chat history to get context about your request. To give Copilot only the relevant history:
>
> - Use threads to start a new conversation for a new task
> - Delete requests that are no longer relevant or that didn’t give you the desired result

> Make sure that your existing code follows best practices and is easy to read.

**Issues that you may choose to work on yourself, rather than assigning to Copilot** - https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results#choosing-the-right-type-of-tasks-to-give-to-copilot

https://prompts.chat - https://github.com/f/awesome-chatgpt-prompts

Learn how Android devs are getting the most out of Gemini in Android Studio - https://www.youtube.com/watch?v=cmmlqsv3-5A (from https://android-developers.googleblog.com/2024/10/whats-new-in-gemini-in-android.html)

> - Be specific with your prompts.
> - Add more details to your instructions.

https://github.com/ttaulli/GitHub-Copilot-ChatGPT/blob/main/4-prompt-engineering/Prompts.md

https://platform.openai.com/tokenizer

Warner’s Laws of Generative AI - https://gist.github.com/timothywarner/212f69798587efccc79610d7ab4cc194 → Interesting points

> If you leave something out of your prompt, the AI will guess, and not always how you want.

> Prompt Procedurally, Think in Steps. Break problems down step by step. Guide the AI like you’d mentor a human: who, what, when, where, why, how.

> A/B Test Your AI Daily Drivers. Maintain at least two paid LLMs. Compare answers, cross-check facts, and swap when one stumbles.

> Watch for Amnesia and Hallucination. When the AI forgets or fabricates, call it out. Keep a backup LLM for fault tolerance and groundedness.

> Sculpt Context, Don’t Pollute It. Feed the AI only what matters. Be surgical. Trim background noise, legacy docs, and side chatter.

### Zero-shot vs few-shot prompting

**Zero-shot** prompting: give the model an instruction or question without examples. The model relies only on its training knowledge to figure out what you want.

```
Write a Python function that checks if a string is a palindrome.
```

Copilot generates the full function based solely on your description.

**Few-shot** prompting: provide a few examples of the task you want done, then ask the model to continue in the same style or pattern. The model infers the rules or style from your examples.

```python
# Example 1:
# Input: "hello"'
# Output: "olleh"

# Example 2:
# Input: "world"
# Output: "dlrow"

# Now write a function that follows this pattern.
def reverse_string(s: str) -> str:
    ...
```

Copilot uses your examples to generate a matching function.

## Claude Code

https://github.com/anthropics/claude-code

https://docs.anthropic.com/en/docs/claude-code/overview

https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor

https://github.com/ryoppippi/ccusage

https://github.com/daaain/claude-code-log

Announcements

- 2025-02-24 - https://www.anthropic.com/news/claude-3-7-sonnet
- 2025-05-22 - https://www.anthropic.com/news/claude-4
- 2025-08-05 - https://www.anthropic.com/news/claude-opus-4-1
- 2025-08-12 - https://www.anthropic.com/news/1m-context
  - > lets you process entire codebases with over 75,000 lines of code
- 2025-09-29 - https://www.anthropic.com/news/claude-sonnet-4-5

https://github.com/timothywarner-org/prompt-pro/blob/main/CLAUDE.md

VSCode extension - https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code

- Sonnet: lower cost. Lower latency, more efficient. Good for general use.
- Opus: higher cost. Slower for complex tasks, more compute-intensive. For deeper reasoning. Better at agentic tasks and long workflows.

https://news.ycombinator.com/item?id=46256606 - Hey, Boris from the Claude Code team here. A few tips:

1. If there is anything Claude tends to repeatedly get wrong, not understand, or spend lots of tokens on, put it in your CLAUDE.md. Claude automatically reads this file and it’s a great way to avoid repeating yourself. I add to my team’s CLAUDE.md multiple times a week.
2. Use Plan mode (press shift-tab 2x). Go back and forth with Claude until you like the plan before you let Claude execute. This easily 2-3x’s results for harder tasks.
3. Give the model a way to check its work. For svelte, consider using the Puppeteer MCP server and tell Claude to check its work in the browser. This is another 2-3x.
4. Use Opus 4.5. It’s a step change from Sonnet 4.5 and earlier models.

https://x.com/bcherny/status/2007179832300581177 - I'm Boris and I created Claude Code. Lots of people have asked how I use Claude Code

## ChatGPT

Canvas - https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it

To open the app in the Canvas use `/canvas`, eg:

> Use the /canvas feature and build a simple HTML page that says "Hello world!".

## JetBrains

https://www.jetbrains.com/help/ai-assistant/

https://www.jetbrains.com/help/junie/

When using GitHub Copilot, use `@project` instead of `@workspace`.

https://github.com/kousen/junie-training

Guidelines (`.junie/guidelines.md`):

- Docs: https://www.jetbrains.com/help/junie/customize-guidelines.html
- Examples: https://github.com/JetBrains/junie-guidelines

Use `.aiignore` file to restrict Junie from processing the contents of specific files or folders ([docs](https://www.jetbrains.com/help/junie/aiignore.html)).
