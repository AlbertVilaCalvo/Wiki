---
title: React Native
---

:::info Important
Always open `.xcworkspace` not `.xcodeproj`.
:::

IDE: https://ide.swmansion.com

State of React Native survey - https://stateofreactnative.com

Bundle visualizer: https://github.com/IjzerenHein/react-native-bundle-visualizer

Clean Project: https://github.com/pmadruga/react-native-clean-project

Rename app, package name or bundle id: https://github.com/junedomingo/react-native-rename

:::info
On Android negative margin is not supported. [source](https://reactnative.dev/docs/style)
:::

## Sample code

https://github.com/expo/react-conf-app

## Development environment setup

:::tip
Use `npx react-native doctor` to check if you have everything properly setup [docs](https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor)
:::

Resources:

- https://reactnative.dev/docs/environment-setup
- iOS: https://docs.expo.dev/workflow/ios-simulator
- Android: https://docs.expo.dev/workflow/android-studio-emulator
- https://developer.android.com/studio/command-line/variables#envar → Important: "ANDROID_SDK_ROOT, which also points to the SDK installation directory, is deprecated"

To develop with Expo we only need watchman, Xcode, the Command Line Tools and Android Studio. To develop normal React Native apps we need Ruby, CocoaPods etc.

### Common

On macOS and Linux (not Windows), you need watchman. To install it on macOS run `brew install watchman`. See https://facebook.github.io/watchman/docs/install.html for more about how to install it.

### iOS

You need Xcode to have simulators and open Xcode projects. Install it using the App Store, either by [clicking this link](https://apps.apple.com/us/app/xcode/id497799835) or searching 'xcode'. (You can also download it from https://developer.apple.com/download/all/). After installing Xcode, open it. The first time you need to accept the license and choose which components you want to develop for (macOS, iOS, watchOS, tvOS and visionOS). macOS is selected and you can't de-select it. Select iOS to get the iOS simulators. The iOS download is about 9 GB.

You also need the Command Line Tools. It's likely that you already have them installed, since when you install iTerm2 it installs the Command Line Tools.
To check if you already have the Command Line Tools run `xcode-select --version` or `xcode-select -p`. (See all the options with `xcode-select --help`.) There are various ways to install them:

- Run `xcode-select --install`.
- At Xcode, go to Settings → Locations and select a version at the 'Command Line Tools' dropdown.

Install CocoaPods: `gem install cocoapods`. See https://guides.cocoapods.org/using/getting-started.html#installation. Do not use the macOS system ruby (2.6.10) because it doesn't work, you get a lot of this errors: "The last version of securerandom (>= 0.3) to support your Ruby & RubyGems was 0.3.2. Try installing it with `gem install securerandom -v 0.3.2` and then running the current command again". You need to use a newer ruby version.

You should be able to run `npx react-native run-ios` now. You may need to run `cd ios && bundle exec pod install` to install the `Podfile` dependencies of the app.

### Android

You need Android Studio to have emulators, adb etc. Install it by downloading it from https://developer.android.com/studio. Make sure to pick the right CPU architecture (Intel/ARM) since there are 2 download buttons. It should install:

- Android Emulator
- Sources (eg for Android 36)
- SDK Build-Tools (eg 36)
- SDK Platform (eg 36)
- SDK Platform-Tools
- Google Play ARM 64 v8a System Image

You need to have the environment variable `$ANDROID_HOME` set, pointing to the SDK location (`~/Library/Android/sdk` by default; you can check the value at the SDM Manager). You also need to have `$ANDROID_HOME/emulator` and `$ANDROID_HOME/platform-tools` on your `$PATH` in order to have access to `adb` and `emulator` from the command line.

Add following to the `.zshrc`:

```shell title=".zshrc"
export ANDROID_HOME=$HOME/Library/Android/sdk
path+=("$ANDROID_HOME/emulator")
path+=("$ANDROID_HOME/platform-tools")
```

Check if the environment variable is set with `echo $ANDROID_HOME`. And check that `adb` and `emulator` are on the `$PATH` with `which adb` and `which emulator`.

You also need to set `JAVA_HOME`, otherwise you get this error when running `npx react-native run-android`:

```
error Failed to install the app. Command failed with exit code 1: ./gradlew app:installDebug -PreactNativeDevServerPort=8081
The operation couldn’t be completed. Unable to locate a Java Runtime.
Please visit http://www.java.com for information on installing Java.
```

See instructions to set `JAVA_HOME` [here](/app/android#java_home).

You should be able to run `npx react-native run-android` now.

## CLI

https://github.com/react-native-community/cli

Commands: https://github.com/react-native-community/cli/blob/main/docs/commands.md

Do not install `react-native-cli` as a global package, use `npx @react-native-community/cli@latest` instead. At [Get Started Without a Framework](https://reactnative.dev/docs/getting-started-without-a-framework) it says:

> If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues: `npm uninstall -g react-native-cli @react-native-community/cli`.

### Create app

```shell
npx @react-native-community/cli@latest init MyApp
```

See [Get Started Without a Framework](https://reactnative.dev/docs/getting-started-without-a-framework).

In the past it was `npx react-native@latest init MyApp`. See "Sunsetting `react-native init`" at https://reactnative.dev/blog/2024/08/12/release-0.75#sunsetting-react-native-init

Note that there's no need to pass `--template react-native-template-typescript` since [version 0.71](https://reactnative.dev/blog/2023/01/12/version-071). See [First-class Support for TypeScript](https://reactnative.dev/blog/2023/01/03/typescript-first) for more details. The template https://github.com/react-native-community/react-native-template-typescript is deprecated. It now lives in https://github.com/react-native-community/template. (It was in https://github.com/facebook/react-native/tree/main/packages/react-native/template in 0.71.)

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

## Avoid width stretching (fit content)

This is the opposite of the previous.

`alignSelf: 'flex-start'`

On the web we can use [`fit-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content).

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

## Releases

[CHANGELOG](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)

- [0.71 2023/01](https://reactnative.dev/blog/2023/01/12/version-071)
  - [TypeScript by default](https://reactnative.dev/blog/2023/01/03/typescript-first) on new projects → **Important: they recommend removing the `@types/react-native` from `package.json`**
  - Flexbox gap
  - Web-inspired props for accessibility, styles, and events (src, alt, aria-label...)
- [0.72 2023/06](https://reactnative.dev/blog/2023/06/21/0.72-metro-package-exports-symlinks)
- [0.73 2023/12](https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks)
  - Kotlin is now the recommended language for Android apps
- [0.74 2024/04](https://reactnative.dev/blog/2024/04/22/release-0.74)
  - Yoga 3.0
  - Yarn 3 as the default package manager for new projects initialized with React Native Community CLI
  - Android SDK version requirement of 23 (Android 6.0)
  - Removal of Deprecated `PropTypes`
  - Removal of Flipper React Native Plugin
- [0.75 2024/08](https://reactnative.dev/blog/2024/08/12/release-0.75)
  - Yoga 3.1 with support for % values in `gap`, `columnGap` and `rowGap`, and in `translate` (`transform`)
  - Recommendation to use a React Native Framework (eg Expo). See [Use a framework to build React Native apps](https://reactnative.dev/blog/2024/06/25/use-a-framework-to-build-react-native-apps) and [RFC0759: React Native Frameworks](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md)
    - The template was moved to a new repository https://github.com/react-native-community/template and package [@react-native-community/template](https://www.npmjs.com/package/@react-native-community/template)
    - Sunsetting the `react-native init` command as of December 31st 2024. Should use `npx @react-native-community/cli@latest init MyApp` now

## Upgrading

https://reactnative.dev/docs/upgrading

https://react-native-community.github.io/upgrade-helper

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

## iOS error "PhaseScriptExecution failed with a nonzero exit code" if path contains spaces

"Build target React-rncore is a directory"

- https://github.com/facebook/react-native/issues/36762
- https://stackoverflow.com/a/66641075/4034572
- https://github.com/facebook/react-native/issues/36739
- https://github.com/react-native-community/releases/issues/214
- https://medium.com/@pascasigianpaolo/how-i-solved-react-native-xcode-14-build-error-command-phasescriptexecution-failed-with-a-nonzero-816d192edc54
