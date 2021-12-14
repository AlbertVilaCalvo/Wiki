---
title: iOS
---

## CLI

simctl commands: `xcrun simctl` or `xcrun simctl help`

List simulators: `xcrun simctl list devices`

Start a simulator: `open -a Simulator --args -CurrentDeviceUIDI <simulator UDID>`

Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices` to free up disk space: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572


## Simulator

Images are located in `~/Library/Developer/CoreSimulator/Devices/81F9EF8A-486B-4F85-8BED-7131C2EF0500/data/Containers/Shared/AppGroup/D97F65BC-4921-486A-B89D-9A6ADA5DFC34`.

Get a simulator ID: `xcrun simctl list | egrep '(Booted)'`


## Test push notifications on the simulator

From https://stackoverflow.com/questions/61855874/how-to-test-pushnotification-in-ios-simulator-xcode

Create a file `pushtest.apns`:

```
{
  "Simulator Target Bundle": "<bundle identifier of the app>",
  "aps": {
    "alert": "Push Notifications Test",
    "sound": "default",
    "badge": 1
  }
}
```

```
xcrun simctl push <simulator identifier> <bundle identifier of the app> pushtest.apns"
```


## Universal links (verified deep links)

https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

https://stackoverflow.com/questions/35609667/how-to-support-universal-links-in-ios-app-and-setup-server-for-it

Validate apple-app-site-association: https://branch.io/resources/aasa-validator/

Example of AASA file: https://facebook.com/.well-known/apple-app-site-association

Test deep links (only works on the simulator): `xcrun simctl openurl booted "https://example.com/xyz"`
