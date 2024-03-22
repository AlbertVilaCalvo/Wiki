---
title: iOS
---

Developer account: https://developer.apple.com/account

Register device UDID: https://developer.apple.com/account/resources/devices/list

App Store Connect: https://appstoreconnect.apple.com

How to check or set the minimum iOS supported version: https://stackoverflow.com/questions/29736871/setting-the-minimum-ios-version-in-xcode
With an ipa file, you can unarchive (it's a zip) you'll get an .app file. Right click to the .app file to show it's content. At the Info.plist, check the field `MinimumOSVersion`.

DevCleaner for Xcode: https://apps.apple.com/us/app/devcleaner/id1388020431

Change bundle id: https://github.com/junedomingo/react-native-rename

## CLI

simctl commands: `xcrun simctl` or `xcrun simctl help`

List simulators: `xcrun simctl list devices`

Start a simulator: `open -a Simulator --args -CurrentDeviceUIDI <simulator UDID>`

Delete unused simulators data in `~/Library/Developer/CoreSimulator/Devices` to free up disk space: `xcrun simctl delete unavailable`. From https://stackoverflow.com/a/42703818/4034572

## Simulator

Images are located in `~/Library/Developer/CoreSimulator/Devices/81F9EF8A-486B-4F85-8BED-7131C2EF0500/data/Containers/Shared/AppGroup/D97F65BC-4921-486A-B89D-9A6ADA5DFC34`.

Get a simulator ID: `xcrun simctl list | egrep '(Booted)'`

To move an icon from one screen to the other see https://stackoverflow.com/questions/45888520/how-to-move-app-icon-to-another-page-in-ios-simulator.

## Real iPhone

Enable developer mode (required to install an app): https://docs.expo.dev/guides/ios-developer-mode/

You need to sign the app with an [ad hoc provisioning profile](https://help.apple.com/xcode/mac/current/#/dev4335bfd3d) that includes your device UDID, see [Distribute to registered devices (iOS, tvOS, watchOS)](https://help.apple.com/xcode/mac/current/#/dev7ccaf4d3c)

## Info.plist

Keys: https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html

## Version

|                               | Android                          | iOS                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Public (visible on the store) | `versionName` - A string ("1.0") | [`CFBundleShortVersionString`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleshortversionstring) aka **version** or marketing version                                |
| Private                       | `versionCode` - An int (1)       | [`CFBundleVersion`](https://developer.apple.com/documentation/bundleresources/information_property_list/cfbundleversion) aka **build number** - Can be a single digit (1, 2, 3...) or "1.2.3", or even "1.2.3.540" |

Similar to Android's `versionCode`, the build number also needs to increase, although you can have the same build number for two different versions.

If you upload a build to the App Store with a build number that already exists for that version, you get this error:

> ERROR ITMS-90189: "Redundant Binary Upload. You've already uploaded a build with build number '1' for version number '1.0'. Make sure you increment the build string before you upload your app to App Store Connect. Learn more in Xcode Help (http://help.apple.com/xcode/mac/current/#/devba7f53ad4)."

See what values to set here:

- https://stackoverflow.com/questions/25680604/error-itms-9000-redundant-binary-upload-there-already-exists-a-binary-upload
- https://stackoverflow.com/questions/6851660/version-vs-build-in-xcode/6965086

## Xcode shortcuts

- Build: ⌘ + B
- Run: ⌘ + R
- Clean Build Folder: ⌘ + ⇧ + K
- Stop: ⌘ + .

## App Store

Roles:

- https://developer.apple.com/support/roles
- https://developer.apple.com/help/app-store-connect/reference/role-permissions

## Certificates

From https://docs.expo.dev/app-signing/app-credentials/#summary

| Credential               | Limit Per Account | App-specific? | Can be revoked with no production side effects? | Used at... |
| ------------------------ | ----------------- | ------------- | ----------------------------------------------- | ---------- |
| Distribution Certificate | 2                 | ❌            | ✅                                              | Build time |
| Push Notification Key    | 2                 | ❌            | ❌                                              | Run time   |
| Provisioning Profile     | Unlimited         | ✅            | ✅                                              | Build time |

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

## Universal links (verified deep links with associated domains)

https://developer.apple.com/ios/universal-links/

(old) https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content

Supporting associated domains - https://developer.apple.com/documentation/Xcode/supporting-associated-domains

> The apps in the `apple-app-site-association` file on your website must have a matching [Associated Domains Entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_associated-domains).

https://stackoverflow.com/questions/35609667/how-to-support-universal-links-in-ios-app-and-setup-server-for-it

https://docs.expo.dev/guides/deep-linking/#universal-links-on-ios

https://reactnavigation.org/docs/deep-linking/

Validate apple-app-site-association: https://branch.io/resources/aasa-validator/

Example of AASA file: https://facebook.com/.well-known/apple-app-site-association

Test deep links with `xcrun` (only works on the simulator): `xcrun simctl openurl booted "https://example.com/xyz"`

Test deep links with [`uri-scheme`](https://www.npmjs.com/package/uri-scheme): `npx uri-scheme open "https://example.com/xyz" --ios`
