import { useQuery } from '@tanstack/react-query'
import { getAll } from '../requests'

export const useAnecdotes = () => {

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        refetchOnWindowFocus: false,
        retry: 1
    })

    console.log(result.data)

    return ({
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError
    })
}