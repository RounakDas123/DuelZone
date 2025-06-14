const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const socketHandler = require('./sockets/gameSocket');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
connectDB();

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send("DuelZone backend running");
});

socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
