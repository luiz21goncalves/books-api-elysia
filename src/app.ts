import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import {
  InternalServerError,
  internalServerErrorSchema,
  NotFoundError,
  notFoundErrorSchema,
  ValidationError,
  validationErrorSchema,
} from './errors'
import { swagger } from './swagger'

const routes = new Elysia().get(
  '/',
  () => {
    return { message: 'Hello Elysia' }
  },
  {
    response: {
      200: t.Object({ message: t.String() }),
      400: validationErrorSchema,
      404: notFoundErrorSchema,
      500: internalServerErrorSchema,
    },
  }
)

export const app = new Elysia()
  .use(swagger)
  .onError(({ code, error, status, request, path }) => {
    if (code === 'NOT_FOUND') {
      const notFoundError = new NotFoundError({
        message: `${request.method}:${path} not found.`,
      })
      const errorResponse = notFoundError.toResponse()

      return status(errorResponse.status_code, errorResponse)
    }

    if (code === 'VALIDATION') {
      const validationError = new ValidationError({
        details: error.all,
        message: `Validation error on ${error.type}`,
      })
      const errorResponse = validationError.toResponse()

      return status(errorResponse.status_code, errorResponse)
    }

    const internalError = new InternalServerError({ cause: error })
    console.info(internalError)

    const errorResponse = internalError.toResponse()

    return status(errorResponse.status_code, errorResponse)
  })
  .group('/v1', (app) => app.use(routes))

export type APP = typeof app
