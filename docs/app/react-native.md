---
title: React Native
---

:::info Important
Always open `.xcworkspace` not `.xcodeproj`.
:::

Bundle visualizer: https://github.com/IjzerenHein/react-native-bundle-visualizer

Clean Project: https://github.com/pmadruga/react-native-clean-project

## Development environment setup

To develop with Expo we only need watchman, Xcode, the Command Line Tools and Android Studio. To develop normal React Native apps we need Ruby, Cocoapods etc.

Installing a Java JDK and setting `$JAVA_HOME` is only necessary if we want to re-use the same daemon between Android Studio and the terminal.

_Important: this instructions are not complete yet, it's for Expo development, and they need to be expanded to work on normal React Native apps._

Resources:

- https://reactnative.dev/docs/environment-setup
- iOS: https://docs.expo.dev/workflow/ios-simulator
- Android: https://docs.expo.dev/workflow/android-studio-emulator
- https://developer.android.com/studio/command-line/variables#envar -> Important: "ANDROID_SDK_ROOT, which also points to the SDK installation directory, is deprecated"

### Common

On macOS and Linus (not Windows), install watchman. On macOS run `brew install watchman`. See https://facebook.github.io/watchman/docs/install.html for more about how to install it.

If developing with Expo, install the CLI: `npm install --global expo-cli`. This is how I have it installed on my MBP 2016.

### iOS

You need Xcode to have simulators and open Xcode projects. Install it with the App Store either by [clicking this link](https://apps.apple.com/us/app/xcode/id497799835) or searching 'xcode' on the Store.

Install the Command Line Tools. At Xcode, go to Settings -> Locations and select a version at the 'Command Line Tools' dropdown.

### Android

You need Android Studio to have emulators, adb etc. Install it by downloading it from https://developer.android.com/studio. Make sure to pick the right CPU architecture (Intel/ARM) since there are 2 download buttons.

You need to have the environment variable `$ANDROID_HOME` set, pointing to the sdk location (usually `~/Library/Android/sdk`). You also need to have `$ANDROID_HOME/emulator` and `$ANDROID_HOME/platform-tools` on your `$PATH` in order to have access to `adb` and `emulator` from the command line.

Add following to the `.zshrc`:

```bash title=".zshrc"
export ANDROID_HOME=$HOME/Library/Android/sdk
path+=("$ANDROID_HOME/emulator")
path+=("$ANDROID_HOME/platform-tools")
```

You can check if the environment variable is set with `echo $ANDROID_HOME` (just `$ANDROID_HOME` prints nothing, even if the envar set).

And you can check that `adb` and `emulator` are on the `$PATH` with `which adb` and `which emulator`.

## CLI

https://github.com/react-native-community/cli

Commands: https://github.com/react-native-community/cli/blob/master/docs/commands.md

Start Metro bundler: `npx react-native start`

Reset cache: `npx react-native start --reset-cache`

_Also see_ https://github.com/pmadruga/react-native-clean-project

### iOS

[`run-ios` docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios)

Run instructions for iOS: `npx react-native run-ios` or open ios/YourAppName.xcworkspace in Xcode (or run "xed -b ios") and then hit the run button.

Run on a specific iOS simulator: `npx react-native run-ios --simulator "iPhone XS Max"`. (Use `xcrun simctl list devices` to list the simulators.)

Run Release configuration: `npx react-native run-ios --configuration Release` (default configuration is 'Debug').

### Android

[`run-android` docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-android)

Run instructions for Android: `npx react-native run-android`. You may have an Android emulator running or a device connected.

Run on a specific Android emulator: `npx react-native run-android --deviceId emulator-5554`. You can get the emulator id with `adb devices`.

Launch Android emulator: `${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`. (Use `emulator -list-avds` to list the existing emulators.)

Run Release variant: `npx react-native run-android --variant=release`

## Show developer menu

- Android
  - Press Cmd or Ctrl + M, or shake your device.
  - Run `adb shell input keyevent 82` or `adb shell input keyevent KEYCODE_MENU`
- iOS
  - Press Cmd + D, or shake your device (Cmd + Ctrl + Z).

## Check platform

```ts
import { Platform } from 'react-native'

export const isAndroid: boolean = Platform.OS === 'android'
export const isIOS: boolean = Platform.OS === 'ios'
```

## Libraries

- Logs: https://github.com/onubo/react-native-logs
- Network requests logger: https://github.com/alexbrazier/react-native-network-logger
- Performance
  - https://github.com/oblador/react-native-performance
  - Flipper plugin to show a graph of the React Native performance monitor: https://github.com/bamlab/react-native-flipper-performance-monitor - See it in action at https://www.youtube.com/watch?v=uLicTDG5hSs at 3:50

## Full width

`alignSelf: 'stretch'`

## ScrollView

### Full height

```ts
import * as React from 'react'
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'

export function FullHeightScrollView(
  props: {
    children: React.ReactNode
  } & Omit<ScrollViewProps, 'contentContainerStyle'>
) {
  return (
    <ScrollView contentContainerStyle={styles.grow} {...props}>
      {props.children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  grow: { flexGrow: 1 },
})
```

### Avoid dismiss keyboard on touch

Fix it with `<ScrollView keyboardShouldPersistTaps='handled'>`. See [issue #28871](https://github.com/facebook/react-native/issues/28871) (Touchable/Button in Modal dismisses keyboard on Touch if Modal's parent is a ScrollView without keyboardShouldPersistTaps).

### Have to click 2 times on a button for the click event to work

Fix it with `keyboardShouldPersistTaps='always'` or `keyboardShouldPersistTaps='handled'`.

Note that `keyboardShouldPersistTaps={true}` is deprecated. The warning at the console also says "Use `keyboardShouldPersistTaps='always'` instead".

Links:

- [issue #4087](https://github.com/facebook/react-native/issues/4087) Need to tap twice in order to tap on TouchableHighlight when it is within a ScrollView or ListView.
- https://stackoverflow.com/questions/57941342/button-cant-be-clicked-while-keyboard-is-visible-react-native/57941568

## FlatList issues

Fix scroll bar in the middle of screen: `scrollIndicatorInsets={{ right: 1 }}`. See https://github.com/facebook/react-native/issues/26610#issuecomment-539843444

## New Architecture

Samples:

- Apps: https://github.com/react-native-community/RNNewArchitectureApp
- Libraries: https://github.com/react-native-community/RNNewArchitectureLibraries

## CI/CD

https://www.obytes.com/blog/react-native-github-action

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
