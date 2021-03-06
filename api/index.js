import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import auth from './routes/auth';
import user from './routes/user';

const app = express();

app.use(bodyParser.json());

dotenv.config();

mongoose.connect(
  process.env.DB_URL,
  { 
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
mongoose.set('useFindAndModify', false);

app.use('/api/auth', auth);
app.use('/api/users', user);

app.get('/*', (req, res) => {
    res.sendFile( path.join(__dirname, 'index.html'));
});

app.listen(4444, () => console.log('runing at port 4444'))