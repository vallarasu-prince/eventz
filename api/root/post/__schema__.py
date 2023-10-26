from marshmallow import Schema, fields


class TicketSchema(Schema):
    title = fields.Str(required=True)
    seats = fields.Int(required=True)
    price = fields.Int(required=True)


class AddPostSchema(Schema):
    _id = fields.Str(required=True)
    title = fields.Str(required=True)
    # post = fields.Dict(required=True)
    content = fields.Str(required=True)
    tickets = fields.Nested(TicketSchema, required=True)