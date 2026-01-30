import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 pb-0">
        <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive" className="font-semibold">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${discountedPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <span className="text-sm text-gray-500">
            В наличии: {product.stock}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" size="lg">
          <Link href={`/product/${product.id}`}>
            Подробнее
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}