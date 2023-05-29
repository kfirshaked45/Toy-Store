const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
const url = 'mongodb://localhost:27017';
const dbName = 'toys_store_db';
let dbConn = null;

async function _connect() {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(url);
    dbConn = client.db(dbName);
  } catch (err) {
    console.log('Cannot Connect to DB');
    throw err;
  }
}

async function getCollection(collectionName) {
  await _connect();
  return dbConn.collection(collectionName);
}

module.exports = {
  getCollection,
};
