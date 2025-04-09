import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;


const userSchema = new Schema({
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
    reservations: [
        {
            type: Schema.Types.ObjectId,
            ref: "reservation"
        }
    ],
})

userSchema.methods.generateAuthToken = function () {
    const token = sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await hash(password, 10);
}

const userModel = model('user', userSchema);


export default userModel;