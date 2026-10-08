import toast from 'react-hot-toast'

// Base URL for the real backend. No hardcoded URLs — read from the
// REACT_APP_API_URL environment variable (see .env.example). Vite is
// configured (see vite.config.ts envPrefix) to expose REACT_APP_ prefixed
// variables through import.meta.env.
const BASE_URL = (import.meta.env.REACT_APP_API_URL as string | undefined) || ''

interface ApiErrorBody {
  error?: string
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse | undefined> {
  const url = `${BASE_URL}${path}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })

    if (response.status === 204) {
      return undefined
    }

    const isJson = response.headers.get('content-type')?.includes('application/json')
    const body = isJson ? await response.json() : undefined

    if (!response.ok) {
      const message = (body as ApiErrorBody)?.error || `Request failed with status ${response.status}`
      throw new ApiError(message, response.status)
    }

    return body as TResponse
  } catch (error) {
    const message = error instanceof ApiError
      ? error.message
      : 'Network error — could not reach the server.'

    // Response/error interceptor equivalent: surface exactly one toast per
    // failed request. Callers must not also toast in their own catch blocks.
    toast.error(message)

    throw error instanceof ApiError ? error : new ApiError(message, 0)
  }
}

export const apiClient = {
  get: <TResponse>(path: string) => request<TResponse>(path, { method: 'GET' }),
  post: <TResponse>(path: string, body: unknown) =>
    request<TResponse>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <TResponse>(path: string, body: unknown) =>
    request<TResponse>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <TResponse>(path: string) => request<TResponse>(path, { method: 'DELETE' }),
}
