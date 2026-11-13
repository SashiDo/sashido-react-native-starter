// The Parse SDK's React Native build imports the Node.js 'ws' library but
// uses the global WebSocket that React Native provides; metro.config.js
// points 'ws' here so the Node library (and its Node-only imports) isn't bundled.
module.exports = globalThis.WebSocket;
