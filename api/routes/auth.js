import express from 'express';

import User from '../models/user';

let Router = express.Router();

Router
  .post(
    '/',
    (req, res) => {
      let { credentials } = req.body;
      User.findOne({ email: credentials.email }).then(user => {
        console.log(user)
        if(user && user.validePassword(credentials.password)){
          res.json({ user: { email: user.email } });
        } else {
          res.status(400).json({ errors: { global: 'Invalide credentials' } });
        }
      })
    }
  )

export default Router;