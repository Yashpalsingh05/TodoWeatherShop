import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

// GET /api/todos - Get all todos for a user
export async function GET(request: NextRequest) {
    try {
      // In a real app, you'd get the user ID from the session/auth
      // For now, we'll use a mock user ID
      const mockUserId = 'user_1'
      
      const todos = await prisma.todo.findMany({
        where: {
          userId: mockUserId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return NextResponse.json(todos)
    } catch (error) {
      console.error('Error fetching todos:', error)
      return NextResponse.json(
        { error: 'Failed to fetch todos' },
        { status: 500 }
      )
    }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
    try {
      const body = await request.json()
      const { title, description, priority, dueDate } = body

      if (!title) {
        return NextResponse.json(
          { error: 'Title is required' },
          { status: 400 }
        )
      }

      // Mock user ID - in a real app, get from session
      const mockUserId = 'user_1'

      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          priority: priority || 'medium',
          dueDate: dueDate ? new Date(dueDate) : null,
          userId: mockUserId,
        },
      })

      return NextResponse.json(todo, { status: 201 })
    } catch (error) {
      console.error('Error creating todo:', error)
      return NextResponse.json(
        { error: 'Failed to create todo' },
        { status: 500 }
      )
    }
}
