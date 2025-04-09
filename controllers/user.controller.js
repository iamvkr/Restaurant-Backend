import userModel from '../models/user.model.js';
import { createUser } from '../services/user.service.js';
import { validationResult } from 'express-validator';

export async function registerUser(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        const isUserAlready = await userModel.findOne({ email });

        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            username,
            email,
            password: hashedPassword
        });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(404).json({error:error.message})
    }


}

export async function loginUser(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export async function getUserProfile(req, res, next) {
    const {_id,username,email} = req.user;
    res.status(200).json({_id,username,email});
}

export async function logoutUser(req, res, next) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}