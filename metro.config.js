const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// The Parse SDK's React Native build needs two Node.js modules React Native
// doesn't have. They always resolve to small shims:
// - crypto: randomUUID, from expo-crypto (src/crypto-shim.js)
// - ws: the global WebSocket React Native provides (src/ws-shim.js)
const shims = {
  crypto: path.resolve(__dirname, 'src/crypto-shim.js'),
  ws: path.resolve(__dirname, 'src/ws-shim.js'),
};
const defaultResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (shims[moduleName]) {
    return { type: 'sourceFile', filePath: shims[moduleName] };
  }
  return (defaultResolve || context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
