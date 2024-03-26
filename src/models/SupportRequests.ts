import mongoose from "mongoose";
import validator from "validator";

const supportRequestSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: [true, "Project is required"],
  },
  clientName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Minimum 2 characters"],
    maxlength: [120, "Maximum 120 characters"],
  },
  clientEmail: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator(val: string) {
        return validator.isEmail(val);
      },
      message: "Check your email",
    },
  },
  clientPhone: {
    type: String,
    unique: true,
    validate: {
      validator(val: string) {
        return validator.isMobilePhone(val);
      },
      message: "Check your phone number",
    },
  },
  clientTg: {
    type: String,
    unique: true,
    validate: {
      validator(val: string) {
        return validator.isURL(val);
      },
      message: "Check your link to telegram",
    },
  },
  clientMessge: {
    type: String,
    required: [true, "Message is required"],
    minlength: [10, "Minimum 10 characters"],
    maxlength: [500, "Maximum 500 characters"],
  },
  buisnessData: {
    type: String,
    // required: [true, "buisness data is required"],
  },
});
export default mongoose.model("supportRequest", supportRequestSchema);
