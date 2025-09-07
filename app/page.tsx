import WeatherWidget from '../components/WeatherWidget'
import TodoPreview from '../components/TodoPreview'
import FeaturedProducts from '../components/FeaturedProducts'
import Link from 'next/link'
import { ShoppingBag, CheckSquare, Cloud } from 'lucide-react'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Todo Weather Ecommerce App</title>
        <meta name="description" content="A comprehensive app with todo management, weather updates, and ecommerce features" />
      </Head>
      
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your All-in-One App
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Manage your todos, check the weather, and shop for your favorite products all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/todos" className="btn-primary">
              <CheckSquare className="w-5 h-5 inline mr-2" />
              Manage Todos
            </Link>
            <Link href="/shop" className="btn-primary">
              <ShoppingBag className="w-5 h-5 inline mr-2" />
              Shop Now
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Weather Widget */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Cloud className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Weather</h2>
            </div>
            <WeatherWidget />
          </div>

          {/* Todo Preview */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CheckSquare className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Todos</h2>
              </div>
              <Link href="/todos" className="text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <TodoPreview />
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="card space-y-4">
              <Link href="/todos" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-green-800">Add New Todo</h3>
                <p className="text-green-600">Stay organized with your tasks</p>
              </Link>
              <Link href="/shop" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-800">Browse Products</h3>
                <p className="text-blue-600">Discover amazing deals</p>
              </Link>
              <Link href="/cart" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-purple-800">View Cart</h3>
                <p className="text-purple-600">Check your items</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link href="/shop" className="text-primary-600 hover:text-primary-700">
              View All Products
            </Link>
          </div>
          <FeaturedProducts />
        </section>
      </div>
    </>
  )
}

