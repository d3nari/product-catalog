import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-3xl font-bold mb-2">Товар не найден</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Извините, но запрашиваемый товар не существует или был удален.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/">Вернуться в каталог</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/?category=smartphones">Посмотреть смартфоны</Link>
        </Button>
      </div>
    </div>
  )
}