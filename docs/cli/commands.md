---
title: Commands
---

tldr man pages: https://tldr.sh

https://github.com/trimstray/the-book-of-secret-knowledge#shell-one-liners-toc

What shell is used: `echo $SHELL`

Command history is saved in `~/.zsh_history`.

List all environment variables: `printenv`. You can also print a specific envar: `printenv ANDROID_HOME`. (In Linux you can print many, eg `printenv ANDROID_HOME PATH`, but does not work in macOS.)

Oh-heck, a terminal command for when you forget other terminal commands - https://news.ycombinator.com/item?id=30720834 - https://oh-heck.dev

## find

`find . -type d -name "build"`

`find . -type d -name "build" -exec rm -rf {} +`

`find . -type f -name "*.iml"`

`find . -type f -name "*.iml" -exec rm -rf {} +`

Exclude: `find . -type d -name "dist" | grep -v 'node_modules'`

## diff

`diff -qr Carpeta1 Carpeta2`

## tree

`tree somefolder`

To ignore something (eg a folder) use `-I <wild-card-pattern>`. Eg `tree -I node_modules` or `tree -I venv`. There can be multiple -I options.

## fc

`fc [-e ename] [-lnr] [first] [last]`

`fc -s [pat=rep] [command]`

https://www.geeksforgeeks.org/fc-command-linux-examples

List recent commands in history: `fc -l`

## youtube-dl

https://github.com/ytdl-org/youtube-dl/

`youtube-dl --write-description --write-auto-sub --sub-lang es <URL>`

List subtitles: `youtube-dl --list-subs <URL>`

Use `--skip-download` if you want to get the subtitles or description only.

Quality:

- Options: https://github.com/ytdl-org/youtube-dl/#format-selection
- `-f 'bestvideo[height<=480]+bestaudio'`
- `-f worstvideo` o `-f worst`

Download audio: `youtube-dl -x [--audio-quality 0] [--audio-format "flac"] <URL>`

- `--audio-quality QUALITY`: 0 is the best, 9 the worst
- `--audio-format FORMAT`: "best", "aac", "flac", "mp3", "m4a", "opus", "vorbis", or "wav"; "best" by default

Also see https://github.com/yt-dlp/yt-dlp
