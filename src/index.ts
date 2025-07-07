import { Elysia } from 'elysia'

const app = new Elysia().get('/', () => {
  return { message: 'Hello Elysia' }
})

app.listen({ port: Bun.env.PORT }, (server) => {
  console.log(`🦊 Elysia is running at ${server.url.toString()}`)
})
