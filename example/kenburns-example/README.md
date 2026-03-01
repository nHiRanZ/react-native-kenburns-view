# Ken Burns Example

Expo app that demonstrates `react-native-kenburns-view` with sample images (zoom + pan).

## Run

```bash
cd example/kenburns-example
npm install
npx expo start
```

Then press `i` for iOS simulator or `a` for Android emulator, or scan the QR code with Expo Go.

If you see "Unable to resolve module" for the library, restart with a clean cache: `npx expo start --clear`.

## Notes

- The library is linked via `"react-native-kenburns-view": "file:../.."`.
- Sample images are loaded from remote URLs (see `App.js`).
