const express = require('express');
const app = express();
const toyService = require('./toys/toy.service');
const userService = require('./users/user.service');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./api');

app.use(cookieParser()); // for res.cookies
app.use(express.json()); // for req.body
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use('/api', apiRouter);

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Listen will always be the last line in our server!
// app.listen(3030, () => console.log('Server listening on port 3030!'));
const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
