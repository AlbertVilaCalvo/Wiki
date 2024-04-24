---
title: Android
---

Google Play SDK Index: https://play.google.com/sdks/categories/ads. For more info see https://developer.android.com/distribute/sdk-index and the [announcement](https://android-developers.googleblog.com/2022/05/new-google-play-sdk-index.html).

Debugging in Android Studio - https://medium.com/androiddevelopers/debugging-in-android-studio-dfbbf8a8d03c

Change package name (application id) - https://github.com/junedomingo/react-native-rename

## Icon

https://developer.android.com/studio/write/create-app-icons

Adaptive icons - https://developer.android.com/develop/ui/views/launch/icon_design_adaptive

Android 13 supports themed icons, which are tinted with a color determined by the wallpaper.

See this video: https://www.youtube.com/watch?v=o_PnMp27DWU

> If your app icon is already simple, your monochrome and foreground drawables can be the same.

- Figma template: https://goo.gle/adaptive-icon-template → https://www.figma.com/community/file/1131374111452281708
- Codelab: https://goo.gle/adaptive-icon-codelab

For a simple icon use the [Image Asset Studio](https://developer.android.com/studio/write/create-app-icons#access) To open it, right-click the res folder and select New → Image Asset.

IconKitchen icon generator (by Roman Nurik) does something similar than the Image Asset Studio - https://icon.kitchen

## Inspect apk

APK Analyzer - https://developer.android.com/studio/debug/apk-analyzer

Apktool - https://apktool.org - https://github.com/iBotPeaches/Apktool - Install: `brew install apktool` - Use: `apktool d myapp.apk`

## Environment variables

https://developer.android.com/tools

https://developer.android.com/tools/variables

They recommend:

- `ANDROID_HOME/tools` → `emulator`
- `ANDROID_HOME/tools/bin` → `avdmanager`, `apkanalyzer`
- `ANDROID_HOME/platform-tools` → `adb`

```zsh
export ANDROID_HOME=$HOME/Library/Android/sdk
path+=("$ANDROID_HOME/emulator")
path+=("$ANDROID_HOME/platform-tools")
```

### `JAVA_HOME`

From https://runningcode.github.io/gradle-doctor/ - Ensure `JAVA_HOME` is set and matches IDE's `JAVA_HOME`

```zsh
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

With this, doing `java --version` should say "openjdk 17.0.7 2023-04-18".

### `ANDROID_SDK_ROOT` is deprecated, use `ANDROID_HOME`

From https://developer.android.com/studio/command-line/variables#envar

> `ANDROID_SDK_ROOT`, which also points to the SDK installation directory, is deprecated. If you continue to use it, Android Studio and the Android Gradle plugin will check that the old and new variables are consistent.

## CLI

Docs:

- All tools: https://developer.android.com/tools
- `adb`: https://developer.android.com/tools/adb
- `emulator`: https://developer.android.com/studio/run/emulator-commandline

List emulators: `emulator -list-avds`

List emulators running ('List of devices attached'): `adb devices`

Launch emulator: `${ANDROID_HOME}/emulator/emulator -avd Nexus_5X_API_27_-_Google_Play &`

Wipe emulator data with `-wipe-data`, eg: `emulator -avd Nexus_6_API_28_-_Google_APIs_-_14440_x_2560_560dpi -wipe-data &`

Force cold boot emulator with `-no-snapshot-load`, eg: `emulator -avd Pixel_4_API_30_R_-_Google_Play_-_5.7_1080x2280_xxhdpi -no-snapshot-load &`

Emulator show touches: `adb shell settings put system show_touches 1`

Emulator hide touches: `adb shell settings put system show_touches 0`

List installed and available versions of SDK, NDK, emulators, build tools etc: `sdkmanager --list`

Install apk: `adb install path/to/the/file.apk`

Install app bundle aab: https://stackoverflow.com/questions/50419286/install-android-app-bundle-on-device

View logs: `adb logcat --pid=$(adb shell pidof -s com.example.myapp) -v color`. [See logcat docs](https://developer.android.com/tools/logcat) for more options. (Note that the app needs to be running on the phone or emulator, otherwise `pidof` will return nothing.)

## App Links (verified deep links)

https://developer.android.com/training/app-links

https://docs.expo.dev/guides/deep-linking/#deep-links-on-android

App Links are web links that use the HTTP and HTTPS schemes and contain the `autoVerify` attribute on the `<intent-filter>`. Your app opens immediately; the disambiguation dialog doesn't appear.

For the `.well-known/assetlinks.json` file you need the SHA-256 certificate fingerprint of the signing key (not the upload key). To get it, go to [Play Console](https://play.google.com/console/) → Release → Setup → App Signing. You'll find the file at the "Digital Asset Links JSON" section of this page.

### Test deep links

https://developer.android.com/training/app-links/deep-linking#testing-filters

`adb shell am start -W -a android.intent.action.VIEW -d "scheme://example.com/some-path" com.example.debug`

If you have multiple emulators then add '-s emulator-name', like this:

`adb -s emulator-5554 shell am start -W -a android.intent.action.VIEW -d "scheme://example.com/some-path" com.example.debug`

## Emulator

### Networking

https://developer.android.com/studio/run/emulator-networking

Use `10.0.2.2` instead of `localhost`. See https://stackoverflow.com/questions/6760585/accessing-localhostport-from-android-emulator

### Modify the emulator `hosts` file

https://medium.com/code-procedure-and-rants/use-modified-hosts-file-on-android-emulator-4f29f5d12ac1

https://stackoverflow.com/questions/41117715/how-to-edit-etc-hosts-file-in-android-studio-emulator-running-in-nougat

Note: you need to use the `${ANDROID_SDK_ROOT}/emulator/emulator`, like this:

`${ANDROID_SDK_ROOT}/emulator/emulator -avd Pixel_2_API_19_4.4_KitKat_-_1080x1920_5inch_xxhdpi -writable-system &`

where `ANDROID_SDK_ROOT` is `/Users/albert/Library/Android/sdk` [source](https://stackoverflow.com/a/52496987/4034572)

## Get the SHA-1

There is a gradle task: `./gradlew signingReport`. It will use the keystores set on `signingConfigs` in app/build.gradle. To avoid seeing the output for all the tasks, prepend the :app task: `./gradlew :app:signingReport`

- `keytool -list -v -keystore release.keystore` (asks for password)
- My `~/.android` key: `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android`
- React Native debug key: `keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android`

https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate

https://developers.google.com/android/guides/client-auth

## App signing

Answers to common questions about Play App Signing: https://medium.com/androiddevelopers/answers-to-common-questions-about-app-signing-by-google-play-b28fef836af0

App Bundles: Everything to know about Play App Signing: https://www.youtube.com/watch?v=odv_1fxt9BI

About Android App Bundles: https://developer.android.com/guide/app-bundle

Sign your app: https://developer.android.com/studio/publish/app-signing

Use Play App Signing: https://support.google.com/googleplay/android-developer/answer/9842756

Play App Signing : https://play.google.com/console/about/keymanagement

### Opcions app signing key

Play App Signing utilitza 2 keys: el 'app signing key' i el 'upload key'.

La signing key es pot generar de varies maneres:

1. La genera Google al seu servidor. Nunca se puede perder. Esta es la opción recomendada ahora. Importante: no se puede descargar. Por tanto, si quieres firmar siempre tienes que pasar por Google Play y luego descargar el apk firmado o usar internal app sharing (un enlace) o beta (Google Play).
2. La generamos nosotros y la subimos. En este caso la key la podemos guardar (así podemos firmar en local) o no (puesto que Google ya la tiene). Tampoco se puede perder.
3. La generamos nosotros y no se sube; se firma en local y se sube el apk firmado. Esta opción va a desaparecer, puesto que el nuevo formato app bundle requiere que Google tenga la key para generar apk optimizados (por ejemplo solo con la traducción al idioma del dispositivo). Hay el riesgo de que se pierda la key.

En los casos 1 y 2 (Play App Signing) hay el upload key que se puede re-generar cuando quieras, de tal modo que nadie puede subir un apk sin el upload key, pero que si lo pierdes puedes contactar a Google y te generan otro

### Opcions upload key

https://developer.android.com/studio/publish/app-signing#certificates-keystores

You may generate an upload key in one of the following ways:

- If you choose for Google to generate the app signing key for you when you opt in, then the key you use to sign your app for release is designated as your upload key.
- If you provide the app signing key to Google when opting in your new or existing app, then you have the option to generate a new upload key during or after opting in for increased security.
- If you do not generate a new upload key, you continue to use your app signing key as your upload key to sign each release.

#### Generate upload key

Es pot fer amb Android Studio: Build → Generate Signed Bundle / APK → Next → Create new...

https://developer.android.com/studio/publish/app-signing#generate-key

https://support.google.com/googleplay/android-developer/answer/9842756?rd=1#create

Note that both passwords need to be the same, see https://developer.android.com/studio/known-issues#ki-key-keystore-warning

## Android 12 changed that root launcher activities are no longer finished on the Back press

https://developer.android.com/about/versions/12/behavior-changes-all#back-press

https://twitter.com/TatoKutalia/status/1450543203007057927

## SDK API levels

https://apilevels.com

https://developer.android.com/tools/releases/platforms

## Target API level requirements for Google Play apps

- Meet Google Play's target API level requirement - https://developer.android.com/google/play/requirements/target-sdk
- Google Play's Target API Level Policy - https://support.google.com/googleplay/android-developer/answer/11917020
- Target API level requirements for Google Play apps - https://support.google.com/googleplay/android-developer/answer/11926878

Email 2022-04-06 'Google Play Developer Program Policy Update':

> To provide users with a safe and secure experience, we are expanding on Google Play’s target API level requirements to include existing apps that aren’t updated. Apps that don’t target an API level within two years of the latest major Android version release will not be available on Google Play to new users whose devices run the latest versions of Android. Developers can request a six-month extension if more time for migration is needed. [learn more](https://support.google.com/googleplay/android-developer/answer/11926878)

Email 2022-12-15 'Target API Level policy changes and deadline extension':

> We’re also extending the deadline to give you more time to adjust to these changes. Now, apps that target API level 29 or below will start experiencing reduced distribution starting **Jan 31, 2023** instead of Nov 1, 2022. If you need more time to update your app, you can request an extension to keep your app discoverable to all users until May 1, 2023.

## Google Play

Access levels: https://support.google.com/googleplay/android-developer/answer/9844686?hl=en Also see explanation of each permission here: https://support.google.com/googleplay/android-developer/answer/10019561?hl=en

### Testing Tracks

See differences here:

- https://medium.com/@sudeshfernandez98/demystifying-google-play-testing-a-comprehensive-guide-to-internal-closed-and-open-testing-83bfe9bdad3a
- https://medium.com/flutter-community/internal-close-and-open-testing-on-google-play-3685d931842a
- https://play.google.com/console/about/closed-testing/
- https://stackoverflow.com/questions/66550055/meaning-of-open-testing-in-playstore

#### Internal Testing

- No review required
- Limited to 100 users
- No need to pay

#### Closed Testing

:::tip
Promote the app from Internal to Closed testing ASAP to get the pre-lanuch report.

See [this StackOverflow answer](https://stackoverflow.com/a/72031644/4034572):

> The workflow I use is:
>
> 1. I set the app as Internal testing (even if it is just my email address). Right after doing this I
> 2. Promote the app to "Close testing" (even if it is just my email address) - so I can get Google's report right away.

:::

- Requires review
- Up to 2000 users
- You get a pre-launch report from Google's tests
- If you’re testing a paid app using an open or closed test, testers still need to purchase it. If you’re testing a paid app using an internal test, testers can install your app for free.

#### Open Testing

- Anyone can join
- Limited and unlimited users (you choose)
- End user reviews are only visible to you
