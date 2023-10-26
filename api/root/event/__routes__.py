from root.event.event import GetPaymentRequest, InitiateTicket
from . import event_api

event_api.add_resource(InitiateTicket, '/init/ticket')
event_api.add_resource(GetPaymentRequest, '/request/payment/<rid>')


