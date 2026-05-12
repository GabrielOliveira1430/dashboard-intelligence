import { create } from 'zustand';

type GeneratedNumber = {

  number: string;

  confidence: number;
};

type HotNumber = {

  number: string;

  score: number;
};

type OrchestratorPayload = {

  summary?: {

    systemHealth: number;

    bestStrategy: string;

    exploration: number;

    exploitation: number;
  };

  generated?: {

    numbers: GeneratedNumber[];
  };

  analytics?: {

    hotNumbers: HotNumber[];
  };

  timestamp?: number;
};

type OrchestratorStore = {

  data: OrchestratorPayload | null;

  connected: boolean;

  lastUpdate: string;

  setData:
    (payload: OrchestratorPayload) => void;

  setConnected:
    (value: boolean) => void;
};

export const useOrchestratorStore =
  create<OrchestratorStore>((set) => ({

    data: null,

    connected: false,

    lastUpdate: '',

    // ==========================================
    // 🧠 UPDATE
    // ==========================================

    setData: (payload) =>

      set({

        data: payload,

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