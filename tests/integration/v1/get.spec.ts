import { describe, expect, test } from 'bun:test'
import { api } from '../../server'

describe('GET /', () => {
  describe('Anonymous user', () => {
    test('Receiving hello message', async () => {
      const { status, data } = await api.v1.get()

      expect(status).toBe(200)
      expect(data).toStrictEqual({ message: 'Hello Elysia' })
    })
  })
})
