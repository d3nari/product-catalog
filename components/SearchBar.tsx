'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const initialSearch = searchParams.get('q') || ''
  const [searchValue, setSearchValue] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchValue, 500)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    
    if (debouncedSearch.trim()) {
      params.set('q', debouncedSearch.trim())
    } else {
      params.delete('q')
    }
    
    params.delete('page')
    params.delete('category')
    
    const currentQuery = searchParams.get('q') || ''
    if (debouncedSearch.trim() !== currentQuery.trim()) {
      router.push(`/?${params.toString()}`)
    }
  }, [debouncedSearch, router]) 

  useEffect(() => {
    const currentSearch = searchParams.get('q') || ''
    if (currentSearch !== searchValue) {
      setSearchValue(currentSearch)
    }
  }, [searchParams]) 

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Поиск товаров..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}