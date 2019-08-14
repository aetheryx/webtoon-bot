const path = require('path');
const config = require('../../config.json');
const Module = require('module');

exports.init = function initConfig () {
  Object.assign(process.env, config);

  process.env.NODE_PATH = path.resolve(__dirname, '..', 'global');
  Module._initPaths();
};
