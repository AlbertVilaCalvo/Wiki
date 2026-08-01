---
title: VSCode
---

[code.visualstudio.com](https://code.visualstudio.com)

[github.com/Microsoft/vscode](https://github.com/Microsoft/vscode)

VSCode in the browser - https://coder.com - https://github.com/coder/code-server

## Diff

```shell
code --diff file1 file2
```

## Shortcuts

Word wrap: Alt+Z (⌥+Z). [source](https://stackoverflow.com/questions/31025502/how-can-i-switch-word-wrap-on-and-off-in-visual-studio-code)

:::tip
Do <kbd>⌘P</kbd> and then type `?` to get the following list.
:::

Search and navigation:

- <kbd>⌘P</kbd> Go to File
- <kbd>⇧⌘P</kbd> Run commands (>)
- <kbd>^G</kbd> Go to Line/Column
- <kbd>@</kbd> Go to Symbol in File (<kbd>⇧⌘O</kbd>)
- <kbd>@:</kbd> Go to Symbol in File with Type (Category)
- <kbd>#</kbd> Go to Symbol in Workspace (<kbd>⌘T</kbd>)
- <kbd>%</kbd> Search for Text
- Tabs:
  - <kbd>^Tab</kbd> Switch tabs in most recently used order
    - You can change <kbd>^Tab</kbd> to cycle through tabs in visible order, see https://stackoverflow.com/questions/38957302/is-there-a-quick-change-tabs-function-in-visual-studio-code
  - <kbd>⌘⌥←/⌘⌥→</kbd> Switch to previous/next tabs
  - <kbd>^n</kbd> Switch to tab number n (1-9)

From https://stackoverflow.com/questions/46504190/how-to-quickly-find-files-or-symbols-in-a-project-in-visual-studio-code:

- <kbd>⌘P</kbd> searches for files by name.
- <kbd>⌘P</kbd> followed by `@` only searches for symbol in the currently opened file.
- <kbd>⌘P</kbd> followed by `#` only searches for symbol in all files.
- <kbd>⌘P</kbd> followed by `%` searches for text across files.

## Code Snippets

https://code.visualstudio.com/docs/editing/userdefinedsnippets

https://stackoverflow.com/questions/29995863/how-to-add-custom-code-snippets-in-vscode

To create a snippet, type Shift+Cmd+P and type "snippets". Select "Snippets: Configure Snippets", and then select a language (eg Markdown) from the list.

By default you need to do Ctrl+Space to trigger it, and then return/tab to expand! You can enable tab completion, which expands the snippet automatically, with `"editor.tabCompletion": "on"` or `"editor.tabCompletion": "onlySnippets"`.

Extension - https://marketplace.visualstudio.com/items?itemName=wenfangdu.snippet-generator

Examples:

<!-- prettier-ignore -->
```json title="markdown.json"
{
  // Place your snippets for markdown here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  // "Print to console": {
  //   "prefix": "log",
  //   "body": [
  //     "console.log('$1');",
  //     "$2"
  //   ],
  //   "description": "Log output to console"
  // }
  "Code block": {
    "prefix": "cb",
    "body": [
      "```$0",
      "```",
    ],
    "description": "Code block in markdown"
  },
  "Shell code block": {
    "prefix": "sh",
    "body": [
      "```shell",
      "$0",
      "```",
    ],
    "description": "Shell code block in markdown"
  }
}
```

<!-- prettier-ignore -->
```json title="javascript.json"
{
  "React component": {
    "prefix": ["rc"],
    "body": [
      "import React from 'react'",
      "",
      "export default function $1($2) {",
      "  return $0",
      "}"
    ],
    "description": "A React component"
  }
}
```

See more React examples in these extensions:

- https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets - https://github.com/r5n-labs/vscode-react-javascript-snippets
- https://marketplace.visualstudio.com/items?itemName=NicholasHsiang.vscode-react-snippet - https://github.com/xianghongai/vscode-react-snippet

## Settings

Open `settings.json` file: Cmd+Shift+P and pick 'Open User Settings (JSON)' [source](https://stackoverflow.com/questions/65908987/how-can-i-open-visual-studio-codes-settings-json-file)

Explorer: avoid automatically revealing a file in the when we open it: Features → Explorer → Auto Reveal false.

Remove 'U'/'M' from the file tab: Workbench → Editor → Decorations: Badges, uncheck it.

## Extensions

Code Spell Checker: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker
You need to install the [Catalan language](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-catalan).
