import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Create synthetic student data
np.random.seed(42)
n_samples = 1000

data = {
    'age': np.random.randint(15, 22, n_samples),
    'studytime': np.random.randint(1, 5, n_samples),  # 1-4 hours
    'failures': np.random.randint(0, 4, n_samples),   # 0-3 failures
    'absences': np.random.randint(0, 20, n_samples),  # 0-19 absences
    'G1': np.random.randint(0, 21, n_samples),        # first period grade
    'G2': np.random.randint(0, 21, n_samples),        # second period grade
}

df = pd.DataFrame(data)

# Create target: final grade G3 based on features
# Simple logic: higher study time, lower failures/absences, higher G1/G2 -> higher G3
df['G3'] = (
    df['G1'] * 0.3 +
    df['G2'] * 0.4 +
    (5 - df['studytime']) * -2 +
    df['failures'] * -3 +
    df['absences'] * -0.5 +
    np.random.normal(0, 2, n_samples)
).clip(0, 20).astype(int)

# Save dataset
df.to_csv('student-mat.csv', index=False)

# Prepare features and target
features = ['age', 'studytime', 'failures', 'absences', 'G1', 'G2']
X = df[features]
y = (df['G3'] >= 10).astype(int)  # Binary: pass (1) or fail (0)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy:.2f}")

# Save model
joblib.dump(model, 'student_model.pkl')
print("Model saved to student_model.pkl")