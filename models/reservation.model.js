import { Schema, model } from 'mongoose';


const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "restaurant",
        required: true,
    },
    dateTime: {
        type:Date,
    },
    guests: {
        type: Number,
        required: true,
    },
    isActive : {
        type:Boolean,
        default:true
    }
})

const reservationModel = model('reservation', reservationSchema);


export default reservationModel;