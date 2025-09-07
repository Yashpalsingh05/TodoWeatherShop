'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react'
import { useApp } from '../../components/Providers'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  stock: number
  featured: boolean
}

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty']

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')
  const { addToCart } = useApp()

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'All') params.append('category', selectedCategory)
      
      const response = await fetch(`/api/products?${params}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Mock products for demo
      const mockProducts = [
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 89.99,
          image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Headphones',
          category: 'Electronics',
          stock: 15,
          featured: true
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Track your fitness goals with this advanced smartwatch',
          price: 199.99,
          image: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Smart+Watch',
          category: 'Electronics',
          stock: 8,
          featured: true
        },
        {
          id: '3',
          name: 'Ergonomic Office Chair',
          description: 'Comfortable office chair with lumbar support',
          price: 299.99,
          image: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Office+Chair',
          category: 'Furniture',
          stock: 5,
          featured: false
        },
        {
          id: '4',
          name: 'Portable Power Bank',
          description: '20000mAh portable charger for all your devices',
          price: 39.99,
          image: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Power+Bank',
          category: 'Electronics',
          stock: 25,
          featured: true
        },
        {
          id: '5',
          name: 'Premium Coffee Maker',
          description: 'Brew perfect coffee every morning',
          price: 149.99,
          image: 'https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Coffee+Maker',
          category: 'Home & Garden',
          stock: 12,
          featured: false
        },
        {
          id: '6',
          name: 'Running Shoes',
          description: 'Lightweight and comfortable running shoes',
          price: 79.99,
          image: 'https://via.placeholder.com/300x300/06B6D4/FFFFFF?text=Running+Shoes',
          category: 'Sports',
          stock: 20,
          featured: true
        }
      ]
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || ''
    })
  }

  const filteredAndSortedProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-auto"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredAndSortedProducts.map(product => (
            <div
              key={product.id}
              className={`card group hover:shadow-lg transition-all duration-300 ${
                viewMode === 'list' ? 'flex items-center space-x-6' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'mb-4'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`object-cover rounded-lg ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full aspect-square'
                  }`}
                />
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-md">
                    Featured
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.stock > 0 ? (
                      <p className="text-sm text-green-600">{product.stock} in stock</p>
                    ) : (
                      <p className="text-sm text-red-600">Out of stock</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center space-x-2 mt-4 ${
                    product.stock > 0 
                      ? 'btn-primary' 
                      : 'btn-secondary cursor-not-allowed opacity-50'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
