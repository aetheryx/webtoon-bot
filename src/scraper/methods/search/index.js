const { Endpoints, CardTypes } = require('../../Constants');
const parsePage = require('../../parsePage');
const { wrapInCacheLayer } = require('@webtoon-bot/util');
const getAttr = require('./getAttr');
const parseOriginal = require('./parseOriginal');
const parseCanvas = require('./parseCanvas');

module.exports = wrapInCacheLayer({
  name: 'search-results',
  ttl: 3600,
  mode: 'EX'
}, async (query) => {
  const nodes = await parsePage(Endpoints.SEARCH(encodeURIComponent(query)), (node) => (
    node.type === 'element' &&
    node.attributes.some(attr => (
      attr.key === 'class' &&
      attr.value && (
        Object.values(CardTypes).some(cardType => (
          attr.value.startsWith(cardType)
        ))
      )
    ))
  ));

  return nodes.map(node => {
    switch (getAttr(node, 'class').split(' ')[0]) {
      case CardTypes.ORIGINALS:
        return parseOriginal(node);

      case CardTypes.CANVAS:
        return parseCanvas(node);

      default:
        console.warn('Unexpected card type', getAttr(node, 'class'));
        return null;
    }
  }).filter(Boolean);
});
