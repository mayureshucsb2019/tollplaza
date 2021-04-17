'use strict';
const databaseUtils = require("../utils/databaseUtils");

const createTicket = function (req, res) {
    console.log(req.body);
    databaseUtils.saveTicket(req.body.vehicleNumber, req.body.isReturn).then(data => {
        console.log(data);
        data ? res.status(200).send({ status: 200, message: data }) : res.status(500).send({ status: 500, message: "Ticket cannot be generated. Contact Admin!" });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ status: 500, message: "Ticket cannot be generated. Contact Admin!" });
    })
}

const validateReturn = function (req, res) {
    console.log("Incoming parameters are: ", req.params);
    databaseUtils.validateTicket(Number(req.params.ticketNumber))
        .then(message => {
            message == true ? res.status(200).send({ status: 200, message: true }) : res.status(200).send({ status: 200, message: message });
        }).catch(err => {
            console.log("Error is:", err);
            res.status(500).send({ status: 500, message: "Ticket cannot be validated. Contact Admin!" });
        })
}

exports.validateReturn = validateReturn;
exports.createTicket = createTicket;