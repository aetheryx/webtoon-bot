const createConn = require('./createConn');
const tables = require('./tables');

module.exports = class Database {
  #conn;

  async init () {
    this.#conn = await createConn();

    for (const table in tables) {
      this[table] = tables[table](this.#conn.collection(table));
    }
  }
};
