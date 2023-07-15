---
title: macOS
---

|     Name     | Character |     kbd      | Physical key |
| :----------: | :-------: | :----------: | :----------: |
|   Command    |     ⌘     | <kbd>⌘</kbd> |  ⊞ Windows   |
|   Control    |     ⌃     | <kbd>⌃</kbd> |     Ctrl     |
|    Shift     |     ⇧     | <kbd>⇧</kbd> |    Mayús     |
| Option / Alt |     ⌥     | <kbd>⌥</kbd> |     Alt      |
|    Escape    |     ⎋     | <kbd>⎋</kbd> |     Esc      |

[Glyps](https://apple.stackexchange.com/q/55727/241238)

Advanced macOS Command-Line Tools - https://saurabhs.org/advanced-macos-commands

What prevents Mac to sleep: `pmset -g assertions`. See https://osxdaily.com/2012/07/11/mac-wont-sleep-heres-how-to-find-out-why-and-fix-it

## Keyboard Shortcuts

[Mac keyboard shortcuts](https://support.apple.com/en-au/HT201236)

Cycle current application’s windows: <kbd>⌘</kbd> + <kbd>`</kbd>

Character Viewer ([emoji picker](https://support.apple.com/en-au/guide/mac-help/mchlp1560/mac)): <kbd>⌘</kbd> + <kbd>Ctrl</kbd> + <kbd>Space</kbd>

Show/hide hidden files: <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>

All my macOS keyboard shortcuts - https://www.jamieonkeys.dev/posts/keyboard-shortcuts - https://news.ycombinator.com/item?id=30876934

### Add sleep shortcut

https://apple.stackexchange.com/a/431149/241238

Monterey: Preferències -> Teclat -> pestanya Dreceres -> Dreceres de l'app. Ventura: Configuració -> Teclat -> Dreceres de teclat... -> Dreceres de l'app. Afegir 2 dreceres noves amb nom 'Sleep' i 'Repòs' a <kbd>Shift</kbd><kbd>Alt</kbd><kbd>Q</kbd>. Haig de veure el shortcut ⌥⇧Q al menu del sistema.

### Prevent ⌘+i to open the Mail app on Chrome

https://apple.stackexchange.com/questions/108060/how-to-prevent-command-i-command-shift-i-from-opening-mac-mail-when-in-browser

Ventura: Configuració -> Teclat -> Dreceres de teclat... -> Dreceres de l'app. Clicar '+'. Al menú que s'obre seleccionar:

- App: Google Chrome.
- Títol de menú: ha de ser exactament "Envia l'enllaç per correu electrònic". És el que diu a Chrome -> Fitxer -> Comparteix.
- Drecera de teclat: qualsevol cosa, per exemple ⌃⌥⇧⌘E.

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

https://iterm2.com

### Color schemes

https://iterm2colorschemes.com - https://github.com/mbadolato/iTerm2-Color-Schemes

Changed in Settings -> Profiles -> Colors, at the dropdown 'Color presets...'. Tip: duplicate the current profile to make tests.

### Shortcuts

:::note

I've already added these shortcuts in the past. Thus, to have them in a new iTerm2 installation, I don't have to add them manually again, I can simply import either the profile .json file or the .itermkeymap file.

Note that the .json profile contains all the shortcuts of the .itermkeymap file, so if we import the profile we don't have to import the .itermkeymap afterwards.

:::

Go to Preferences -> Profiles tab -> Keys tab -> Key Mappings tab.
Click the + button.

| Shortcuts    | Description       | Action               | Send                                                       |
| ------------ | ----------------- | -------------------- | ---------------------------------------------------------- |
| Alt+← Ctrl+j | Move word left    | Send Escape Sequence | b                                                          |
| Alt+→ Ctrl+l | Move word right   | Send Escape Sequence | f                                                          |
| Ctrl+u       | Delete word left  | Send Hex Codes       | 0x1b 0x08 (could instead be 0x17, see StackOverflow below) |
| Ctrl+o       | Delete word right | Send Hex Codes       | 0x1b 0x64                                                  |

https://stackoverflow.com/questions/6205157/how-to-set-keyboard-shortcuts-to-jump-to-beginning-end-of-line/29403520#29403520

### "send hex code" vs "send escape sequence"

From https://sergeemond.ca/en/articles/iterm-extend-send-text-action

- “send escape sequence” simply sends a “\e” followed by the text as-is
- “send hex code” scans for one 8-bit code, and sends that
- “send text” allows for “\e” (escape), “\n” (newline), “\a” (bell), and “\t” (tab), and normal text

### Shortcuts and tricks

- Undo close: when you close a session tab by accident, you can restore it with Edit -> Undo or Cmd+Z.
  - Important: adjust the timeout in Settings -> Profiles -> Session, at "Undo can revive a session that has been closed for up to X seconds". Default value is 5 seconds. Should be changed to about 25 seconds.
- Hold Cmd+Option to select text with the mouse doing a rectangle

## kexts

Used by Little Snitch and Razer Synapse.

Are located in `/Library/Extensions/`.

## Free up disk space

- Delete `node_modules` folders with [npkill](https://github.com/voidcosmos/npkill). Usage: `npx npkill --directory ~/Programming`.
- Delete `build` folders: `find . -type d -name "build" -exec rm -rf {} +`.
- Delete Python `venv` folders: `find . -type d -name "venv" -exec rm -rf {} +`.
- Xcode
  - Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices`: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572.
  - Delete Xcode caches with 'DevCleaner for Xcode' - https://apps.apple.com/us/app/devcleaner/id1388020431.
  - Delete Xcode caches with Storage app (Sobre aquest Mac -> Emmagatzematge -> Gestionar... i seleccionar Desenvolupador al menú de l'esquerra) - https://stackoverflow.com/a/69623427/4034572
  - Delete old Xcode archives. Use the Organizer (Window -> Organizer).
- JetBrains IDEs, delete old versions: Help -> Delete Leftover IDE Directories…
  - JetBrains IDEs are located at `~/Library/Application Support/JetBrains` (`cd ~/Library/Application\ Support/JetBrains`).
  - Android Studio is located at `~/Library/Application Support/Google` (`cd ~/Library/Application\ Support/Google`).
- Docker:
  - Docs: Prune unused Docker objects: https://docs.docker.com/config/pruning.
  - Remove dangling images (images with `<none>` in `docker image ls`): `docker image prune` ([docs](https://docs.docker.com/engine/reference/commandline/image_prune/))
    - IMPORTANT: be careful with `docker image prune -a` because it deletes plenty of stuff, eg it has deleted all images shown by `docker image ls`, not only the ones with `<none>`! It says `WARNING! This will remove all images without at least one container associated to them.`.
  - Pune everything: `docker system prune`. This removes all stopped containers, all networks not used by at least one container, all dangling images and all build cache.
- Anar a `~/Library/Application Support` i esborrar programes antics.
- Esborrar fitxers grans: Sobre aquest Mac -> Emmagatzematge -> Gestionar...
- Telegram: esborrar la memòria cau (pot tenir 1 GB). Es fa a "Ús de l'emmagatzematge"
- Firefox: esborrar dades del lloc (pot ser 3 GB). Anar a Preferències -> Privadesa i seguretat -> Gestiona les dades... S'ordenen per mida. Cal apretar Delete a cada Lloc i després 'Desa els canvis' (sinó no esborra). Esborrar les que fa més d'un any que es van fer servir ('Darrer ús').
