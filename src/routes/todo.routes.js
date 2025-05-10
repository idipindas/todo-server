"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const todo_list_model_1 = require("../models/todo-list.model");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, items } = req.body;
    try {
        const todoList = new todo_list_model_1.TodoList({
            name,
            user: req === null || req === void 0 ? void 0 : req.userId,
            items,
        });
        yield todoList.save();
        return res.status(201).json(todoList);
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
router.get('/', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoLists = yield todo_list_model_1.TodoList.find({ user: req.userId });
        return res.json(todoLists);
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
router.get('/:id', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todoLists = yield todo_list_model_1.TodoList.findById(id);
        return res.json(todoLists);
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
router.put('/:id', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, items } = req.body;
    const { id } = req.params;
    try {
        const todoList = yield todo_list_model_1.TodoList.findOneAndUpdate({ _id: id, user: req.userId }, { name, items }, { new: true });
        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do list not found' });
        }
        return res.json(todoList);
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
router.delete('/:id', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todoList = yield todo_list_model_1.TodoList.findOneAndDelete({ _id: id, user: req.userId });
        if (!todoList) {
            return res.status(404).json({ msg: 'To-Do list not found' });
        }
        return res.json({ msg: 'To-Do list deleted' });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
router.put('/:listId/items/:itemId', auth_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId, itemId } = req.params;
    const { completed } = req.body;
    try {
        const todoList = yield todo_list_model_1.TodoList.findOneAndUpdate({ _id: listId, user: req.userId, "items._id": itemId }, { $set: { "items.$.completed": completed } }, { new: true });
        if (!todoList) {
            return res.status(404).json({ msg: "To-Do item or list not found" });
        }
        res.json(todoList);
    }
    catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}));
exports.default = router;
