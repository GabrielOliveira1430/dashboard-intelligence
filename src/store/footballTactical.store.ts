import { create } from 'zustand';

import type {
  TacticalSnapshot
} from '../types/football.tactical.types';

type TacticalStore = {

  tactical: TacticalSnapshot[];

  setTactical: (
    data: TacticalSnapshot[]
  ) => void;
};

export const useFootballTacticalStore =
  create<TacticalStore>((set) => ({

    tactical: [],

    setTactical: (data) =>
      set({
        tactical: data
      })
  }));