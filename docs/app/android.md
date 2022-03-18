---
title: Android
---

## CLI

List emulators: `emulator -list-avds`

List emulators running ('List of devices attached'): `adb devices`

Launch emulator: `${ANDROID_HOME}/emulator/emulator -avd Nexus_5X_API_27_-_Google_Play &`

Wipe emulator data: `emulator -avd Nexus_6_API_28_-_Google_APIs_-_14440_x_2560_560dpi -wipe-data &`

Emulator show touches: `adb shell settings put system show_touches 1`

Emulator hide touches: `adb shell settings put system show_touches 0`

List installed and avaialble versions of SDK, NDK, emulators, build tools etc: `sdkmanager --list`

Install apk: `adb install path/to/the/file.apk`


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
3. La generamos nosotros y no se sube; se firma en local y se sube el apk firmado. Esta opción va a desaparecer puesto que el nuevo formato app bundle requiere que Google tenga la key para generar apk optimizados (por ejemplo solo con la traducción al idioma del dispositivo). Hay el riesgo de que se pierda la key.

En los casos 1 y 2 (Play App Signing) hay el upload key que se puede re-generar cuando quieras, de tal modo que nadie puede subir un apk sin el upload key, pero que si lo pierdes puedes contactar a Google y te generan otro

### Opcions upload key

https://developer.android.com/studio/publish/app-signing#certificates-keystores

You may generate an upload key in one of the following ways:

- If you choose for Google to generate the app signing key for you when you opt in, then the key you use to sign your app for release is designated as your upload key.
- If you provide the app signing key to Google when opting in your new or existing app, then you have the option to generate a new upload key during or after opting in for increased security.
- If you do not generate a new upload key, you continue to use your app signing key as your upload key to sign each release.

#### Generate uplad key

Es pot fer amb Android Studio: Build -> Generate Signed Bundle / APK -> Next -> Create new...

https://developer.android.com/studio/publish/app-signing#generate-key

https://support.google.com/googleplay/android-developer/answer/9842756?rd=1#create


## Android 12 changed that root launcher activities are no longer finished on the Back press

https://developer.android.com/about/versions/12/behavior-changes-all#back-press

https://twitter.com/TatoKutalia/status/1450543203007057927
