// NASA API mock server for testing
import { setupServer } from 'msw/node'
import {handlers}  from './handlers'

export const server = setupServer(...handlers)