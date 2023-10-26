from root.payment.payment import GetTicketsList, InitiatePayment, RequestPaymentSuccess
from . import payment_api

payment_api.add_resource(InitiatePayment, '/init/payment')
payment_api.add_resource(RequestPaymentSuccess, '/payment/success/<rid>')

payment_api.add_resource(GetTicketsList, '/request/tickets/list')


