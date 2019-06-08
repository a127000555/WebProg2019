const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(post => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubsub.asyncIterator(`comment ${postId}`)
    }
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post')
    }
  },
  postPerUser:{
    subscribe(parent, { userId }, { db, pubsub }, info) {
      const user = db.posts.filter(user => user.id === userId)

      if (!user) {
        throw new Error('User not found')
      }
      console.log('async -> ', `user ${userId}`)
      return pubsub.asyncIterator(`user ${userId}`)
    }
  }
}

export { Subscription as default }
