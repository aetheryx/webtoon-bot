module.exports = {
  triggers: [ 'ping' ],
  description: 'Ping!',

  async * run () {
    yield 'Pong.';
  }
};
