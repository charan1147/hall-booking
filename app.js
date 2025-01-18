
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 

const connectDB = require("./config/db");
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const PORT = process.env.PORT || 5000; 
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(express.json());

connectDB(MONGO_URI);

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
