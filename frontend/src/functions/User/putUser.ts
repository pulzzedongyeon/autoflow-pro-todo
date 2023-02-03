import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface putUserType {
  email: string
  name: string
}

export const putUser = async ({ email, name }: putUserType) => {
  const response = await api.patch(endpoints.user.modify, {
    email,
    name
  })
  return response.data
}
