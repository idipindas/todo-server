import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import {
  createTodoList,
  getTodoLists,
  getTodoListById,
  updateTodoList,
  deleteTodoList,
  updateTodoItemStatus,
} from '../controllers/todo.controller';

const router = express.Router();

router.post('/', verifyToken, createTodoList);
router.get('/', verifyToken, getTodoLists);
router.get('/:id', verifyToken, getTodoListById);
router.put('/:id', verifyToken, updateTodoList);
router.delete('/:id', verifyToken, deleteTodoList);
router.put('/:listId/items/:itemId', verifyToken, updateTodoItemStatus);

export default router;
