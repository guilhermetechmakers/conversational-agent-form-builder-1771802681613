import { useMemo } from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

function getPasswordStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: '' }

  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  return { score: (score / 5) * 100, label: labels[score] }
}

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const { score, label } = useMemo(() => getPasswordStrength(password), [password])

  if (!password) return null

  return (
    <div className={cn('space-y-1', className)}>
      <Progress value={score} className="h-1.5" />
      {label && (
        <p className="text-xs text-muted-foreground">
          Password strength: <span className="font-medium">{label}</span>
        </p>
      )}
    </div>
  )
}
