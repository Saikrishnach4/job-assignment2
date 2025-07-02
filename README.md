# job-assignment2
# 🧑‍💻 Firebase + Next.js CRUD Dashboard (TypeScript + Docker)

This project is a full-stack CRUD application built with **Next.js**, **Firebase Functions (Express.js)**, and **Firestore**. It allows users to **Create**, **Read**, **Update**, and **Delete** user records via a neat UI.

The frontend is built using **TypeScript**, styled with **Tailwind CSS**, and served using **NGINX inside a Docker container**. The backend is deployed using **Firebase Cloud Functions** with Express and Firestore.

---

## 🚀 Features

- ✅ Add, View, Update, and Delete users
- ✅ Validated input fields (email and name)
- ✅ Firebase Firestore as database
- ✅ Hosted backend using Firebase Functions
- ✅ Dockerized frontend using NGINX
- ✅ Full TypeScript support

---

## 🧱 Tech Stack

| Layer        | Tech Used                              |
|--------------|------------------------------------------|
| Frontend     | Next.js, Tailwind CSS, TypeScript        |
| Backend      | Express.js in Firebase Cloud Functions   |
| Database     | Firebase Firestore                       |
| Container    | Docker + NGINX (for static frontend)     |

---

## 📂 Folder Structure

job-assignment2/
├── frontend/ → Next.js frontend with TypeScript
│ └── Dockerfile → NGINX config to serve exported site
├── server/ → Firebase backend using Express + Firestore
│ └── functions/ → Cloud functions code


### ⚙️ Prerequisites

> ✅ Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your system.

---

## 🔧 Getting Started

### 1️⃣ Clone the Repo

git clone [https://github.com/Saikrishnach4/job-assignment2.git](https://github.com/Saikrishnach4/job-assignment2.git)
cd job-assignment2

### 2️⃣ Install Frontend Dependencies

cd frontend
npm install
npm run build
npm run export

### 3️⃣ Run Frontend in Docker

docker build -t assignment-frontend .
docker run -p 3000:80 assignment-frontend

👉 Visit: http://localhost:3000

🔌 Backend Setup (Firebase Functions)

1️⃣ Navigate to server directory

cd server
firebase login
firebase init functions

2️⃣ Deploy Cloud Functions

firebase deploy --only functions

API Base URL will be like: https://us-central1-your-project-id.cloudfunctions.net/api

📬 API Endpoints
Method	  Endpoint	      Description
POST	    /addUser	      Add new user
GET	      /getUsers	      Fetch all users
PUT	      /updateUser	    Update user by ID
DELETE	  /deleteUser	    Delete user by ID

✅ Sample Payloads

// POST /addUser
{
  "name": "John Doe",
  "email": "john@example.com"
}

// PUT /updateUser
{
  "id": "FIRESTORE_ID_HERE",
  "name": "John Smith",
  "email": "johnsmith@example.com"
}

// DELETE /deleteUser
{
  "id": "FIRESTORE_ID_HERE"
}

🧪 Validation
Name and Email are required
Email must be in valid format (validated on frontend)

🧑‍🎓 Author

Sai Krishna
GitHub: [https://github.com/Saikrishnach4](https://github.com/Saikrishnach4/job-assignment2)

License:
This project is for educational and demonstration purposes only.




