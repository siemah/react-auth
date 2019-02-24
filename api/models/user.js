import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'

let UserSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true, lowercase: true, },
  password: {type: String, required: true, }
}, {
  timestamps: true
});


/**
 * generate JWT token
 * @return {String} token 
 */
UserSchema.methods.generateJWT = function() {
  return JWT.sign({ email: this.email }, process.env.JWT_SECRET);
}

/**
 * generate a reponse object send to user when successed his loggin 
 * @return {Object} some details send to user
 */
UserSchema.methods.toAuthJSON = function () {
  return {
    email: this.email,
    token: this.generateJWT()
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

export default mongoose.model('User', UserSchema);