const { createServer } = require('http');
const { request } = require('https');
const { URL_SEPERATOR } = require('./Constants');
const { verifySignature } = require('@webtoon-bot/util');
const { WEBTOON_BASE, USER_AGENT } = require('@webtoon-bot/scraper/Constants');

const server = createServer((req, res) => {
  const [ requestURL, signature ] = req.url
    .slice(1)
    .split(URL_SEPERATOR)
    .map(decodeURIComponent);

  if (!verifySignature(requestURL, signature)) {
    res.writeHead(403);
    return res.end();
  }

  request(requestURL, {
    method: 'GET',
    headers: {
      Referer: WEBTOON_BASE,
      'User-Agent': USER_AGENT
    }
  }, (requestedData) => {
    requestedData.pipe(res);
  }).end();
});

module.exports = () =>
  server.listen(process.env.PROXY_PORT, () => (
    console.log('Proxy server listening to', process.env.PROXY_PORT)
  ));
