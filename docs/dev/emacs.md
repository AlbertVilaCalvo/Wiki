---
title: Emacs
---

https://www.gnu.org/software/emacs

Manual: https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html

Reference Cards: https://www.gnu.org/software/emacs/refcards/index.html

https://www.emacswiki.org

https://emacsrocks.com

Emacs cheatsheet - https://quickref.me/emacs.html

## Init file

You can use `~/.emacs`, `~/.emacs.el`, `~/.emacs.d/init.el` and others.

- https://www.gnu.org/software/emacs/manual/html_node/efaq/Setting-up-a-customization-file.html
- https://stackoverflow.com/questions/19524627/where-is-my-emacs-file-on-mac-os-x
- https://www.gnu.org/software/emacs/manual/html_node/emacs/Init-File.html

Interesting comment ([source](https://stackoverflow.com/questions/19524627/where-is-my-emacs-file-on-mac-os-x#comment28982438_19525293)):

> I would recommend` ~/.emacs.d/init.el`, though, because that makes it easier to keep the whole Emacs configuration under version control.

## Undo

C-x u

https://www.emacswiki.org/emacs/UndoCommands

## Cut, copy and paste

To cut and paste a single line you can use C-k to cut and C-y to paste.
To cut a sentence, use M-k.
To cut a word, use M-d.

To select a region, press Ctrl+Space to start selecting text (you should see "Mark set" at the minibuffer), then use the arrow keys to select the text you want. Once you have selected the text, you can cut it with Ctrl+w or copy it with M-w, then paste it with Ctrl+y.

| Modern Term | Emacs Term     | Shortcut |
| ----------- | -------------- | -------- |
| Cut         | Kill           | C-w      |
| Copy        | Kill ring save | M-w      |
| Paste       | Yank           | C-y      |

You can also use the mouse. From https://web.physics.utah.edu/~detar/lessons/emacs/emacs/node8.html:

> The mouse way is much simpler. Left-drag with the mouse to highlight the selected region. Then **double right-click to cut**. Move the cursor to the paste position and click with the **middle mouse button**. If you just want to copy, don't do the double right-click.
>
> There is a second mouse way to select a region, which is particularly useful when you are selecting a large portion of your file. Left-click with the mouse on the first character. Then right click immediately to the right of the last character. Complete the operation as before.

## Show line and column numbers

Go to your init file and add `(setq column-number-mode t)`. From https://www.gnu.org/software/emacs/manual/html_node/efaq/Displaying-the-current-line-or-column.html

Note that this works on version >= 26.

- https://emacs.stackexchange.com/questions/278/how-do-i-display-line-numbers-in-emacs-not-in-the-mode-line
- https://www.emacswiki.org/emacs/LineNumbers
