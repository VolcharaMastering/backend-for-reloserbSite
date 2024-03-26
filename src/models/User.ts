import mongoose from 'mongoose';
import validMail from 'validator';

/**
 * User model, describes the properties of a user
 * and the constraints of these properties.
 * The toJSON method is used to exclude the password
 * from the response when a user is fetched.
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator(val) {
        return validMail.isEmail(val);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Minimum 6 characters'],
    select: false, // exclude password from responses
  },

  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [120, 'Maximum 120 characters'],
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);

