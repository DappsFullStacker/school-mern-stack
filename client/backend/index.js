const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(express.json()); 
app.use(cors()); 


app.use('/api/auth', require('./routes/auth'));
app.use('/api/management', require('./routes/management'));
app.use('/api/scoreboard', require('./routes/scoreboard'));


console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});


const PORT = process.env.PORT;

console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});