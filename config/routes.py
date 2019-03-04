import os
from app import app
from controllers import auth, clubs, users, events

app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(clubs.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')
app.register_blueprint(events.api, url_prefix='/api')

@app.route('/', defaults={'path': ''}) # homepage
@app.route('/<path:path>') # any other path
def catch_all(path):

    if os.path.isfile('dist/' + path): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html')
