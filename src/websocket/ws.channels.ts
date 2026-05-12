import {
  wsClient
} from './ws.client';

import {
  WS_EVENTS
} from './ws.events';

// ==========================================
// 📡 CHANNELS
// ==========================================

class WSChannels {

  // ==========================================
  // ⚽ FOOTBALL
  // ==========================================

  football(
    callback: (
      payload: any
    ) => void
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL,
      callback
    );
  }

  // ==========================================
  // 🧠 ORCHESTRATOR
  // ==========================================

  orchestrator(
    callback: (
      payload: any
    ) => void
  ) {

    return wsClient.subscribe(
      WS_EVENTS.ORCHESTRATOR,
      callback
    );
  }

  // ==========================================
  // 🔌 CONNECTED
  // ==========================================

  connected(
    callback: () => void
  ) {

    return wsClient.subscribe(
      'connected',
      callback
    );
  }

  // ==========================================
  // ❌ DISCONNECTED
  // ==========================================

  disconnected(
    callback: () => void
  ) {

    return wsClient.subscribe(
      'disconnected',
      callback
    );
  }
}

export const wsChannels =
  new WSChannels();