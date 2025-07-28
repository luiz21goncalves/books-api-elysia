import elysiaSwagger from '@elysiajs/swagger'

export const swagger = elysiaSwagger({
  documentation: {
    servers: [
      { url: `http://localhost:${Bun.env.PORT}` },
      { url: 'https://books-api-elysia.onrender.com' },
    ],
  },
  path: '/docs',
})
