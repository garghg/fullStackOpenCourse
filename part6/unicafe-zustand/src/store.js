import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    voteGood: () => set((state) => ({ good: state.good + 1 })),
    voteBad: () => set((state) => ({ bad: state.bad + 1 })),
    voteNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
  },
}))

export const useGoodCounter = () => useFeedbackStore((state) => state.good)
export const useBadCounter = () => useFeedbackStore((state) => state.bad)
export const useNeutralCounter = () =>
  useFeedbackStore((state) => state.neutral)
export const useFeedbackControl = () =>
  useFeedbackStore((state) => state.actions)
