import {
  create
} from 'zustand';

// ==========================================
// 🧠 STORE
// ==========================================

type WSConnectionStore = {

  connected: boolean;

  reconnecting: boolean;

  reconnectAttempts: number;

  latency: number;

  lastHeartbeat: number | null;

  // ==========================================
  // ACTIONS
  // ==========================================

  setConnected: (
    value: boolean
  ) => void;

  setReconnecting: (
    value: boolean
  ) => void;

  setReconnectAttempts: (
    value: number
  ) => void;

  setLatency: (
    value: number
  ) => void;

  updateHeartbeat: () => void;
};

// ==========================================
// 🚀 STORE
// ==========================================

export const useWSConnectionStore =
  create<WSConnectionStore>(
    (set) => ({

      connected: false,

      reconnecting: false,

      reconnectAttempts: 0,

      latency: 0,

      lastHeartbeat: null,

      // ======================================
      // 🔌 CONNECTED
      // ======================================

      setConnected: (
        value
      ) => {

        set({
          connected: value
        });
      },

      // ======================================
      // 🔄 RECONNECTING
      // ======================================

      setReconnecting: (
        value
      ) => {

        set({
          reconnecting: value
        });
      },

      // ======================================
      // 🔥 ATTEMPTS
      // ======================================

      setReconnectAttempts: (
        value
      ) => {

        set({
          reconnectAttempts: value
        });
      },

      // ======================================
      // ⚡ LATENCY
      // ======================================

      setLatency: (
        value
      ) => {

        set({
          latency: value
        });
      },

      // ======================================
      // ❤️ HEARTBEAT
      // ======================================

      updateHeartbeat: () => {

        set({
          lastHeartbeat:
            Date.now()
        });
      }
    })
  );