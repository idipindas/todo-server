import { Request, Response } from 'express';
import { TodoList } from '../models/todo-list.model';

export const createTodoList = async (req: any, res: any) => {
    const { name, items } = req.body;

    try {
        const todoList = new TodoList({
            name,
            user: (req as any).userId,
            items,
        });

        await todoList.save();
        return res.status(201).json(todoList);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const getTodoLists = async (req: any, res: any) => {
    try {
        const todoLists = await TodoList.find({ user: (req as any).userId });
        return res.json(todoLists);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const getTodoListById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const todoList = await TodoList.findById(id);
        return res.json(todoList);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const updateTodoList = async (req: any, res: any) => {
    const { name, items } = req.body;
    const { id } = req.params;

    try {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: id, user: (req as any).userId },
            { name, items },
            { new: true }
        );

        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do list not found' });
        }

        return res.json(todoList);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const deleteTodoList = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const todoList = await TodoList.findOneAndDelete({ _id: id, user: (req as any).userId });

        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do list not found' });
        }

        return res.json({ msg: 'To-Do list deleted' });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const updateTodoItemStatus = async (req: any, res: any) => {
    const { listId, itemId } = req.params;
    const { completed } = req.body;

    try {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: listId, user: (req as any).userId, 'items._id': itemId },
            { $set: { 'items.$.completed': completed } },
            { new: true }
        );

        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do item or list not found' });
        }

        return res.json(todoList);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
