const express = require('express');
const router = express.Router();
const {createBooking,getBookings,getCustomerBookings} = require('../contollers/BookingContoller.js');

router.post('/bookings', createBooking)
router.get('/Customer-bookings', getBookings)
router.get('/:customerName', getCustomerBookings)

module.exports = router;
