module.exports = (str) => str
  .replace(/@everyone/g, '@\u200beveryone')
  .replace(/@here/g, '@\u200bhere');
