/**
 * @param {import('mongodb').Collection} comics
 */
module.exports = (comics) => ({
  get (key) {
    return comics.findOne({ _id: key });
  },

  set (key, value) {
    return comics.insertOne({ _id: key, value });
  }
});
