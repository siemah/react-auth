import express from 'express';
import User from '../models/user';

import parseErrors from '../utils/parseErrors'

let Router = express.Router();

Router.post(
  '/',
  (req, res) => {
    let { user } = req.body;
    let newUser = new User({ email: user.email });
    newUser.setPassword(user.password);
    newUser.save()
      .then(userDoc => res.status(201).json({ user: userDoc.toAuthJSON() }))
      .catch(err => {
        let errors = parseErrors(err.errors);
        res.status(400).json({ errors });
      });
  }
);

export default Router;