const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},
email: {
type: String,
required: true,
unique: true,
},
password: {
type: String,
required: true,
},
role: {
type: String,
enum: ['admin', 'teacher', 'student', 'principal'],
default: 'student',
},
},
{
timestamps: true,
}
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;