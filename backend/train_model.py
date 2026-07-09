from pathlib import Path
import sys

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

FEATURE_COLUMNS = [
    "admission_grade",
    "previous_qualification_grade",
    "age_at_enrollment",
    "curricular_units_1st_sem_grade",
    "curricular_units_2nd_sem_grade",
    "unemployment_rate",
    "inflation_rate",
    "gdp",
]
TARGET_COLUMN = "target"
LABEL_MAP = {"dropout": 0, "enrolled": 1, "graduate": 2}


def normalize_column_name(column_name: str) -> str:
    cleaned = "".join(ch if ch.isalnum() else "_" for ch in str(column_name).strip().lower())
    while "__" in cleaned:
        cleaned = cleaned.replace("__", "_")
    return cleaned.strip("_")


def load_and_prepare_data(csv_path: str):
    df = pd.read_csv(csv_path, sep=";")
    df.columns = [normalize_column_name(column) for column in df.columns]

    missing_columns = [column for column in FEATURE_COLUMNS if column not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing required columns: {missing_columns}")

    prepared_df = df[FEATURE_COLUMNS + [TARGET_COLUMN]].copy()
    prepared_df = prepared_df.dropna()
    prepared_df[TARGET_COLUMN] = prepared_df[TARGET_COLUMN].astype(str).str.strip().str.lower()

    y = prepared_df[TARGET_COLUMN].map(LABEL_MAP)
    if y.isna().any():
        raise ValueError("target must contain only 'Dropout', 'Enrolled', or 'Graduate' values")

    X = prepared_df[FEATURE_COLUMNS].apply(pd.to_numeric, errors="coerce").fillna(0)
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

    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    print(classification_report(y_test, predictions, target_names=["Dropout", "Enrolled", "Graduate"], zero_division=0))

    output_path = Path(__file__).resolve().parent / "academic_model.pkl"
    joblib.dump(model, output_path)
    print(f"Best model saved to {output_path}")


if __name__ == "__main__":
    main()
