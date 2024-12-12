LivinBoston Project

Overview

LivinBoston is a comprehensive hotel booking system designed to provide users with a seamless experience for searching and booking rooms. It includes features for users, admins, and hotel management, ensuring dynamic and role-based interactions.


Features

User Features

	1.	Search Rooms: Search for available rooms based on keywords, check-in, and check-out dates.
	2.	Book Rooms: Secure room booking functionality integrated with Stripe Payment Gateway.
	3.	View Bookings: Access all past and upcoming bookings.
	4.	Room Availability: Ensure dynamic room availability checks to avoid double bookings.
	5.	Cancel Bookings: Users can cancel confirmed bookings if eligible.

Admin Features

	1.	Hotel and Room Management:
	•	Add, edit, and delete hotels and rooms.
	•	Upload images for rooms.
	2.	Approve/Reject Bookings: Review and manage bookings.
	3.	Reporting Dashboard:
	•	Metrics on total bookings, revenue, and occupancy rates.
	4.	User Management: Manage user roles and access control.

Additional Features

	1.	Stripe Payment Gateway:
	•	Secure payments for room bookings.
	•	Real-time confirmation after payment success.
	2.	Email Notifications:
	•	Notifications sent to users after successful booking or cancellation.
	3.	Role-Based Access Control:
	•	Admins and users access distinct interfaces and APIs.
	4.	Search and Filter:
	•	Search hotels and rooms dynamically by keywords or date ranges.

  Backend Implementation

The backend is built with Node.js, Express.js, and MongoDB, ensuring scalability and performance.

Key Implementations:

	1.	Authentication:
	•	JWT-based authentication for secure user sessions.
	•	Role-based route protection for Admins and Users.
	2.	CRUD APIs:
	•	Manage rooms, hotels, and bookings.
	3.	Payment Integration:
	•	Stripe Checkout API to handle secure payments.
	•	Webhooks to confirm bookings upon payment success.
	4.	Email Notifications:
	•	Notify users via email for booking confirmations and cancellations.

API Endpoints:

Authentication

	•	POST /api/auth/login: User login with email and password. Returns a JWT token.

Admin-Specific APIs

	•	POST /api/rooms/create: Add a new room.
	•	PUT /api/rooms/:id: Update room details.
	•	DELETE /api/rooms/:id: Delete a room.

Common APIs

	•	GET /api/rooms/search: Search for rooms by date or keyword.
	•	POST /api/orders/book: Confirm room booking.
	•	POST /api/orders/stripe-session: Create a Stripe checkout session.
	•	POST /api/orders/cancel: Cancel a booking.

  Frontend Implementation

The frontend is built using React, Material-UI, and React Router to ensure a responsive and intuitive user interface.

Key Features:

	1.	Dynamic Dashboards:
	•	Admin Dashboard: Manage hotels, rooms, and bookings.
	•	User Dashboard: View and manage bookings.
	2.	Stripe Payment Integration:
	•	Users are redirected to Stripe for secure payment.
	3.	Responsive Design:
	•	Adaptive UI for mobile, tablet, and desktop.
	4.	Search and Filter:
	•	Real-time filtering and searching for hotels and rooms.

  How to Run the Project

Prerequisites

	•	Node.js (v14 or later)
	•	MongoDB (running locally or hosted)
	•	NPM or Yarn
	•	Stripe Account (for payment integration)

Backend Setup

1.	Clone the repository:

  `https://github.com/malepatic/LivinBoston.git`

2.	Navigate to the backend directory:

  ` cd LivinBoston/api `

3.	Install dependencies:

    `npm i`

4. 	Set up environment variables:
	•	Create a .env file in the api directory.
	•	Add the following keys: 
    
    <!-- `PORT=5001
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    STRIPE_SECRET_KEY=<Your Stripe Secret Key>
    STRIPE_WEBHOOK_SECRET=<Your Stripe Webhook Secret>
    FRONTEND_URL=http://localhost:3000` -->

	5.	Start the backend server:

    `npm start`

  Frontend Setup

	1.	Navigate to the frontend directory:

  `cd LivinBoston/admin`

  2.	Install dependencies:
    
    `npm install`

  How the Project Works

	1.	User Workflow:
	•	Users search for rooms using check-in and check-out dates.
	•	Rooms are dynamically displayed based on availability.
	•	On booking, users are redirected to the Stripe payment gateway.
	•	After successful payment, users confirm the booking.
	2.	Admin Workflow:
	•	Admins manage hotels and rooms through a dedicated dashboard.
	•	Admins can view and approve/reject user bookings.
	3.	Booking Flow:
	•	Stripe API generates a checkout session.
	•	Upon payment success, the booking is confirmed via webhook.

  Technologies Used

Backend

	•	Node.js: Server runtime.
	•	Express.js: Web framework.
	•	MongoDB: Database.
	•	Multer: File uploads.
	•	Nodemailer: Email notifications.
	•	Stripe: Payment gateway.

Frontend

	•	React: Component-based UI.
	•	Material-UI: Pre-styled components.
	•	React Router: Navigation and routing.

  Future Scope

	•	Enhanced Reporting:
	•	Advanced metrics for admin insights.
	•	Filter Improvements:
	•	Multi-criteria filtering (e.g., price range, amenities).
	•	Localization:
	•	Multi-language support for global users.


  Contributera

 `M Jayant `
 `M Chaitanya`
 `T charan Reddy`
 `A Venkata Nikhil`
 `P Suketh`

	


