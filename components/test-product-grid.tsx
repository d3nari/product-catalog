import ProductGrid from "./product-grid"
import { Product } from "@/types"

const testProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://dummyjson.com/image/200x200/008080/FFFFFF?text=iPhone",
    images: [
      "https://dummyjson.com/image/200x200/008080/FFFFFF?text=iPhone",
      "https://dummyjson.com/image/400x400/008080/FFFFFF?text=iPhone+Large"
    ]
  },
  {
    id: 2,
    title: "iPhone X",
    description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://dummyjson.com/image/200x200/FF5733/FFFFFF?text=iPhone+X",
    images: [
      "https://dummyjson.com/image/200x200/FF5733/FFFFFF?text=iPhone+X",
      "https://dummyjson.com/image/400x400/FF5733/FFFFFF?text=iPhone+X+Large"
    ]
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description: "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://dummyjson.com/image/200x200/33FF57/000000?text=Samsung",
    images: [
      "https://dummyjson.com/image/200x200/33FF57/000000?text=Samsung",
      "https://dummyjson.com/image/400x400/33FF57/000000?text=Samsung+Large"
    ]
  },
  {
    id: 4,
    title: "MacBook Pro",
    description: "MacBook Pro 2021 with mini-LED display",
    price: 1749,
    discountPercentage: 11.02,
    rating: 4.57,
    stock: 83,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://dummyjson.com/image/200x200/900C3F/FFFFFF?text=MacBook",
    images: [
      "https://dummyjson.com/image/200x200/900C3F/FFFFFF?text=MacBook",
      "https://dummyjson.com/image/400x400/900C3F/FFFFFF?text=MacBook+Large"
    ]
  }
]

export default function TestProductGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Тест сетки товаров (4 товара)</h2>
      <ProductGrid products={testProducts} />
    </div>
  )
}