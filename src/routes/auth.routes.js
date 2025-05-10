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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
// Register User
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = yield user_model_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Create new user
        const user = new user_model_1.User({ email, password: hashedPassword });
        yield user.save();
        return res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
// Login User
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        return res.json({ token });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
}));
exports.default = router;
