const API_VERSION = 7;
const API_BASE = 'https://discordapp.com/api';
const e = require('./endpointWrapper');

module.exports = {
  BASE:
    `${API_BASE}/v${API_VERSION}`,

  BOT_GATEWAY: e(() =>
    [ 'GET', '/gateway/bot' ]),

  TRIGGER_TYPING: e((cID) =>
    [ 'POST', `/channels/${cID}/typing` ]),

  CREATE_MESSAGE: e((cID) =>
    [ 'POST', `/channels/${cID}/messages` ]),
  EDIT_MESSAGE: e((cID, mID) =>
    [ 'PATCH', `/channels/${cID}/messages/${mID}` ]),
  DELETE_MESSAGE: e((cID, mID) =>
    [ 'DELETE', `/channels/${cID}/messages/${mID}` ]),
  BULK_DELETE_MESSAGES: e((cID) =>
    [ 'POST', `/channels/${cID}/messages/bulk-delete` ]),

  CREATE_REACTION: e((cID, mID, e, uID = '@me') =>
    [ 'PUT', `/channels/${cID}/messages/${mID}/reactions/${e}/${uID}` ]),
  DELETE_REACTION: e((cID, mID, e, uID) =>
    [ 'DELETE', `/channels/${cID}/messages/${mID}/reactions/${e}/${uID}` ])
};
