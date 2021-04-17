const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({

    vehicleNumber: {
        type: String,
        required: true
    },
    // this is ticket number
    number: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
    },
    isReturn: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
