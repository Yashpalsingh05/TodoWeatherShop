import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url)
      const category = searchParams.get('category')
      const featured = searchParams.get('featured')
      const search = searchParams.get('search')
      const limit = searchParams.get('limit')

      let where: any = {}

      if (category) {
        where.category = category
      }

      if (featured === 'true') {
        where.featured = true
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }

      const products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        ...(limit && { take: parseInt(limit) }),
      })

      return NextResponse.json(products)
    } catch (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { name, description, price, image, category, stock, featured } = body

      if (!name || !price || !category) {
        return NextResponse.json(
          { error: 'Name, price, and category are required' },
          { status: 400 }
        )
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          image,
          category,
          stock: stock || 0,
          featured: featured || false,
        },
      })

      return NextResponse.json(product, { status: 201 })
    } catch (error) {
      console.error('Error creating product:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }
}
