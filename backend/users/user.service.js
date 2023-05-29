const dbService = require('../db/db.service.js');
const { ObjectId } = require('mongodb');
const encryptService = require('./encrypt');

const collectionName = 'user_db';

module.exports = {
  query,
  getById,
  remove,
  save,
  checkLogin,
  getLoginToken,
  validateToken,
};

async function getUsersCollection() {
  return await dbService.getCollection(collectionName);
}

async function query() {
  try {
    const collection = await getUsersCollection();
    const users = await collection.find().toArray();
    return users;
  } catch (err) {
    console.log('ERROR: cannot find users');
  }
}

async function getById(userId) {
  try {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw new Error('User not found!');
    return user;
  } catch (err) {
    console.log(`ERROR: cannot find user ${userId}`);
    throw err;
  }
}

async function remove(userId) {
  try {
    const collection = await getUsersCollection();
    return await collection.deleteOne({ _id: new ObjectId(userId) });
  } catch (err) {
    console.log(`ERROR: cannot remove user ${userId}`);
    throw err;
  }
}

async function save(user) {
  try {
    const collection = await getUsersCollection();
    user._id = new ObjectId().toString();
    await collection.insertOne(user);
    return user;
  } catch (err) {
    console.log('ERROR: cannot save user');
    throw err;
  }
}

async function checkLogin({ username, password }) {
  try {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ username });
    if (user && user.password === password) {
      return {
        _id: user._id,
        fullname: user.fullname,
        score: user.score,
      };
    } else {
      throw new Error('Invalid login');
    }
  } catch (err) {
    console.log('ERROR: cannot check login');
    throw err;
  }
}

function getLoginToken(user) {
  const str = JSON.stringify(user);
  const encryptedStr = encryptService.encrypt(str);
  return encryptedStr;
}

function validateToken(token) {
  const str = encryptService.decrypt(token);
  const user = JSON.parse(str);
  return user;
}
