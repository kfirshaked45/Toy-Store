const express = require('express');
const userService = require('./user.service');
const router = express.Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  userService.getById(userId).then((user) => {
    res.send(user);
  });
});

router.post('/login', async (req, res) => {
  const credentials = req.body;
  try {
    const user = await userService.checkLogin(credentials);
    const token = userService.getLoginToken(user);
    res.cookie('loginToken', token);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(401).send('Not you!');
  }
});

router.post('/signup', (req, res) => {
  console.log(req.body, 'BODYYYYY');
  const credentials = req.body;
  userService
    .save(credentials)
    .then((user) => {
      const token = userService.getLoginToken(user);
      res.cookie('loginToken', token);
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('Nope!');
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie('loginToken');
  res.send('logged-out!');
});

module.exports = router;
