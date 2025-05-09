import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { TodoList } from '../models/todo-list.model';

const router = express.Router();

router.post('/', verifyToken, async (req: any, res: any) => {
    const { name, items } = req.body;

    try {
        const todoList = new TodoList({
            name,
            user: req?.userId,
            items,
        });

        await todoList.save();
        return res.status(201).json(todoList);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

router.get('/', verifyToken, async (req: any, res: any) => {
    try {
        const todoLists = await TodoList.find({ user: req.userId });
        return res.json(todoLists);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
});
router.get('/:id', verifyToken, async (req: any, res: any) => {
    try {
        const { id } = req.params;

        const todoLists = await TodoList.findById(id);
        return res.json(todoLists);
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

router.put('/:id', verifyToken, async (req: any, res: any) => {
    const { name, items } = req.body;
    const { id } = req.params;

    try {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: id, user: req.userId },
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
});

router.delete('/:id', verifyToken, async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const todoList = await TodoList.findOneAndDelete({ _id: id, user: req.userId });

        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do list not found' });
        }

        return res.json({ msg: 'To-Do list deleted' });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

);
router.put('/:listId/items/:itemId', verifyToken, async (req: any, res: any) => {
    const { listId, itemId } = req.params;
    const { completed } = req.body;

    try {
        const todoList = await TodoList.findOneAndUpdate(
            { _id: listId, user: req.userId, "items._id": itemId },
            { $set: { "items.$.completed": completed } },
            { new: true }
        );

        if (!todoList) {
            return res.status(404).json({ msg: "To-Do item or list not found" });
        }

        res.json(todoList);
    } catch (err: any) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});


export default router;
