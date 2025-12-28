# 🩺 Breast_Aware 

**Breast_Aware** is an intelligent web application that helps users predict and analyze breast cancer risk from ultrasound images using deep learning and machine learning models.
This tool aims to assist in early detection and spread awareness by providing accessible, fast, and accurate predictions.

---

## 🚀 Live Demo  

- **Frontend (Vercel):** [Breast_Aware](https://breast-aware.vercel.app/)  
- **Backend (Google Cloud Run):** [Prediction API](https://breast-aware-backend-428663962933.asia-south1.run.app/predict)  

---

## Features

- Upload ultrasound images to predict breast cancer.
- Choose from multiple prediction models:
  - DenseNet121 deep learning model.
  - Support Vector Machine (SVM) model.
- Fast, secure, and easy-to-use interface.
- Results displayed with clear confidence levels.
- Awareness tips and educational resources.

---

## Tech Stack  

- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** Flask (Python 3.12.5)  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Google Cloud Run  

---

## Installation

1 **Clone the repository**

```bash
git clone https://github.com/Purushottam29/Breast_Aware.git
cd Breast_Aware
```

2 **Create a virtual environment** (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Linux/Mac
venv\Scripts\activate     # On Windows
```
3 **Setup Backend**

```bash
python app.py //to run the backend
npm run dev //to start the frontend
```

4 **Setup Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## Usage

* Open the web app.
* Upload an ultrasound image.
* Select the prediction model (DenseNet121 or SVM).
* Click **Predict**.
* View results and suggestions.

---

## Future Improvements

- Improve model accuracy with larger datasets.
- Add user authentication and saved reports.
- Add a PDF report download feature for predictions.

---

## Author

Aabha Shukla
[GitHub](https://github.com/aabha40)
