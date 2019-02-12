import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
})

export { prisma as default }
// prisma.query prisma.mutation prisma.subscription prisma.exists
//
//const createPostForUser = async (authorId, data) => {
//  const userExists = await prisma.exists.User({ 
//    id: authorId 
//  })
//  
//  if(!userExists){
//    throw new Error('User not found!')
//  }
//
//  const post = await prisma.mutation.createPost({
//    data: {
//      ...data,
//      author: {
//        connect: {
//          id: authorId
//        }
//      }
//    }
//    //what you need to grab:
//  }, '{ author { id name email posts { id title body published } } }')
//  return post.author
//}
//
//createPostForUser("cjrh4v9h600et0977ijujcn8b", {
//  title: "This is createPostForUser request XXX",
//  body: "XXXXXXXXXXXXXXXXXXX",
//  published: false
//}).then((user) => {
//  console.log(JSON.stringify(user, undefined, 2))
//}).catch((error) => {
//  console.log(error.message)
//})
//
//const updatePostForUser = async (postId, data) => {
//  const postExists = await prisma.exists.Post({
//    id: postId
//  })
//
//  if(!postExists){
//    throw new Error('Post not found')
//  }
//
//  const post = await prisma.mutation.updatePost({
//    where: {
//      id: postId
//    },
//    data
//  }, '{ author { id name email posts { id title body published }}}')
//  return post.author
//}
//
//updatePostForUser('cjrili5z200360977f3m51zzb', {
//  title: 'This is the new Tittle of updatePostForUser',
//  body: '777777777',
//  published: false,
//}).then((post) => {
//  console.log(JSON.stringify(post, undefined, 2))
//}).catch((error) => {
//  console.log(error.message)
//})
