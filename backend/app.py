from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "student_model.pkl")
model = joblib.load(MODEL_PATH)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing JSON payload"}), 400

    try:
        df = pd.DataFrame([data])
        prediction = model.predict(df)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
