---
title: Expo
---

https://blog.expo.dev

VSCode plugin 'Expo Tools': https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo

## CLI

https://docs.expo.dev/workflow/expo-cli

### Create app

```bash
expo init <appname> --yarn
expo init <appname> -t expo-template-blank-typescript
expo init --template bare-minimum
```

## Shift+i allows you to choose in which simulator to run the app on

Source: https://github.com/expo/expo-cli/issues/2413#issuecomment-969098866

## Expo Dev Client

Replaces Expo Go, which contains a fixed collection of native modules and does not allow custom native code.

> It’s a React Native library that gives you the same experience as Expo Go, but with your own custom runtime. [source](https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10)

https://www.npmjs.com/package/expo-dev-client

https://docs.expo.dev/development/introduction

>  Expo Go app is a standard client containing a preset collection of modules. As your project moves toward release, you may find that you need to customize your project, either to reduce your bundle size, to use a module offered by developers in the React Native community, or even to add your own **custom native code**.

> Development builds of your app are Debug builds containing the `expo-dev-client` package.

https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8

> (managed workflow) If you add or change the version of any modules in your project that includes native code or make most changes to your app.json, you’ll need to generate a new custom client to be able to run your app.

## In addition to `expo eject`, now there is also `expo prebuild`

See the 2 images in https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10

> Now to get our managed project into a state where we can build it on EAS Build, we can repurpose the “eject” command to generate and configure the native iOS and Android projects based on the JavaScript app. We call this new command “prebuild”.

Info about prebuild: https://github.com/expo/fyi/blob/main/prebuilding.md

> you might need to use a library that doesn't have a config plugin yet, or maybe you need to write some custom native code yourself. For these cases you'll have to manually modify the `ios` and `android` folders, doing this means you'll no longer be able to safely rerun `expo prebuild`.

Eject moves from manged to bare and it's run once ever.

> `expo prebuild` is very similar to `expo eject`, the core difference being that eject is intended to be run once, and prebuild can be used multiple times. The eject command assumes that your ios and android folders are modified by hand (bare workflow) and will warn you if they might be overwritten, whereas the prebuild command should only be used when your `ios` and `android` folders are completely generated and can be regenerated any time (kinda like the `node_modules` folder).

## EAS

Expo Application Services. A cloud build service capable of building projects with arbitrary native code.

https://blog.expo.dev/introducing-eas-395d4809cc6f

https://expo.dev/eas

https://blog.expo.dev/expo-application-services-eas-build-and-submit-fc1d1476aa2e

Install the CLI: `npm install -g eas-cli` ([npm is recommended instead of yarn](https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli))

Login: `eas login`

Check the current user: `eas whoami`

### EAS Build

Replaces `expo build:ios` and `expo build:android` ([classic build](https://docs.expo.dev/classic/building-standalone-apps/), which usea a '[shell app](https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10)').

Docs: https://docs.expo.dev/build/introduction

expo build’s Final Year: https://blog.expo.dev/turtle-goes-out-to-sea-d334db2a6b60

https://blog.expo.dev/expo-managed-workflow-in-2021-5b887bbf7dbb

https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10

`eas build:configure` -> Generates eas.json. Learn more at https://docs.expo.dev/build-reference/build-configuration/

To install an app to an iPhone, first register the device UDID at https://developer.apple.com/account/resources/devices/list.
To register any iOS devices you would like to develop on to your ad hoc provisioning profile use `eas device:create`.

Android build:
- `eas build -p android --profile preview`
- https://docs.expo.dev/build-reference/android-builds/

iOS build:
- `eas build -p ios`
- https://docs.expo.dev/build-reference/ios-builds/

Android and iOS build: `eas build -p all`

Build locally:
- https://docs.expo.dev/build-reference/local-builds/
- `eas build --local`
- "Uses your own hardware to build your apps locally and EAS to manage your app-signing credentials" ([source](https://blog.expo.dev/turtle-goes-out-to-sea-d334db2a6b60))

### Signing

https://docs.expo.dev/app-signing/app-credentials/

### Signing Android

https://docs.expo.dev/app-signing/app-credentials/#app-signing-by-google-play

> From the Expo build process's perspective, there is no difference whether an app is signed with an upload certificate or an app signing key. Either way, `eas build` will generate an APK or AAB signed with the keystore currently associated with your application. If you want to generate an upload keystore manually, you can do that the same way you created your original keystore.

### EAS Submit

App store submissions.

The very first Android build must be uploaded manually to Google Play - see https://docs.expo.dev/submit/android/#manually-uploading-your-app-for-the-first.
This is not required on App Store (iOS).

### EAS Update

https://docs.expo.dev/eas-update/introduction

https://blog.expo.dev/eas-update-in-preview-d221b6f91f52

> Deliver small updates of the non-native parts of your app (JS, styling, image assets...) to your users in between build and submit cycles

## Versions

[CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md)

- [SDK 44](https://blog.expo.dev/expo-sdk-44-4c4b8306584a) - 2021-12 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4400--2021-12-03)

- [SDK 43](https://blog.expo.dev/expo-sdk-43-aa9b3c7d5541) - 2021-10 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4300--2021-10-01) - Replaces Unimodules with Expo modules

- [SDK 42](https://blog.expo.dev/expo-sdk-42-579aee2348b6) - 2021-07 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4200--2021-06-16)

## Unimodules -> Expo modules

https://blog.expo.dev/whats-new-in-expo-modules-infrastructure-7a7cdda81ebc

https://github.com/expo/fyi/blob/main/expo-modules-migration.md

Using Expo modules in a standard React Native app (created with `npx react-native init`): https://docs.expo.dev/bare/installing-expo-modules

For module authors: https://blog.expo.dev/a-peek-into-the-upcoming-sweet-expo-module-api-6de6b9aca492
