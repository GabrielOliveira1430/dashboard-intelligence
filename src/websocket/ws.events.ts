// src/websocket/ws.events.ts

import type {
  WSMessage
} from '../realtime/ws.types';

// ==========================================
// 📡 EVENT TYPES
// ==========================================

export const WS_EVENTS = {

  // ==========================================
  // ⚽ FOOTBALL
  // ==========================================

  FOOTBALL:
    'football',

  FOOTBALL_SNAPSHOT:
    'football_snapshot',

  FOOTBALL_UPDATE:
    'football_update',

  FOOTBALL_ALERT:
    'football_alert',

  FOOTBALL_VALUEBET:
    'football_valuebet',

  FOOTBALL_MOMENTUM:
    'football_momentum',

  FOOTBALL_QUANTUM:
    'football_quantum',

  FOOTBALL_NEURAL:
    'football_neural',

  FOOTBALL_TIMELINE:
    'football_timeline',

  FOOTBALL_LIVE_EVENT:
    'football_live_event',

  FOOTBALL_TERMINAL:
    'football_terminal',

  // ==========================================
  // 🧠 ORCHESTRATOR
  // ==========================================

  ORCHESTRATOR:
    'orchestrator',

  // ==========================================
  // ⚙️ SYSTEM
  // ==========================================

  SYSTEM:
    'system',

  // ==========================================
  // 🔌 CONNECTION
  // ==========================================

  CONNECT:
    'connect',

  DISCONNECT:
    'disconnect',

  CONNECTED:
    'connected',

  DISCONNECTED:
    'disconnected',

  // ==========================================
  // ❤️ HEARTBEAT
  // ==========================================

  PING:
    'ping',

  PONG:
    'pong'

} as const;

// ==========================================
// 📡 HELPERS
// ==========================================

export function isWSMessage(
  value: any
): value is WSMessage {

  return (

    value &&

    typeof value === 'object' &&

    typeof value.type === 'string'

  );
}