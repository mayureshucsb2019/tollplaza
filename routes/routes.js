const express = require("express");
const router = express.Router();
const tollController = require("../controllers/tollController");

router.post("/validateReturn/ticket/:ticketNumber", tollController.validateReturn);

router.post("/createTicket", tollController.createTicket);

module.exports = router;