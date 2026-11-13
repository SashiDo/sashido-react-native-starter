import AsyncStorage from '@react-native-async-storage/async-storage';
// the React Native build of the SDK; it keeps the session in AsyncStorage
import Parse from 'parse/react-native.js';

const appId = process.env.EXPO_PUBLIC_PARSE_APP_ID;
const serverURL = process.env.EXPO_PUBLIC_PARSE_SERVER_URL;
const liveQueryURL = process.env.EXPO_PUBLIC_PARSE_LIVE_QUERY_URL;

if (!appId || !serverURL) {
  throw new Error('Copy .env.example to .env and fill in your keys from App Settings › Security & Keys.');
}

// the Application ID and JavaScript Key are public: ACLs and class-level
// permissions protect the data, never put the master key in an app
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(appId, process.env.EXPO_PUBLIC_PARSE_JS_KEY);
Parse.serverURL = serverURL;
if (liveQueryURL) {
  Parse.liveQueryServerURL = liveQueryURL;
}

export const liveQueriesEnabled = Boolean(liveQueryURL);
export default Parse;
