export type VoteValue = number | '?' | '☕';

export interface Player {
  id: string;
  name: string;
  socketId?: string;
  hasVoted?: boolean;
}

export interface PokerRoom {
  id: string;
  hostId: string;
  players: Player[];
  votes: Record<string, VoteValue>;
  revealed: boolean;
}
