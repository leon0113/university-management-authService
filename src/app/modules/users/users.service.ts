import confiq from '../../../confiq'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utlis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // AUTO generated incremental id
  const id = await generateUserId()
  user.id = id

  //default passsword
  if (!user.password) {
    user.password = confiq.default_user_password as string
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}

export default {
  createUser,
}
