import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const router = express.Router();

// Register User
router.post('/register', async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = new User({ email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Login User
router.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });

        return res.json({ token });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

export default router;
