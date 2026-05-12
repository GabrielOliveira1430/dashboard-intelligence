import type {
  FootballResponse
} from '../types/football.types';

// ==========================================
// 📡 WS EVENTS MAP
// ==========================================

export type WSEventsMap = {

  // ==========================================
  // ⚽ FOOTBALL
  // ==========================================

  football:
    FootballResponse;

  // ==========================================
  // 🧠 ORCHESTRATOR
  // ==========================================

  orchestrator: {

    strategy: string;

    score: number;

    confidence: number;
  };

  // ==========================================
  // 🔌 CONNECTION
  // ==========================================

  connected: void;

  disconnected: void;

  // ==========================================
  // ❤️ HEARTBEAT
  // ==========================================

  ping: {

    timestamp: number;
  };

  pong: void;

  // ==========================================
  // ⚙️ SYSTEM
  // ==========================================

  system: {

    status: string;

    userId?: number;
  };
};