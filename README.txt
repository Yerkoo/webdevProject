# EdTech Platform (Online Courses)

A full-fledged platform for publishing, searching, and viewing online courses. The project is implemented using a modern microservices architecture: separate frontend (Angular) and backend (Django).

## Main Features

* **Course Catalog:** A beautiful showcase of all available courses in card form.
* **Advanced Filtering:** Instantly sort courses by category (Programming, Math, Languages, etc.) and a "My Courses" tab.
* **Author Dashboard:** A convenient form for creating a new course with a cover preview and YouTube video integration.
* **Social Features:** * **Reviews** System: Users can leave comments and rate courses (from 1 to 5 stars).
* **Favorites**: Save your favorite courses to your personal Wishlist.
* **Security:** Reliable JWT token authentication, including automatic interception of expired tokens (Auth Interceptor) and redirection to the login page.

## Tech Stack

**Frontend:**
* Angular (Standalone Components, Signals)
* TypeScript
* RxJS (HTTP Client, Observables)
* HTML5 / CSS3 (Responsive Design, Flexbox/Grid)

**Backend:**
* Python 3
* Django & Django REST Framework (DRF)
* Database: SQLite
* Authentication: SimpleJWT

---

## How to Run the Project Locally (Local Setup)

The project is divided into two independent parts. For the platform to work, both servers must be running.

### 1. Launching the Backend (API Server)
Open the first terminal, navigate to the backend folder, and run the following commands:

```bash
# Activating the virtual environment (for Mac/Linux: source venv/bin/activate)
venv\Scripts\activate

# Installing dependencies (if there is a requirements.txt file)
pip install -r requirements.txt

# Creating and updating tables in the database
python manage.py makemigrations
python manage.py migrate

# Starting the server
python manage.py runserver
The backend will be available at: http://127.0.0.1:8000/


### 2. Launching the Frontend (Client Side)

# Installing the Necessary Node.js Packages
npm install

# Launching the Local Angular Server
ng serve