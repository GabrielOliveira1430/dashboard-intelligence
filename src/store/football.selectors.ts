// src/store/football.selectors.ts

import { useFootballStore }
from './football.store';

// ==========================================
// ⚽ FALLBACKS
// ==========================================

const EMPTY_ARRAY: any[] = [];

// ==========================================
// ⚽ RAW DATA
// ==========================================

export const useFootballData =
  () =>
    useFootballStore(
      (state) => state.data
    );

// ==========================================
// ⚽ CONNECTION
// ==========================================

export const useFootballConnected =
  () =>
    useFootballStore(
      (state) => state.connected
    );

export const useFootballReconnecting =
  () =>
    useFootballStore(
      (state) => state.reconnecting
    );

// ==========================================
// ⚽ LOADING
// ==========================================

export const useFootballLoading =
  () =>
    useFootballStore(
      (state) => state.loading
    );

export const useFootballRefreshing =
  () =>
    useFootballStore(
      (state) => state.refreshing
    );

export const useFootballError =
  () =>
    useFootballStore(
      (state) => state.error
    );

// ==========================================
// ⚽ LAST UPDATE
// ==========================================

export const useFootballLastUpdate =
  () =>
    useFootballStore(
      (state) => state.lastUpdate
    );

// ==========================================
// ⚽ MATCHES
// ==========================================

export const useFootballMatches =
  () =>
    useFootballStore(
      (state) =>
        state.data?.matches ||
        EMPTY_ARRAY
    );

// ==========================================
// ⚽ PREDICTIONS
// ==========================================

export const useFootballPredictions =
  () =>
    useFootballStore(
      (state) =>
        state.data?.predictions ||
        EMPTY_ARRAY
    );

// ==========================================
// ⚽ BEST PREDICTION
// ==========================================

export const useBestPrediction =
  () =>
    useFootballStore(
      (state) =>
        state.data?.bestPrediction ||
        null
    );

// ==========================================
// ⚽ TOP TEAMS
// ==========================================

export const useTopTeams =
  () =>
    useFootballStore(
      (state) =>
        state.data?.topTeams ||
        EMPTY_ARRAY
    );

// ==========================================
// ⚛️ QUANTUM
// ==========================================

export const useQuantum =
  () =>
    useFootballStore(
      (state) =>
        state.data?.quantum ||
        EMPTY_ARRAY
    );

// ==========================================
// ⚽ TACTICAL
// ==========================================

export const useTactical =
  () =>
    useFootballStore(
      (state) =>
        state.data?.tactical ||
        EMPTY_ARRAY
    );

// ==========================================
// 🚨 LIVE EVENTS
// ==========================================

export const useLiveEvents =
  () =>
    useFootballStore(
      (state) =>
        state.data?.liveEvents ||
        EMPTY_ARRAY
    );

// ==========================================
// 💰 VALUE BETS
// ==========================================

export const useValueBets =
  () =>
    useFootballStore(
      (state) =>
        state.data?.valueBets ||
        EMPTY_ARRAY
    );

// ==========================================
// 🧠 AI CORE
// ==========================================

export const useAICore =
  () =>
    useFootballStore(
      (state) =>
        state.data?.aiCore ||
        null
    );