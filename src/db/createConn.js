const { MongoClient } = require('mongodb');

module.exports = () => MongoClient
  .connect('mongodb://localhost:27017', { useNewUrlParser: true })
  .then(conn => conn.db('webtoon-bot'))
  .catch(err => {
    if (err.message.includes('ECONNREFUSED')) {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1);
    }
  });
