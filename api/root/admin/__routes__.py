from root.admin.dashboard import DashboardUtils
from . import users_api
from root.admin.users import UsersList


users_api.add_resource(UsersList, '/admin/userslist')


### Dashboard
users_api.add_resource(DashboardUtils, '/admin/dashboard/utils')