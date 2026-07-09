import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('app_module', ROOT / 'app.py')
app_module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(app_module)


def test_prepare_features_uses_csv_style_fields():
    payload = {
        'admission_grade': 140.0,
        'previous_qualification_grade': 130.0,
        'age_at_enrollment': 19,
        'curricular_units_1st_sem_grade': 13.4,
        'curricular_units_2nd_sem_grade': 14.2,
        'unemployment_rate': 10.8,
        'inflation_rate': 1.4,
        'gdp': 1.74,
    }

    features = app_module.prepare_features(payload)

    assert list(features.columns) == [
        'admission_grade',
        'previous_qualification_grade',
        'age_at_enrollment',
        'curricular_units_1st_sem_grade',
        'curricular_units_2nd_sem_grade',
        'unemployment_rate',
        'inflation_rate',
        'gdp',
    ]
