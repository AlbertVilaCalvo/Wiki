---
title: React Native
---

:::info Important
Always open `.xcworkspace` not `.xcodeproj`.
:::

Bundle visualizer: https://github.com/IjzerenHein/react-native-bundle-visualizer

Clean Project: https://github.com/pmadruga/react-native-clean-project

Rename app, package name or bundle id: https://github.com/junedomingo/react-native-rename

## Development environment setup

:::tip
Use `npx react-native doctor` to check if you have everything properly setup [docs](https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor)
:::

To develop with Expo we only need watchman, Xcode, the Command Line Tools and Android Studio. To develop normal React Native apps we need Ruby, Cocoapods etc.

Installing a Java JDK and setting `$JAVA_HOME` is only necessary if we want to re-use the same daemon between Android Studio and the terminal.

_Important: this instructions are not complete yet, it's for Expo development, and they need to be expanded to work on normal React Native apps._

Resources:

- https://reactnative.dev/docs/environment-setup
- iOS: https://docs.expo.dev/workflow/ios-simulator
- Android: https://docs.expo.dev/workflow/android-studio-emulator
- https://developer.android.com/studio/command-line/variables#envar → Important: "ANDROID_SDK_ROOT, which also points to the SDK installation directory, is deprecated"

### Common

On macOS and Linus (not Windows), install watchman. On macOS run `brew install watchman`. See https://facebook.github.io/watchman/docs/install.html for more about how to install it.

If developing with Expo, install the CLI: `npm install --global expo-cli`. This is how I have it installed on my MBP 2016.

### iOS

You need Xcode to have simulators and open Xcode projects. Install it with the App Store either by [clicking this link](https://apps.apple.com/us/app/xcode/id497799835) or searching 'xcode' on the Store.

Install the Command Line Tools. At Xcode, go to Settings → Locations and select a version at the 'Command Line Tools' dropdown.

### Android

You need Android Studio to have emulators, adb etc. Install it by downloading it from https://developer.android.com/studio. Make sure to pick the right CPU architecture (Intel/ARM) since there are 2 download buttons.

You need to have the environment variable `$ANDROID_HOME` set, pointing to the sdk location (usually `~/Library/Android/sdk`). You also need to have `$ANDROID_HOME/emulator` and `$ANDROID_HOME/platform-tools` on your `$PATH` in order to have access to `adb` and `emulator` from the command line.

Add following to the `.zshrc`:

```shell title=".zshrc"
export ANDROID_HOME=$HOME/Library/Android/sdk
path+=("$ANDROID_HOME/emulator")
path+=("$ANDROID_HOME/platform-tools")
```

Check if the environment variable is set with `echo $ANDROID_HOME`. And check that `adb` and `emulator` are on the `$PATH` with `which adb` and `which emulator`.

## CLI

https://github.com/react-native-community/cli

Commands: https://github.com/react-native-community/cli/blob/main/docs/commands.md

Create app: `npx react-native@latest init MyApp`. Note that there's no need to pass `--template react-native-template-typescript` since [version 0.71](https://reactnative.dev/blog/2023/01/12/version-071). See [First-class Support for TypeScript](https://reactnative.dev/blog/2023/01/03/typescript-first) for more details. The template https://github.com/react-native-community/react-native-template-typescript is deprecated. The new one lives in https://github.com/facebook/react-native/tree/main/packages/react-native/template.

Check environment setup: `npx react-native doctor`

### Start dev server

[`start` docs](https://github.com/facebook/react-native/tree/main/packages/community-cli-plugin#start)

```shell
npx react-native start
```

```shell
npx react-native start --reset-cache
```

_To clean the cache also see_ https://github.com/pmadruga/react-native-clean-project

### Run iOS

[`run-ios` docs](https://github.com/react-native-community/cli/blob/main/packages/cli-platform-ios/README.md#run-ios)

```shell
npx react-native run-ios
```

```
Run instructions for iOS:
  • cd "/Users/albert/Desktop/MemoryGame/ios"

  • Install Cocoapods
    • bundle install # you need to run this only once in your project.
    • bundle exec pod install
    • cd ..

  • npx react-native run-ios
  - or -
  • Open MemoryGame/ios/MemoryGame.xcodeproj in Xcode or run "xed -b ios"
  • Hit the Run button
```

```shell
cd ios && bundle exec pod install && cd ..
```

Tip: if `bundle exec pod install` fails (CocoaPods could not find compatible versions for pod "FlipperKit/FKPortForwarding") then try `pod install --repo-update` and then again `bundle exec pod install`. [source](https://stackoverflow.com/a/77713078/4034572)

You can also try ([source](https://stackoverflow.com/a/76158455/4034572)):

```shell
pod deintegrate
pod repo update
pod install
```

Run on a specific iOS simulator: `npx react-native run-ios --simulator "iPhone XS Max"`. (Use `xcrun simctl list devices` to list the simulators.)

Run Release configuration: `npx react-native run-ios --configuration Release` (default configuration is 'Debug').

### Run Android

[`run-android` docs](https://github.com/react-native-community/cli/blob/main/packages/cli-platform-android/README.md#run-android)

```shell
npx react-native run-android
```

```
Run instructions for Android:
  • Have an Android emulator running (quickest way to get started), or a device connected.
  • cd "/Users/albert/Desktop/MemoryGame" && npx react-native run-android
```

Run on a specific Android emulator: `npx react-native run-android --deviceId emulator-5554`. You can get the emulator id with `adb devices`.

Launch Android emulator: `${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`. (Use `emulator -list-avds` to list the existing emulators.)

Run Release variant: `npx react-native run-android --variant=release`

## View logs

To view the **JavaScript** logs do:

```shell
npx react-native log-android
npx react-native log-ios
```

To view the **native Android** logs do:

```shell
adb logcat --pid=$(adb shell pidof -s com.example.myapp) -v color
```

[See logcat docs](https://developer.android.com/tools/logcat) for more options. (Note that the app needs to be running on the phone or emulator, otherwise `pidof` will return nothing.)

To view the **native iOS** use the Console app as [explained in this video](https://www.youtube.com/watch?v=LvCci4Bwmpc) (at 2nd half) and here: https://docs.expo.dev/debugging/runtime-issues/#crash-reports-using-console-app

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

https://reactnative.directory

- Logs: https://github.com/mowispace/react-native-logs (previously was https://github.com/onubo/react-native-logs)
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

## Releases

- [0.71 2023/01](https://reactnative.dev/blog/2023/01/12/version-071)
  - [TypeScript by default](https://reactnative.dev/blog/2023/01/03/typescript-first) on new projects → **Important: they recommend removing the `@types/react-native` from `package.json`**
  - Flexbox gap
  - Web-inspired props for accessibility, styles, and events (src, alt, aria-label...)

## New Architecture

Samples:

- Apps: https://github.com/react-native-community/RNNewArchitectureApp
- Libraries: https://github.com/react-native-community/RNNewArchitectureLibraries

## CI/CD

https://www.obytes.com/blog/react-native-github-action

Switch between project build variants (staging, production, etc) in React Native — https://medium.com/@phen0menon/switch-between-project-build-variants-staging-production-etc-in-react-native-part-1-84b087aef790

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
