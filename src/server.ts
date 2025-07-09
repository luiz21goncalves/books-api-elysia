import { app } from './app'

app.listen({ port: Bun.env.PORT }, (server) => {
  console.log(`🦊 Elysia is running at ${server.url.toString()}`)
})
