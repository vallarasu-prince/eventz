from root.dev.dev import StaticGenerate
from . import dev_api

dev_api.add_resource(StaticGenerate, '/static')


