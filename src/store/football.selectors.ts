// src/store/football.selectors.ts

import { useFootballStore } from './football.store';

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
// ⚽ MATCHES
// ==========================================

export const useFootballMatches =
  () =>
    useFootballStore(
      (state) =>
        state.data?.matches ||
        EMPTY_ARRAY
    );