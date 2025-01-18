const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

const PORT = 3000
const MONGO_URI = "mongodb+srv://charanc1147:eK2ympxdVfglRIxK@cluster0.uffox.mongodb.net/";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:');
    }
};

connectDB();

app.use('/api', roomRoutes);
app.use('/api', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
