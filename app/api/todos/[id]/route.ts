import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

// GET /api/todos/[id] - Get a specific todo
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params

      const todo = await prisma.todo.findUnique({
        where: { id },
      })

      if (!todo) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(todo)
    } catch (error) {
      console.error('Error fetching todo:', error)
      return NextResponse.json(
        { error: 'Failed to fetch todo' },
        { status: 500 }
      )
    }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params
      const body = await request.json()
      const { title, description, completed, priority, dueDate } = body

      const todo = await prisma.todo.update({
        where: { id },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(completed !== undefined && { completed }),
          ...(priority !== undefined && { priority }),
          ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
        },
      })

      return NextResponse.json(todo)
    } catch (error) {
      console.error('Error updating todo:', error)
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to update todo' },
        { status: 500 }
      )
    }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
      const { id } = params

      await prisma.todo.delete({
        where: { id },
      })

      return NextResponse.json({ message: 'Todo deleted successfully' })
    } catch (error) {
      console.error('Error deleting todo:', error)
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return NextResponse.json(
          { error: 'Todo not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(
        { error: 'Failed to delete todo' },
        { status: 500 }
      )
    }
}
