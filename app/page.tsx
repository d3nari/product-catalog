import { use } from 'react'
import ProductList from '@/components/ProductList'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>
}) {
  const params = await searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList searchParams={params} />
    </div>
  )
}