---
title: JetBrains
---

:::important
Improving IDE performance - https://blog.jetbrains.com/kotlin/2021/06/simple-steps-for-improving-your-ide-performance

Des-habilitar plugins que no faig servir!
:::


## Preferences

Add line at end of file: Editor -> General -> check 'Ensure every saved line ends with a line break'. Also check 'Remove trailing blank lines at the end of saved files' there too.

Soft wrap markdown files: Editor -> General marcar 'Soft-wrap these files'. Al input hi ha per defecte `*.md; *.txt; *.rst; *.adoc`;

A WebStorm, Editor -> General -> JavaScript marcar "Start template string interpolation on typing '$'". Amb això si escric '$' a dins de un template string m'afegeix '{}' 👌. Aquí també es pot triar si afegeix '()' al autocompletar una funció (veure [WEB-31404](https://youtrack.jetbrains.com/issue/WEB-31404) i [Added the ability to choose if you want to insert braces on code completion](https://blog.jetbrains.com/webstorm/2021/08/webstorm-2021-2-1/)).


## Settings Sync

https://www.jetbrains.com/help/idea/sharing-your-ide-settings.html#IDE_settings_sync

Cal tenir el plugin 'IDE Settings Sync' (instal·lat per defecte).

Llavors fer File -> Manage IDE Settings -> Sync Settings to JetBrains Account. (Si no apareix és perquè ja està activat.)

Ha d'aparèixer la icona del núvol a baix de tot a la dreta.


## Delete Leftover IDE Directories

:::important
Això s'ha de fer després d'actualitzar l'IDE a una nova versió.
:::

Eliminar versions antigues: Help -> Delete Leftover IDE Directories…

[Directories used by the IDE to store settings, caches, plugins and logs](https://intellij-support.jetbrains.com/hc/en-us/articles/206544519-Directories-used-by-the-IDE-to-store-settings-caches-plugins-and-logs)


## WebStorm

Guide: https://www.jetbrains.com/webstorm/guide/

Tips & Tricks: https://blog.jetbrains.com/webstorm/category/tips-tricks/

ESLint setup: https://www.jetbrains.com/help/webstorm/eslint.html

Refactors: https://www.jetbrains.com/help/webstorm/refactoring-source-code.html#ws_supported_refactorings

JavaScript postfix templates: https://www.jetbrains.com/help/webstorm/using-postfix-templates.html

Warning on outdated dependencies in `package.json`: Preferences | Editor | Inspections | JavaScript & TypeScript | Imports and dependencies -> Modify 'Update package.json dependencies to latest versions' to be 'Weak Warning'.

Using a Node.js interpreter inside a **Docker** container: https://blog.jetbrains.com/webstorm/2021/11/webstorm-2021-3/#development_with_remote_node_js

## Shortcuts

Recent locations: Cmd+Shift+E

Navigation shortcuts: https://www.jetbrains.com/webstorm/guide/topics/navigation/

Quick definition: ⌘Y or ⌥space (Note: had to add ⌥space to WebStorm.)

Refactor this: Ctrl+S (WebStorm) or Ctrl+T (Android Studio, PyCharm)

File structure: ⌘F12

Select in...: Alt+F1

Show usages: Alt+Cmd+F7

Switcher / switch between recent files: Ctrl+Tab

Toggle maximize editor / hide all toolbars like left bar: Cmd+Shift+F12

Search everything: Shift+Shift

Go to last edit location: Cmd+Shift+Backspace

Code completion: basic Ctrl+Sàce, Type-matching: Ctrl+Shift+Space

Join lines: Ctrl+Shift+J

Find action: Cmd+Shift+A

Code fromatting settings (eg optimize imports): Cmd+Alt+Shift+L (code format is Cmd+Alt+L)

Highlight usages of a symbol within a file: Cmd+Shift+F7

UML diagram, shows inherintance chain (needs to be run with the cursor on a class name)): Shift+Cmd+Alt+U


## React

https://www.jetbrains.com/help/webstorm/react.html

https://www.jetbrains.com/webstorm/guide/technologies/react/

Extract a component: https://www.jetbrains.com/help/webstorm/react.html#ws_react_extract_component
