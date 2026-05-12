import { create } from 'zustand';

import type {
  FootballResponse
} from '../types/football.types';

// ==========================================
// ⚽ STORE
// ==========================================

type FootballStore = {

  // ==========================================
  // DATA
  // ==========================================

  data:
    FootballResponse | null;

  loading: boolean;

  refreshing: boolean;

  connected: boolean;

  reconnecting: boolean;

  error:
    string | null;

  lastUpdate:
    string | null;

  // ==========================================
  // ACTIONS
  // ==========================================

  setFootballData:
    (
      data: FootballResponse
    ) => void;

  setLoading:
    (value: boolean) => void;

  setRefreshing:
    (value: boolean) => void;

  setConnected:
    (value: boolean) => void;

  setReconnecting:
    (value: boolean) => void;

  setError:
    (
      error: string | null
    ) => void;

  clear:
    () => void;
};

// ==========================================
// 🚀 STORE
// ==========================================

export const useFootballStore =
  create<FootballStore>(
    (set) => ({

      // ==========================================
      // INITIAL STATE
      // ==========================================

      data: null,

      loading: true,

      refreshing: false,

      connected: false,

      reconnecting: false,

      error: null,

      lastUpdate: null,

      // ==========================================
      // ⚽ SET DATA
      // ==========================================

      setFootballData: (
        data
      ) =>

        set({

          data,

          error: null,

          loading: false,

          refreshing: false,

          lastUpdate:
            new Date()
              .toLocaleTimeString()
        }),

      // ==========================================
      // ⏳ LOADING
      // ==========================================

      setLoading: (
        value
      ) =>

        set({
          loading: value
        }),

      // ==========================================
      // 🔄 REFRESHING
      // ==========================================

      setRefreshing: (
        value
      ) =>

        set({
          refreshing: value
        }),

      // ==========================================
      // 🔌 CONNECTED
      // ==========================================

      setConnected: (
        value
      ) =>

        set({

          connected: value,

          reconnecting:
            !value
        }),

      // ==========================================
      // 🔄 RECONNECTING
      // ==========================================

      setReconnecting: (
        value
      ) =>

        set({
          reconnecting: value
        }),

      // ==========================================
      // ❌ ERROR
      // ==========================================

      setError: (
        error
      ) =>

        set({

          error,

          loading: false
        }),

      // ==========================================
      // 🧹 CLEAR
      // ==========================================

      clear: () =>

        set({

          data: null,

          loading: false,

          refreshing: false,

          connected: false,

          reconnecting: false,

          error: null,

          lastUpdate: null
        }),
    })
  );