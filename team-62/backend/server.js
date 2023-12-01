const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
///web sockets implementation
const taskController = require('./controllers/taskController'); // Import task controller
const http = require('http')
const socketIo = require('socket.io')
/// end web socket implementation

require('dotenv').config();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1); // Exit the application if JWT_SECRET is not set
}

const app = express();
// web socket implementation
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
// Pass the io instance to the task controller
taskController.setIo(io);
/// end web socket implementation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Use router for the api/users endpoint
app.use('/api/users', userRoutes);

//websocket implementation
io.on('connection', (socket) => {
  console.log('New Client connected', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
  // additional socket event listeners can be added here
})
//end websocket implementation

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});