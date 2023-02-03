const endpoints = {
  user: {
    create: '/user',
    modify: '/user',
    login: '/user/login',
    refreshToken: '/user/token',
    forgotPassword: ''
  },
  collections: {
    get: '/collection/list',
    post: '/collection',
    delete: '/collection',
    patch: '/collection'
  },
  todo: {
    get: '/todo',
    post: '/todo',
    delete: '/todo',
    patch: '/todo'
  }
}

export default endpoints
