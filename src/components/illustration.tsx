import { cn } from '@/lib/utils'

interface IllustrationProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export function Illustration({ src, alt, className, loading = 'lazy' }: IllustrationProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={cn('object-contain', className)}
    />
  )
}
