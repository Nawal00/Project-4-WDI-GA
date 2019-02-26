from app import app
from controllers import auth, clubs, users, events

app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(clubs.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(events.api, url_prefix='/api')





     #
