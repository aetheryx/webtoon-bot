const querystring = require('querystring');

module.exports = {
  GATEWAY_OPTIONS: querystring.stringify({
    v: 6,
    encoding: 'json'
  }),

  DISPATCH_WHITELIST: [
    'READY',
    'MESSAGE_CREATE',
    'MESSAGE_REACTION_ADD'
  ],

  OpCodes: {
    DISPATCH: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    // STATUS_UPDATE: 3,
    // VOICE_STATE_UPDATE: 4,
    RESUME: 6,
    // RECONNECT: 7,
    // REQUEST_MEMBERS: 8,
    // INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11
  }
};