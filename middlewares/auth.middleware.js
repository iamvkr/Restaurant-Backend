import userModel from '../models/user.model.js';
import adminModel from '../models/admin.model.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg
// import { findOne } from '../models/blackListToken.model';


export async function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    // const isBlacklisted = await findOne({ token: token });
    // if (isBlacklisted) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        req.user = user;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export async function authAdmin(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // const isBlacklisted = await findOne({ token: token });
    // if (isBlacklisted) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded._id)
        req.admin = admin;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}