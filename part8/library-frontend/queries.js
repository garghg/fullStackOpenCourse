import { gql } from '@apollo/client'

export const GET_AUTHORS = gql `
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const GET_BOOKS = gql `
    query {
        allBooks {
            id
            title
            author
            published
        }
    }
`
