from flask import Flask, jsonify

app = Flask(__name__, static_folder='dist')

@app.route('/')
def home():
    return jsonify({'message': 'HomePage'}), 200
