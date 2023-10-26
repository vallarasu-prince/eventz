from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from root import mongo
from root.libs.auth import auth_required



mdb = mongo

class CurrentUser(Resource):
    @auth_required(optional=True)
    def get(self, user, uid):


        filter = { "_id": uid }

        data = mdb.users.find_one(filter)
        
        if not data:
            return {
                "status": 0,
                "class" : "danger",
                "message" : "Please login !"
            }
        
        return {
            "status":1,
            "class":"success",
            "message":"Details fetched successfully !",
            "payload" : data
        }
