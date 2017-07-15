from flask import Flask, request, jsonify
app = Flask(__name__)

registrations = []
chats = []
locations = []


@app.route("/")
def hello():
    return "Hello Sandbox!"


@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(registrations)


@app.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    try:
        registrations.append({
            'username': body['username'],
        })
        return jsonify({
            'message': 'Thank you ' + body['username'] + '!',
            'username': body['username'],
            'error': None
        })
    except:
        return jsonify({'error': 'invalid data', 'message': None}), 400


@app.route('/chats', methods=['GET'])
def get_chats():
    return jsonify(chats)


@app.route('/chats', methods=['POST'])
def create_chat():
    body = request.get_json()
    try:
        chats.append({
            'username': body['username'],
            'message': body['message']
        })
        return jsonify({'message': 'ok', 'error': None})
    except:
        return jsonify({'error': 'invalid data', 'message': None}), 400


@app.route('/locations', methods=['GET'])
def get_locations():
    return jsonify(locations)


@app.route('/locations', methods=['POST'])
def create_location():
    body = request.get_json()
    try:
        locations.append({
            'username': body['username'],
            'latitude': body['latitude'],
            'longitude': body['longitude'],
            'message': body['message']
        })
        return jsonify({'message': 'ok', 'error': None})
    except:
        return jsonify({'error': 'invalid data', 'message': None}), 400
