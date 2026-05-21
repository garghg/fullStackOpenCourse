import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import anecdoteServices from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id)
      const updated = await anecdoteServices.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      })
      set((state) => ({
        anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a)),
      }))
    },
    add: async (anecdote) => {
      const newAnecdote = await anecdoteServices.createNew(anecdote)
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }))
    },
    setFilter: (text) => set({ filter: text }),
    initialize: async () => {
      const anecdotes = await anecdoteServices.getAll()
      set(() => ({ anecdotes }))
    },
    delAnecdote: async (id) => {
      await anecdoteServices.del(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id),
      }))
    },
  },
}))

export const useAnecdotes = () =>
  useAnecdoteStore((state) => state.anecdotes).toSorted(
    (a, b) => b.votes - a.votes,
  )
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions)

export const useFilteredAnecdotes = () =>
  useAnecdoteStore(useShallow(({ anecdotes, filter }) =>
    anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .toSorted((a, b) => b.votes - a.votes)
  ))

export default useAnecdoteStore