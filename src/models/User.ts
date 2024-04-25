import mongoose from 'mongoose';
import validator from 'validator';

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
      validator(val: string) {
        return validator.isEmail(val);
      },
      message: "Check your email",
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Minimum 8 characters'],
    select: false, // exclude password from responses
  },
  
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [120, 'Maximum 120 characters'],
  },

  lastName: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [150, "Maximum 150 characters"],
  },

  userRole: {
    type: String,
    enum: ['user', 'manager', 'owner'],
    default: 'user',
  },

  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator(val: string) {
        return validator.isMobilePhone(val);
      },
      message: "Check your phone number",
    },
  },

  tgLink: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator(val: string) {
        return validator.isURL(val);
      },
      message: "Check your link to telegram",
    },
  },

  interestProjects:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "project",
  },

  sendRequests:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "supportRequest",
  },

  businessData: {
    type: String,
  },
});


userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('user', userSchema);

