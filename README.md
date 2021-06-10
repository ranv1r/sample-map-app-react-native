# react native map app

Do an `npm i` in root.

##  android
Replace `API Key` for "Google Maps API for Android SDK" in [Manifest file](./android/app/src/debug/AndroidManifest.xml).

You can do this by creating a GCP Account 
- Creating New Project
- Enable the "Google Maps for Android SDK" API
- Create Credentials > Create API Key

## ios

From root in your cloned repo:

```
cd ios/
pod install
```

## Running the apps

Run using one of the following commands
- ``npx react-native run-android``
- ``npx react-native run-ios``
