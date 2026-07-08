import os

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

MODEL_PATH = os.path.join(os.path.dirname(__file__), "academic_model.pkl")
model = joblib.load(MODEL_PATH)

HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "5000"))

REQUIRED_FIELDS = ["level", "attendance_rate", "assignment_score", "midterm_score"]
LABELS = {0: "Safe", 1: "At-Risk"}


def get_interventions(data):
    attendance = float(data.get("attendance_rate", 0))
    assignment = float(data.get("assignment_score", 0))
    midterm = float(data.get("midterm_score", 0))

    interventions = []

    if attendance < 75:
        interventions.append({
            "title": "Attendance support",
            "message": "Schedule a meeting with the student to review attendance barriers and set a weekly attendance goal.",
            "priority": "high",
            "reason": "Attendance is below the recommended threshold.",
        })

    if assignment < 70:
        interventions.append({
            "title": "Assignment recovery plan",
            "message": "Provide a short assignment recovery plan and office-hour support for missed work.",
            "priority": "medium",
            "reason": "Assignment performance is below the expected benchmark.",
        })

    if midterm < 60:
        interventions.append({
            "title": "Academic coaching",
            "message": "Set up a coaching session focused on study habits, pacing, and exam preparation.",
            "priority": "high",
            "reason": "Midterm performance indicates immediate academic support is needed.",
        })

    if not interventions:
        interventions.append({
            "title": "Maintain progress",
            "message": "Keep reinforcing current study habits and monitor progress weekly.",
            "priority": "low",
            "reason": "The student is performing within the expected range.",
        })

    return interventions


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
        if payload is None:
            payload = request.form.to_dict(flat=True)
        if not payload:
            return jsonify({"error": "Missing JSON payload"}), 400

        if isinstance(payload, dict):
            payload = {key: (value if value != '' else None) for key, value in payload.items()}

        features = prepare_features(payload)
        prediction = model.predict(features)[0]
        label = LABELS.get(int(prediction), str(prediction))
        interventions = get_interventions(payload)

        return jsonify({"prediction": label, "interventions": interventions})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
