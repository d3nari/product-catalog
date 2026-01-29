'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Что-то пошло не так</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => reset()}>Попробовать снова</Button>
        <Button asChild variant="outline">
          <a href="/">На главную</a>
        </Button>
      </div>
    </div>
  )
}