from flask import Flask, jsonify
import requests, uuid, os

app = Flask(__name__)

data = {}

@app.get("/")
def root():
    return jsonify(data)



def main():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT') or 3000))

if __name__ == '__main__':
    main()
