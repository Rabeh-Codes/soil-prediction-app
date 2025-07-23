// tests/mocks/handlers.ts

import { rest } from 'msw'

// Temporary soil data type for mocking
type TempSoilData = {
  temperature: number
  moisture: number
  latitude: number
  longitude: number
  date: string
}

// Mock response based on NASA API structure (replace later with real type)
const mockSoilData: TempSoilData = {
  temperature: 23.5,
  moisture: 12.8,
  latitude: 36.75,
  longitude: 3.06,
  date: '2025-07-09'
}

// Export MSW handlers
export const handlers = [
  rest.get('https://api.nasa.gov/soil', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockSoilData)
    )
  })
]
