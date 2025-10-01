import dbConnect from './mongodb'

// Gemeinsamer Error-Typ mit HTTP-Status zur einfacheren Weitergabe
export class ApiError extends Error {
  constructor (message, status = 500, details = undefined) {
    super(message)
    this.status = status
    this.details = details
  }
}

// Wrapper stellt sicher, dass DB-Verbindung, Fehlerbehandlung und CORS konsistent sind
export function apiHandler (handler, options = {}) {
  const {
    allowedMethods,
    enableCors = true
  } = options

  return async function wrappedHandler (request, context) {
    try {
      if (enableCors) {
        const headers = new Headers({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        })
        if (request.method === 'OPTIONS') {
          return new Response(null, { status: 204, headers })
        }
      }

      if (allowedMethods && !allowedMethods.includes(request.method)) {
        throw new ApiError(`Methode ${request.method} ist nicht erlaubt.`, 405)
      }

      await dbConnect()

      return await handler(request, context)
    } catch (error) {
      const status = error.status || 500
      const payload = {
        success: false,
        error: error.message || 'Interner Serverfehler'
      }

      if (error.details) {
        payload.details = error.details
      }

      console.error('[API]', request.method, request.url, error)
      return Response.json(payload, { status })
    }
  }
}
