
// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// API route to get flight data
app.get('/api/flights', (req, res) => {
  // You can replace this with real data
  const flights = require('./flights');
  res.json(flights);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const ADMIN_PASSWORD = 'letmein'; // Change this to something stronger

let flights = require('./flights');

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API: Get all flights
app.get('/api/flights', (req, res) => {
  res.json(flights);
});

// API: Add a new flight (protected by password)
app.post('/api/add-flight', (req, res) => {
  const { password, airline, flight, from, to, time, status, type } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).send('Forbidden: Wrong password');
  }

  const newFlight = { airline, flight, from, to, time, status, type };
  flights.push(newFlight);
  res.redirect('/admin.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
