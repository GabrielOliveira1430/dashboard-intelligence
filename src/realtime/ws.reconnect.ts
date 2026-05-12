import {
  WS_CONFIG
} from './ws.constants';

// ==========================================
// 🔄 RECONNECT
// ==========================================

export class WSReconnect {

  private attempts = 0;

  // ==========================================
  // 🔥 RESET
  // ==========================================

  reset() {

    this.attempts = 0;
  }

  // ==========================================
  // ⏳ NEXT DELAY
  // ==========================================

  nextDelay() {

    const delay = Math.min(

      WS_CONFIG.reconnectBaseDelay *

      2 ** this.attempts,

      WS_CONFIG.reconnectMaxDelay
    );

    this.attempts++;

    return delay;
  }

  // ==========================================
  // 🚫 LIMIT
  // ==========================================

  canReconnect() {

    return (
      this.attempts <
      WS_CONFIG.reconnectMaxAttempts
    );
  }
}