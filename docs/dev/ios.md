---
title: iOS
---

## CLI

`xcrun simctl list devices`

## Universal links (verified deep links)

https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

Validate apple-app-site-association: https://branch.io/resources/aasa-validator/

Example of AASA file: https://facebook.com/.well-known/apple-app-site-association

Test deep links (only works on the simulator): `xcrun simctl openurl booted "https://example.com/xyz`
