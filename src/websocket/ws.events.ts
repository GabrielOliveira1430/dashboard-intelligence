import type {
  WSMessage
} from '../realtime/ws.types';

// ==========================================
// 📡 EVENT TYPES
// ==========================================

export const WS_EVENTS = {

  FOOTBALL:
    'football',

  ORCHESTRATOR:
    'orchestrator',

  SYSTEM:
    'system',

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