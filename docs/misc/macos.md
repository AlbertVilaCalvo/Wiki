---
title: macOS
---

[Mac keyboard shortcuts](https://support.apple.com/en-au/HT201236)

| Name         | Character  | kbd           | Physical key |
| :----------: | :--------: |:------------: | :----------: |
| Command      | ⌘          | <kbd>⌘</kbd>  | ⊞ Windows    |
| Control      | ⌃          | <kbd>⌃</kbd>  | Ctrl         |
| Shift        | ⇧          | <kbd>⇧</kbd>  | Mayús        |
| Option / Alt | ⌥          | <kbd>⌥</kbd>  | Alt          |
| Escape       | ⎋          | <kbd>⎋</kbd>  | Esc          |

[Glyps](https://apple.stackexchange.com/q/55727/241238)

Character Viewer ([emoji picker](https://support.apple.com/en-au/guide/mac-help/mchlp1560/mac)): <kbd>⌘</kbd> + <kbd>Ctrl</kbd> + <kbd>Space</kbd>

Show/hide hidden files: <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>

What prevents Mac to sleep: `pmset -g assertions`. See https://osxdaily.com/2012/07/11/mac-wont-sleep-heres-how-to-find-out-why-and-fix-it


## DefaultKeyBinding.dict

```
{
  "^w" = "deleteWordBackward:";
  "^u" = "deleteWordForward:";
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


## kexts

Used by Little Snitch and Razer Synapse.

Are located in `/Library/Extensions/`.


## Free up disk space

Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices`: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572

JetBrains IDEs, delete old versions: Help -> Delete Leftover IDE Directories…
