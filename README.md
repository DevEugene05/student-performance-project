# Student Performance Prediction Project

A full-stack application for predicting student performance using machine learning and a modern web interface.

## Project Structure

- **backend/**: Python Flask/FastAPI backend with machine learning model
  - `app.py`: Main backend application
  - `train_model.py`: Model training script
  - `student-mat.csv`: Training dataset

- **frontend/**: React-based dashboard with Vite and Tailwind CSS
  - `student-dashboard/`: Main frontend application

## Features

- Student performance prediction using ML models
- Interactive web dashboard
- RESTful API backend
- Responsive UI with Tailwind CSS

## Tech Stack

### Backend
- Python
- Flask/FastAPI
- Machine Learning libraries

### Frontend
- React
- Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.x
- pip (Python package manager)

### Installation

**Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python app.py
```

**Frontend Setup:**
```bash
cd frontend/student-dashboard
npm install
npm run dev
```

## Contributing

Feel free to fork this repository and submit pull requests for improvements.

## License

MIT License
