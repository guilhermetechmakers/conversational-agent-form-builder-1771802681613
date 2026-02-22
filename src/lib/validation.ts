/**
 * Password validation per spec:
 * - Min 8 characters
 * - At least one uppercase
 * - At least one lowercase
 * - At least one digit
 */
export const passwordSchema = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasDigit: /\d/,
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (password.length < passwordSchema.minLength) {
    errors.push(`At least ${passwordSchema.minLength} characters`)
  }
  if (!passwordSchema.hasUppercase.test(password)) {
    errors.push('At least one uppercase letter')
  }
  if (!passwordSchema.hasLowercase.test(password)) {
    errors.push('At least one lowercase letter')
  }
  if (!passwordSchema.hasDigit.test(password)) {
    errors.push('At least one digit')
  }
  return {
    valid: errors.length === 0,
    errors,
  }
}
