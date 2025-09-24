---
title: macOS
---

https://medium.com/@simpleandkind788/7-macos-tahoe-settings-you-should-turn-off-right-now-fed342f8a70e

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

## Defaults

https://macos-defaults.com

```shell
defaults help
defaults domains
defaults domains | tr ',' '\n' # List one per line. Easier to read
defaults read com.apple.finder ShowPathbar # 1
defaults read-type com.apple.finder ShowPathbar # Type is boolean
defaults write com.apple.finder ShowPathbar -bool true
```

Backup:

```shell
defaults read > defaults
defaults read com.apple.finder > finder
defaults export com.apple.finder - > defaults.plist # XML plist, but only one domain
```

https://ss64.com/mac/defaults.html

> If you change a default that belongs to a running application, the application won’t see the change and might even overwrite the default.

> In general you should close an application before changing its defaults, in the case of Dock and Finder defaults - restart them after applying the default with the `killall` command (`killall Dock`, `killall Finder`).

https://pawelgrzybek.com/change-macos-user-preferences-via-command-line/

https://github.com/mathiasbynens/dotfiles/blob/main/.macos

Fork with changes: https://github.com/mathiasbynens/dotfiles/compare/master...junjizhi:dotfiles-2:master

https://github.com/driesvints/dotfiles/blob/main/.macos

https://github.com/pawelgrzybek/dotfiles/blob/master/setup-macos.sh

Finder

```shell
defaults write com.apple.finder ShowPathbar -bool true
```

## Keyboard Shortcuts

[Mac keyboard shortcuts](https://support.apple.com/en-au/HT201236)

Cycle current application’s windows: <kbd>⌘</kbd> + <kbd>`</kbd>

Character Viewer ([emoji picker](https://support.apple.com/en-au/guide/mac-help/mchlp1560/mac)): <kbd>⌘</kbd> + <kbd>Ctrl</kbd> + <kbd>Space</kbd>

Show/hide hidden files: <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>

All my macOS keyboard shortcuts - https://www.jamieonkeys.dev/posts/keyboard-shortcuts - https://news.ycombinator.com/item?id=30876934

### Add sleep shortcut

https://apple.stackexchange.com/a/431149/241238

Monterey: Preferències → Teclat → pestanya Dreceres → Dreceres de l'app. Ventura: Configuració → Teclat → Dreceres de teclat... → Dreceres de l'app. Afegir 2 dreceres noves amb nom 'Sleep' i 'Repòs' a <kbd>Shift</kbd><kbd>Alt</kbd><kbd>Q</kbd>. Haig de veure el shortcut ⌥⇧Q al menu del sistema.

### Prevent ⌘+i to open the Mail app on Chrome

https://apple.stackexchange.com/questions/108060/how-to-prevent-command-i-command-shift-i-from-opening-mac-mail-when-in-browser

Ventura: Configuració → Teclat → Dreceres de teclat... → Dreceres de l'app. Clicar '+'. Al menú que s'obre seleccionar:

- App: Google Chrome.
- Títol de menú: ha de ser exactament "Envia l'enllaç per correu electrònic". És el que diu a Chrome → Fitxer → Comparteix.
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

Changed in Settings → Profiles → Colors, at the dropdown 'Color presets...'. Tip: duplicate the current profile to make tests.

### Finder integration (New iTerm Window here)

Click the 'iTerm2' menu bar item (at the top left) and then do Services → Services Settings... This opens the 'Configuració del Sistema' → Teclat → Dreceres de teclat... Once there, on 'Arxius i carpetes' check 'New iTerm Window here'.

### Shortcuts

:::note

I've already added these shortcuts in the past. Thus, to have them in a new iTerm2 installation, I don't have to add them manually again, I can simply import either the profile .json file or the .itermkeymap file.

Note that the .json profile contains all the shortcuts of the .itermkeymap file, so if we import the profile we don't have to import the .itermkeymap afterwards.

:::

Go to Preferences → Profiles tab → Keys tab → Key Mappings tab.
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

- Undo close: when you close a session tab by accident, you can restore it with Edit → Undo or Cmd+Z.
  - Important: adjust the timeout in Settings → Profiles → Session, at "Undo can revive a session that has been closed for up to X seconds". Default value is 5 seconds. Should be changed to about 25 seconds.
- Hold Cmd+Option to select text with the mouse doing a rectangle

### Full disk access

If a dialog pops up every time you run `docker compose up --build`, you need to give iTerm2 full disk access at the macOS settings → Privacy and security. See:

- https://gitlab.com/gnachman/iterm2/-/wikis/fulldiskaccess
- https://apple.stackexchange.com/questions/442220/how-to-stop-iterm2-requiring-being-granted-access-every-time
- https://www.reddit.com/r/iterm/comments/17c97d3/macos_sonoma_iterm2_iterm2_wants_to_access/

## kexts

Used by Little Snitch and Razer Synapse.

Are located in `/Library/Extensions/`.

## Free up disk space

:::tip
Per trobar fitxers grans fer:

- Clicar l'escriptori i prémer Command + F.
- S'obrirà una finestra del finder. A "Buscar a:" seleccionar "Aquest Mac"
- Seleccionar:
  - Mida de l'arxiu
  - és superior a
  - 100
  - MB

Això mostra fitxers com `Docker.raw` que no apareixen a "Sobre aquest Mac" → Emmagatzematge → Gestionar... Atenció: el fitxer `Docker.raw` no té realment la mida que diu el Mac (64 GB!), cal fer `du -h ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw` per veure la mida real - [source](https://github.com/docker/for-mac/issues/2297#issuecomment-390441184).
:::

- (This frees plenty GBs.) Android emulators, system images, SDKs, build tools, NDK etcetera:
  - The Android virtual devices are stored at `~/.android/avd`.
  - To get rid of Android emulators, open Android Studio → Device Manager and delete them.
  - To get rid of Android system images, SDKs and other stuff, open Android Studio → SDK Manager. (There are various ways to open it, eg Settings → Languages & Frameworks → Android SDK). Once thee, check the checkbox 'Show package details'. Then uninstall everything possible like the NDK, emulator System Images, SDKs etcetera.
- Delete `node_modules` folders with [npkill](https://github.com/voidcosmos/npkill):
  - `npx npkill@latest --directory ~/Programming`.
  - `npx npkill@latest --directory ~/Webs`.
- Delete yarn cache: `yarn cache clean` - [docs](https://yarnpkg.com/cli/cache/clean). Can be +20 GB.
- Delete gradle cache (`~/.gradle/caches`): `rm -rf ~/.gradle/caches`. See [How to clear gradle cache?](https://stackoverflow.com/questions/23025433/how-to-clear-gradle-cache).
  - The whole `~/.gradle` folder is still big though (~600 MB). You can delete it if you don't need cached dependencies or wrapper files. Gradle will recreate this folder and re-download dependencies as needed when you build projects again. Deleting it may slow down the next build due to re-downloading.
- Delete npm cache (`~/.npm/_cacache`): `npm cache clean --force`. Not sure if doing this is necessary, see [Why and how to clear npm cache](https://sebhastian.com/npm-clear-cache). You can check the cache size with `npm cache verify`.
- Delete Carthage cache (can be 2-3 GB): `rm -rf ~/Library/Caches/org.carthage.CarthageKit` [source](https://stackoverflow.com/q/45504896/4034572)
- Delete `build` folders: `find . -type d -name "build" -exec rm -rf {} +`.
- Delete Python `venv` and `.venv` folders:
  - `find . -type d -name "venv" -exec rm -rf {} +`
  - `find . -type d -name ".venv" -exec rm -rf {} +`
- Delete unused Node.js versions. Run `fnm list`. They are stored at `~/.local/share/fnm/node-versions`.
- Delete unused Ruby versions. Run `rbenv versions`. They are stored at `~/.rbenv/versions`.
- Delete `.terraform` folders. The aws provider is 580 MB. [See instructions](/cloud/terraform#free-up-disk-space)
- Xcode
  - Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices`: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572.
  - Delete Xcode caches with 'DevCleaner for Xcode' - https://apps.apple.com/us/app/devcleaner/id1388020431.
  - Delete Xcode caches with Storage app (Sobre aquest Mac → Emmagatzematge → Gestionar... i seleccionar Desenvolupador al menú de l'esquerra) - https://stackoverflow.com/a/69623427/4034572
  - Delete old Xcode archives. Use the Organizer (Window → Organizer).
- JetBrains IDEs, delete old versions: Help → Delete Leftover IDE Directories…
  - JetBrains IDEs are located at `~/Library/Application Support/JetBrains` (`cd ~/Library/Application\ Support/JetBrains`).
  - There are also really big files at `~/Library/Caches/JetBrains`.
  - Directories are listed at the uninstall instructions: https://www.jetbrains.com/help/idea/uninstall.html#macos.
  - Android Studio is located at `~/Library/Application Support/Google` (`cd ~/Library/Application\ Support/Google`).
- Clear `~/Library/Caches/Google`. Contains data of old versions of Android Studio.
- Docker:
  - Docs: Prune unused Docker objects: https://docs.docker.com/config/pruning.
  - Remove dangling images (images with `<none>` in `docker image ls`): `docker image prune` ([docs](https://docs.docker.com/engine/reference/commandline/image_prune/))
    - IMPORTANT: be careful with `docker image prune -a` because it deletes plenty of stuff, eg it has deleted all images shown by `docker image ls`, not only the ones with `<none>`! It says `WARNING! This will remove all images without at least one container associated to them.`.
  - Pune everything: `docker system prune`. This removes all stopped containers, all networks not used by at least one container, all dangling images and all build cache.
  - You can adjust the "Disk usage limit" at the Docker Desktop Settings → Resources.
  - The Mac may say that the `Docker.raw` file is (eg) 64 GB, but this is not true. To check the _actual_ size of the `Docker.raw` file use `du -h ~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw` - [source](https://github.com/docker/for-mac/issues/2297#issuecomment-390441184).
- Anar a `~/Library/Application Support` i esborrar programes antics.
- Esborrar fitxers grans: Sobre aquest Mac → Emmagatzematge → Gestionar...
- Telegram: esborrar la memòria cau (pot tenir 1 GB). Es fa a Configuració → Dades i emmagatzematge → Ús de l'emmagatzematge
- Firefox: esborrar dades del lloc (pot ser 3 GB). Anar a Preferències → Privadesa i seguretat → Gestiona les dades... S'ordenen per mida. Cal apretar Delete a cada Lloc i després 'Desa els canvis' (sinó no esborra). Esborrar les que fa més d'un any que es van fer servir ('Darrer ús').
- Brew:
  - `brew autoremove`: uninstall formulae that were only installed as a dependency of another formula and are now no longer needed.
  - `brew cleanup`: usually not necessary, but sometimes frees space.
- Spotify: esborrar la "Memòria cau" a les Preferències (uns 500 MB).
- Find file duplicates:
  - https://dupeguru.voltaicideas.net - https://github.com/arsenetar/dupeguru/
  - https://macpaw.com/gemini

https://cleanmymac.com

## Port 5000 used

Si tens aquest error:

```
Error: listen EADDRINUSE: address already in use :::5000
```

Si fas `lsof -i tcp:5000` diu:

```
COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ControlCe 971 albert    9u  IPv4 0x82f98b9c1d6f8cd3      0t0  TCP *:commplex-main (LISTEN)
ControlCe 971 albert   11u  IPv6 0x4e61d39e72bdbfc6      0t0  TCP *:commplex-main (LISTEN)
```

Cal anar a Configuració del Sistema → General → AirDrop i Handoff i desactivar el switch "Receptor AirPlay".

Veure:

- https://nono.ma/port-5000-used-by-control-center-in-macos-controlce
- https://www.reddit.com/r/perl/comments/10p8p39/macos_port_5000_mystery_solved/
