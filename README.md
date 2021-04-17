# tollplaza

This repo contains code to simulate code plaza ticketing system
There are two post routes:

"/validateReturn/ticket/:ticketNumber"
--> Takes just ticket number as parameter
--> checks if the ticket is return ticket, has not been used previously and has not expired 24 hours period

"/createTicket"
--> takes Vehicle Number and generates data for the receipt
--> this must be read by UI and presented accordingly
