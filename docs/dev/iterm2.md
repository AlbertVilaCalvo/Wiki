---
title: iTerm2
---

https://iterm2.com

https://gitlab.com/gnachman/iterm2

https://github.com/gnachman/iTerm2

https://github.com/gnachman/iterm2-website

### Color schemes

https://iterm2colorschemes.com - https://github.com/mbadolato/iTerm2-Color-Schemes

Changed in Settings → Profiles → Colors, at the dropdown 'Color presets...'.

Tip: duplicate the current profile to make tests.

### Shortcuts

Cheatsheet - https://gist.github.com/squarism/ae3613daf5c01a98ba3a

- Composer (<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>.</kbd>): UI to edit commands before sending them. Useful for multiline commands.
- Advanced paste: <kbd>⌘</kbd> + <kbd>Option</kbd> + <kbd>V</kbd>
- Undo close (<kbd>⌘</kbd> + <kbd>Z</kbd>): when you close a session tab by accident, you can restore it with Edit → Undo or <kbd>⌘</kbd> + <kbd>Z</kbd>.
  - Important: adjust the timeout in Settings → Profiles → Session, at "Undo can revive a session that has been closed for up to X seconds". Default value is 5 seconds. Should be changed to about 25 seconds.
- Hold <kbd>⌘</kbd> + <kbd>Option</kbd> to select text with the mouse doing a rectangle.
- When shell integration is enabled, you can navigate to previous shell prompts with ⇧⌘↑ and ⇧⌘↓.

### My shortcuts

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

### Finder integration (New iTerm Window here)

Click the 'iTerm2' menu bar item (at the top left) and then do Services → Services Settings... This opens the 'Configuració del Sistema' → Teclat → Dreceres de teclat... Once there, on 'Arxius i carpetes' check 'New iTerm Window here'.

### Shell integration

https://iterm2.com/documentation-shell-integration.html

When enabled, you can navigate to previous shell prompts with ⇧⌘↑ and ⇧⌘↓.

To install do iTerm → Install Shell Integration. This runs either of these commands:

```shell
curl -L https://iterm2.com/shell_integration/install_shell_integration.sh | bash
curl -L https://iterm2.com/shell_integration/install_shell_integration_and_utilities.sh | bash
```

You can choose to install utilities to display inline images or download files, see https://iterm2.com/documentation-utilities.html.

When you run `curl -L https://iterm2.com/shell_integration/install_shell_integration_and_utilities.sh | bash` it prints:

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  5332  100  5332    0     0  66230      0 --:--:-- --:--:-- --:--:-- 66650
Downloading script from https://iterm2.com/shell_integration/zsh and saving it to /Users/albert/.iterm2_shell_integration.zsh...
Checking if /Users/albert/.zshrc contains iterm2_shell_integration...
Appending source command to /Users/albert/.zshrc...
Downloading imgcat...
Downloading imgls...
Downloading it2api...
Downloading it2attention...
Downloading it2check...
Downloading it2copy...
Downloading it2dl...
Downloading it2getvar...
Downloading it2git...
Downloading it2setcolor...
Downloading it2setkeylabel...
Downloading it2tip...
Downloading it2ul...
Downloading it2universion...
Downloading it2profile...
Downloading it2cat...
Adding aliases...

--------------------------------------------------------------------------------

Done.
iTerm2 shell integration was installed!

A script was installed to /Users/albert/.iterm2_shell_integration.zsh
Utilities were installed to /Users/albert/.iterm2. You don't need to modify your PATH because /Users/albert/.iterm2_shell_integration.zsh includes aliases for them.

To make it work right now, do:
  source /Users/albert/.iterm2_shell_integration.zsh

This line was also added to /Users/albert/.zshrc, so the next time you log in it will be loaded automatically.

--------------------------------------------------------------------------------

You will also have these commands:
imgcat filename
  Displays the image inline.
imgls
  Shows a directory listing with image thumbnails.
it2api
  Command-line utility to manipulate iTerm2.
it2attention start|stop|fireworks
  Gets your attention.
it2cat filename
  Prints a file and renders it natively
it2check
  Checks if the terminal is iTerm2.
it2copy [filename]
  Copies to the pasteboard.
it2dl filename
  Downloads the specified file, saving it in your Downloads folder.
it2setcolor ...
  Changes individual color settings or loads a color preset.
it2setkeylabel ...
  Changes Touch Bar function key labels.
it2tip
  iTerm2 usage tips
it2ul
  Uploads a file.
it2universion
  Sets the current unicode version.
it2profile
  Change iTerm2 session profile on the fly.
```

It adds the following line to `~/.zshrc`:

```shell
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
```

### AI

https://iterm2.com/documentation-ai-chat.html

https://gitlab.com/gnachman/iterm2/-/wikis/AI-Prompt

Important: you need an API key to use the AI features. For OpenAI, you can generate it at https://platform.openai.com/api-keys.

You also need to install the plugin available at https://iterm2.com/ai-plugin.html by dragging the `.app` file to the Applications folder. At the iTerm2 settings → General → AI it should say "Plugin installed and working".

### Full disk access

If a dialog pops up every time you run `docker compose up --build`, you need to give iTerm2 full disk access at the macOS settings → Privacy and security. See:

- https://gitlab.com/gnachman/iterm2/-/wikis/fulldiskaccess
- https://apple.stackexchange.com/questions/442220/how-to-stop-iterm2-requiring-being-granted-access-every-time
- https://www.reddit.com/r/iterm/comments/17c97d3/macos_sonoma_iterm2_iterm2_wants_to_access/
