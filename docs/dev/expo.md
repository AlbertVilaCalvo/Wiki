---
title: Expo
---

https://blog.expo.dev

## CLI

https://docs.expo.dev/workflow/expo-cli

### Create app

```bash
expo init <appname> --yarn
expo init <appname> -t expo-template-blank-typescript
```

## Expo Dev Client

Replaces Expo Go, which contains a fixed collection of native modules and does not allow custom native code.

https://www.npmjs.com/package/expo-dev-client

https://docs.expo.dev/development/introduction

>  Expo Go app is a standard client containing a preset collection of modules. As your project moves toward release, you may find that you need to customize your project, either to reduce your bundle size, to use a module offered by developers in the React Native community, or even to add your own **custom native code**.

> Development builds of your app are Debug builds containing the `expo-dev-client` package.

https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8

> (managed workflow) If you add or change the version of any modules in your project that includes native code or make most changes to your app.json, you’ll need to generate a new custom client to be able to run your app.

## EAS

Expo Application Services

https://blog.expo.dev/introducing-eas-395d4809cc6f

https://expo.dev/eas

Install the CLI: `npm install -g eas-cli` ([npm is recommended instead of yarn](https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli))

Login: `eas login`

Check the current user: `eas whoami`

### EAS Build

Replaces `expo build:ios` and `expo build:android` ([classic build](https://docs.expo.dev/classic/building-standalone-apps/)).

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

### EAS Submit

App store submissions.

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
