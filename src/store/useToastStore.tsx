import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ToastProps } from 'src/components/atoms/Toast'

type State = {
  toasts: ToastProps[]
}

type Action = {
  showToast: (toasts: ToastProps) => void
}

const useToastStore = create<State & Action, [["zustand/persist", State & Action]]>(persist(
  (set) => ({
    toasts: [],
    showToast: (toast) => set(() => ({ toasts: [toast] })),
  }),
  {
    name: 'toast-storage',
    storage: createJSONStorage(() => sessionStorage),
  },
))

export default useToastStore;
