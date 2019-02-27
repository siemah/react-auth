import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator';

let UserSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true, lowercase: true, unique: true, },
  password: {type: String, required: true, },
  confirmed: { type: Boolean, default: false, },
  confirmationToken: { type: String, required: true, },
}, { timestamps: true });


/**
 * generate JWT token
 * @return {String} token 
 */
UserSchema.methods.generateJWT = function() {
  return JWT.sign(
    { 
      email: this.email, 
      confirmed: this.confirmed 
    }, 
    process.env.JWT_SECRET
  );
}

/**
 * generate a reponse object send to user when successed his loggin 
 * @return {Object} some details send to user
 */
UserSchema.methods.toAuthJSON = function () {
  return {
    email: this.email,
    token: this.generateJWT(),
    confirmed: this.confirmed,
  }
}

/**
 * check if password is match to ther from user
 * @param {String} password password send by user (password to check)
 * @return {Bolean} this password is correct or not
 */
UserSchema.methods.validePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

/**
 * hash a password of the current user
 * @param {String} the password string send by user 
 */
UserSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, 10);
}

/**
 * generate a confirmation token and add it to user modela
 */
UserSchema.methods.setConfirmationToken = function () {
  this.confirmationToken = this.generateJWT();
}


// add unique validato plugin 
UserSchema.plugin(uniqueValidator, { message: 'This email is already taken :(' });

export default mongoose.model('User', UserSchema);