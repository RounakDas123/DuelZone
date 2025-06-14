const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('createRoom', ({ username }) => {
      const roomId = `room-${socket.id}`;
      socket.join(roomId);
      socket.emit('roomCreated', { roomId, username });
      console.log(`${username} created room: ${roomId}`);
    });

    socket.on('joinRoom', ({ roomId, username }) => {
      const room = io.sockets.adapter.rooms.get(roomId);
      if (!room) {
        socket.emit('error', 'Room does not exist');
        return;
      }

      socket.join(roomId);
      socket.emit('roomJoined', { roomId, username });
      socket.to(roomId).emit('opponentJoined', { username });
      console.log(`${username} joined room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
