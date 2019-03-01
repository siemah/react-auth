import express from 'express';

import User from '../models/user';

let Router = express.Router();

Router
  .post(
    '/',
    (req, res) => {
      let { credentials } = req.body;
      User.findOne({ email: credentials.email }).then(user => {
        //console.log(user)
        if(user && user.validePassword(credentials.password)){
          res.json({ user: user.toAuthJSON() });
        } else {
          res.status(400).json({ errors: { global: 'Invalide credentials' } });
        }
      })
    }
  )
  .post(
    '/confirmation',
    async (req, res) => {
      
      let { body } = req;
      if( !'token' in body ) return res.status(401).json({ errors: { global: "Token should not be empty :(" }});
      try {
        let user = await User.findOne({ confirmationToken: body.token, confirmed: false });
        if (!user) return res.status(401).json({ errors: { global: "Invalid Token :(" } });
        user = await User.findOneAndUpdate(
          { confirmationToken: body.token, confirmed: false },
          {
            confirmationToken: '',
            confirmed: true,
          },
          { new: true }
        );
        if (user) return res.status(201).json({ user: user.toAuthJSON() });
        return res.status(400).json({ errors: { global: "Oop's Something went wrong try again" } });
      } catch (error) {
        return res.status(400).json({ errors: { global: "Oop's Something went wrop, try again or contact webmaster" } });
      }

    }
  )

export default Router;