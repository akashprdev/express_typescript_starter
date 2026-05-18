import { Server } from 'socket.io';
import { PokerStore } from './poker.store';
import { v4 as uuid } from 'uuid';
export function registerPokerSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('create_room', ({ name = 'Host', playerId }) => {
      console.log('create_room event received:', name);

      const roomId = `room-${uuid()}`;

      const room = PokerStore.createRoom(roomId, playerId, name);

      socket.join(roomId);
      console.log(`Room created:`, room);

      io.to(roomId).emit('room_update', room);
    });

    socket.on('join_room', ({ roomId, playerId, name }) => {
      const room = PokerStore.addPlayer(roomId, playerId, name, socket.id);
      if (!room) {
        socket.emit('error', 'Room not found');

        return;
      }
      socket.join(roomId);
      io.to(roomId).emit('room_update', room);
    });

    socket.on(
      'vote',
      ({
        roomId,
        playerId,
        vote,
      }: {
        roomId: string;
        playerId: string;
        vote: number | '?' | '☕';
      }) => {
        const room = PokerStore.vote(roomId, playerId, vote);
        if (!room) {
          socket.emit('error', 'Room not found');

          return;
        }

        io.to(roomId).emit('room_update', room);
      }
    );

    socket.on('reveal_votes', ({ roomId }) => {
      const room = PokerStore.getRoom(roomId);

      if (!room) return;

      // if (room.hostId !== socket.id) return;

      const updatedRoom = PokerStore.revealVotes(roomId);

      io.to(roomId).emit('room_update', updatedRoom);
    });

    socket.on('reset', ({ roomId }) => {
      const room = PokerStore.getRoom(roomId);

      if (!room) return;

      PokerStore.reset(roomId);

      io.to(roomId).emit('room_update', room);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);

      const updatedRooms = PokerStore.removePlayerBySocket(socket.id);

      updatedRooms.forEach((room) => {
        io.to(room.id).emit('room_update', room);
      });
    });
  });
}
