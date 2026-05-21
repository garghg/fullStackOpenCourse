import { beforeEach, describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    del: vi.fn(),
  },
}))

import anecdoteServices from './services/anecdotes'
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
  useFilteredAnecdotes,
} from './anecdoteStore'

describe('anecdotes', () => {
  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
  })

  it('initialized with backend', async () => {
    const mockAnecdote = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteServices.getAll.mockResolvedValue(mockAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdote)
  })

  it('returns anecdotes in vote order', async () => {
    const mockAnecdote = [
      { id: 1, content: 'Test', votes: 1 },
      { id: 2, content: 'Votes', votes: 2 },
    ]
    anecdoteServices.getAll.mockResolvedValue(mockAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0]).toEqual(mockAnecdote[1])
    expect(anecdoteResult.current[1]).toEqual(mockAnecdote[0])
  })

  it('filters accurately', async () => {
    const mockAnecdote = [
      { id: 1, content: 'Test', votes: 1 },
      { id: 2, content: 'Votes', votes: 2 },
      { id: 3, content: 'Testing Votes', votes: 3 },
    ]
    anecdoteServices.getAll.mockResolvedValue(mockAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      await result.current.setFilter('test')
    })
    const { result: filtered } = renderHook(() => useFilteredAnecdotes())
    expect(filtered.current).toEqual([mockAnecdote[2], mockAnecdote[0]])
  })

  it('increased vote count upon voting', async () => {
    const mockAnecdote = [{ id: 1, content: 'Test', votes: 1 }]
    const updated = { id: 1, content: 'Test', votes: 2 }
    anecdoteServices.getAll.mockResolvedValue(mockAnecdote)
    anecdoteServices.update.mockResolvedValue(updated)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
      await result.current.vote(1)
    })
    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0]).toEqual(updated)
  })
})
