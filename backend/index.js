const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send("DuelZone backend running");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
