# Home_Cleaning_Serviceses
Provide the cleaning service with special offers
🧹 Home Cleaning Service Web Application
A full-stack web application to manage home cleaning service bookings. Built using React.js (Frontend) and Spring Boot (Backend) with RESTful APIs and Oracle/MySQL database. Users can register, log in, book services, assign staff, and view booking reports.

🚀 Features
🔐 Authentication
User registration and login

Role-based access: Admin / User

👤 User Panel
Browse and select cleaning services

Book services with preferred date & time

Auto-fill name, address, and phone from user data

See service charges before booking

🛠️ Admin Panel
View all bookings

Assign staff to a booking

Monitor booking reports

Staff dropdown auto-fetch from DB

Booking status updates with ✅ tick mark

👷 Staff Management
Add/remove staff with specialization & phone

Assign staff to bookings from dropdown

Tick mark persists after refresh using localStorage

🧰 Tech Stack
Layer	Technology
Frontend	React.js, Axios, SweetAlert2
Backend	Spring Boot, Spring Data JPA
Database	MySQL / Oracle
Styling	CSS
Build Tools	Maven, npm

📂 Project Structure
Backend – Spring Boot
less
Copy
Edit
com.homecleaning
│
├── controller        // REST Controllers
├── entity            // JPA Entities (User, Booking, ServiceType, Staff)
├── repository        // Spring Data JPA Repos
├── service           // Service Layer (business logic)
└── HomeCleaningApplication.java
Frontend – React.js
css
Copy
Edit
src/
├── components/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── BookService.js
│   ├── AssignStaff.js
│   └── BookingReports.js
├── App.js
└── index.js
🧪 Validations
Date validation prevents booking for past dates

Phone number must be 10 digits and start from 6–9

Form validations using JavaScript and SweetAlert2

📦 How to Run
1. Backend (Spring Boot)
bash
Copy
Edit
cd backend
mvn clean install
mvn spring-boot:run
2. Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm start
Make sure the backend is running at http://localhost:8080.

📸 Screenshots
✅ Booking Form

✅ Staff Assignment with Tick Mark

✅ Booking Reports with Filter

✅ SweetAlert2 Popups

(Add screenshots in /assets folder and embed here)

🧑‍💻 Author
Pratik Rathod
📧 Email: your-email@example.com
🌐 Portfolio: [your-portfolio-link]
