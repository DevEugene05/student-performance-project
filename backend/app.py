import os

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "academic_model.pkl")
model = joblib.load(MODEL_PATH)

REQUIRED_FIELDS = ["level", "attendance_rate", "assignment_score", "midterm_score"]
LABELS = {0: "Safe", 1: "At-Risk"}


def prepare_features(data):
    if not isinstance(data, dict):
        raise ValueError("Request body must be a JSON object")

    missing_fields = [field for field in REQUIRED_FIELDS if field not in data]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    features = pd.DataFrame(
        [
            {
                "level": str(data["level"]).strip().title(),
                "attendance_rate": float(data["attendance_rate"]),
                "assignment_score": float(data["assignment_score"]),
                "midterm_score": float(data["midterm_score"]),
            }
        ]
    )

    encoded = pd.get_dummies(features, columns=["level"], drop_first=False)

    if hasattr(model, "feature_names_in_"):
        expected_columns = list(model.feature_names_in_)
        for column in expected_columns:
            if column not in encoded.columns:
                encoded[column] = 0
        encoded = encoded[expected_columns]

    return encoded


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(silent=True)
        if not payload:
            return jsonify({"error": "Missing JSON payload"}), 400

        features = prepare_features(payload)
        prediction = model.predict(features)[0]
        label = LABELS.get(int(prediction), str(prediction))

        return jsonify({"prediction": label})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


if __name__ == "__main__":
    app.run(port=5000, debug=True)
