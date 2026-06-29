from pathlib import Path
import sys

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

REQUIRED_COLUMNS = [
    "student_id",
    "fullname",
    "level",
    "course_code",
    "attendance_rate",
    "assignment_score",
    "midterm_score",
    "prediction_status",
]
TARGET_COLUMN = "prediction_status"


def load_and_prepare_data(csv_path: str):
    df = pd.read_csv(csv_path)
    missing_columns = [column for column in REQUIRED_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing required columns: {missing_columns}")

    df = df[REQUIRED_COLUMNS].copy()

    feature_columns = [
        column
        for column in df.columns
        if column not in {"student_id", "fullname", "course_code", TARGET_COLUMN}
    ]
    X = df[feature_columns].copy()
    X = pd.get_dummies(X, columns=["level"], drop_first=False)
    X = X.apply(pd.to_numeric, errors="coerce").fillna(0)

    y = (
        df[TARGET_COLUMN]
        .astype(str)
        .str.strip()
        .str.lower()
        .map({"safe": 0, "at-risk": 1, "at risk": 1})
    )
    if y.isna().any():
        raise ValueError("prediction_status must contain only 'Safe' or 'At-Risk' values")

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )
    return X_train, X_test, y_train, y_test


def main():
    csv_path = sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent / "data.csv"
    X_train, X_test, y_train, y_test = load_and_prepare_data(str(csv_path))

    models = {
        "Random Forest": RandomForestClassifier(n_estimators=200, random_state=42),
        "SVM": Pipeline(
            [
                ("scaler", StandardScaler()),
                ("svc", SVC(kernel="rbf", random_state=42)),
            ]
        ),
    }

    results = []
    for name, model in models.items():
        model.fit(X_train, y_train)
        predictions = model.predict(X_test)
        print(f"\n{name} classification report")
        print(classification_report(y_test, predictions, target_names=["Safe", "At-Risk"], zero_division=0))
        results.append((name, model, (predictions == y_test).mean()))

    best_name, best_model, _ = max(results, key=lambda item: item[2])
    output_path = Path(__file__).resolve().parent / "academic_model.pkl"
    joblib.dump(best_model, output_path)
    print(f"Best model saved to {output_path}")


if __name__ == "__main__":
    main()
