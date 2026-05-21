import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    setMessage: (message) => {
      set(() => ({ message }))
      setTimeout(() => {
        set({ message: '' })
      }, 5000);
    },
  },
}))

export const useMessage = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions)
