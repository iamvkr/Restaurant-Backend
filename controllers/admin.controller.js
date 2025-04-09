import adminModel from '../models/admin.model.js';
import { createAdmin } from '../services/admin.service.js';
import { validationResult } from 'express-validator';

export async function registerAdmin(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        const isAdminAlready = await adminModel.findOne({ email });

        if (isAdminAlready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashedPassword = await adminModel.hashPassword(password);

        const admin = await createAdmin({
            username,
            email,
            password: hashedPassword
        });

        const token = admin.generateAuthToken();

        res.status(201).json({ token, admin });
    } catch (error) {
        res.status(404).json({error:error.message})
    }


}

export async function loginAdmin(req, res, next) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const { email, password } = req.body;
    
        const admin = await adminModel.findOne({ email }).select('+password');
    
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const isMatch = await admin.comparePassword(password);
    
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const token = admin.generateAuthToken();
    
        res.cookie('token', token);
    
        res.status(200).json({ token, admin });
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export async function getAdminProfile(req, res, next) {
    const {_id,username,email} = req.admin;
    res.status(200).json({_id,username,email});

}

export async function logoutAdmin(req, res, next) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}