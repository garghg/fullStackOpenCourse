import { GET_BOOKS } from '../../queries'

export const addBookToCache = (cache, bookToAdd) => {
    cache.updateQuery({ query: GET_BOOKS }, (data) => {
        if (!data) return null
        const { allBooks } = data
        const bookExists = allBooks.some(
            (b) => b.id === bookToAdd.id,
        )

        if (bookExists) {
            return { allBooks }
        }

        return {
            allBooks: allBooks.concat(bookToAdd)
        }
    })
}