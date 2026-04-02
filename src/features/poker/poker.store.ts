import { PokerRoom } from './poker.types';

const rooms: Record<string, PokerRoom> = {};

export const PokerStore = {
  createRoom(roomId: string, playerId: string, name: string) {
    const newRoom: PokerRoom = {
      id: roomId,
      hostId: playerId,
      players: [{ id: playerId, name }],
      votes: {},
      revealed: false,
    };

    rooms[roomId] = newRoom;

    return newRoom;
  },

  getRoom(roomId: string) {
    return rooms[roomId];
  },

  addPlayer(roomId: string, playerId: string, name: string, socketId?: string) {
    const room = rooms[roomId];

    if (!room) {
      return;
    }

    const existing = room.players.find((p) => p.id === playerId);
    if (existing) {
      // reconnect case
      existing.socketId = socketId;
      existing.name = name;
    } else {
      room.players.push({
        id: playerId,
        socketId,
        name,
      });
    }

    return room;
  },

  vote(roomId: string, playerId: string, vote: number | '?' | '☕') {
    const room = rooms[roomId];

    if (!room) {
      return;
    }
    room.votes[playerId] = vote;

    const player = room.players.find((p) => p.id === playerId);
    if (player) player.hasVoted = true;

    return room;
  },

  revealVotes(roomId: string) {
    const room = rooms[roomId];

    if (!room) {
      throw new Error('Room not found');
    }

    room.revealed = true;

    return room;
  },

  reset(roomId: string) {
    const room = rooms[roomId];

    if (!room) return;

    room.votes = {};
    room.revealed = false;

    room.players.forEach((p) => (p.hasVoted = false));

    return room;
  },

  removePlayerBySocket(socketId: string) {
    const updatedRooms: PokerRoom[] = [];

    Object.values(rooms).forEach((room) => {
      const initialLength = room.players.length;

      room.players = room.players.filter((p) => p.socketId !== socketId);

      if (room.players.length !== initialLength) {
        updatedRooms.push(room);
      }
    });

    return updatedRooms;
  },
};
