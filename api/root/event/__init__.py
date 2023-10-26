from flask import Blueprint
from flask_restful import Api

event_bp = Blueprint('event', __name__, url_prefix='/server/api')
event_api = Api(event_bp)

from . import __routes__