from flask import Blueprint
from flask_restful import Api

dev_bp = Blueprint('dev', __name__, url_prefix='/server/api')
dev_api = Api(dev_bp)

from . import __routes__