import express from 'express';
import User from '../models/user';

import parseErrors from '../utils/parseErrors'
import Mail from '../mailer/mail'

let Router = express.Router();

Router.post(
  '/',
  (req, res) => {
    let { user } = req.body;
    let newUser = new User({ email: user.email });
    newUser.setPassword(user.password);
    newUser.setConfirmationToken();
    newUser.save()
      .then(userDoc => {
        let mailOptions = {
          from: `"No Reply 👻" <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
          to: userDoc.email, // list of receivers
          subject: "Confirmation your accout ✔", // Subject line
          text: `Copy and paste this link to browser to valide you account 
          ${process.env.APP_URL}/confirmation/${userDoc.confirmationToken}`, // plain text body
          html: `Follow this link to browser to valide you account 
          <a href='${process.env.APP_URL}/confirmation/${userDoc.confirmationToken}'> click here </a>` // html body
        };

        (new Mail()).send(mailOptions, (err, info) => {
          if(err) return res.status(400).json({ errors: { global: 'Oops, something went wrong, please try again after a few moment :('} });
          return res.status(201).json({ user: userDoc.toAuthJSON() });
        });
      })
      .catch(err => {
        console.log(err.message);
        let errors = parseErrors(err.errors);
        res.status(400).json({ errors });
      });
  }
);

export default Router;