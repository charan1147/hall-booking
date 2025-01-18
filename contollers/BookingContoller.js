const { rooms } = require('./RoomContoller');

let bookings = [];
let BookingId = 1;

exports.createBooking = (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find(room => room.id === roomId);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    } else if (room.booked) {
        return res.status(400).json({ error: 'Room is already booked' });
    }

    const booking = {
        bookingId: BookingId++,
        roomId,
        customerName,
        date,
        startTime,
        endTime,
        bookingDate: new Date(),
        status: 'Booked',
    };

    bookings.push(booking);
    room.booked = true;
    res.status(201).json(booking);
};

exports.getBookings = (req, res) => {
    const customerBookings = bookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: `Room ${room.id}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
        };
    });
    res.json(customerBookings);
};

exports.getCustomerBookings = (req, res) => {
    const customerName = req.params.customerName;
    const customerBookings = bookings.filter(booking => booking.customerName === customerName);

    const bookingDetails = customerBookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: `Room ${room.id}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.status,
        };
    });

    res.json(bookingDetails);
};
