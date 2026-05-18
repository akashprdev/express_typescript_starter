import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

import app from '@/index';
import { registerPokerSocket } from './features/pocker/poker.events';

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

registerPokerSocket(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
