const { Router } = require('express')

const TicketController = require('./controller/TicketController')
const routes = Router()

//Rotas de Ticket
routes.post('/ticket', TicketController.create)
routes.put('/ticket/:ticketNumber', TicketController.updateTicketStatus);
routes.get('/ticket-active/', TicketController.getActiveTickets)
routes.get('/ticket-finished/', TicketController.getFinishedTickets)


module.exports = routes
