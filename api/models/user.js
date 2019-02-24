import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let UserSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true, lowercase: true, },
  password: {type: String, required: true, }
}, {
  timestamps: true
});

UserSchema.methods.validePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('User', UserSchema);