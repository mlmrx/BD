import create from 'zustand';
import { persist } from 'zustand/middleware';
import { initPriceSocket, sendPush } from '../utils/push';

type Item = { id: string; name: string };

type State = {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
};

export const useWatchlist = create<State>()(
  persist(
    (set) => ({
      items: [],
      add: (item) => set((s) => ({ items: [...s.items, item] })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
    }),
    { name: 'watchlist' }
  )
);

initPriceSocket((id, delta) => {
  if (delta > 5) {
    const state = useWatchlist.getState();
    if (state.items.find((i) => i.id === id)) {
      sendPush('Price Alert', `${id} changed ${delta}%`);
    }
  }
});
