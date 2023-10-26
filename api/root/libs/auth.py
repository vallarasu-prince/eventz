from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from root import  mongo
from functools import wraps

mdb = mongo

def auth_required(**kwargs):
    isOptional = kwargs.get("isOptional", False)
    def wrapper(f):
        @jwt_required()
        @wraps(f)
        def decorated_function(*args, **kwargs):
            verify_jwt_in_request(optional=isOptional)
            uid = get_jwt_identity()

            projection = {
                "_id": 1,
                "fullName": 1,
                "email": 1,
                "photoUrl": 1,
                "access": 1,
            }
            user = mdb.users.find_one({"_id": uid}, projection)
        
            return f(*args, **kwargs, uid=uid, user=user)
        return decorated_function
    return wrapper

