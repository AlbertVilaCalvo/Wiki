---
title: youtube-dl
---

https://github.com/ytdl-org/youtube-dl

`youtube-dl <URL>`

`youtube-dl --write-description --write-auto-sub --sub-lang es <URL>`

List subtitles: `youtube-dl --list-subs <URL>`

Use `--skip-download` if you want to get the subtitles or description only.

### [Video format](https://github.com/ytdl-org/youtube-dl/#format-selection)

- Use `--list-formats` to get the 'format code', a number like 139 or 251. Eg to list a YouTube video formats do: `youtube-dl https://www.youtube.com/watch?v=isd5zPzuM --list-formats`.
- Once you have the 'format code' you can do: `youtube-dl https://www.youtube.com/watch?v=isd5zPzuM -f 244`.
- Make sure to not pick a 'video only' format otherwise you don't get any audio :/

### Quality

- See options at https://github.com/ytdl-org/youtube-dl/#format-selection
- `-f 'bestvideo[height<=480]+bestaudio'`
- `'-f bestvideo[width<=1200]+bestaudio'`
- `-f worstvideo` o `-f worst`

Example: `youtube-dl https://www.youtube.com/watch?v=ioEAR_zPzuM -f 'bestvideo[width<=1200]+bestaudio'`

### Download audio

`youtube-dl -x [--audio-quality 0] [--audio-format "flac"] <URL>`

- `--audio-quality QUALITY`: 0 is the best, 9 the worst
- `--audio-format FORMAT`: "best", "aac", "flac", "mp3", "m4a", "opus", "vorbis", or "wav"; "best" by default

Also see https://github.com/yt-dlp/yt-dlp
