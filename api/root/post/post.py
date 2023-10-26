from flask import request
from flask_restful import Resource
from root import mongo
from root.libs.auth import auth_required
from root.libs.user_utils import dateTimeMeta, timestamp, uniqueId, userMeta
from root.post.__schema__ import AddPostSchema
from root import cloud


mdb = mongo

class AddPost(Resource):
    @auth_required()
    def post(self, uid, user):
        data = request.get_json()
        currentTime = timestamp()
        createdAt = userMeta(currentTime, user, uid, 'created')

        _id = data['_id']

        tags = data.get("tags", [])

        if tags:
            tags = tags.split(",")
            tags = [tag.strip() for tag in tags]

        if _id == "new":
            data = {
                **data,
                "uid" : uid,
                "_id" : uniqueId(uid),
                **createdAt
            }

            mdb.posts.insert_one(data)

            return {
                "status":1,
                "class":"success",
                "message":"Post added successfully !",
                "payload" : data
            }
        
        else:

            mdb.posts.update_one(
                {"_id": _id},
                {"$set": data}
            )

            return {
                "status":1,
                "class":"success",
                "message":"Post updated successfully !",
                "payload" : data
            }
        

class GetPostById(Resource):
    @auth_required()
    def get(self, uid, user, postId):

        projection = {
            "title" : 1,
            "post" : 1,
            "content" : 1,
            "tags" : 1,
            "createdAt" : 1,
            "uid" : 1,
            "tickets": 1,
            "createdBy": 1
        }

        data = mdb.posts.find_one({"_id": postId}, projection)

        postUrl =  data['post']["file"]['response']["url"]
       
        item = {
            **data,
            "postUrl" :postUrl
        }

        return{
            "status":1,
            "class":"success",
            "message":"Success",
            "payload" : item
        }

class GetAllPosts(Resource):
    @auth_required()
    def get(self, uid, user):
        projection = {
            "title" : 1,
            "post" : 1,
            "content" : 1,
            "createdBy": 1,
            "tags" : 1,
            "uid" : 1,
            "createdAt" : 1,
            "createdAtUnix" : 1
        }

        postData = mdb.posts.find({}, projection).sort("createdAtUnix", -1)

        data = []

        for post in postData:

            postUrl =  post['post']["file"]['response']["url"]

            item = {
                **post,
                "postUrl" :postUrl
            }

            data.append(item)



        return{
            "status":1,
            "class":"success",
            "message":"Success",
            "payload" : data
        }



class LikePostById(Resource):
    pass

class CommentById(Resource):
    pass


class FileUpload(Resource):
    # @auth_required()
    def post(self):
        file = request.files['file']
        print(file)
        uploader = cloud(file, folder="posts")

        print(uploader)


        return uploader