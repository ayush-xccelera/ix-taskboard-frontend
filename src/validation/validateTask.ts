export const MAX_TITLE_LENGTH = 100

export function validateTitle(value: string): string {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Title is required'
  }

  if (trimmed.length > MAX_TITLE_LENGTH) {
    return `Title must be ${MAX_TITLE_LENGTH} characters or fewer`
  }

  return ''
}
