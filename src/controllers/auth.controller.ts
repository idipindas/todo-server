import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const registerUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        return res.json({ token });
    } catch (err: any) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
