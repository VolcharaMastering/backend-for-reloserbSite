"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const supportRequestSchema = new mongoose_1.default.Schema({
    projectId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            validator(val) {
                return validator_1.default.isEmail(val);
            },
            message: "Check your email",
        },
    },
    clientPhone: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                return validator_1.default.isMobilePhone(val);
            },
            message: "Check your phone number",
        },
    },
    clientTg: {
        type: String,
        unique: true,
        validate: {
            validator(val) {
                return validator_1.default.isURL(val);
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
exports.default = mongoose_1.default.model("supportRequest", supportRequestSchema);
