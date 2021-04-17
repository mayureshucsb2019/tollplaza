const Ticket = require("../models/ticket");
const constants = require("./constants");

const saveTicket = async function (vehicleNumber, isReturn) {
    let time = Date.now();
    console.log("Time to create is: ", time);
    let ticketNumber = await Ticket.collection.countDocuments() + 1;
    console.log("Documents: ", ticketNumber);
    const ticket = new Ticket({
        vehicleNumber: vehicleNumber,
        creationDate: time,
        number: ticketNumber,
        // add 24 hours time limit for the return time
        returnDate: null,
        isReturn: isReturn,
        amount: isReturn ? constants.ticketPrice * 2 : constants.ticketPrice
    });

    return await new Promise((resolve, reject) => {
        ticket.save()
            .then(result => {
                resolve(result);
            }).catch(err => {
                console.log("Error while saving ticket information \n", err);
                reject(err);
            })
    })
}

// Resolves true if ticket is valid for 24 hours or not used else resolves false
// rejects error in case of errors

const validateTicket = async function (ticketNumber) {
    return await new Promise((resolve, reject) => {
        Ticket.findOne({ number: ticketNumber })
            .then(result => {
                console.log("Ticket retrieved: ", result);
                // convert 24 hours to milliseconds for timestamp comparison
                let time = Date.now()
                console.log(time, result.creationDate.getTime());
                console.log("Details for condition: ", result.returnDate == null, result.isReturn, result.creationDate.getTime() + 24 * 60 * 60 * 1000000 >= time);
                if (result.returnDate == null && result.isReturn && result.creationDate.getTime() + 24 * 60 * 60 * 1000000 >= time) {
                    console.log("Valid return ticket");
                    result.returnDate = time;
                    result.save()
                        .then(() => {
                            console.log("Return date updated",);
                        })
                        .catch(err => {
                            console.log("Error in updating return date", err);
                        })
                    resolve(true);
                } else {
                    if (!result.isReturn) {
                        console.log("One-way-ticket");
                        resolve("One-way-ticket");
                    } else if (result.returnDate != null) {
                        console.log("Return ticket already used!");
                        resolve("Return ticket already used!");
                    } else {
                        console.log("Ticket Expired!");
                        resolve("Ticket Expired!");
                    }
                }
            }).catch(err => {
                console.log("Error fetching Provider !", err);
                reject(err);
            });
    })
}

exports.validateTicket = validateTicket;
exports.saveTicket = saveTicket;