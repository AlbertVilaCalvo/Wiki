---
title: Android
---

## App signing

https://medium.com/androiddevelopers/answers-to-common-questions-about-app-signing-by-google-play-b28fef836af0

App Bundles: Everything to know about Play App Signing: https://www.youtube.com/watch?v=odv_1fxt9BI <-- IMPORTANT

https://developer.android.com/guide/app-bundle

https://developer.android.com/studio/publish/app-signing

### Get the SHA-1

- `keytool -list -v -keystore ./android/app/debug.keystore` (asks for password)
- `keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android`

https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate
