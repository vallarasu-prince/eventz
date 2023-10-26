import json
from flask_restful import Resource
from flask import request
from root import   mongo
from root.config import ROOT_DIR

mdb = mongo

class StaticGenerate(Resource):
    def post(self):

        ### Mapping the json file name to the collection name
        collections = { 
            "users": "users",  ### {"json-file-name" : "collection-name"} 
            "posts": "posts",
        }

        orders = [ 
            "users", ### List of json files
            # "posts",
        ]

        for order in orders: ### Looping through the json files
            jsonFile = open(ROOT_DIR + f'\dev\data\{order}.json') ### Path of the json file

            jsonData = json.load(jsonFile) ### Loading the json file

            collection = mdb[collections[order]].find({})
            if len(list(collection)) > 0:
                return {
                    "status": 0,
                    "class": "error",
                    "message": f"Static Data Already Generated for {order}!"
                }


            mdb[collections[order]].insert_many(jsonData) ### Inserting the json data to the collection
        
        return{
            "status": 1,
            "class": "success",
            "message": "Static Data Generated Successfully!"
        }
        

