from flask_restful import Resource
from flask import request as flask_request
from root import   mongo
import razorpay

from root.libs.auth import auth_required
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId

#mongoDB
mdb = mongo


def prepareCart(input):

    data = {
        'title': input["title"],
        'seats': input["seats"],
        'price': input["price"]
    }

    return {

        "cart" : {
            "title": data["title"],
            "total": data["price"],
            "perItem": 1
        }

    }



class InitiateTicket(Resource):
    @auth_required()
    def post(self, uid, user):
        input = flask_request.get_json()

        currentTime = timestamp()
        createdAt = dateTimeMeta(currentTime, 'created')
        requestId = uniqueId(uid)
        print('requestId: ', requestId)
        eventId = input["eventId"]

        cart = prepareCart(input)

        user.pop("_id")

        steps = [ "paymentPreview", "ticketPreview" ]

        data = {
            "_id": requestId,
            "eventId": eventId,
            "uid": uid,
            "ps": 0,
            "steps": steps,
            "step": steps[0],
            "cart": cart["cart"],
            **user,
            **createdAt
        }
        print('data: ', data)


        requests = mdb.requests.insert_one(data)

        _id = data["_id"]
        print('_id: ', _id)

        return {
            "status" : 1,
            "class" : "success",
            "message": "Ticket Initiated Successfully!",
            "payload": {
                "request": data,
                "redirectUrl": f"/request/payment/{_id}"
            }
        }   
    
class GetPaymentRequest(Resource):
    @auth_required()
    def get(self, uid, user, rid):
        print('rid: ', rid)
        input = flask_request.get_json

        request = mdb.requests.find_one({"_id": rid})
        print('request: ', request)

        return {
            "status" : 1,
            "class" : "success",
            "message": "Success",
            "payload": {
                "request": request
            }
        }   

