import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'

const routes = new Elysia().get(
  '/',
  () => {
    return { message: 'Hello Elysia' }
  },
  { response: { 200: t.Object({ message: t.String() }) } }
)

export const app = new Elysia()
  .use(
    swagger({
      documentation: {
        servers: [
          { url: `http://localhost:${Bun.env.PORT}` },
          { url: 'https://books-api-elysia.onrender.com' },
        ],
      },
      path: '/docs',
    })
  )
  .group('/v1', (app) => app.use(routes))
