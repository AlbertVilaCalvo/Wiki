---
title: Emacs
---

https://www.gnu.org/software/emacs

Manual: https://www.gnu.org/software/emacs/manual/html_node/emacs/index.html

Reference Cards: https://www.gnu.org/software/emacs/refcards/index.html

https://www.emacswiki.org

https://emacsrocks.com

## `.emacs` file

You can use `~/.emacs`, `~/.emacs.el`, `~/.emacs.d/init.el` and others.

- https://www.gnu.org/software/emacs/manual/html_node/efaq/Setting-up-a-customization-file.html
- https://stackoverflow.com/questions/19524627/where-is-my-emacs-file-on-mac-os-x
- https://www.gnu.org/software/emacs/manual/html_node/emacs/Init-File.html

Interesting comment ([source](https://stackoverflow.com/questions/19524627/where-is-my-emacs-file-on-mac-os-x#comment28982438_19525293)):

> I would recommend` ~/.emacs.d/init.el`, though, because that makes it easier to keep the whole Emacs configuration under version control.

## Undo

C-x u

https://www.emacswiki.org/emacs/UndoCommands

## Show line and column numbers

Go to your init file and add `(setq column-number-mode t)`. From https://www.gnu.org/software/emacs/manual/html_node/efaq/Displaying-the-current-line-or-column.html

Note that this works on version >= 26.

- https://emacs.stackexchange.com/questions/278/how-do-i-display-line-numbers-in-emacs-not-in-the-mode-line
- https://www.emacswiki.org/emacs/LineNumbers
