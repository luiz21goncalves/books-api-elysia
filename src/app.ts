import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import {
  InternalServerError,
  internalServerErrorSchema,
  NotFoundError,
  notFoundErrorSchema,
} from './errors'

const routes = new Elysia().get(
  '/',
  () => {
    return { message: 'Hello Elysia' }
  },
  {
    response: {
      200: t.Object({ message: t.String() }),
      404: notFoundErrorSchema,
      500: internalServerErrorSchema,
    },
  }
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
  .onError(({ code, error, status, request, path }) => {
    switch (code) {
      case 'NOT_FOUND': {
        const notFoundError = new NotFoundError({
          message: `${request.method}:${path} not found.`,
        })
        console.info(notFoundError)

        const errorResponse = notFoundError.toResponse()

        return status(errorResponse.status_code, errorResponse)
      }

      default: {
        const internalError = new InternalServerError({ cause: error })
        console.info(internalError)

        const errorResponse = internalError.toResponse()

        return status(errorResponse.status_code, errorResponse)
      }
    }
  })
  .group('/v1', (app) => app.use(routes))

export type APP = typeof app
