import { GET_BOOKS } from "../../queries"

export const addBookToCache = (cache, bookToAdd) => {
  const update = (genre) => {
    cache.updateQuery({ query: GET_BOOKS, variables: { genre } }, (data) => {
      if (!data) return data
      const { allBooks } = data
      if (allBooks.some((b) => b.id === bookToAdd.id)) {
        return { allBooks }
      }
      return { allBooks: allBooks.concat(bookToAdd) }
    })
  }

  update(null)
  bookToAdd.genres.forEach((genre) => update(genre))
}