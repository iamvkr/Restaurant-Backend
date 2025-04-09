import restaurantModel from '../models/restaurants.model.js';
import reservationModel from '../models/reservation.model.js';

// user + admin
export async function getRestaurants(req, res, next) {
    if (!req.user && req.admin) {
        // is a admin
        const allRestaurants = await restaurantModel.find({});
        return res.status(201).json({ restaurants: allRestaurants });
    }
    if (req.user && !req.admin) {
        // is a user
        const allRestaurants = await restaurantModel.find({});
        return res.status(201).json({ restaurants: allRestaurants });
    }
    return res.status(404).json({ message: "Unauthorized" });

}

// admin
export async function addRestaurants(req, res, next) {

    try {
        const { name, location, capacity, cusines } = req.body;
        
        if (!name || !location || !capacity) {
            throw new Error('All fields are required');
        }
        const restaurant = await restaurantModel.create({
            name,
            location,
            capacity,
            cusines
        })
        res.status(201).json({ restaurant, message: "Restaurant added Successfully" });
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

// admin
export async function deleteRestaurants(req, res, next) {
    const restaurantId = req.params.id;

    try {
        // Check if restaurant exists
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Check if there are any active reservations
        const activeReservations = await reservationModel.find({ restaurantId });
        if (activeReservations.length > 0) {
            return res.status(400).json({
                message: 'Cannot delete restaurant with active reservations'
            });
        }

        // Delete the restaurant
        await restaurantModel.findByIdAndDelete(restaurantId);

        res.status(200).json({
            message: "Restaurant deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}