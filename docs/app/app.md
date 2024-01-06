---
title: App
---

Apple would be forced to allow sideloading and third-party app stores under new EU law: https://www.theverge.com/2022/3/25/22996248/apple-sideloading-apps-store-third-party-eu-dma-requirement

https://www.appbrain.com/stats

Android app frameworks: https://www.appbrain.com/stats/libraries/tag/app-framework/android-app-frameworks

## Facebook SDK

How to generate Android Key hashes that you need to set in https://developers.facebook.com/apps/{app_id}/settings/basic/

It's something like `g5fGIBgB6noFO9ur78BdEr73KG6=`, ending with a '='.

Information sources:

- https://stackoverflow.com/questions/39051517/login-error-there-is-an-error-in-logging-you-into-this-application-please-try
- https://javascript.plainenglish.io/fix-login-error-there-is-an-error-in-logging-you-into-this-application-on-facebook-login-with-237e3baba116

First you need to get the SHA-1. You can get it in different ways:

- On Google Play. On the left side menu go to Setup → App integrity, then select the tab 'App signing'
- From the apk itself with `keytool -list -printcert -jarfile <my-apk-file.apk>`

Once you have the SHA-1 you need to convert it to base64. There are various ways:

- https://tomeko.net/online_tools/hex_to_base64.php (ignore the alert 'Warning! Non-hex characters in input string ignored')
- `node -e 'console.log(Buffer.from(process.argv[1].split(":").map(hex => parseInt(hex, 16))).toString("base64"))' 'PASTE_YOUR_SHA1_HERE'`
