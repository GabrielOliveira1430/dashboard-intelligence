import { create } from 'zustand';

// ==========================================
// 🚨 TYPES
// ==========================================

export type FootballAlertType =
  | 'VALUE_BET'
  | 'PRESSURE_GOAL'
  | 'ODD_ERROR'
  | 'LIVE_OPPORTUNITY'
  | 'MARKET_TRAP';

export type FootballAlert = {
  type: FootballAlertType;
  title: string;
  message: string;
  confidence: number;
  edge?: number;
  timestamp: number;
  match?: {
    homeTeam: string;
    awayTeam: string;
  };
};

// ==========================================
// 🧠 STORE
// ==========================================

type FootballAlertsStore = {

  alerts: FootballAlert[];

  addAlert: (
    alert: FootballAlert
  ) => void;

  clearAlerts: () => void;
};

export const useFootballAlertsStore =
  create<FootballAlertsStore>(
    (set) => ({

      alerts: [],

      addAlert: (alert) =>
        set((state) => ({

          alerts: [
            alert,
            ...state.alerts
          ].slice(0, 50)
        })),

      clearAlerts: () =>
        set({
          alerts: []
        })
    })
  );