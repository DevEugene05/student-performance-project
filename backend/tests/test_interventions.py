import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('app_module', ROOT / 'app.py')
app_module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(app_module)


def test_rule_based_interventions_for_low_attendance():
    result = app_module.get_interventions({'attendance_rate': 55, 'assignment_score': 70, 'midterm_score': 60})
    assert 'attendance' in result[0]['reason'].lower()
    assert result[0]['priority'] == 'high'


def test_rule_based_interventions_for_high_risk():
    result = app_module.get_interventions({'attendance_rate': 40, 'assignment_score': 40, 'midterm_score': 40})
    assert len(result) >= 2
