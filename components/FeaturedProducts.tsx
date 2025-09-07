'use client'

import { useState, useEffect } from 'react'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useApp } from './Providers'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  featured: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useApp()

  useEffect(() => {
    const loadProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock products data
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          price: 89.99,
          originalPrice: 129.99,
          rating: 4.5,
          reviewCount: 128,
          image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Headphones',
          category: 'Electronics',
          featured: true
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          price: 199.99,
          rating: 4.8,
          reviewCount: 89,
          image: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Smart+Watch',
          category: 'Electronics',
          featured: true
        },
        {
          id: '3',
          name: 'Ergonomic Office Chair',
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.6,
          reviewCount: 156,
          image: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Office+Chair',
          category: 'Furniture',
          featured: true
        },
        {
          id: '4',
          name: 'Portable Power Bank',
          price: 39.99,
          rating: 4.3,
          reviewCount: 203,
          image: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Power+Bank',
          category: 'Electronics',
          featured: true
        }
      ]
      
      setProducts(mockProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
  }

  const renderStars = (rating: number, reviewCount: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : i < rating
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating} ({reviewCount})
        </span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="card group hover:shadow-lg transition-all duration-300">
          <div className="relative mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            {product.originalPrice && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                SALE
              </div>
            )}
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="space-y-2">
            <Link
              href={`/product/${product.id}`}
              className="font-semibold text-gray-900 hover:text-primary-600 line-clamp-2"
            >
              {product.name}
            </Link>
            
            {renderStars(product.rating, product.reviewCount)}

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              className="w-full btn-primary flex items-center justify-center space-x-2 mt-4"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
