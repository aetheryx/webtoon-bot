const { Cache } = require('@webtoon-bot/structures');

module.exports = (options, provider) => {
  const cache = new Cache(options);

  return (async (query) => {
    const existingEntry = await cache.get(query);
    if (existingEntry && process.env.NODE_ENV === 'production') {
      return existingEntry;
    }

    const newEntry = await provider(query);

    cache.set(newEntry, query);
    return newEntry;
  });
};
