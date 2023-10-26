from flask_restful import Resource
from flask_jwt_extended import  get_jwt_identity
from root import  mongo
from flask import Flask, request as flask_request
from root.admin.__schema__ import AddUserSchema
from root.libs.auth import auth_required
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId


mdb = mongo


class UsersList(Resource):
    @auth_required()
    def get(self, uid, user):
        data = []

        for user in mdb.users.find({}):
            data.append(user) 

        return {
            "status":1,
            "class": "success",
            "message" :"users data fetched successfully",
            "payload": data
        }