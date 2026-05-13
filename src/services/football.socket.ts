// src/services/football.socket.ts

import { wsClient }
from '../websocket/ws.client';

import {
  WS_EVENTS
} from '../websocket/ws.events';

import {
  useFootballTacticalStore
} from '../store/footballTactical.store';

import {
  useFootballQuantumStore
} from '../store/footballQuantum.store';

// ==========================================
// 🧠 TYPES
// ==========================================

type Callback<T = any> = (
  data: T
) => void;

// ==========================================
// ⚽ SOCKET
// ==========================================

class FootballSocket {

  // ==========================================
  // 🚀 CONNECT
  // ==========================================

  connect() {

    wsClient.connect();
  }

  // ==========================================
  // 🟢 CONNECTED
  // ==========================================

  onConnected(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.CONNECT,
      callback
    );
  }

  // ==========================================
  // 🔴 DISCONNECTED
  // ==========================================

  onDisconnected(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.DISCONNECT,
      callback
    );
  }

  // ==========================================
  // ⚽ UPDATE
  // ==========================================

  onUpdate(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_UPDATE,
      callback
    );
  }

  // ==========================================
  // 📸 SNAPSHOT
  // ==========================================

  onSnapshot(
    callback: Callback
  ) {

    return wsClient.subscribe(

      WS_EVENTS.FOOTBALL_SNAPSHOT,

      (data: any) => {

        // ======================================
        // 🛰️ TACTICAL STORE
        // ======================================

        useFootballTacticalStore
          .getState()
          .setTactical(
            data?.tactical || []
          );

        // ======================================
        // ⚛️ QUANTUM STORE
        // ======================================

        useFootballQuantumStore
          .getState()
          .setQuantum(
            data?.quantum || []
          );

        // ======================================
        // 🚀 CALLBACK
        // ======================================

        callback(data);
      }
    );
  }

  // ==========================================
  // 🚨 ALERT
  // ==========================================

  onAlert(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_ALERT,
      callback
    );
  }

  // ==========================================
  // 🧠 MOMENTUM
  // ==========================================

  onMomentum(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_MOMENTUM,
      callback
    );
  }

  // ==========================================
  // ⚛️ QUANTUM
  // ==========================================

  onQuantum(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_QUANTUM,
      callback
    );
  }

  // ==========================================
  // 🧠 NEURAL
  // ==========================================

  onNeural(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_NEURAL,
      callback
    );
  }

  // ==========================================
  // 🕒 TIMELINE
  // ==========================================

  onTimeline(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_TIMELINE,
      callback
    );
  }

  // ==========================================
  // 🔥 LIVE EVENTS
  // ==========================================

  onLiveEvent(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_LIVE_EVENT,
      callback
    );
  }

  // ==========================================
  // 💻 TERMINAL
  // ==========================================

  onTerminal(
    callback: Callback
  ) {

    return wsClient.subscribe(
      WS_EVENTS.FOOTBALL_TERMINAL,
      callback
    );
  }
}

export const footballSocket =
  new FootballSocket();