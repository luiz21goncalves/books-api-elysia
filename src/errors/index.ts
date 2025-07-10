import { type Static, t } from 'elysia'

const appErrorSchema = t.Object({
  cause: t.Optional(t.Unknown()),
  details: t.Optional(t.Unknown()),
  message: t.String(),
  name: t.String(),
  statusCode: t.Number(),
})

const appErrorResponseSchema = t.Object({
  details: t.Optional(t.Unknown()),
  message: t.String(),
  name: t.String(),
  status_code: t.Number(),
})

type AppProps = Static<typeof appErrorSchema>
type AppErrorResponse = Static<typeof appErrorResponseSchema>

export class AppError extends Error {
  readonly props: Pick<AppProps, 'statusCode' | 'details' | 'name'>

  constructor(props: AppProps) {
    super(props.message, { cause: props.cause })
    this.props = props
  }

  toResponse(): AppErrorResponse {
    return {
      details: this.props.details,
      message: this.message,
      name: this.props.name,
      status_code: this.props.statusCode,
    }
  }

  toJSON(): AppProps {
    return {
      cause: this.cause,
      details: this.props.details,
      message: this.message,
      name: this.props.name,
      statusCode: this.props.statusCode,
    }
  }
}

type NotFoundErrorProps = Pick<AppError, 'message'>

export const notFoundErrorSchema = t.Object({
  message: t.String(),
  name: t.String({ default: 'NotFoundError' }),
  status_code: t.Number({ default: 404 }),
})

export class NotFoundError extends AppError {
  constructor({ message }: NotFoundErrorProps) {
    super({
      message,
      name: 'NotFoundError',
      statusCode: 404,
    })
  }
}

type InternalServerErrorProps = Pick<AppError, 'cause'>

export const internalServerErrorSchema = t.Object({
  message: t.String(),
  name: t.String({ default: 'InternalServerError' }),
  status_code: t.Number({ default: 500 }),
})

export class InternalServerError extends AppError {
  constructor({ cause }: InternalServerErrorProps) {
    super({
      cause,
      message: 'An internal server error occurred.',
      name: 'InternalServerError',
      statusCode: 500,
    })
  }
}
