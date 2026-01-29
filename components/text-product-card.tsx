import ProductCard from "./product-card"

const testProduct = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://dummyjson.com/image/150",
  images: [
    "https://dummyjson.com/image/150",
    "https://dummyjson.com/image/250"
  ]
}

export default function TestProductCard() {
  return (
    <div className="max-w-sm mx-auto">
      <ProductCard product={testProduct} />
    </div>
  )
}