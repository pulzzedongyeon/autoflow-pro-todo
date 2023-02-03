import api from '../../services/api'
import endpoints from '../../services/endpoints'

export const getRefreshToken = async (refreshToken: string) => {
  const response = await api.post(endpoints.user.refreshToken)
  return response.data
}
