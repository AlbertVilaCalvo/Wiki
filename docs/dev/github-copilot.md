---
title: GitHub Copilot
---

https://github.com/copilot

Docs - https://docs.github.com/en/copilot

Blog - https://github.blog/ai-and-ml/github-copilot/

https://github.com/github/awesome-copilot - Community-contributed instructions, prompts and configurations

VSCode extension - https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

VSCode extension docs - https://code.visualstudio.com/docs/copilot/overview

GitHub Copilot in VS Code playlist - https://www.youtube.com/playlist?list=PLj6YeMhvp2S7rQaCLRrMnzRdkNdKnMVwg

:::tip
Use VSCode, it has the latest features. Other editors are behind.
:::

## Custom instructions

https://github.com/github/awesome-copilot/blob/main/instructions/instructions.instructions.md

:::tip
GitHub Copilot can understand code files as custom instructions too. See https://code.visualstudio.com/blogs/2025/03/26/custom-instructions#_one-more-thing

Note that `github.copilot.chat.codeGeneration.instructions` is deprecated as of VS Code 1.102 ([source](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_specify-custom-instructions-in-settings)).
:::

- Workspace instructions:
  - Repository-wide instructions: `.github/copilot-instructions.md`
  - Path-specific instructions: `.github/instructions/NAME.instructions.md`
    - See example at https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results#path-specific-instructions
    - By using path-specific instructions you can avoid overloading your repository-wide instructions with information that only applies to files of certain types, or in certain directories. [source](https://docs.github.com/en/copilot/concepts/prompting/response-customization#about-repository-custom-instructions-1)
- User instructions: available across multiple workspaces. They are stored in the current [VS Code profile](https://code.visualstudio.com/docs/configure/profiles), so they are synced with Settings Sync.

In VScode:

- To generate instructions file for your workspace, at the Chat view, select Configure Chat > Generate Instructions.
- You can manually attach an instructions file to a specific chat prompt by using the Add Context > Instructions option in the Chat view.
- You can choose if the instructions are added to Copilot request at the Settings, at "Use Instruction Files".

At https://github.com/copilot:

- Add instructions by clicking on your profile picture in the bottom left of the page, then click "Personal instructions".

https://docs.github.com/en/copilot/how-tos/configure-custom-instructions

> Personal instructions take the highest priority, followed by repository instructions, with organization instructions prioritized last. However, all sets of relevant instructions are still combined and provided to Copilot Chat.

https://docs.github.com/en/copilot/using-github-copilot/coding-agent/best-practices-for-using-copilot-to-work-on-tasks#adding-custom-instructions-to-your-repository

https://code.visualstudio.com/blogs/2025/03/26/custom-instructions

> It's important to always give models instructions in the affirmative instead of the negative as they need to know what to do, not what to not do. Instead of saying "don't do" you can say "avoid".

https://code.visualstudio.com/docs/copilot/customization/custom-instructions

> Custom instructions are not taken into account for [code completions](https://code.visualstudio.com/docs/copilot/ai-powered-suggestions) as you type in the editor.

https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions/your-first-custom-instructions

https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results#adding-custom-instructions-to-your-repository

### Tips

From [Writing effective repository custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions?tool=vscode#writing-effective-repository-custom-instructions):

> The instructions you add to your custom instruction file(s) should be short, self-contained statements that provide Copilot with relevant information to help it work in this repository. Because the instructions are sent with every chat message, they should be broadly applicable to most requests you will make in the context of the repository.

> - Provide an overview of the project you're working on, including its purpose, goals, and any relevant background information.
> - Include the folder structure of the repository, including any important directories or files that are relevant to the project.
> - Specify the coding standards and conventions that should be followed, such as naming conventions, formatting rules, and best practices.
> - Include any specific tools, libraries, or frameworks that are used in the project, along with any relevant version numbers or configurations.

> You should also consider the size and complexity of your repository. The following types of instructions may work for a small repository with only a few contributors, but for a large and diverse repository, these may cause problems:
>
> - Requests to refer to external resources when formulating a response
> - Instructions to answer in a particular style
> - Requests to always respond with a certain level of detail
>
> For example, the following instructions **may not have the intended results**:
>
> - Always conform to the coding styles defined in styleguide.md in repo my-org/my-repo when generating code.
> - Use @terminal when answering questions about Git.
> - Answer all questions in the style of a friendly colleague, using informal language.
> - Answer all questions in less than 1000 characters, and words of no more than 12 characters.

From [Tips for defining custom instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_tips-for-defining-custom-instructions):

- Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.
- For task or language-specific instructions, use multiple `*.instructions.md` files per topic and apply them selectively by using the `applyTo` property.
- Store project-specific instructions in your workspace to share them with other team members and include them in your version control.
- Reuse and reference instructions files in your prompt files and chat modes to keep them clean and focused, to avoid duplicating instructions.

From [5 tips for writing better custom instructions for Copilot](https://github.blog/ai-and-ml/github-copilot/5-tips-for-writing-better-custom-instructions-for-copilot):

> Copilot works best when you give it the right context. Just like a new teammate, it can’t read your mind (even if it sometimes feels like it can).

> Copilot can likely figure out what you’re doing and how you’re doing it. But spelling out the essentials – what you’re building, the stack you’re using, the rules to follow, etc., will help avoid confusion and mistakes.

> **One important tip I want to share before we get into more details is to not overthink things. There isn’t a specific prescribed way to write instructions files. The nature of generative AI is probabilistic, meaning the same requests can actually render different results. Your goal is to tilt the scales, to help point Copilot to finding the answer you’re hoping for as often as possible.**

> - Elevator pitch of what you’re building
> - Frameworks and the tech stack you’re using to build it
> - Coding and other project guidelines
> - Project structure and where to find things
> - Resources available for automation and tasks

### Examples

See examples at https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions

Many instructions for different technologies - https://github.com/github/awesome-copilot/blob/main/README.instructions.md

- https://github.com/ttaulli/GitHub-Copilot-ChatGPT/blob/main/.github/copilot-instructions.md
- https://github.com/timothywarner-org/copilot-cert-prep/blob/main/.github/copilot-instructions.md
- https://github.com/timothywarner-org/copilot-cert-prep/blob/main/course-materials/custom-instructions-improved.md → Curious, uses true
- Python: https://github.com/github/awesome-copilot/blob/main/instructions/python.instructions.md
- Node: https://github.com/github/awesome-copilot/blob/main/instructions/nodejs-javascript-vitest.instructions.md
- React:
  - https://github.com/github/awesome-copilot/blob/main/instructions/reactjs.instructions.md
  - https://github.com/github/awesome-copilot/blob/main/instructions/nextjs.instructions.md
  - https://github.com/github/awesome-copilot/blob/main/instructions/performance-optimization.instructions.md
- Go: https://github.com/github/awesome-copilot/blob/main/instructions/go.instructions.md
- GitHub Actions: https://github.com/github/awesome-copilot/blob/main/instructions/github-actions-ci-cd-best-practices.instructions.md
- Terraform:
  - https://github.com/github/awesome-copilot/blob/main/instructions/terraform.instructions.md
  - https://github.com/github/awesome-copilot/blob/main/instructions/generate-modern-terraform-code-for-azure.instructions.md
- DDD: https://github.com/github/awesome-copilot/blob/main/instructions/dotnet-architecture-good-practices.instructions.md

## Prompt files

https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files

https://code.visualstudio.com/blogs/2025/03/26/custom-instructions#_introducing-prompt-files

https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions?tool=vscode#enabling-and-using-prompt-files

https://docs.github.com/en/copilot/concepts/prompting/response-customization#about-prompt-files

Examples:

- https://github.com/microsoft/vscode/tree/main/.github/prompts

## Agents

Examples:

- https://github.com/microsoft/vscode/tree/main/.github/agents

## Ask, Edit and Agent modes

From https://github.com/orgs/community/discussions/114471#discussioncomment-13053118

Ask Mode:

- `/` Slash commands
- `@` Chat participants
- `#` Chat variables (Context)

Edit Mode:

- `#` Chat variables (Context)

Agent Mode:

- `#` Tools (MCP etc.)

## Chat participants

:::warning
A chat prompt can only contain a single chat `@participant`, but can contain multiple `#tools`. [source](https://code.visualstudio.com/docs/copilot/reference/workspace-context#_what-is-the-difference-between-atworkspace-and-hashcodebase)
:::

https://docs.github.com/en/copilot/reference/cheat-sheet#chat-participants

https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_atmentions

> Chat participants are specialized assistants that enable you to ask domain-specific questions in chat. Imagine a chat participant as a domain expert to whom you hand off your chat request and it takes care of the rest.
>
> Chat participants are different from [tools](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_reference-tools) that are invoked as part of an agent flow to contribute and perform specific tasks.
>
> VS Code has several built-in chat participants like `@vscode`, `@terminal`, or `@workspace`. They are optimized to answer questions about their respective domains.

### `@terminal`

https://docs.github.com/en/copilot/how-tos/chat-with-copilot/get-started-with-chat#ask-questions-about-the-command-line

- `@terminal what are the top 5 largest files in the current directory`
- `@terminal #terminalLastCommand explain the last command and any errors`
- **`@terminal how to update an npm package`**

### `@vscode`

https://docs.github.com/en/copilot/how-tos/chat-with-copilot/get-started-with-chat#ask-questions-about-visual-studio-code

- `@vscode how to enable word wrapping`
- `@vscode tell me how to debug a node.js app`
- `@vscode how do I change my Visual Studio Code colors`
- `@vscode how can I change key bindings`

### `@workspace`

:::warning
It's recommended to use `#codebase` in your chat prompts, as it provides more flexibility. [source](https://code.visualstudio.com/docs/copilot/reference/workspace-context#_what-is-the-difference-between-atworkspace-and-hashcodebase)
:::

Ask about your workspace. Available only for Ask mode.

> The `@workspace` chat participant in VS Code and Visual Studio provides Copilot with context about all of the code in your workspace. You can use `@workspace` when you want Copilot to consider the structure of your project and how different parts of your code interact. If you're using a JetBrains IDE, use `@project` rather than `@workspace`.

From https://docs.github.com/en/copilot/tutorials/migrate-a-project

`@workspace I want to migrate this project from PHP to Python. Give me a high-level overview of the steps I need to take. Don't go into detail at this stage.`

From https://docs.github.com/en/copilot/tutorials/modernize-legacy-code

`@workspace Create a sequence diagram of the app showing the data flow of the app. Create this in mermaid format so that I can render this in a markdown file.`

`@workspace - analyze test failures in operations.test.js and suggest fixes to match the expected behavior.`

You can use `@workspace` to generate a test plan that covers all of the files in the project.

`@workspace I would like to create unit and integration tests cases from the test plan mentioned in #file:TESTPLAN.md file. The node.js code is in the node-accounting-app folder and I am looking to generate tests for #file:operations.js file. Use a popular testing framework and also provide all the dependencies required to run the tests.`

## Difference between `@workspace` and `#codebase`

From https://code.visualstudio.com/docs/copilot/reference/workspace-context#_what-is-the-difference-between-atworkspace-and-hashcodebase:

Conceptually, both `@workspace` and `#codebase` enable you to ask questions about your entire codebase. However, there are some differences in how you can use them:

- `@workspace` is a [chat participant](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_atmentions)

The `@workspace` participant is subject matter expert that is specialized to answering questions about your codebase. The language model hands off the entire chat prompt to the participant, which uses its knowledge of the codebase to provide an answer. The language model can't perform any additional processing or invoke other tools when using a chat participant. **A chat prompt can only contain a single chat participant.**

- `#codebase` is a [chat tool](https://code.visualstudio.com/docs/copilot/chat/chat-tools)

The `#codebase` tool is specialized in searching your codebase for relevant information. It is one of many tools that the language model can choose to invoke when answering your chat prompt. The language model can decide to invoke the `#codebase` tool multiple times, interleaved with other tools, to gather the information it needs to answer your question. **A chat prompt can contain multiple tools.**

**It's recommended to use `#codebase` in your chat prompts, as it provides more flexibility.**

From https://github.com/orgs/community/discussions/114471#discussioncomment-13123705

Conceptually, both `@workspace` and `#codebase` enable you to ask questions about your entire codebase. However, there are some differences in how you can use them:

`@workspace`

- Chat participant, dedicated to answering questions about your codebase.
- Takes control of the user prompt and uses the codebase to provide an answer.
- **Can't invoke other tools.**
- **Can only be used in ask mode.**
- Example: "`@workspace` how can I validate a date?"

`#codebase`

- Tool that performs a codebase search based on the user prompt and adds the relevant code as context to the chat prompt.
- The LLM remains in control and can combine it with other tools for editing scenarios.
- **Can be used in all chat modes (ask, edit, and agent).**
- Examples: "add a tooltip to this button, consistent with other button #codebase", "add unit tests and run them #codebase"

## Chat tools

https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features#_chat-tools

### `#codebase`

Perform a code search in the current workspace to automatically find relevant context for the chat prompt.

From https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_perform-a-codebase-search

- `Explain how authentication works in #codebase`
- `Where is the database connecting string configured? #codebase`
- `Add a new API route for updating the address #codebase`

### `#fetch` website content

https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_reference-content-from-the-web

`What are the highlights of VS Code 1.100 #fetch https://code.visualstudio.com/updates/v1_100`

## Chat variables

https://docs.github.com/en/copilot/reference/cheat-sheet#chat-variables

https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_hashmentions

- `#project` - Includes the project context in the prompt.
- `#selection` - Includes the currently selected text in the prompt.
- `#block` - Includes the current block of code in the prompt.

### `#file`

Includes the current file's content in the prompt.

`Convert the code in #file:main.cob to node.js`

See examples at https://docs.github.com/en/copilot/tutorials/modernize-legacy-code#step-8-generate-unit-and-integration-tests

## Slash commands

https://docs.github.com/en/copilot/reference/cheat-sheet#slash-commands-1

https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features#_slash-commands

https://github.com/timothywarner-org/copilot-cert-prep/blob/main/copilot/CHAT_EXAMPLES.md

### `/explain`

Example from https://docs.github.com/en/copilot/tutorials/modernize-legacy-code

`/explain #file:main.cob #file:operations.cob #file:data.cob. Create a high level overview of the app. Explain each file in detail and how they are linked.`

### `/fix`

Propose a fix for problems _in the selected code_.

### `/fixTestFailure`

### `/tests`

Generate unit tests _for the selected code_.

https://docs.github.com/en/copilot/tutorials/copilot-chat-cookbook/testing-code/generate-unit-tests

https://docs.github.com/en/copilot/how-tos/chat-with-copilot/get-started-with-chat#write-tests

- `/tests Generate unit tests for this function. Validate both success and failure, and include edge cases.`
- `/tests using the Jest framework`
- `/tests ensure the function rejects an empty list`

## `/new`

https://docs.github.com/en/copilot/how-tos/chat-with-copilot/get-started-with-chat#set-up-a-new-project

- `/new react app with typescript`
- `/new python django web application`
- `/new node.js express server`

## JetBrains IDEs

https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer

https://github.com/microsoft/copilot-intellij-feedback

If you're using a JetBrains IDE, use `@project` rather than `@workspace`.

## copilot-debug

From https://code.visualstudio.com/updates/v1_96#_debugging-with-copilot

Use it by prefixing the command that you would normally run with `copilot-debug`. For example, if you normally run your program using the command `python foo.py`, you can now run `copilot-debug python foo.py` to start a debugging session.

## Docker extension for GitHub Copilot

https://github.com/marketplace/docker-for-github-copilot

https://www.docker.com/blog/preview-docker-extension-for-github-copilot

## Certification

GH-300

https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300

https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications

https://github.com/timothywarner-org/copilot-cert-prep
