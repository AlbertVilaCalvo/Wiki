---
title: React Native
---

## CLI

Start Metro bundler: `npx react-native start`

Run instructions for iOS: `npx react-native run-ios` or open ios/YourAppName.xcworkspace in Xcode (or run "xed -b ios") and then hit the run button.

Run instructions for Android: `npx react-native run-android`. You may have an Android emulator running or a device connected.

Run on a specific Android emulator: `npx react-native run-android --deviceId emulator-5554`. You can get the emulator id with `adb devices`.

Launch Android emulator: `${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`. Use `emulator -list-avds` to list the existing emulators.

Show developer menu:

- Android
  - Press Cmd or Ctrl + M, or shake your device.
  - Run `adb shell input keyevent 82` or `adb shell input keyevent KEYCODE_MENU`
- iOS
  - Press Cmd + D, or shake your device (Cmd + Ctrl + Z).
