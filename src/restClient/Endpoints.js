const API_VERSION = 7;
const API_BASE = 'https://discordapp.com/api';

module.exports = {
  BASE:
    `${API_BASE}/v${API_VERSION}`,

  BOT_GATEWAY: () =>
    [ 'GET', '/gateway/bot' ],

  TRIGGER_TYPING: (cID) =>
    [ 'POST', `/channels/${cID}/typing` ],

  CREATE_MESSAGE: (cID) =>
    [ 'POST ', `/channels/${cID}/messages` ],
  EDIT_MESSAGE: (cID, mID) =>
    [ 'PATCH', `/channels/${cID}/messages/${mID}` ],
  DELETE_MESSAGE: (cID, mID) =>
    [ 'DELETE', `/channels/${cID}/messages/${mID}` ],
  BULK_DELETE_MESSAGE: (cID) =>
    [ 'POST', `/channels/${cID}/` ],

  CREATE_REACTION: (cID, mID, e, uID = '@me') =>
    [ 'PUT', `/channels/${cID}/messages/${mID}/reactions/${e}/${uID}` ],
  DELETE_REACTION: (cID, mID, e, uID) =>
    [ 'DELETE', `/channels/${cID}/messages/${mID}/reactions/${e}/${uID}` ]
};
