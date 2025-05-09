import mongoose, { Document, Schema } from 'mongoose';
import { todoItemSchema } from './todo-item.model';

export interface ITodoItem {
  text: string;
  completed: boolean;
}

export interface ITodoList extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  items: ITodoItem[];
}

const todoListSchema = new Schema<ITodoList>(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [todoItemSchema],
  },
  { timestamps: true }
);

export const TodoList = mongoose.model<ITodoList>('TodoList', todoListSchema);
