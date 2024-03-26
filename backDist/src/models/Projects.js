"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    projectName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Minimum 2 characters'],
        maxlength: [120, 'Maximum 120 characters'],
    },
    projectType: {
        type: String,
        required: [true, 'Type is required'],
        minlength: [2, 'Minimum 2 characters'],
        maxlength: [120, 'Maximum 120 characters'],
    },
    projectCalls: {
        type: Number,
        default: 0
    },
});
exports.default = mongoose_1.default.model('project', projectSchema);
