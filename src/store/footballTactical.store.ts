// src/store/footballTactical.store.ts

import { create } from 'zustand';

import type {
  TacticalSnapshot
} from '../types/football.tactical.types';

// ==========================================
// 🧠 STORE
// ==========================================

type TacticalStore = {

  tactical:
    TacticalSnapshot[];

  setTactical:
    (
      data: TacticalSnapshot[]
    ) => void;

  addTactical:
    (
      data: TacticalSnapshot
    ) => void;

  clear:
    () => void;
};

export const useFootballTacticalStore =
  create<TacticalStore>(
    (set) => ({

      tactical: [],

      setTactical: (
        data
      ) =>

        set({
          tactical:
            Array.isArray(data)
              ? data
              : []
        }),

      addTactical: (
        data
      ) =>

        set((state) => ({

          tactical: [
            data,
            ...state.tactical
          ].slice(0, 30)

        })),

      clear: () =>

        set({
          tactical: []
        })
    })
  );