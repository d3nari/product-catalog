import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Star, Package, Shield, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ProductBackButton from '@/components/ProductBackButton'

interface ProductPageProps {
  params: Promise<{ 
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    
    const { id } = await params
    const product = await getProduct(id)

    return (
      <div className="container mx-auto px-4 py-8">
        
        <ProductBackButton/>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Изображения товара */}
          <div className="space-y-4">
            <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative h-24 rounded-md overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - изображение ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-semibold">{product.rating}</span>
                  <span className="text-gray-500 ml-1">/ 5</span>
                </div>
                <span className="text-gray-600">
                  В наличии: <span className="font-semibold">{product.stock} шт.</span>
                </span>
              </div>
            </div>
   
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold">${product.price}</span>
                    
                    {product.discountPercentage > 0 && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <Badge variant="destructive" className="text-lg">
                          -{product.discountPercentage}%
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Экономия ${(product.price * product.discountPercentage / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-3">Описание</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Характеристики */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-600">Бренд</h3>
                <p className="font-medium">{product.brand}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-600">Категория</h3>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-600">Скидка</h3>
                <p className="font-medium">{product.discountPercentage}%</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-600">Рейтинг</h3>
                <p className="font-medium">{product.rating} / 5</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-400" />
                <span className="text-sm">Бесплатная доставка</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="text-sm">Гарантия 1 год</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-sm">Безопасная оплата</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full">
                Добавить в корзину
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Добавить в избранное
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

// Метаданные страницы товара для примера
export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const { id } = await params
    const product = await getProduct(id)
    return {
      title: `${product.title} | Каталог товаров`,
      description: product.description,
    }
  } catch {
    return {
      title: 'Товар не найден',
    }
  }
}