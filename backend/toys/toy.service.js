const dbService = require('../db/db.service.js');
// import { ObjectId } from 'mongodb';
const { ObjectId } = require('mongodb');
const collectionName = 'toy_db';
module.exports = {
  query,
  getById,
  remove,
  update,
  add,
};

async function getToysCollection() {
  return await dbService.getCollection(collectionName);
}

async function query() {
  try {
    const collection = await getToysCollection();
    const toys = await collection.find().toArray();
    return toys;
  } catch (err) {
    console.log('ERROR: cannot find toys');
  }
}


async function getById(toyId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const toy = await collection.findOne({ _id: new ObjectId(toyId) });
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot find toy ${toyId}`);
    throw err;
  }
}
async function remove(toyId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    return await collection.deleteOne({ _id: new ObjectId(toyId) });
  } catch (err) {
    console.log(`ERROR: cannot remove toy ${toyId}`);
    throw err;
  }
}

async function update(toy) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.updateOne({ _id: new ObjectId(toy._id) }, { $set: toy });
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot update toy ${toy._id}`);
    throw err;
  }
}

async function add(toy) {
  try {
    const collection = await getToysCollection();
    await collection.insertOne(toy);
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot insert toy`);
    throw err;
  }
}
