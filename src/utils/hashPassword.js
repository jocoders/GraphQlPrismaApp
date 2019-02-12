import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
  if(password.length < 8){
    throw new Error('The password have to be 8 characters or more')
  }
  
  return bcrypt.hash(password, 10)

}

export { hashPassword as default }


