import ProductCard from "./product-card"
import { Product } from "@/types"

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <div className="text-4xl">🔍</div>
        </div>
        <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Попробуйте изменить поисковый запрос или выберите другую категорию
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}