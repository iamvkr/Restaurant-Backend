import { Schema, model } from 'mongoose';


const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    cusines : [
        {
            type:String
        }
    ]
})

const restaurantModel = model('restaurant', restaurantSchema);


export default restaurantModel;