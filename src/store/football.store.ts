import { create } from 'zustand';

import type {
  FootballResponse
} from '../types/football.types';

type FootballStore = {

  data: FootballResponse | null;

  connected: boolean;

  lastUpdate: string;

  setFootballData:
    (data: FootballResponse) => void;

  setConnected:
    (value: boolean) => void;
};

export const useFootballStore =
  create<FootballStore>((set) => ({

    data: null,

    connected: false,

    lastUpdate: '',

    // ==========================================
    // ⚽ UPDATE DATA
    // ==========================================

    setFootballData: (data) =>

      set({

        data,

        lastUpdate:
          new Date()
            .toLocaleTimeString()
      }),

    // ==========================================
    // 🔌 CONNECTION
    // ==========================================

    setConnected: (value) =>

      set({
        connected: value
      }),
  }));