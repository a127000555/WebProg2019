import { gql } from 'apollo-boost'

export const POSTFOLD_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        author {
          id
          name
        }
      }
    }
  }
`
export const POSTS_PER_USER_SUBSCRIPTION = (id) => gql`
subscription {
  postPerUser(userId:${id}){
    mutation
    data {
      id
      body
      title
    }
  }
}
`



