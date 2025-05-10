"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.todoItemSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
