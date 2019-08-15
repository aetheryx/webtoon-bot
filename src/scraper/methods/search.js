const { Endpoints } = require('../Constants');
const parsePage = require('../parsePage');

const getAttr = (node, attribute) =>
  node.attributes.find(attr => attr.key === attribute).value;

module.exports = async (query) => {
  const nodes = await parsePage(Endpoints.SEARCH(encodeURIComponent(query)), node => (
    node.type === 'element' &&
    node.attributes.some(attr => (
      attr.key === 'class' &&
      attr.value && (
        attr.value.startsWith('card_item')
      )
    ))
  ));

  return nodes.map(node => ({
    url: getAttr(node, 'href'),
    thumbnail: getAttr(node.children[0], 'src'),
    title: node.children[1].children[0].children[0].content,
    author: node.children[1].children[1].children[0].content,
    likes: node.children[1].children[2].children[1].children[0].content,
    genre: node.children[2].children[0].content
  }));
};
