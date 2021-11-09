---
title: iOS
---

## CLI

`xcrun simctl list devices`


## Simulator

Images are located in `~/Library/Developer/CoreSimulator/Devices/81F9EF8A-486B-4F85-8BED-7131C2EF0500/data/Containers/Shared/AppGroup/D97F65BC-4921-486A-B89D-9A6ADA5DFC34`.


## Universal links (verified deep links)

https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

https://stackoverflow.com/questions/35609667/how-to-support-universal-links-in-ios-app-and-setup-server-for-it

Validate apple-app-site-association: https://branch.io/resources/aasa-validator/

Example of AASA file: https://facebook.com/.well-known/apple-app-site-association

Test deep links (only works on the simulator): `xcrun simctl openurl booted "https://example.com/xyz"`
