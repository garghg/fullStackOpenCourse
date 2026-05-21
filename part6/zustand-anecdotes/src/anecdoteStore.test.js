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
})
