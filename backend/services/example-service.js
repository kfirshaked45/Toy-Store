const dbService = require('../db/db.service');
const { ObjectId } = require('mongodb');
const collectionName = 'toy_db';
module.exports = {
  query,
  getById,
  remove,
  update,
  add,
};

async function query(filterBy = {}) {
  const criteria = {};

  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i');
    criteria.fullName = { $regex: regex };
  }
  if (filterBy.minBalance) {
    criteria.balance = { $gte: filterBy.minBalance };
  }

  try {
    const collection = await dbService.getCollection(collectionName);
    const toys = await collection.find(criteria).toArray();
    return toys;
  } catch (err) {
    console.log('ERROR: cannot find toys');
    throw err;
  }
}

async function getById(toyId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const toy = await collection.findOne({ _id: ObjectId(toyId) });
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot find toy ${toyId}`);
    throw err;
  }
}

async function remove(toyId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    return await collection.deleteOne({ _id: ObjectId(toyId) });
  } catch (err) {
    console.log(`ERROR: cannot remove toy ${toyId}`);
    throw err;
  }
}

async function update(toy) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toy });
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot update toy ${toy._id}`);
    throw err;
  }
}

async function add(toy) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.insertOne(toy);
    return toy;
  } catch (err) {
    console.log(`ERROR: cannot insert toy`);
    throw err;
  }
}
