import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;


const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
})

adminSchema.methods.generateAuthToken = function () {
    const token = sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

adminSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

adminSchema.statics.hashPassword = async function (password) {
    return await hash(password, 10);
}

const adminModel = model('admin', adminSchema);


export default adminModel;