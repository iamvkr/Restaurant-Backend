import reservationModel from "../models/reservation.model.js";
import restaurantModel from "../models/restaurants.model.js";
import userModel from "../models/user.model.js";
import { generateEmailData, sendEmail } from "../services/send-email.js";

// user
export async function reserveTable(req, res, next) {
    const { restaurantId, guests, dateTime } = req.body;
    const user = req.user;
    const userId = user._id;

    if (!userId) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
    if (!restaurantId || !userId || !guests || !dateTime) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if restaurant exists and has enough capacity
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        if (restaurant.capacity < guests) {
            return res.status(400).json({ message: 'Not enough capacity available' });
        }

        // validated date:

        if (new Date(dateTime).getTime() < Date.now()) {
            return res.status(400).json({ message: 'Invalid Date' });
        }

        // Create reservation
        const reservation = await reservationModel.create({
            userId,
            restaurantId,
            guests,
            dateTime: new Date(dateTime)
        });

        // Update restaurant capacity
        restaurant.capacity -= guests;
        await restaurant.save();

        // update user reservations arr:
        user.reservations.push(reservation._id);
        await user.save();

        sendEmail({
            to: user.email,
            subject: `Reservation Confirmation at ${restaurant.name}`,
            content: { type: "text", data: generateEmailData(user, restaurant, reservation) }
        }, (status) => {
            if (status) {
                res.status(201).json({
                    reservation,
                    message: `Restaurant reserved successfully and notified to ${user.email}`
                });
            } else {
                res.status(201).json({
                    reservation,
                    message: `Restaurant reserved successfully but failed sending email`
                });
            }
        });




    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// user
export async function getReservedTables(req, res, next) {
    const userId = req.user._id;

    try {
        const user = await userModel.findById(userId).populate('reservations')
        if (!user) {
            return res.status(400).json({ message: 'Error finding reservations' });
        }

        res.status(200).json({
            reservations: user.reservations,
            message: "Reservations fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// user
export async function cancelReservation(req, res, next) {
    const reservationId = req.params.id;
    if (!reservationId) {
        return res.status(400).json({ message: 'Reservation Id is required!' });
    }
    const user = req.user;
    console.log("user res:", user.reservations);

    try {
        // 1. get reservaion details
        const reservation = await reservationModel.findById(reservationId);
        if (!reservation) {
            return res.status(400).json({ message: 'Error reservation Id' });
        }

        // check if reservation is made by same user
        console.log("compare", user._id + " !== " + reservation.userId + "with:", String(user._id) !== String(reservation.userId));

        if (String(user._id) !== String(reservation.userId)) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        // set reservation inactive
        reservation.isActive = false;
        await reservation.save();

        // add guests capacity back to restaurant
        const restaurantId = reservation.restaurantId;
        const restaurant = await restaurantModel.findById(restaurantId);
        restaurant.capacity += reservation.guests;
        await restaurant.save();


        sendEmail({
            to: user.email,
            subject: `Reservation Cancellation Confirmation`,
            content: { type: "text", data: generateEmailData(user, restaurant, reservation) }
        }, (status) => {
            if (status) {
                res.status(200).json({
                    reservation,
                    message: `Reservation cancelled successfully and notified to ${user.email}`
                });
            } else {
                res.status(200).json({
                    reservation,
                    message: `Reservation cancelled successfully but failed sending email`
                });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}