import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAll, create } from '../requests'

export const useAnecdotes = () => {

    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const useAnecMutation = useMutation({
        mutationFn: create,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
        }
    })

    return ({
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        addAnecdote: (content) => useAnecMutation.mutate({ content, votes: 0 })
    })
}