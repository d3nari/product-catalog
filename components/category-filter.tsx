'use client'

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Category } from "@/types" 

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')

  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    
    params.delete('page')
    params.delete('q')
    
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Категории:</span>
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(null)}
        >
          Все товары
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.slug}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category.slug)}
            className="capitalize"
          >
            {category.name} 
          </Button>
        ))}
      </div>
    </div>
  )
}