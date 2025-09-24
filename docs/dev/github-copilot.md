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

:::tip
GitHub Copilot can understand code files as custom instructions too. See https://code.visualstudio.com/blogs/2025/03/26/custom-instructions#_one-more-thing

Note that `github.copilot.chat.codeGeneration.instructions` is deprecated as of VS Code 1.102 ([source](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_specify-custom-instructions-in-settings)).
:::

- Workspace instructions:
  - Repository-wide instructions: `.github/copilot-instructions.md`
  - Path-specific instructions: `.github/instructions/NAME.instructions.md`
    - See an example at https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results#path-specific-instructions
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

### Examples

See examples at https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions

Many instructions for different technologies - https://github.com/github/awesome-copilot/blob/main/README.instructions.md

- https://github.com/ttaulli/GitHub-Copilot-ChatGPT/blob/main/.github/copilot-instructions.md
- https://github.com/timothywarner-org/copilot-cert-prep/blob/main/.github/copilot-instructions.md
- https://github.com/timothywarner-org/copilot-cert-prep/blob/main/course-materials/custom-instructions-improved.md
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
