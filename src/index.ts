import { Elysia } from 'elysia'

const app = new Elysia().get('/', () => {
  return { message: 'Hello Elysia' }
})

app.listen({ port: 3000 }, (server) => {
  console.log(`🦊 Elysia is running at ${server.url.toString()}`)
})
