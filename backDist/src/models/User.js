"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
/**
 * User model, describes the properties of a user
 * and the constraints of these properties.
 * The toJSON method is used to exclude the password
 * from the response when a user is fetched.
 */
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator(val) {
                return validator_1.default.isEmail(val);
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
module.exports = mongoose_1.default.model('user', userSchema);
