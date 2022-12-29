---
title: JetBrains
---

:::info
Improving IDE performance - https://blog.jetbrains.com/kotlin/2021/06/simple-steps-for-improving-your-ide-performance

Des-habilitar plugins que no faig servir!
:::

## Preferences

Add line at end of file: Editor -> General -> check 'Ensure every saved line ends with a line break'. Also check 'Remove trailing blank lines at the end of saved files' there too.

Soft wrap markdown files: Editor -> General marcar 'Soft-wrap these files'. Al input hi ha per defecte `*.md; *.txt; *.rst; *.adoc`;

A WebStorm, Editor -> General -> JavaScript marcar "Start template string interpolation on typing '$'". Amb això si escric '$' a dins de un template string m'afegeix '{}' 👌. Aquí també es pot triar si afegeix '()' al autocompletar una funció (veure [WEB-31404](https://youtrack.jetbrains.com/issue/WEB-31404) i [Added the ability to choose if you want to insert braces on code completion](https://blog.jetbrains.com/webstorm/2021/08/webstorm-2021-2-1/)).

Editor -> General -> Editor Tabs -> Closing Policy -> Tab limit: default is 10, change it to something like 15, otherwise it closes the tabs you are working on too quickly when exploring other files.

A WebStorm, Editor -> [Inline Hints](https://www.jetbrains.com/help/webstorm/inlay-hints.html), marcar:

- Parameter names -> JS/TS -> Non-literal arguments
- Types -> JS/TS -> Non-parenthesised single parameter

## Get rid of annoying dialog 'Add files to Git'

- For ALL new projects: File -> New Projects Setup -> Preferences for New Projects -> Version Control -> Confirmation
- For the current project: Preferences -> Version Control -> Confirmation

Then set these values:

- When files are created: 'Do not add'
- When files are deleted: 'Do not remove'

[source](https://stackoverflow.com/questions/44135615/turn-off-intellij-auto-adding-to-vcs-git)

## Settings Sync

https://www.jetbrains.com/help/idea/sharing-your-ide-settings.html#IDE_settings_sync

_Canvis novembre 2022 (WebStorm 2022.3)_. Ara està a Preferences -> Settings Sync. Veure https://blog.jetbrains.com/webstorm/2022/10/webstorm-2022-3-eap-3/#New_Settings_Sync_solution. I a https://www.jetbrains.com/webstorm/whatsnew/ pel WebStorm 2022.3 diu 'we are discontinuing support for the old IDE Settings Sync plugin'.

Cal tenir el plugin 'IDE Settings Sync' (instal·lat per defecte).

Llavors fer File -> Manage IDE Settings -> Sync Settings to JetBrains Account. (Si no apareix és perquè ja està activat.)

Ha d'aparèixer la icona del núvol a baix de tot a la dreta.

## Delete Leftover IDE Directories

:::info
Això s'ha de fer després d'actualitzar l'IDE a una nova versió.
:::

Eliminar versions antigues: Help -> Delete Leftover IDE Directories…

[Directories used by the IDE to store settings, caches, plugins and logs](https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs)

## Extensions

Foldable ProjectView: https://plugins.jetbrains.com/plugin/17288-foldable-projectview
In WebStorm, it hides node_modules in 'Folded files'.

## WebStorm

Guide: https://www.jetbrains.com/webstorm/guide/

Tips & Tricks: https://blog.jetbrains.com/webstorm/category/tips-tricks/

Database plugin:

- How to Get Support for Database Tools and SQL Inside WebStorm - https://blog.jetbrains.com/webstorm/2020/09/support-for-database-tools-and-sql-inside-webstorm
- Database Tools and SQL for WebStorm - https://plugins.jetbrains.com/plugin/10925-database-tools-and-sql-for-webstorm

ESLint setup: https://www.jetbrains.com/help/webstorm/eslint.html

Refactors: https://www.jetbrains.com/help/webstorm/refactoring-source-code.html#ws_supported_refactorings

JavaScript postfix templates: https://www.jetbrains.com/help/webstorm/using-postfix-templates.html

Warning on outdated dependencies in `package.json`: Preferences | Editor | Inspections | JavaScript & TypeScript | Imports and dependencies -> Modify 'Update package.json dependencies to latest versions' to be 'Weak Warning'. Important: to have this warning enabled for all projects (not just the current one), make sure that the selected 'Profile' is 'Default (Stored in IDE)', not 'Project Default (Stored in Project)' when changing the value.

Using a Node.js interpreter inside a **Docker** container: https://blog.jetbrains.com/webstorm/2021/11/webstorm-2021-3/#development_with_remote_node_js

## Shortcuts

Recent locations: Cmd+Shift+E

Navigation shortcuts: https://www.jetbrains.com/webstorm/guide/topics/navigation/

Quick definition: ⌘Y or ⌥space (Note: had to add ⌥space to WebStorm.)

Refactor this: Ctrl+S (WebStorm) or Ctrl+T (Android Studio, PyCharm)

File structure: ⌘F12

Select in...: Alt+F1

Usages:

- Show usages: Alt+Cmd+F7
- Highlight usages of a symbol within a file: Cmd+Shift+F7
- Next highlighted usage: Cmd+Alt+E

Switcher / switch between recent files: Ctrl+Tab

Toggle maximize editor / hide all toolbars like left bar: Cmd+Shift+F12

Search everything: Shift+Shift

Go to last edit location: Cmd+Shift+Backspace

Code completion: basic Ctrl+Space, Type-matching: Ctrl+Shift+Space

Join lines: Ctrl+Shift+J

Add line before current line: Cmd+Alt+Return [source](https://stackoverflow.com/questions/2909547/intellij-new-line-on-current-line-shortcut)

Find action: Cmd+Shift+A

Code formatting settings (eg optimize imports): Cmd+Alt+Shift+L (code format is Cmd+Alt+L)

UML diagram, shows inheritance chain (needs to be run with the cursor on a class name)): Shift+Cmd+Alt+U

## Multiple cursors

https://www.jetbrains.com/webstorm/guide/tips/multi-cursor/

https://www.jetbrains.com/help/webstorm/multicursor.html

- With keyboard:
  - Press ⌥ twice, and then without releasing it, press up or down arrow keys.
  - Enable the column selection mode (press ⇧ ⌘ 8) and then press ⇧ ↑/⇧ ↓.
- With mouse:
  - Press and hold the Alt key, then click at the next location of the caret
  - Press the middle button, hold and drag the caret
  - Shift+Alt+click, hold and drag the caret

Add carets to the end of each line in the selected block: ⌥ ⇧ G

## Live templates

Show all live templates shorctut: Cmd+J

To export them do: File -> Manage IDE Settings -> Export Settings... At the Export Settings dialog, select 'Live templates (schemes)'. This creates a zip file that contains the settings in xml format (JavaScript.xml, React Native.xml...).

## React

https://www.jetbrains.com/help/webstorm/react.html

https://www.jetbrains.com/webstorm/guide/technologies/react/

Extract a component: https://www.jetbrains.com/help/webstorm/react.html#ws_react_extract_component
