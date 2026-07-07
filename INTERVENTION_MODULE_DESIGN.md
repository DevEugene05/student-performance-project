# Rule-Based Intervention Module - System Design

## 1. Overview
The intervention module extends the prediction system by not only identifying at-risk students but also automatically prescribing contextual interventions based on the root causes of risk.

### Current System
- **Input**: Student metrics (level, attendance_rate, assignment_score, midterm_score)
- **Output**: Risk prediction (0-20 scale)
- **Gap**: No actionable recommendations for students at risk

### Proposed Enhancement
- **New Output**: Rule-based interventions tailored to identified risk factors
- **Logic**: Diagnostic rules determine which factors are causing risk, prescribe specific interventions

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         PredictionPage.jsx                            │  │
│  │  - Collects student data                              │  │
│  │  - Calls API /api/predict                             │  │
│  └────────────────────┬────────────────────────────────┘  │
│                       │                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         ResultsPage.jsx (New)                         │  │
│  │  - Displays prediction & risk factors                 │  │
│  │  - Shows intervention recommendations                 │  │
│  │  - Provides detailed action steps                     │  │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Request/Response
┌────────────────────────▼────────────────────────────────────┐
│                    Backend (Python)                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  POST /api/predict                                    │  │
│  │  - ML Model (predict risk score)                      │  │
│  │  - Rule Engine (diagnose root causes)                 │  │
│  │  - Intervention Engine (prescribe solutions)          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Response Structure:                                  │  │
│  │  {                                                    │  │
│  │    "prediction": 6,                    // risk score  │  │
│  │    "risk_level": "At-Risk",             // category   │  │
│  │    "risk_factors": [                    // diagnosed  │  │
│  │      {"factor": "low_attendance", ...}                │  │
│  │    ],                                                 │  │
│  │    "interventions": [                   // prescribed │  │
│  │      {"type": "attendance", ...}                      │  │
│  │    ]                                                  │  │
│  │  }                                                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Rule Engine Design

### 3.1 Risk Factor Diagnostic Rules

Rules identify which factors contribute to risk by analyzing input metrics against thresholds.

| Risk Factor | Condition | Severity |
|---|---|---|
| **Low Attendance** | attendance_rate < 75% | High |
| **Low Assignment Performance** | assignment_score < 60 | High |
| **Low Midterm Performance** | midterm_score < 60 | High |
| **Borderline Attendance** | 75% ≤ attendance_rate < 85% | Medium |
| **Borderline Assignment** | 60 ≤ assignment_score < 75 | Medium |
| **Borderline Midterm** | 60 ≤ midterm_score < 75 | Medium |
| **Combined Weak Performance** | (assignment_score + midterm_score) / 2 < 70 | High |

### 3.2 Intervention Prescription Rules

Based on diagnosed risk factors, the system prescribes specific interventions.

```python
# Pseudo-code for rule engine
class InterventionRuleEngine:
    
    def diagnose_risk_factors(student_data):
        risk_factors = []
        
        if student_data['attendance_rate'] < 75:
            risk_factors.append({
                'factor': 'low_attendance',
                'severity': 'high',
                'current_value': student_data['attendance_rate'],
                'threshold': 75,
                'impact': 'Students with low attendance struggle with course content'
            })
        
        if student_data['assignment_score'] < 60:
            risk_factors.append({
                'factor': 'low_assignment_performance',
                'severity': 'high',
                'current_value': student_data['assignment_score'],
                'threshold': 60,
                'impact': 'Weak assignment performance indicates knowledge gaps'
            })
        
        # ... more rules
        return risk_factors
    
    def prescribe_interventions(risk_factors, student_level):
        interventions = []
        
        for factor in risk_factors:
            if factor['factor'] == 'low_attendance':
                interventions.append({
                    'id': 'attendance_intervention',
                    'type': 'Attendance Support',
                    'priority': factor['severity'],
                    'description': 'Improve class attendance for better learning outcomes',
                    'actions': [
                        'Schedule weekly check-ins with academic advisor',
                        'Set daily attendance reminders (text/email)',
                        'Identify barriers to attendance (schedule, transportation, etc.)',
                        'Connect with tutoring for missed topics'
                    ],
                    'expected_impact': 'Each 10% improvement in attendance correlates with 0.5 GPA point increase',
                    'resources': [
                        {'name': 'Academic Advising Office', 'link': '/resources/advising'},
                        {'name': 'Attendance Policy', 'link': '/docs/attendance'}
                    ]
                })
            
            elif factor['factor'] == 'low_assignment_performance':
                interventions.append({
                    'id': 'assignment_intervention',
                    'type': 'Academic Support',
                    'priority': factor['severity'],
                    'description': 'Improve understanding of course material through targeted support',
                    'actions': [
                        'Attend tutoring sessions (2x per week)',
                        'Form study group with classmates',
                        'Review assignment rubrics with instructor during office hours',
                        'Complete practice problems before assignments',
                        'Seek peer review before submission'
                    ],
                    'expected_impact': 'Targeted tutoring improves assignment scores by 15-20 points',
                    'resources': [
                        {'name': 'Tutoring Center', 'link': '/resources/tutoring'},
                        {'name': 'Study Group Finder', 'link': '/resources/study-groups'}
                    ]
                })
            
            elif factor['factor'] == 'low_midterm_performance':
                interventions.append({
                    'id': 'exam_intervention',
                    'type': 'Exam Preparation',
                    'priority': factor['severity'],
                    'description': 'Develop test-taking skills and course mastery',
                    'actions': [
                        'Attend exam review sessions',
                        'Complete practice exams (timed)',
                        'Focus on high-impact topics (worth most points)',
                        'Develop study schedule 2 weeks before exam',
                        'Review mistakes from assignments and quizzes'
                    ],
                    'expected_impact': 'Structured exam prep improves midterm scores by 10-15 points',
                    'resources': [
                        {'name': 'Exam Prep Guide', 'link': '/resources/exam-prep'},
                        {'name': 'Previous Exams', 'link': '/resources/practice-exams'}
                    ]
                })
        
        # Deduplicate and rank by priority
        return deduplicate_and_rank_interventions(interventions)
```

---

## 4. Data Flow

### 4.1 Request/Response Flow

**Request:**
```json
{
  "level": "Freshman",
  "attendance_rate": 72,
  "assignment_score": 55,
  "midterm_score": 58
}
```

**Response:**
```json
{
  "prediction": 5,
  "risk_level": "At-Risk",
  "risk_factors": [
    {
      "factor": "low_attendance",
      "severity": "high",
      "current_value": 72,
      "threshold": 75,
      "impact": "Students with low attendance struggle with course content"
    },
    {
      "factor": "low_assignment_performance",
      "severity": "high",
      "current_value": 55,
      "threshold": 60,
      "impact": "Weak assignment performance indicates knowledge gaps"
    }
  ],
  "interventions": [
    {
      "id": "attendance_intervention",
      "type": "Attendance Support",
      "priority": "high",
      "description": "Improve class attendance for better learning outcomes",
      "actions": [
        "Schedule weekly check-ins with academic advisor",
        "Set daily attendance reminders",
        "Identify barriers to attendance",
        "Connect with tutoring for missed topics"
      ],
      "expected_impact": "Each 10% improvement in attendance correlates with 0.5 GPA point increase",
      "resources": [
        {"name": "Academic Advising Office", "link": "/resources/advising"}
      ]
    },
    {
      "id": "assignment_intervention",
      "type": "Academic Support",
      "priority": "high",
      "description": "Improve understanding of course material",
      "actions": [
        "Attend tutoring sessions (2x per week)",
        "Form study group with classmates",
        "Review assignment rubrics with instructor"
      ],
      "expected_impact": "Targeted tutoring improves assignment scores by 15-20 points",
      "resources": [
        {"name": "Tutoring Center", "link": "/resources/tutoring"}
      ]
    }
  ],
  "summary": "This student shows risk indicators in attendance and assignment performance. Immediate intervention in these areas could prevent academic struggle."
}
```

---

## 5. Frontend Components

### 5.1 New Components to Create

#### InterventionCard.jsx
```jsx
// Displays individual intervention with actions and resources
<InterventionCard
  intervention={intervention}
  onTrack={handleTrackIntervention}
/>
```

#### RiskFactorList.jsx
```jsx
// Shows diagnosed risk factors with severity indicators
<RiskFactorList factors={riskFactors} />
```

#### InterventionSummary.jsx
```jsx
// High-level overview with CTA (Call To Action)
<InterventionSummary 
  riskLevel={riskLevel}
  interventionCount={interventions.length}
/>
```

#### ResultsPage Enhancement
```jsx
// Modified ResultsPage to display:
// 1. Prediction score and risk classification
// 2. Risk factors identified
// 3. Personalized interventions
// 4. Action items tracker (future feature)
```

---

## 6. Backend Implementation

### 6.1 Python Backend Structure

```
backend/
├── app.py                      # Flask/FastAPI app
├── models/
│   ├── prediction_model.pkl    # ML model (existing)
│   └── ml_predictions.py       # Model inference
├── services/
│   ├── rule_engine.py          # Risk factor diagnosis
│   ├── intervention_engine.py   # Prescription logic
│   └── data_validator.py        # Input validation
├── resources/
│   ├── intervention_rules.json  # Rule definitions
│   └── intervention_catalog.json # Intervention templates
└── routes/
    └── predict.py             # /api/predict endpoint
```

### 6.2 Modified predict() Endpoint

```python
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # 1. Validate input
        student_data = validate_input(request.json)
        
        # 2. Get prediction from ML model
        prediction_score = model.predict(student_data)
        
        # 3. Diagnose risk factors
        risk_factors = rule_engine.diagnose_risk_factors(student_data)
        
        # 4. Prescribe interventions
        interventions = intervention_engine.prescribe_interventions(
            risk_factors, 
            student_data['level']
        )
        
        # 5. Generate summary
        summary = generate_summary(risk_factors, interventions)
        
        return jsonify({
            'prediction': prediction_score,
            'risk_level': classify_risk(prediction_score),
            'risk_factors': risk_factors,
            'interventions': interventions,
            'summary': summary
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400
```

---

## 7. Implementation Phases

### Phase 1: Backend Rule Engine (Week 1-2)
- [ ] Create `rule_engine.py` with risk factor diagnosis logic
- [ ] Create `intervention_engine.py` with prescription rules
- [ ] Define intervention templates in JSON
- [ ] Modify `/api/predict` endpoint to return interventions
- [ ] Write unit tests for rule logic
- [ ] Validate with sample student data

### Phase 2: Frontend Components (Week 2-3)
- [ ] Create `InterventionCard.jsx` component
- [ ] Create `RiskFactorList.jsx` component
- [ ] Create `InterventionSummary.jsx` component
- [ ] Enhance `ResultsPage.jsx` to display interventions
- [ ] Add CSS styling (Tailwind)
- [ ] Add responsive design for mobile

### Phase 3: Integration & Testing (Week 3-4)
- [ ] Connect frontend to updated `/api/predict` endpoint
- [ ] Test end-to-end prediction → diagnosis → prescription flow
- [ ] Handle error cases and edge cases
- [ ] Performance testing with multiple predictions
- [ ] User acceptance testing with stakeholders

### Phase 4: Enhancement Features (Future)
- [ ] Intervention tracking (mark as completed)
- [ ] Progress monitoring (track student improvement)
- [ ] Analytics dashboard (intervention effectiveness)
- [ ] Notification system for students/advisors
- [ ] AI-powered intervention personalization

---

## 8. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Rules-based (not ML) | Interpretable, explainable recommendations; easy to maintain and update |
| Prescribe on backend | Consistent logic across all clients; easier to update rules centrally |
| Multiple interventions | Students often have multiple root causes; address all simultaneously |
| Severity levels | Prioritize high-impact interventions for student action |
| Resource links | Connect recommendations to actual campus resources |
| Expected impact statements | Motivate students with concrete outcomes |

---

## 9. Risk Mitigation

| Risk | Mitigation |
|-----|-----------|
| Rules become stale | Regular review with academic stakeholders; update thresholds based on outcomes data |
| Over-prescription (too many interventions) | Limit to 3-5 top priority interventions; consolidate related ones |
| Student action fatigue | Provide phased action steps; allow tracking and prioritization |
| Fairness concerns | Audit rules for bias; ensure equitable recommendations across student populations |
| Data accuracy | Validate input data; handle edge cases (missing values, outliers) |

---

## 10. Success Metrics

- **Adoption**: % of at-risk students viewing interventions
- **Engagement**: % of students taking recommended actions
- **Effectiveness**: % improvement in attendance/assignment scores for students who follow interventions
- **Usability**: Average rating of intervention clarity (1-5 scale)
- **Time to intervention**: Average hours from risk prediction to student action
