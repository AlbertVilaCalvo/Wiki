---
title: Android
---

List emulators: `emulator -list-avds`

List emulators running ('List of devices attached'): `adb devices`

Launch emulator: `${ANDROID_HOME}/emulator/emulator -avd Nexus_5X_API_27_-_Google_Play &`

Emulator show touches: `adb shell settings put system show_touches 1`

Emulator hide touches: `adb shell settings put system show_touches 0`

## Test deep links

https://developer.android.com/training/app-links/deep-linking#testing-filters

`adb shell am start -W -a android.intent.action.VIEW -d "scheme://example.com/some-path" com.example.debug`

If you have multiple emulators then add '-s emulator-name', like this:

`adb -s emulator-5554 shell am start -W -a android.intent.action.VIEW -d "scheme://example.com/some-path" com.example.debug`

## Modify the emulator `hosts` file

https://medium.com/code-procedure-and-rants/use-modified-hosts-file-on-android-emulator-4f29f5d12ac1

https://stackoverflow.com/questions/41117715/how-to-edit-etc-hosts-file-in-android-studio-emulator-running-in-nougat

Note: you need to use the `${ANDROID_SDK_ROOT}/emulator/emulator`, like this:

`${ANDROID_SDK_ROOT}/emulator/emulator -avd Pixel_2_API_19_4.4_KitKat_-_1080x1920_5inch_xxhdpi -writable-system &`

where `ANDROID_SDK_ROOT` is `/Users/albert/Library/Android/sdk` [source](https://stackoverflow.com/a/52496987/4034572)

## Get the SHA-1

- `keytool -list -v -keystore ./android/app/debug.keystore` (asks for password)
- `keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android`

https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate
