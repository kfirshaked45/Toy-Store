const express = require('express');
const toyService = require('./toy.service');
// const userService = require('../users/user.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const { name, price } = req.query;
  const filterBy = { name, price: +price };
  const toys = await toyService.query();
  console.log('toys', toys);
  res.send(toys);
});

// Add
router.post('/', (req, res) => {
  // const loggedinUser = userService.validateToken(req.cookies.loginToken);
  // if (!loggedinUser) return res.status(401).send('Cannot add toy');
  const { name, price } = req.body;

  const toy = {
    name,
    price: +price,
  };
  toyService
    .add(toy)
    .then((savedToy) => {
      res.send(savedToy);
    })
    .catch((err) => {
      console.log('Cannot add toy');
      res.status(400).send('Cannot add toy');
    });
});

// Edit
router.put('/', (req, res) => {
  console.log(req.body, 'BODY');
  // const loggedinUser = userService.validateToken(req.cookies.loginToken);
  // if (!loggedinUser) return res.status(401).send('Cannot update toy not logged in');

  const { _id, name, price } = req.body;
  const toy = {
    _id,
    name,
    price: +price,
    // owner,
  };
  toyService
    .update(toy)
    .then((savedToy) => {
      res.send(savedToy);
    })
    .catch((err) => {
      console.log('Cannot update toy');
      res.status(400).send('Cannot update toy');
    });
});

// Read - getById
router.get('/:toyId', (req, res) => {
  const { toyId } = req.params;
  toyService
    .getById(toyId)
    .then((toy) => res.send(toy))
    .catch((err) => res.status(403).send(err));
});

// Remove
router.delete('/:toyId', async (req, res) => {
  // const loggedinUser = userService.validateToken(req.cookies.loginToken);
  // if (!loggedinUser) return res.status(401).send('Cannot delete toy');

  const { toyId } = req.params;
  try {
    const message = await toyService.remove(toyId);
    res.send({ message, toyId });
  } catch (err) {
    console.log('err:', err);
    res.status(400).send('Cannot remove toy, ' + err);
  }
});

module.exports = router;
