const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const http = require('http');
const setupWebSocket = require('./websocket/websocket'); // Import WebSocket setup function
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');

require('dotenv').config();

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
  console.error('FATAL ERROR: Environment variables are not defined.');
  process.exit(1);
}

const app = express();
const server = http.createServer(app);

app.use(helmet());
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // Important for sending cookies with the request
};

app.use(cors(corsOptions));


const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

app.use('/api/', apiLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply CSRF protection conditionally
if (process.env.NODE_ENV !== 'test') {
  app.use(csrf({ cookie: true }));

  // Route to get CSRF token
  app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
  });

  // Apply CSRF protection to specific routes
  app.use('/api', registerRoutes);
  app.use('/api', taskRoutes);
  app.use('/api', userProfileRoutes);

  // Error handling middleware for CSRF
  app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).send('Invalid CSRF token');
    }
    next(err);
  });
}

// No CSRF protection for login route
app.use('/api', loginRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

// Initialize WebSocket
setupWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app; // Export for testing
