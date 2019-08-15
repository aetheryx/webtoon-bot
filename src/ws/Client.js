const EventEmitter = require('events');
const WebSocket = require('ws');
const restClient = require('@webtoon-bot/restClient');
const {
  GATEWAY_OPTIONS,
  DISPATCH_WHITELIST,
  OpCodes
} = require('./Constants.js');

module.exports = class Client extends EventEmitter {
  #ws;
  #sessionID;
  #lastSeq;
  #lastHeartbeat;
  #lastHeartbeatAck;
  #heartbeatInterval;

  async build () {
    const gateway = await restClient.getGateway();
    const ws = this.#ws = new WebSocket(`${gateway.url}?${GATEWAY_OPTIONS}`);

    ws.on('message', (raw) => (
      this.handleData(JSON.parse(raw))
    ));

    ws.on('error', (err) => (
      super.emit('ws:error', err)
    ));

    ws.on('close', (code) => (
      super.emit('ws:close', code)
    ));
  }

  async handleData (data) {
    if (data.s) {
      this.#lastSeq = data.s;
    }

    switch (data.op) {
      case OpCodes.DISPATCH:
        if (!DISPATCH_WHITELIST.includes(data.t)) {
          return;
        }

        if (data.t === 'READY') {
          this.#sessionID = data.d.session_id;
        }
        super.emit(`dispatch:${data.t}`, data.d);
        return;

      case OpCodes.HELLO:
        if (this.#sessionID) {
          this.resume();
        } else {
          this.authenticate();
        }
        this.startHeartbeat(data.d);
        return;

      case OpCodes.HEARTBEAT:
        this.heartbeat(true);
        return;

      case OpCodes.HEARTBEAT_ACK:
        this.#lastHeartbeatAck = Date.now();
        return;

      default:
        console.error(`Unhandled opcode ${data.op}`);
    }
  }

  send (data) {
    return new Promise((resolve, reject) => {
      this.#ws.send(JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  resume () {
    return this.send({
      op: OpCodes.RESUME,
      d: {
        token: process.env.BOT_TOKEN,
        session_id: this.#sessionID,
        seq: +this.#lastSeq
      }
    });
  }

  authenticate () {
    return this.send({
      op: OpCodes.IDENTIFY,
      d: {
        token: process.env.BOT_TOKEN,
        guild_subscriptions: false,
        properties: {
          $os: process.platform,
          $browser: 'custom',
          $device: 'custom'
        }
      }
    });
  }

  close () {
    this.#ws.close(1000);
  }

  terminate () {
    clearInterval(this.#heartbeatInterval);
    this.#ws.terminate();

    this.#ws = void 0;
    this.#lastHeartbeatAck = void 0;
    this.#lastHeartbeat = void 0;
    this.#heartbeatInterval = void 0;
  }

  async heartbeat (requested) {
    if (!requested && this.#lastHeartbeat > this.#lastHeartbeatAck) {
      this.terminate();
      return this.build();
    }

    await this.send({
      op: OpCodes.HEARTBEAT,
      d: this.#lastSeq || null
    });
    this.#lastHeartbeat = Date.now();
  }

  startHeartbeat ({ heartbeat_interval: interval }) {
    this.heartbeat();
    this.#heartbeatInterval = setInterval(this.heartbeat.bind(this), interval);
  }
};
