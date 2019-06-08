import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query {
    posts {
      title
      body
      author {
        name
        id
      }
      published
    }
  }
`

export const POSTFOLD_QUERY = gql`
  query {
    posts {
      author {
        name
        id
      }
    }
  }
`

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`

export const POSTS_GIVEN_USERID_QUERY = (id) => gql`
  query {
    users (id: ${id}){
      posts{
        title
        body
        id
      }
    }
  }
`