const Endpoints = require('./Endpoints');
const lighttp = require('lighttp');
const stripPings = require('@webtoon-bot/util/stripPings');

module.exports = {
  genericRequest ([ method, endpoint ], { data, files, queryParams = {} } = {}) {
    const req = lighttp[method.toLowerCase()](Endpoints.BASE + endpoint);

    if (data) {
      req.send(data);
    } else if (files) {
      for (const file of files) {
        req.attach(file.name, file.data, file.filename, file.contentType);
      }
    }

    for (const [ paramKey, paramVal ] of Object.entries(queryParams)) {
      req.query(paramKey, paramVal);
    }

    return req
      .header('Content-Type', 'application/json')
      .header('Authorization', process.env.BOT_TOKEN)
      .then(res => res.body);
  },

  _parseContent (input) {
    const data = {};

    if (typeof input === 'string') {
      data.content = stripPings(input);
    } else {
      if (input.content) {
        data.content = stripPings(input.content);
      }
      data.embed = input;
    }

    if (input.files) {
      return {
        files: [ {
          name: 'payload_json',
          data,
          contentType: 'application/json'
        },
        ...input.files.map(file => ({
          name: 'file',
          data: file.content,
          filename: file.name,
          contentType: file.contentType || 'image/png'
        })) ]
      };
    }

    return { data };
  },

  createMessage (channelID, message) {
    return this.genericRequest(
      Endpoints.CREATE_MESSAGE(channelID),
      this._parseContent(message)
    );
  },

  editMessage (channelID, messageID, newContent) {
    return this.genericRequest(
      Endpoints.EDIT_MESSAGE(channelID, messageID),
      this._parseContent(newContent)
    );
  },

  deleteMessage (channelID, messageID) {
    return this.genericRequest(Endpoints.DELETE_MESSAGE(channelID, messageID));
  },

  bulkDeleteMessages (channelID, messages) {
    return this.genericRequest(Endpoints.BULK_DELETE(channelID), { data: { messages } });
  },

  createReaction (channelID, messageID, emoji) {
    return this.genericRequest(Endpoints.CREATE_REACTION(channelID, messageID, emoji));
  },

  deleteReaction (channelID, messageID, emoji, userID) {
    return this.genericRequest(Endpoints.DELETE_REACTION(channelID, messageID, emoji, userID));
  },

  getGateway () {
    return this.genericRequest(Endpoints.BOT_GATEWAY());
  },

  triggerTyping (id) {
    return this.genericRequest(Endpoints.TRIGGER_TYPING(id));
  }
};
