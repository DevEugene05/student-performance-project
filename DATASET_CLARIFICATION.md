# Dataset Clarification

There are two different datasets being mixed in this project and they should not be treated as the same one.

## 1) Academic risk prediction dataset
This is the dataset currently used by the prediction backend and frontend.
- Target labels: Safe / At-Risk
- Input features used by the implementation: level, attendance_rate, assignment_score, midterm_score
- This is the logic reflected in [backend/train_model.py](backend/train_model.py) and [backend/app.py](backend/app.py)

## 2) Student dropout / graduation dataset
This is the dataset stored in [backend/data.csv](backend/data.csv).
- Target labels: Dropout, Enrolled, Graduate
- Features include admission grade, previous qualification grade, semester grades, age at enrollment, and macroeconomic indicators such as unemployment rate, inflation rate, and GDP
- This dataset is a different problem setting from the Safe/At-Risk classifier.

## Recommendation
The report or documentation should clearly choose one of these two datasets and keep the terminology consistent.

- If the project goal is academic risk prediction, use the Safe / At-Risk dataset and describe it consistently.
- If the project goal is student progression analysis, use the Dropout / Enrolled / Graduate dataset and update the model, UI, and documentation accordingly.

At the moment, the implementation and the documentation are effectively describing two different projects.
