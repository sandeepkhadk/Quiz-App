# Quiz Mania 🎮

**Quiz Mania** is a full-stack web application built to challenge users' knowledge through an interactive and customizable quiz experience. It features a robust Django backend and a modern React frontend.

## 🚀 Features
- **Dual User Roles:** Separate interfaces and permissions for Admins and Players.
- **Admin Dashboard:** Full Content Management System (CMS) to add, preview, and manage quiz questions in real-time.
- **Dynamic Quiz Engine:** Choose your challenge level by selecting the number of questions per session.
- **Real-time Scoring:** Instant feedback with score and accuracy percentage upon completion.
- **RESTful API:** Seamless data communication between the React frontend and Django backend.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Django, Django REST Framework (DRF)
- **Database:** SQLite3

## Setup Instructions

### Backend (Django)

1. **Create and activate virtual environment:**

```bash
python -m venv .venv
# Linux/Mac
source .venv/bin/activate
# Windows
.venv\Scripts\activate
```

2. **Install dependencies:**
   
```bash
pip install -r requirements.txt
```

3. **Make migrations and migrate:**

```bash
python manage.py makemigrations
python manage.py migrate
```
4. **Run the server**
```bash
python manage.py runserver
```

### Frontend (React)

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install dependencies:**
   
```bash
npm install
```

3. **Run the React app:**
```bash
npm run dev 
```
