import { create } from 'zustand';

import type {
  QuantumSimulation
} from '../types/football.quantum.types';

type QuantumStore = {

  quantum: QuantumSimulation[];

  setQuantum: (
    data: QuantumSimulation[]
  ) => void;
};

export const useFootballQuantumStore =
  create<QuantumStore>((set) => ({

    quantum: [],

    setQuantum: (data) =>
      set({
        quantum: data
      })
  }));