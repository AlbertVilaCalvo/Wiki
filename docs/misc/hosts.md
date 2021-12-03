---
title: hosts
---

https://github.com/StevenBlack/hosts

`hosts` file is located in `/private/etc`

```
cd ~/Informàtica/hosts
gco -- .
ggpull
python3 updateHostsFile.py [--backup]
```

```
cd ~/Informàtica/hosts && gco -- . && ggpull && python3 updateHostsFile.py
```

## Error ModuleNotFoundError: No module named 'requests'

If an error like "ModuleNotFoundError: No module named 'lxml'" is thrown when running `updateHostsFile.py`, then install the required dependencies by following [Generate your own unified hosts file](https://github.com/StevenBlack/hosts#generate-your-own-unified-hosts-file).

Basically run `pip3 install --user -r requirements.txt`.
