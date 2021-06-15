---
title: Android
---

## App signing

Answers to common questions about Play App Signing: https://medium.com/androiddevelopers/answers-to-common-questions-about-app-signing-by-google-play-b28fef836af0

App Bundles: Everything to know about Play App Signing: https://www.youtube.com/watch?v=odv_1fxt9BI

About Android App Bundles: https://developer.android.com/guide/app-bundle

Sign your app: https://developer.android.com/studio/publish/app-signing

Use Play App Signing: https://support.google.com/googleplay/android-developer/answer/9842756?hl=en&visit_id=637593412470116880-1039165729&rd=1

### Opcions app signing key

Play App Signing utilitza 2 keys: el 'app signing key' i el 'upload key'.

La signing key es pot generar de varies maneres:

1) La genera Google al seu servidor. Nunca se puede perder. Esta es la opción recomendada ahora. Si quieres firmar siempre tienes que pasar por Google Play y luego descargar el apk firmado o usar internal app sharing (un enlace) o beta (Google Play).
2) La generamos nosotros y la subimos. En este caso la key la podemos guardar (así podemos firmar en local) o no (puesto que Google ya la tiene). Tampoco se puede perder.
3) La generamos nosotros y no se sube; se firma en local y se sube el apk firmado. Esta opción va a desaparecer puesto que el nuevo formato app bundle requiere que Google tenga la key para generar apk optimizados (por ejemplo solo con la traducción al idioma del dispositivo). Hay el riesgo de que se pierda la key.

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

https://support.google.com/googleplay/android-developer/answer/9842756?visit_id=637593462727030424-182273336&rd=1#create


### Get the SHA-1

- `keytool -list -v -keystore ./android/app/debug.keystore` (asks for password)
- `keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android`

https://stackoverflow.com/questions/15727912/sha-1-fingerprint-of-keystore-certificate
