import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization

  if(header){
  const token = header.replace('Bearer ', '')
  const decoded = jwt.verify(token, 'thisisasecret')
  
  return decoded.userId
  }

  if(requireAuth){
    throw new Error('Authentification is required!') 
  }
  
  return null
}

export { getUserId as default }
