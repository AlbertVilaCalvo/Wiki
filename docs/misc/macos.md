---
title: macOS
---

[Mac keyboard shortcuts](https://support.apple.com/en-au/HT201236)

|     Name     | Character |     kbd      | Physical key |
| :----------: | :-------: | :----------: | :----------: |
|   Command    |     ⌘     | <kbd>⌘</kbd> |  ⊞ Windows   |
|   Control    |     ⌃     | <kbd>⌃</kbd> |     Ctrl     |
|    Shift     |     ⇧     | <kbd>⇧</kbd> |    Mayús     |
| Option / Alt |     ⌥     | <kbd>⌥</kbd> |     Alt      |
|    Escape    |     ⎋     | <kbd>⎋</kbd> |     Esc      |

[Glyps](https://apple.stackexchange.com/q/55727/241238)

Character Viewer ([emoji picker](https://support.apple.com/en-au/guide/mac-help/mchlp1560/mac)): <kbd>⌘</kbd> + <kbd>Ctrl</kbd> + <kbd>Space</kbd>

Show/hide hidden files: <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>

What prevents Mac to sleep: `pmset -g assertions`. See https://osxdaily.com/2012/07/11/mac-wont-sleep-heres-how-to-find-out-why-and-fix-it


## DefaultKeyBinding.dict

```
{
  "^u" = "deleteWordBackward:";
  "^o" = "deleteWordForward:";
  "^j" = "moveWordBackward:";
  "^l" = "moveWordForward:";
}
```

Place this file in `~/Library/KeyBindings/` (create the folder if it doesn't exist yet).

Note that you need to restart the apps to take effect (eg run `killall Finder` to restart Finder, close and open Firefox etc.).

Examples:

- http://xahlee.info/kbd/osx_keybinding_action_code.html
- https://gist.github.com/trusktr/1e5e516df4e8032cbc3d
- https://github.com/ttscoff/KeyBindings

## iTerm2

Go to Preferences -> Profiles tab -> Keys tab -> Key Mappings tab.
Click the + button.

| Shortcuts    | Description       | Action               | Send      |
| ------------ | ----------------- | -------------------- | --------- |
| Alt+← Ctrl+j | Move word left    | Send Escape Sequence | b         |
| Alt+→ Ctrl+l | Move word right   | Send Escape Sequence | f         |
| Ctrl+u       | Delete word left  | Send Hex Codes       | 0x1b 0x08 (could instead be 0x17, see StackOverflow below)|
| Ctrl+o       | Delete word right | Send Hex Codes       | 0x1b 0x64 |

https://stackoverflow.com/questions/6205157/how-to-set-keyboard-shortcuts-to-jump-to-beginning-end-of-line/29403520#29403520

### "send hex code" vs "send escape sequence"

From https://sergeemond.ca/en/articles/iterm-extend-send-text-action

- “send escape sequence” simply sends a “\e” followed by the text as-is
- “send hex code” scans for one 8-bit code, and sends that
- “send text” allows for “\e” (escape), “\n” (newline), “\a” (bell), and “\t” (tab), and normal text

## kexts

Used by Little Snitch and Razer Synapse.

Are located in `/Library/Extensions/`.


## Free up disk space

- Delete `node_modules` folders with [npkill](https://github.com/voidcosmos/npkill). Usage: `npx npkill --directory ~/Programming`.
- Delete `build` folders: `find . -type d -name "build" -exec rm -rf {} +`.
- Delete Python `venv` folders: `find . -type d -name "venv" -exec rm -rf {} +`.
- Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices`: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572.
- Delete old Xcode archives. Use the Organizer (Window -> Organizer).
- JetBrains IDEs, delete old versions: Help -> Delete Leftover IDE Directories…
- Docker:
  - Remove dangling images (images with `<none>` in `docker image ls`): `docker image prune` ([docs](https://docs.docker.com/engine/reference/commandline/image_prune/))
  - Prune unused Docker objects: https://docs.docker.com/config/pruning
- Anar a `~/Library/Application Support` i esborrar programes antics.
- Esborrar fitxers grans: Sobre aquest Mac -> Emmagatzematge -> Gestionar...
