'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProductBackButton() {
  const router = useRouter()
  
  return (
    <Button 
      variant="outline" 
      className="mb-6"
      onClick={() => router.back()} // ← возврат по истории браузера
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Назад к каталогу
    </Button>
  )
}