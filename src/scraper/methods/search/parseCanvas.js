const getAttr = require('./getAttr');

module.exports = (node) => ({
  url: getAttr(node, 'href'),
  thumbnail: getAttr(node.children[0].children[0], 'src'),
  title: node.children[2].children[0].content,
  author: node.children[3].children[0].content,
  likes: 'N/A',
  genre: node.children[1].children[0].content
});
