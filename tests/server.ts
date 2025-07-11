import { treaty } from '@elysiajs/eden'
import { type APP, app } from '../src/app'

export const api = treaty<APP>(app)
