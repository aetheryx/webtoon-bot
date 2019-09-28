const getAttr = require('./getAttr');

module.exports = (node) => ({
  url: getAttr(node, 'href'),
  thumbnail: getAttr(node.children[0], 'src'),
  title: node.children[1].children[0].children[0].content,
  author: node.children[1].children[1].children[0].content,
  likes: node.children[1].children[2].children[1].children[0].content,
  genre: node.children[2].children[0].content
});
