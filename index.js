const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv');
const connectDataBase = require('./dbConnection/db');
const user = require('./routes/usersRoute');
const account = require('./routes/accountRoute');
const tranfer = require('./routes/transferRoute');

const app = express();

const PORT = process.env.PORT || 3000;

require('dotenv').config();

connectDataBase();

app.use(express.json());
app.use(cors());

app.use('/api/user', user)
app.use('/api/account', account)
app.use('/api/transfer', tranfer)

app.listen(PORT, () => {
        console.log('Listening on Port: ' + PORT);
      });