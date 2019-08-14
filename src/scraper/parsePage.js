const lighttp = require('lighttp');
const { parse } = require('himalaya');
const { USER_AGENT } = require('./Constants');

const traverseAST = function * (nodes, filter) {
  for (const node of nodes) {
    if (filter(node)) {
      yield node;
    }

    if (node.children) {
      yield *traverseAST(node.children, filter);
    }
  }
};

module.exports = async function parsePage (url, filter = () => true) {
  const rawHTML = await lighttp
    .get(url)
    .header('User-Agent', USER_AGENT)
    .then(r => r.body
      .split('\n')
      .map(l => l.replace(/^\s+/g, ''))
      .join(''));

  const ast = parse(rawHTML);

  return [ ...traverseAST(ast, filter) ];
};
