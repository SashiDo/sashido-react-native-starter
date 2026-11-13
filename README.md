# SashiDo React Native starter

An [Expo](https://expo.dev) (React Native) app on a [SashiDo](https://www.sashido.io) backend (Parse Server): sign up and login, and a private todo list that updates live across devices. It runs on iOS, Android and the web.

What it shows, done the way it should be on Parse:

- **Users and sessions** with the Parse JS SDK; the session is kept in AsyncStorage between launches.
- **Private data**: every todo gets an ACL for its owner in cloud code (`cloud/main.js`), so no client can read, change or delete someone else's, whatever it sends.
- **Locked-down class**: the `Todo` class allows only logged-in users and no new fields from clients (`scripts/setup-schema.mjs`).
- **Validation on the server**: titles are checked in `beforeSave`.
- **Live updates** with Live Queries (optional).

## 1. Create a SashiDo app

Create an app at [dashboard.sashido.io](https://dashboard.sashido.io). Then:

**Cloud code.** Copy `cloud/main.js` into your app's repository (**Core › Cloud Code**: link GitHub and clone it) and push to `master`. SashiDo deploys it.

**The Todo class.** From your machine, with the keys in **App Settings › Security & Keys**:

```bash
PARSE_SERVER_URL=https://pg-app-xxxxxxxx.scalabl.cloud/1 \
PARSE_APP_ID=<Application ID> PARSE_MASTER_KEY=<Master Key> \
npm run setup-schema
```

The master key stays on your machine: the app itself only uses the public keys.

**Live updates (optional).** In **App Settings › Live Queries** tick `Todo`.

## 2. Run the app

```bash
npm install
cp .env.example .env    # fill in Application ID, JavaScript Key, API URL (and the LiveQuery URL)
npx expo start
```

Open it in Expo Go on your phone (scan the QR code), an emulator, or press `w` for the web.

## Notes

- **Two small shims in `metro.config.js`.** The Parse SDK's React Native build needs `crypto.randomUUID` and imports the Node.js `ws` library. Metro points `crypto` to `expo-crypto` (`src/crypto-shim.js`) and `ws` to React Native's own `WebSocket` (`src/ws-shim.js`). Without them sign-up fails with `_uuid.default is not a function`, and the iOS/Android bundle fails on `stream`.
- **Public keys.** The Application ID and JavaScript Key are public by design. What protects the data is the ACL and the class-level permissions, and the master key never goes into the app.
- **What's been tested:** the app on Expo Web against Parse Server 8.6.117 (sign up, add, toggle, delete, session kept, live updates between two clients), the iOS and Android bundles, and the backend's security rules on 8.6.117 and 6.5.11.

Docs: [SashiDo developer docs](https://www.sashido.io/en/docs/developers) · [Parse JS guide](https://docs.parseplatform.org/js/guide/)
