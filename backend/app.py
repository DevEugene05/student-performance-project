import os

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

MODEL_PATH = os.path.join(os.path.dirname(__file__), "academic_model.pkl")

try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    model = None

HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "5000"))

REQUIRED_FIELDS = [
    "admission_grade",
    "previous_qualification_grade",
    "age_at_enrollment",
    "curricular_units_1st_sem_grade",
    "curricular_units_2nd_sem_grade",
    "unemployment_rate",
    "inflation_rate",
    "gdp",
]
LABELS = {0: "Dropout", 1: "Enrolled", 2: "Graduate"}


def _to_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def get_interventions(data):
    if not isinstance(data, dict):
        return []

    if any(key in data for key in ["attendance_rate", "assignment_score", "midterm_score"]):
        attendance = _to_float(data.get("attendance_rate"))
        assignment = _to_float(data.get("assignment_score"))
        midterm = _to_float(data.get("midterm_score"))

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

    admission = _to_float(data.get("admission_grade"))
    previous_grade = _to_float(data.get("previous_qualification_grade"))
    sem1 = _to_float(data.get("curricular_units_1st_sem_grade"))
    sem2 = _to_float(data.get("curricular_units_2nd_sem_grade"))
    age = _to_float(data.get("age_at_enrollment"))
    unemployment = _to_float(data.get("unemployment_rate"))
    inflation = _to_float(data.get("inflation_rate"))
    gdp = _to_float(data.get("gdp"))

    interventions = []
    if admission < 120 or previous_grade < 120 or sem1 < 10 or sem2 < 10:
        interventions.append({
            "title": "Academic support",
            "message": "Provide tutoring and a study plan to strengthen course performance.",
            "priority": "high",
            "reason": "Early academic indicators suggest the student may need additional support.",
        })
    if age > 25 or unemployment > 12 or inflation > 2 or gdp < 1:
        interventions.append({
            "title": "Student support plan",
            "message": "Check for external barriers such as finances, work commitments, or personal circumstances.",
            "priority": "medium",
            "reason": "Contextual indicators suggest the student may need broader support.",
        })
    if not interventions:
        interventions.append({
            "title": "Continue monitoring",
            "message": "Keep monitoring academic progress and encourage continued engagement.",
            "priority": "low",
            "reason": "The student is showing stable indicators at the moment.",
        })
    return interventions


def prepare_features(data):
    if not isinstance(data, dict):
        raise ValueError("Request body must be a JSON object")

    values = {}
    for field in REQUIRED_FIELDS:
        if field in data and data[field] not in (None, ""):
            values[field] = _to_float(data[field])

    missing_fields = [field for field in REQUIRED_FIELDS if field not in values]
    if missing_fields:
        raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

    features = pd.DataFrame([values], columns=REQUIRED_FIELDS)
    features = features.apply(pd.to_numeric, errors="coerce").fillna(0)

    if model is not None and hasattr(model, "feature_names_in_"):
        expected_columns = list(model.feature_names_in_)
        for column in expected_columns:
            if column not in features.columns:
                features[column] = 0
        features = features[expected_columns]

    return features


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(silent=True)
        if payload is None:
            payload = request.form.to_dict(flat=True)
        if not payload:
            return jsonify({"error": "Missing JSON payload"}), 400

        if isinstance(payload, dict):
            payload = {key: (value if value != "" else None) for key, value in payload.items()}

        if model is None:
            raise RuntimeError("The prediction model has not been trained yet")

        features = prepare_features(payload)
        prediction = model.predict(features)[0]
        label = LABELS.get(int(prediction), str(prediction))
        interventions = get_interventions(payload)

        return jsonify({"prediction": label, "label": label, "interventions": interventions})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
