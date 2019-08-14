const API_VERSION = 7;
const API_BASE = 'https://discordapp.com/api';

module.exports = {
  BASE            :                      `${API_BASE}/v${API_VERSION}`,
  BOT_GATEWAY     :                     () => [    'GET', '/gateway/bot'                     ],
  CREATE_MESSAGE  :                   (id) => [   'POST', `/channels/${id}/messages`         ],
  EDIT_MESSAGE    :             (cID, mID) => [  'PATCH', `/channels/${cID}/messages/${mID}` ],
  TRIGGER_TYPING  :                   (id) => [   'POST', `/channels/${id}/typing`           ],
  CREATE_REACTION :      (cID, mID, emoji) => [    'PUT', `/channels/${cID}/messages/${mID}/reactions/${emoji}/@me`    ],
  DELETE_REACTION : (cID, mID, emoji, uID) => [ 'DELETE', `/channels/${cID}/messages/${mID}/reactions/${emoji}/${uID}` ]
};