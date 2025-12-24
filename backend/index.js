const express = require('express');
const { PORT } = require('./config/env');
const meetingRoutes = require('./routes/meetingRoutes');
const webhookRoutes = require('./routes/webhookRoutes'); // Add this line
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - Allow frontend to access API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express App!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', meetingRoutes);

app.use('/webhook', webhookRoutes); 




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

