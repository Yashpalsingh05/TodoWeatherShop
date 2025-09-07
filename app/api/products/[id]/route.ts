import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/products/[id] - Get a specific product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params

      const product = await prisma.product.findUnique({
        where: { id },
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      )
    }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params
      const body = await request.json()
      const { name, description, price, image, category, stock, featured } = body

      const product = await prisma.product.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(price !== undefined && { price: parseFloat(price) }),
          ...(image !== undefined && { image }),
          ...(category !== undefined && { category }),
          ...(stock !== undefined && { stock }),
          ...(featured !== undefined && { featured }),
        },
      })

      return NextResponse.json(product)
    } catch (error) {
      console.error('Error updating product:', error)
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 500 }
      )
    }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params

      await prisma.product.delete({
        where: { id },
      })

      return NextResponse.json({ message: 'Product deleted successfully' })
    } catch (error) {
      console.error('Error deleting product:', error)
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      )
    }
}
