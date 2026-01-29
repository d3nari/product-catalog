import axios from 'axios'
import { Product, ProductsResponse } from '@/types'
import { Category } from '@/types'

const API_BASE_URL = 'https://dummyjson.com'

export async function getProducts(
  page: number = 1,
  limit: number = 10,
  search?: string,
  category?: string
): Promise<ProductsResponse> {
  const skip = (page - 1) * limit
  
  let url: string
  let fetchAll = false
  
  if (search || category) {
    if (category) {
      url = `${API_BASE_URL}/products/category/${category}`
    } else {
      url = `${API_BASE_URL}/products`
    }
    url += `?limit=200&skip=0`
    fetchAll = true
  } else {
    url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`
  }
  
  try {
    const response = await axios.get<ProductsResponse>(url)
    
    let products = response.data.products
    let total = response.data.total

    if (!fetchAll) {
      total = response.data.total
    }

    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim()
      //replace(/\s+/g, '')
      
      products = products.filter(product => {
        const title = product.title?.toLowerCase() ?? ''
        const description = product.description?.toLowerCase() ?? ''
        const brand = product.brand?.toLowerCase() ?? ''
        const category = product.category?.toLowerCase() ?? ''
        
        return title.includes(searchLower) ||
               description.includes(searchLower) ||
               brand.includes(searchLower) ||
               category.includes(searchLower)
      })

      total = products.length

      products = products.slice(skip, skip + limit)
    } else if (fetchAll) {
      products = products.slice(skip, skip + limit)
    }
    
    return {
      products,
      total,
      skip,
      limit
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export async function getProduct(id: string): Promise<Product> {
  const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`)
  return response.data
}

export async function getCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${API_BASE_URL}/products/categories`)
  return response.data
}
