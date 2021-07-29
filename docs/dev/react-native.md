---
title: React Native
---


:::important
Always open `.xcworkspace` not `.xcodeproj`.
:::


## CLI

https://github.com/react-native-community/cli

Commands: https://github.com/react-native-community/cli/blob/master/docs/commands.md

Start Metro bundler: `npx react-native start`

Reset cache: `npx react-native start --reset-cache`

### iOS

Run instructions for iOS: `npx react-native run-ios` or open ios/YourAppName.xcworkspace in Xcode (or run "xed -b ios") and then hit the run button.

Run on a specific iOS simulator: `npx react-native run-ios --simulator "iPhone XS Max"`.

### Android

Run instructions for Android: `npx react-native run-android`. You may have an Android emulator running or a device connected.

Run on a specific Android emulator: `npx react-native run-android --deviceId emulator-5554`. You can get the emulator id with `adb devices`.

Launch Android emulator: `${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`. Use `emulator -list-avds` to list the existing emulators.

## Show developer menu

- Android
  - Press Cmd or Ctrl + M, or shake your device.
  - Run `adb shell input keyevent 82` or `adb shell input keyevent KEYCODE_MENU`
- iOS
  - Press Cmd + D, or shake your device (Cmd + Ctrl + Z).


## ScrollView issues

### Avoid dismiss keyboard on touch

Fix it with `<ScrollView keyboardShouldPersistTaps='handled'>`. See [issue #28871](https://github.com/facebook/react-native/issues/28871) (Touchable/Button in Modal dismisses keyboard on Touch if Modal's parent is a ScrollView without keyboardShouldPersistTaps).

### Have to click 2 times on a button for the click event to work

Fix it with `<ScrollView keyboardShouldPersistTaps='never'>`. See [issue #4087](https://github.com/facebook/react-native/issues/4087) (Need to tap twice in order to tap on TouchableHighlight when it is within a ScrollView or ListView).


## FlatList issues

Fix scroll bar in the middle of screen: `scrollIndicatorInsets={{ right: 1 }}`. See https://github.com/facebook/react-native/issues/26610#issuecomment-539843444


## Debug symbols on Android

Docs: https://developer.android.com/studio/build/shrink-code#native-crash-support

If you see this message after uploading an aab at Google Play:

> This App Bundle contains native code, and you've not uploaded debug symbols. We recommend you upload a symbol file to make your crashes and ANRs easier to analyze and debug.

Add this to android/app/build.gradle:

```
buildTypes {
    debug {
    }
    release {
        ndk {
            debugSymbolLevel 'SYMBOL_TABLE'
        }
    }
}
```

This requires having the NDK installed (otherwise `:app:extractReleaseNativeSymbolTables` fails with error 'NDK is not installed'). Also, add `ndk.dir=/Users/myusername/Library/Android/sdk/ndk/22.1.7171670` to the `local.properties` file so that it can be found - [source](https://stackoverflow.com/questions/29122903/ndk-is-not-configured-issue-in-android-studio#comment118085044_60682236).

Symbol files are automatically added to app bundles, but not to apk - [see docs](https://developer.android.com/studio/build/shrink-code#native-crash-support).

Useful links:
- https://stackoverflow.com/questions/63394726/how-to-publish-native-code-symbols-to-google-play-console
- https://stackoverflow.com/questions/62568757/playstore-error-app-bundle-contains-native-code-and-youve-not-uploaded-debug
