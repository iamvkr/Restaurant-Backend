import adminModel from '../models/admin.model.js';

export async function createAdmin({
    username, email, password
}) {
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }
    const admin = adminModel.create({
        username,
        email,
        password
    })

    return admin;
}