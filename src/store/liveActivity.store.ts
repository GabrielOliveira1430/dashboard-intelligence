import { create } from 'zustand';

// ==========================================
// 🧠 TYPES
// ==========================================

export type ActivityItem = {

  id: string;

  message: string;

  type: string;

  timestamp: number;
};

// ==========================================
// 🧠 STORE
// ==========================================

type Store = {

  items: ActivityItem[];

  add: (
    item: ActivityItem
  ) => void;
};

export const useLiveActivityStore =
  create<Store>(
    (set) => ({

      items: [],

      add: (item) =>

        set((state) => ({

          items: [
            item,
            ...state.items
          ].slice(0, 40)
        }))
    })
  );