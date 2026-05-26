import { create } from 'zustand'

const useNotifStore = create((set) => ({
  alert: null,
  actions: {
    setAlert: (message, type = 'info') => set({ alert: message ? { message, type } : null })
  }
}))

export const useNotifAlert = () => useNotifStore((state) => state.alert)
export const useNotifActions = () => useNotifStore((state) => state.actions)
