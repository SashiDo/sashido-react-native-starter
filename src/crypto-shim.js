// The Parse SDK's React Native build calls require('crypto').randomUUID(),
// which React Native doesn't have: metro.config.js points 'crypto' here.
const { randomUUID } = require('expo-crypto');

module.exports = { randomUUID };
