from flask import Flask, jsonify, request
from flask_cors import CORS
from recommendation import recommend_products

#flask server
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["*"]}})

@app.route("/")
def hello_world():
    return "<p>Easby-recommendation-server running</p>"

@app.route('/recommend/<product_id>', methods=['GET'])
def get_recommendations(product_id): 
    recommended_products = recommend_products(product_id)
    return jsonify(recommended_products.to_dict(orient='records'))


if __name__ == '__main__':
    app.run()
