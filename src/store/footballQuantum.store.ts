// src/store/footballQuantum.store.ts

import { create } from 'zustand';

import type {
  QuantumSimulation
} from '../types/football.quantum.types';

// ==========================================
// ⚛️ STORE
// ==========================================

type QuantumStore = {

  quantum:
    QuantumSimulation[];

  setQuantum:
    (
      data: QuantumSimulation[]
    ) => void;

  addQuantum:
    (
      simulation: QuantumSimulation
    ) => void;

  clear:
    () => void;
};

export const useFootballQuantumStore =
  create<QuantumStore>(
    (set) => ({

      quantum: [],

      setQuantum: (
        data
      ) =>

        set({
          quantum:
            Array.isArray(data)
              ? data
              : []
        }),

      addQuantum: (
        simulation
      ) =>

        set((state) => ({

          quantum: [
            simulation,
            ...state.quantum
          ].slice(0, 30)

        })),

      clear: () =>

        set({
          quantum: []
        })
    })
  );