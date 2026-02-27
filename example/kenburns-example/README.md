# Ken Burns Example

Example app for `react-native-kenburns-view` using Expo.

## Run

From this folder:

```bash
npm install
```

**Option A – development build (iOS simulator):**

```bash
npx expo run:ios
```

**Option B – Expo Go (no native build):**

```bash
npx expo start
```

Then scan the QR code or press `i` / `a` for simulator.

If you see "Unable to resolve module react-native-kenburns-view", clear Metro’s cache and try again: `npx expo start --clear` (then run `npx expo run:ios` in another terminal, or run `expo run:ios` after the dev server is up).

## Notes

- The library is linked via `"react-native-kenburns-view": "file:../.."`.
- Test images are in `assets/images/` (image1–3 and placeholder).
