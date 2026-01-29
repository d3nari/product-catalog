import { Suspense } from 'react'
import ProductGrid from './product-grid'
import SearchBar from './search-bar'
import { getProducts, getCategories } from '@/lib/api'
import LoadingSpinner from './loading-spinner'
import Pagination from './pagination'
import CategoryFilter from './category-filter'

interface ProductListProps {
  searchParams?: {
    page?: string
    q?: string
    category?: string
  }
}

export default async function ProductList({ searchParams }: ProductListProps = {}) {
  
  const page = parseInt(searchParams?.page || '1')
  const search = searchParams?.q
  const category = searchParams?.category
  const productsData = await getProducts(page, 10, search, category)
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Каталог товаров</h1>
        <p className="text-gray-600">
          Найдено {productsData.total} товаров
          {search && ` по запросу "${search}"`}
          {category && ` в категории "${category}"`}
        </p>
      </div>

      {/* Поиск */}
      <div>
        <Suspense fallback={
          <div className="w-full max-w-md h-10 bg-gray-100 rounded animate-pulse" />
        }>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense fallback={
          <div className="h-20 bg-gray-100 rounded animate-pulse" />
        }>
          <CategoryFilter categories={categories} />
      </Suspense>

      {/* Список товаров */}
      <Suspense fallback={<LoadingSpinner />}>
        <ProductGrid products={productsData.products} />
      </Suspense>

      {/* Пагинация */}
      {productsData.total > 10 && (
        <Suspense fallback={
          <div className="h-16 bg-gray-100 rounded animate-pulse" />
        }>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(productsData.total / 10)}
            totalItems={productsData.total}
            itemsPerPage={10}
          />
        </Suspense>
      )}
    </div>
  )
}