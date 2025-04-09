import 'dotenv/config'
import express from 'express';
import cors from 'cors';
const app = express();
import cookieParser from 'cookie-parser';
import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import restaurantsRoutes from './routes/restaurants.routes.js';
import reserveRoutes from './routes/reserve.routes.js';

connectToDb();

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/restaurants', restaurantsRoutes);
app.use('/api/v1/reservations', reserveRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('*', (req, res) => {
    res.send("404 NOT FOUND <a href='./'> Go To Home</a>")
})


export default app;