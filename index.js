const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// Import Routes
const authRoute = require('./routes/auth');

dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGO_URI,
  {useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log('connected to DB!'));

mongoose.connection.on('error',
err => {
  console.log(`DB connection error: ${err.message}`)
});

// Mddleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);

const port = process.env.PORT || 3001

app.listen(3001, () => console.log(`Server listening on port ${port}`));
