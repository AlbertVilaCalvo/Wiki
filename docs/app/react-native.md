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

_Also see_ https://github.com/pmadruga/react-native-clean-project

### iOS

[`run-ios` docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-ios)

Run instructions for iOS: `npx react-native run-ios` or open ios/YourAppName.xcworkspace in Xcode (or run "xed -b ios") and then hit the run button.

Run on a specific iOS simulator: `npx react-native run-ios --simulator "iPhone XS Max"`.

Run Release configuration: `npx react-native run-ios --configuration Release` (default configuration is 'Debug').

### Android

[`run-android` docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#run-android)

Run instructions for Android: `npx react-native run-android`. You may have an Android emulator running or a device connected.

Run on a specific Android emulator: `npx react-native run-android --deviceId emulator-5554`. You can get the emulator id with `adb devices`.

Launch Android emulator: `${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`. Use `emulator -list-avds` to list the existing emulators.

Run Release variant: `npx react-native run-android --variant=release`

## Show developer menu

- Android
  - Press Cmd or Ctrl + M, or shake your device.
  - Run `adb shell input keyevent 82` or `adb shell input keyevent KEYCODE_MENU`
- iOS
  - Press Cmd + D, or shake your device (Cmd + Ctrl + Z).

## Check platform

```
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
