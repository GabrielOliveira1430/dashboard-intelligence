// src/websocket/ws.types.events.ts

import type {
  FootballResponse
} from '../types/football.types';

// ==========================================
// 📡 WS EVENTS MAP
// ==========================================

export type WSEventsMap = {

  // ==========================================
  // ⚽ FOOTBALL MAIN
  // ==========================================

  football:
    FootballResponse;

  // ==========================================
  // ⚽ FOOTBALL REALTIME
  // ==========================================

  football_snapshot: any;

  football_update: any;

  football_alert: any;

  football_momentum: any;

  football_quantum: any;

  football_neural: any;

  football_timeline: any;

  football_live_event: any;

  football_terminal: any;

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

  connect: void;

  disconnect: void;

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