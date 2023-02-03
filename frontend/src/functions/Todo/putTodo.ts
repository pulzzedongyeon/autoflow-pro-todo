import { AxiosRequestConfig } from 'axios'
import api from '../../services/api'
import endpoints from '../../services/endpoints'

interface PutTodoArgs {
  idTodo: string
  name: string
  description?: string | null
  complete: number | boolean
}

export const putTodo = async ({
  idTodo,
  name,
  description,
  complete
}: PutTodoArgs) => {
  const response = await api.patch(`${endpoints.todo.patch}`, {
    id: idTodo,
    title: name,
    description: description || null,
    complete: complete
  })
  return response.data
}
