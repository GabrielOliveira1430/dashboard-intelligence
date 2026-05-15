// src/store/footballRealtime.store.ts

import { create } from 'zustand';

// ==========================================
// 🧠 TYPES
// ==========================================

type FootballRealtimeStore = {

  snapshot: Record<string, any> | null;

  alerts: Record<string, any>[];

  timeline: Record<string, any>[];

  liveEvents: Record<string, any>[];

  terminalLogs: string[];

  neuralActivity: Record<string, any>[];

  quantumPredictions: Record<string, any>[];

  connected: boolean;

  setSnapshot:
    (data: Record<string, any>) => void;

  addAlert:
    (data: Record<string, any>) => void;

  addTimeline:
    (data: Record<string, any>) => void;

  addEvent:
    (data: Record<string, any>) => void;

  addTerminalLog:
    (data: string) => void;

  addNeural:
    (data: Record<string, any>) => void;

  addQuantum:
    (data: Record<string, any>) => void;

  setConnected:
    (value: boolean) => void;
};

// ==========================================
// 🧠 STORE
// ==========================================

export const useFootballRealtimeStore =
  create<FootballRealtimeStore>(
    (set) => ({

      // ==========================================
      // 📦 STATE
      // ==========================================

      snapshot: null,

      alerts: [],

      timeline: [],

      liveEvents: [],

      terminalLogs: [],

      neuralActivity: [],

      quantumPredictions: [],

      connected: false,

      // ==========================================
      // 📸 SNAPSHOT
      // ==========================================

      setSnapshot: (data) => {

        set({
          snapshot: data
        });
      },

      // ==========================================
      // 🚨 ALERTS
      // ==========================================

      addAlert: (data) => {

        set((state) => ({

          alerts: [
            data,
            ...state.alerts
          ].slice(0, 50)

        }));
      },

      // ==========================================
      // 🕒 TIMELINE
      // ==========================================

      addTimeline: (data) => {

        set((state) => ({

          timeline: [
            data,
            ...state.timeline
          ].slice(0, 100)

        }));
      },

      // ==========================================
      // 🔥 LIVE EVENTS
      // ==========================================

      addEvent: (data) => {

        set((state) => ({

          liveEvents: [
            data,
            ...state.liveEvents
          ].slice(0, 100)

        }));
      },

      // ==========================================
      // 💻 TERMINAL
      // ==========================================

      addTerminalLog: (data) => {

        set((state) => ({

          terminalLogs: [
            data,
            ...state.terminalLogs
          ].slice(0, 200)

        }));
      },

      // ==========================================
      // 🧠 NEURAL
      // ==========================================

      addNeural: (data) => {

        set((state) => ({

          neuralActivity: [
            data,
            ...state.neuralActivity
          ].slice(0, 50)

        }));
      },

      // ==========================================
      // ⚛️ QUANTUM
      // ==========================================

      addQuantum: (data) => {

        set((state) => ({

          quantumPredictions: [
            data,
            ...state.quantumPredictions
          ].slice(0, 50)

        }));
      },

      // ==========================================
      // 🔌 CONNECTION
      // ==========================================

      setConnected: (value) => {

        set({
          connected: value
        });
      }

    })
  );