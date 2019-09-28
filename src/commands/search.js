const scraper = require('@webtoon-bot/scraper');
const restClient = require('@webtoon-bot/restClient');
const { createPaginatedMenu } = require('@webtoon-bot/util');
const { generateProxyURL } = require('@webtoon-bot/proxy');

module.exports = {
  triggers: [ 'search' ],
  description: 'Find a comic by name.',
  usage: '{c} <query>',

  async * run (msg, args) {
    await restClient.triggerTyping(msg.channel_id);

    const query = args.join(' ');
    const results = await scraper.search(query);
    if (results.length === 0) {
      return yield 'I was unable to find any comics with that query.';
    }

    createPaginatedMenu({
      msg,
      data: results.map(result => ({
        title: result.title,
        url: `https://www.webtoons.com${result.url}`,
        thumbnail: {
          url: generateProxyURL(result.thumbnail)
        },
        color: 0x00CC99,
        fields: [ {
          name: 'Author',
          value: result.author,
          inline: true
        }, {
          name: 'Genre',
          value: result.genre,
          inline: true
        }, {
          name: 'Likes',
          value: result.likes,
          inline: true
        } ]
      }))
    });
  }
};
