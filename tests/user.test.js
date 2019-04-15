import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma' 
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations.js'

const client = getClient()

//beforeEach(seedDatabase)

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Kall',
      email: 'kall@mail.ru',
      password: 'kall12345'
    }
  }   
  
  const response = await client.mutate({
    mutation: createUser,
    variables
  })

  const exists = await prisma.exists.User({ 
    id: response.data.createUser.user.id 
  })
  expect(exists).toBe(true)
})

test('Should expose author profile', async () => {
  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Luka')

})

test('Should not login with bad cridentials', async () => {
  const variables = {
    data: {
      email: 'luka@mail.ru',
      password: 'rd12345'
    }
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()

})

test('Should not sign up with short password', async () => {
  const variables = {
    data: {
      name: 'Sara',
      email: 'sar@mail.ru',
      password: 'dfdg45'
    }
  }

  await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
})

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)

})
