import { create } from 'zustand'
import { RowSelectionState } from '@tanstack/react-table'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  favCharacters: RowSelectionState
}

type Action = {
  updateFavorites: (favCharacters: State['favCharacters']) => void
}

const useFavoriteStore = create<State & Action, [["zustand/persist", State & Action]]>(persist(
  (set) => ({
    favCharacters: {},
    updateFavorites: (favCharacters) => set(() => ({ favCharacters: favCharacters })),
  }),
  {
    name: 'favorite-characters-storage',
    storage: createJSONStorage(() => sessionStorage),
  },
))

export default useFavoriteStore;
