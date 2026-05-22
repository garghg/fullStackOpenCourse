import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll, create, update } from '../requests'
import useNotify from './useNotify'

export const useAnecdotes = () => {

    const queryClient = useQueryClient()
    const { setAlert } = useNotify()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const newMutation = useMutation({
        mutationFn: create,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: (error) => {
            setAlert(error.message)
        }
    })

    const updateMutation = useMutation({
        mutationFn: update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    return ({
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => newMutation.mutate({ content, votes: 0 }),
        updateAnec: (anecdote) => updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    })
}