import userModel from '../models/user.model.js';

export async function createUser({
    username, email, password
}) {
    if (!username || !email || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        username,
        email,
        password
    })

    return user;
}