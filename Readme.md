

# Pixel Plank 

## Overview

Pixel Plank is a collaborative whiteboard application designed for real-time drawing with multiple users. It enables users to share a virtual canvas where they can draw, collaborate, and communicate seamlessly in real-time. Whether you're brainstorming ideas, teaching a class, or working on a project with colleagues, Pixel Plank provides a platform for creative collaboration.

## Key Features and Functionalities

1. **Real-Time Drawing**: Users can draw on the shared canvas in real-time, seeing updates from other users instantly.
2. **User Presence**: Users can view the list of members present in the same room in real-time, enabling better collaboration awareness.
3. **Anonymous Mode**: Guests can join the room anonymously to observe ongoing activities, but logging in is required to access all functionalities.
4. **Authentication**: Supports user authentication with JWT (JSON Web Tokens), providing secure access to the application.
5. **User Management**: Includes features for user registration, login, and real-time validation for seamless user experience.


## UI 
### Login Page:
<img width="1440" alt="Screenshot 2024-02-24 at 1 46 52 AM" src="https://github.com/cherish2003/PixelPlank/assets/88829894/0b8395c7-2aea-48b1-9164-084b2dc7c3ec">

### Signup Page:
<img width="1440" alt="Screenshot 2024-02-24 at 1 47 06 AM" src="https://github.com/cherish2003/PixelPlank/assets/88829894/31801305-f3e2-4fe6-af48-9687436ac900">

### WhiteBoard Page:
<img width="1440" alt="Screenshot 2024-02-24 at 1 47 57 AM" src="https://github.com/cherish2003/PixelPlank/assets/88829894/210c7dda-bbe3-44be-80da-8fe524ceb145">

## Tech Stack

- **Frontend**:
  - React
  - Tailwind CSS
  - SCSS

- **Backend**:
  - Express

- **Database**:
  - MongoDB

- **Cloud Storage**:
  - Cloudinary

- **Websockets**:
  - Socket.io

- **Authentication**:
  - JWT (JSON Web Tokens)

## Installation and Usage

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible remotely
- Cloudinary account for cloud storage

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd pixel-plank
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../Server
   npm install
   ```

### Configuration

1. Set up environment variables:

   Create a `.env` file in the `backend` directory and add the following variables:

   ```
   PORT=5000
   MONGODB_URI=<mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<cloudinary-api-key>
   CLOUDINARY_API_SECRET=<cloudinary-api-secret>
   JWT_SECRET=<jwt-secret>
   ```

2. Update the values with your MongoDB URI, Cloudinary credentials, and JWT secret.

### Running the Application

1. Start the backend server:

   ```bash
   # From the backend directory
   npm start dev
   ```

2. Start the frontend development server:

   ```bash
   # From the frontend directory
   npm start dev
   ```

3. Access the application in your web browser at `http://localhost:5173`.

