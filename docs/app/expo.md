---
title: Expo
---

Blog:

- https://expo.dev/changelog
- https://blog.expo.dev

VSCode plugin 'Expo Tools': https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo

## app.json / app.config.js / app.config.ts

Configuration with app.json / app.config.js: https://docs.expo.dev/workflow/configuration/

Properties: https://docs.expo.dev/versions/latest/config/app/

### infoPlist

https://docs.expo.dev/versions/latest/config/app/#infoplist

Info.plist can also be modified with a config plugin: https://docs.expo.dev/guides/config-plugins/#modifying-the-infoplist

Examples:
https://github.com/search?q=%22infoPlist%22+extension%3Ajson+path%3A%2F+filename%3Aapp.json&type=Code&ref=advsearch&l=&l=

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "LSApplicationQueriesSchemes": ["comgooglemaps"],
        "NSCameraUsageDescription": "This app uses the camera to scan barcodes on event tickets.",
        "CFBundleAllowMixedLocalizations": true,
        "ITSAppUsesNonExemptEncryption": false
      }
    }
  }
}
```

## CLI

List commands: `npx expo --help`

New local CLI for SDK >= 46: https://docs.expo.dev/more/expo-cli

Old, deprecated, global CLI for SDK < 46: https://docs.expo.dev/archived/expo-cli

### Local CLI (introduced in SDK 46)

[SDK 46](https://blog.expo.dev/expo-sdk-46-c2a1655f63f7) (released August 2022) removes the global npm install `expo-cli`.

The New Expo CLI (2022-08) - https://blog.expo.dev/the-new-expo-cli-f4250d8e3421

- A new “Local Expo CLI” replaces the “Global Expo CLI”
- In the new Local Expo CLI, `expo eject` is no longer available, it’s been fully replaced by `npx expo prebuild`

Beta: Local Expo CLI (2022-04) - https://blog.expo.dev/new-versioned-expo-cli-cf6e10632656

### Use `expo install` instead of `yarn add`/`npm install` because it picks the library versions compatible with the Expo SDK

See https://docs.expo.dev/bare/using-expo-client/#prefer--expo-install--over-

> Prefer `expo install` over `npm install` to add Expo SDK packages
> This will ensure that you get a version of the package that is compatible with the SDK version in your app. If you use npm install directly instead, you may end up with a newer version of the package that isn't supported in Expo Go yet.

This is also explained at https://reactnavigation.org/docs/getting-started#installing-dependencies-into-an-expo-managed-project

### Create app

See https://docs.expo.dev/get-started/create-a-project/

```shell
npx create-expo-app my-app
npx create-expo-app --template expo-template-blank-typescript
```

Available templates: https://github.com/expo/expo/tree/main/templates

Use TypeScript: https://docs.expo.dev/guides/typescript/

<details>
  <summary>Old, using `expo init`</summary>

```shell
expo init <appname> --yarn
expo init <appname> -t expo-template-blank-typescript
expo init --template bare-minimum # warning: does not add react-navigation!
```

See `expo init` options at https://docs.expo.dev/workflow/expo-cli/#expo-init

Note that option `--name` is deprecated, if you use it says "Use `expo init [name]` instead of `--name [name]`".

</details>

### Validate package versions compatibility and install compatible versions

```shell
npx expo install --check # Check which installed packages need to be updated
npx expo install --fix # Automatically update any invalid package versions
```

You can check/fix specific packages, eg `npx expo install expo-camera --check`.

Eg doing `npx expo install --check` will output:

```
Some dependencies are incompatible with the installed expo version:
  @react-native-community/slider@4.4.3 - expected version: 4.4.2
Your project may not work correctly until you install the correct versions of the packages.
Install individual packages by running npx expo install @react-native-community/slider@4.4.2
✔ Fix dependencies? (Y/n)
```

## Shift+i allows you to choose in which simulator to run the app on

Source: https://github.com/expo/expo-cli/issues/2413#issuecomment-969098866

## Expo Dev Client

Replaces [Expo Go](https://docs.expo.dev/get-started/expo-go/), which contains a fixed collection of native modules and does not allow custom native code.

> It’s a React Native library that gives you the same experience as Expo Go, but with your own custom runtime. [source](https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10)

https://www.npmjs.com/package/expo-dev-client

https://docs.expo.dev/development/introduction

> Expo Go app is a standard client containing a preset collection of modules. As your project moves toward release, you may find that you need to customize your project, either to reduce your bundle size, to use a module offered by developers in the React Native community, or even to add your own **custom native code**.

> Development builds of your app are Debug builds containing the `expo-dev-client` package.

https://blog.expo.dev/introducing-custom-development-clients-5a2c79a9ddf8

> (managed workflow) If you add or change the version of any modules in your project that includes native code or make most changes to your app.json, you’ll need to generate a new custom client to be able to run your app.

More information:

- https://blog.expo.dev/expo-dev-client-0-8-0-7116c1945253
- https://medium.com/the-exponent-log/javascript-driven-development-with-custom-runtimes-eda87d574c9d

### expo-dev-client setup

Follow https://docs.expo.dev/development/getting-started/

You need to have `"developmentClient": true` eas.json:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

This creates a 'Development build', a _Debug build of your project that includes the expo-dev-client_. See https://docs.expo.dev/development/getting-started/ and https://docs.expo.dev/development/build/.

To install run `expo install expo-dev-client`, then `npx pod-install`.

To create a development build do:

```shell
eas build -p ios --profile development
eas build -p android --profile development
```

After the build is created, install it on your device. Afterwards, to run the app do `expo start --dev-client` and click 'i' or 'a', or scan the QR code.

Now _you won't have to wait for the native build process again until you change the underlying native code that powers your app_.

## In addition to `expo eject`, now there is also `expo prebuild`

See the 2 images in https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10

> Now to get our managed project into a state where we can build it on EAS Build, we can repurpose the “eject” command to generate and configure the native iOS and Android projects based on the JavaScript app. We call this new command “prebuild”.

Info about prebuild: https://github.com/expo/fyi/blob/main/prebuilding.md

> you might need to use a library that doesn't have a config plugin yet, or maybe you need to write some custom native code yourself. For these cases you'll have to manually modify the `ios` and `android` folders, doing this means you'll no longer be able to safely rerun `expo prebuild`.

Eject moves from manged to bare, and it's run once ever.

> `expo prebuild` is very similar to `expo eject`, the core difference being that eject is intended to be run once, and prebuild can be used multiple times. The eject command assumes that your ios and android folders are modified by hand (bare workflow) and will warn you if they might be overwritten, whereas the prebuild command should only be used when your `ios` and `android` folders are completely generated and can be regenerated any time (kinda like the `node_modules` folder).

More info about prebuild in 'Adding custom native code': https://docs.expo.dev/workflow/customizing/

## EAS

Expo Application Services. A cloud build service capable of building projects with arbitrary native code.

https://blog.expo.dev/introducing-eas-395d4809cc6f

https://expo.dev/eas

https://blog.expo.dev/expo-application-services-eas-build-and-submit-fc1d1476aa2e

Install the CLI: `npm install -g eas-cli` ([npm is recommended instead of yarn](https://docs.expo.dev/build/setup/#1-install-the-latest-eas-cli))

Login: `eas login`

Check the current user: `eas whoami`

### eas.json properties

- https://docs.expo.dev/build-reference/eas-json/
- https://docs.expo.dev/submit/eas-json/

### EAS Build

Replaces `expo build:ios` and `expo build:android` ([classic build](https://docs.expo.dev/classic/building-standalone-apps/), which uses a '[shell app](https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10)').

Docs: https://docs.expo.dev/build/introduction

expo build’s Final Year: https://blog.expo.dev/turtle-goes-out-to-sea-d334db2a6b60

https://blog.expo.dev/expo-managed-workflow-in-2021-5b887bbf7dbb (part 1)

https://blog.expo.dev/expo-managed-workflow-in-2021-d1c9b68aa10 (part 2)

`eas build:configure` → Generates eas.json. Learn more at https://docs.expo.dev/build-reference/build-configuration/

To install an app to an iPhone, first register the device UDID at https://developer.apple.com/account/resources/devices/list.
To register any iOS devices you would like to develop on to your ad hoc provisioning profile use `eas device:create`.

Android build:

- `eas build -p android --profile preview`
- https://docs.expo.dev/build-reference/android-builds/

iOS build:

- `eas build -p ios`
- https://docs.expo.dev/build-reference/ios-builds/

Android and iOS build: `eas build -p all`

Build locally (eg to generate an aab file to upload to Google Play):

- https://docs.expo.dev/build-reference/local-builds/
- `eas build --local`
- "Uses your own hardware to build your apps locally and EAS to manage your app-signing credentials" ([source](https://blog.expo.dev/turtle-goes-out-to-sea-d334db2a6b60))

Download a simulator build from EAS servers and run it directly on your emulator/simulator in a snap:

- `eas build:run`
- `eas build:run -p ios` - https://docs.expo.dev/build-reference/simulators/#installing-build-on-the-simulator
- `eas build:run -p android` - https://docs.expo.dev/build-reference/apk/#emulator-virtual-device

### Signing

https://docs.expo.dev/app-signing/app-credentials/

### Signing Android

https://docs.expo.dev/app-signing/app-credentials/#app-signing-by-google-play

> From the Expo build process's perspective, there is no difference whether an app is signed with an upload certificate or an app signing key. Either way, `eas build` will generate an APK or AAB signed with the keystore currently associated with your application. If you want to generate an upload keystore manually, you can do that the same way you created your original keystore.

### EAS Submit

App store submissions.

The very first Android build must be uploaded manually to Google Play - see https://docs.expo.dev/submit/android/#manually-uploading-your-app-for-the-first.
This is not required on App Store (iOS).

After building with `eas build` we can do `eas submit -p ios` to publish to the App Store.
There is also the option `--auto-submit`, so we can do both build and submit, eg: `eas build -p ios --profile production --auto-submit`.

To publish to Google Play we need the service account key, which gives API access: https://github.com/expo/fyi/blob/main/creating-google-service-account.md. Note that the API access menu item appears at the main Google Play console page, not the app-specific page.

### EAS Update

https://docs.expo.dev/eas-update/introduction

https://blog.expo.dev/eas-update-in-preview-d221b6f91f52

> Deliver small updates of the non-native parts of your app (JS, styling, image assets...) to your users in between build and submit cycles

https://blog.expo.dev/eas-update-preview-progress-f504a30066fc

> EAS Update also doubles as a workflow efficiency tool, streamlining feedback loops by allowing teams to share previews of their projects during PR review. We love being able to push to GitHub, trigger a GitHub action to publish an update, then see it immediately inside of a development build.

Using Expo OTA Updates in your React Native app - Eric Samelson at @ReactEurope 2020: https://www.youtube.com/watch?v=Si909la3rLk

## Run the production app

See https://docs.expo.dev/workflow/development-mode/. There is also a switch in http://localhost:19002/.

```shell
expo start --no-dev --minify
# or if we've done a prebuild
expo start --no-dev --minify --dev-client
```

## Environment variables and configuration

Configuration with app.json / app.config.js: https://docs.expo.dev/workflow/configuration/

Environment variables in Expo: https://docs.expo.dev/guides/environment-variables/

Environment variables and secrets: https://docs.expo.dev/build-reference/variables/

Also see https://docs.expo.dev/build/eas-json/#environment-variables

According to https://docs.expo.dev/build-reference/variables/#can-i-share-environment-variables-defined-in `expo start` does not pick variables defined in eas.json:

> When you define environment variables on build profiles in eas.json, they will not be available for local development when you run `expo start` (and `expo publish`).

## SDK Versions/Releases

https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

[CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md)

- [SDK 42](https://blog.expo.dev/expo-sdk-42-579aee2348b6) - 2021-07 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4200--2021-06-16)
- [SDK 43](https://blog.expo.dev/expo-sdk-43-aa9b3c7d5541) - 2021-10 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4300--2021-10-01) - Replaces Unimodules with Expo modules
- [SDK 44](https://blog.expo.dev/expo-sdk-44-4c4b8306584a) - 2021-12 - [CHANGELOG](https://github.com/expo/expo/blob/master/CHANGELOG.md#4400--2021-12-03)
- [SDK 45](https://blog.expo.dev/expo-sdk-45-f4e332954a68) - 2022-05
- [SDK 46](https://blog.expo.dev/expo-sdk-46-c2a1655f63f7) - 2022-08
- [SDK 47](https://blog.expo.dev/expo-sdk-47-a0f6f5c038af) - 2022-11
- [SDK 48](https://blog.expo.dev/expo-sdk-48-ccb8302e231) - 2023-02
- [SDK 50](https://blog.expo.dev/expo-sdk-50-afb524038906) - 2024-01 - https://expo.dev/changelog/2024/01-18-sdk-50 -

## Unimodules → Expo modules

https://blog.expo.dev/whats-new-in-expo-modules-infrastructure-7a7cdda81ebc

https://github.com/expo/fyi/blob/main/expo-modules-migration.md

Using Expo modules in a standard React Native app (created with `npx react-native init`): https://docs.expo.dev/bare/installing-expo-modules

For module authors: https://blog.expo.dev/a-peek-into-the-upcoming-sweet-expo-module-api-6de6b9aca492

## Expo (Native) Modules API

https://docs.expo.dev/modules/overview/

https://twitter.com/tsapeta/status/1590353202402115584

## Flipper

https://twitter.com/Baconbrix/status/1412921581542658049

https://blog.expo.dev/expo-dev-client-0-8-0-7116c1945253

With plugin:

- https://www.npmjs.com/package/expo-community-flipper
- https://github.com/jakobo/expo-community-flipper
- https://codedrift.com/thunked/developing-react-native-with-expo-and-flipper and https://blog.expo.dev/developing-react-native-with-expo-and-flipper-8c426bdf995a (is the same)
- Example app: https://github.com/jakobo/expo-cdc-example
