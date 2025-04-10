const express= require('express');
const router= express.Router();
const {createTicket,viewTickets,viewTicketDetails}= require('../Controllers/TicketController');
const verifyToken= require('../Middleware/verifyToken');
const verifyRole = require('../Middleware/verifyRole');

router.post('/createTicket',verifyToken,verifyRole('financial_planner', 'mortgage_broker'),createTicket);
router.get('/viewTickets',verifyToken,verifyRole('financial_planner', 'mortgage_broker'),viewTickets);
router.get('/viewTicketDetails/:id',verifyToken,verifyRole('financial_planner', 'mortgage_broker'),viewTicketDetails);

module.exports= router;