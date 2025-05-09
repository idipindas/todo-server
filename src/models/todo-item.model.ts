import { Schema } from 'mongoose';

export const todoItemSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
