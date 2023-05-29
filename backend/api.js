const express = require('express');
const toyRouter = require('./toys/toy.controller');
const userRouter = require('./users/user.controller');

const router = express.Router();

router.use('/toys', toyRouter);
router.use('/auth', userRouter);

module.exports = router;
