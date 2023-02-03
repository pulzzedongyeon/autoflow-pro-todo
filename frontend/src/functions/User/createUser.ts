import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface ICreateUserData {
  email: string
  password: string
  name?: string
}

export const createUser = async ({
  email,
  password,
  name
}: ICreateUserData) => {
  const response = await api.post(endpoints.user.create, {
    email,
    password,
    name
  })
  return response.data
}
