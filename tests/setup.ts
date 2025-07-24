
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import 'vitest/globals';
// Setup MSW for API mocking
import { server } from './mocks/server'

// Start MSW before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Cleanup and reset after each test
afterEach(() => {
  cleanup()
  server.resetHandlers()
})

// Cleanup after all tests
afterAll(() => server.close())