from flask import Flask, jsonify, request
import requests, uuid, os

app = Flask(__name__)
app.config['WTF_CSRF_ENABLED'] = False  # Explicitly disable CSRF for REST API

data = {}

@app.route("/", methods=['GET'])
def root():
    return jsonify({"data":data})

@app.route("/", methods=['POST'])
def add_data():
    data.update(request.json)
    return jsonify({"data":data})


def main():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT') or 3000))

if __name__ == '__main__':
    main()