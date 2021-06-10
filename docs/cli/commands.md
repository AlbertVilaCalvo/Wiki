---
title: Commands
---

tldr man pages: https://tldr.sh


## find

`find . -type d -name "build"`

`find . -type d -name "build" -exec rm -rf {} +`

`find . -type f -name "*.iml"`

`find . -type f -name "*.iml" -exec rm -rf {} +`

Exclude: `find . -type d -name "dist" | grep -v 'node_modules'`


## diff

`diff -qr Carpeta1 Carpeta2`


## youtube-dl

https://github.com/ytdl-org/youtube-dl/

`youtube-dl --write-description --write-auto-sub --sub-lang es URL`

List subtitles: `youtube-dl --list-subs URL`

Use `--skip-download` if you want to get the subtitles or description only.

Quality: `-f 'bestvideo[height<=480]+bestaudio'`
