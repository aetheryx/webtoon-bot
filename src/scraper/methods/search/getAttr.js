module.exports = (node, attribute) =>
  node.attributes.find(attr => attr.key === attribute).value;
