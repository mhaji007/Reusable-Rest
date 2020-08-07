const express = require('express');
const app = express();

// Import Routes
const authRoute = require('./routes/auth')

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(3001, () => console.log('Server listening on port 3001'));
