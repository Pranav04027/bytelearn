🎬 VidTube (Backend Only)

VidTube is a YouTube-inspired video-sharing backend API built using Node.js, Express, MongoDB, and Cloudinary for media storage.
This is a learning project focused on building a robust backend for a video-sharing platform.

🚀 Features
User registration and login with JWT-based authentication
Secure access and refresh token system
Video and thumbnail uploads via Cloudinary
Video management (publish, unpublish, update, delete)
Video view tracking
Like and comment on videos
Playlist creation, management, and video addition/removal
User subscriptions to channels
MongoDB aggregation pipelines and pagination
Middleware for authentication, error handling, and file uploads

📚 What I Learned
Setting up an Express server with MVC architecture
Modeling relationships in MongoDB using Mongoose
Handling file uploads with Multer and Cloudinary
Building secure REST APIs with JWT authentication
Implementing MongoDB aggregation pipelines and pagination
Creating middleware for authentication and input validation
Managing scalable CRUD operations and media storage

📌 Important Note
I followed a tutorial only up to the User controller and route setup. 
Everything else — including video handling, playlists, likes, comments, subscriptions, and Cloudinary integration — was designed and implemented by me to deepen my understanding of backend development.

🛠 Tech Stack
Node.js / Express.js
MongoDB with Mongoose
Cloudinary for media storage
Multer for file uploads
JWT for authentication
dotenv, cors, helmet, morgan for server utilities

📁 Project Structure
vidtube/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
├── public/temp/  # Temporary storage for uploaded files
├── .env.sample   # Environment variable template
├── .gitignore
├── package.json

⚙️ Getting Started
Clone the Repository
git clone https://github.com/Pranav04027/vidtube.git
cd vidtube
Install Dependencies
npm install
Set Up Environment Variables
Copy .env.sample to create a .env file, add your values for .env file
Run the Server
npm run dev

🧪 API Endpoints
Key endpoints include:

POST /api/users/register - Register a new user
POST /api/users/login - User login
POST /api/videos - Upload a video
PATCH /api/videos/:videoId - Update video details
DELETE /api/videos/:videoId - Delete a video
GET /api/videos/:videoId - Get video details
POST /api/playlists - Create a playlist
PATCH /api/playlists/:playlistId - Update a playlist
POST /api/playlists/:playlistId/:videoId - Add video to playlist
DELETE /api/playlists/:playlistId/:videoId - Remove video from playlist

Full API documentation from Postman:
https://documenter.getpostman.com/view/45456961/2sB2xBEqF1

🧑‍🎓 Author
Pranav Chauhan
A learning project built to master backend development.
📧 chauhanpranav040@gmail.com.com
🐙 GitHub: Pranav04027

📝 License
This project is licensed under the MIT License. Feel free to use and modify for learning purposes.
Want to contribute or have suggestions? Open an issue or PR on GitHub!
