const client = require('./client');
const extended = require('./extended');
module.exports = Object.assign({}, client, extended);
