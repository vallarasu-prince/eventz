from flask_restful import Resource
from flask import request as flask_request
from root import   mongo
import razorpay

from root.config import RAZORPAY_KEY, RAZORPAY_SECRET, TITLE
from root.libs.auth import auth_required
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId
from root.payment.__schema__ import PaymentSuccessSchema


# RAZORPAY_KEY = "rzp_test_mb4Rk5VyeSsKy3",
# RAZORPAY_SECRET = "OX7u4kOwwSIpoA1374eklfWS"


#mongoDB
mdb = mongo

# {
#   "id": "order_KD1SGEDAcXhVy0",
#   "entity": "order",
#   "amount": 500,
#   "amount_paid": 0,
#   "amount_due": 500,
#   "currency": "INR",
#   "receipt": "order_rcptid_11",
#   "offer_id": null,
#   "status": "created",
#   "attempts": 0,
#   "notes": [],
#   "created_at": 1662119679
# }


class InitiatePayment(Resource):
    @auth_required()
    def post(self, uid, user):

        input = flask_request.get_json(silent=True)
        cart = input["cart"]

        client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))

        data = { 
            "amount": cart["total"] * 100, 
            "currency": "INR", 
            "receipt": uniqueId(uid, "order") 
        }

        payment = client.order.create(data=data)
        
        razorpay_order = {
            "order_id": payment["id"],
            "key": RAZORPAY_KEY,
            "amount": payment["amount"]  ,
            "currency":payment["currency"],
            "name": TITLE,
            "description": "Transaction",
            "created_at": payment["created_at"],
            "image": " ",
            "prefill": {
                "name": input["fullName"],
                "email": input["email"],
                "contact": input.get("mobile", "")
            },
            "notes": {
                "address": ""
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        return {
            "status" : 1,
            "class" : "success",
            "message": "Payment Initiated Successfully!",
            "payload": {
                "paymentOptions": razorpay_order
            }
        }   
        

class RequestPaymentSuccess(Resource):
    def post(self, rid):
        input = flask_request.get_json(silent=True)
        form = PaymentSuccessSchema().load(input)
        client = razorpay.Client(auth = (RAZORPAY_KEY, RAZORPAY_SECRET))
        response = client.utility.verify_payment_signature(form)
        currentTime = timestamp()
        paidAt = dateTimeMeta(currentTime, 'paid')

        paymentData = {
            'pid': form["razorpay_payment_id"], 
            'oid': form["razorpay_order_id"], 
            'sign': form["razorpay_signature"]
        }

        request = {}

        if response:
            step = "ticketPreview"
            request = mdb.requests.find_one_and_update({"_id": rid}, {"$set": {"payment" : paymentData, "ps": 2, "step": step, **paidAt}})

        return {
            "status" : 1,
            "class" : "success",
            "message": "successfully",
            "payload": {
                "request": request
            }
        }   


class GetTicketsList(Resource):
    @auth_required()
    def get(self, uid, user):
        requests = mdb.requests.find({"uid": uid})

        return{
            "status":1,
            "class":"success",
            "message":"Success",
            "payload" : {
                "list": list(requests)
            }
        }
