'use client'

import { useState, useEffect } from 'react'
import { CheckSquare, Square, Clock, Plus } from 'lucide-react'
import Link from 'next/link'

interface Todo {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

export default function TodoPreview() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading todos from API
    const loadTodos = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock todos data
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'Complete project proposal',
          completed: false,
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Review team feedback',
          completed: true,
          priority: 'medium',
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          title: 'Update documentation',
          completed: false,
          priority: 'low',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          title: 'Plan next sprint',
          completed: false,
          priority: 'medium',
        }
      ]
      
      setTodos(mockTodos)
      setLoading(false)
    }

    loadTodos()
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'
    if (diffDays > 1) return `In ${diffDays} days`
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`
    
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="card">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="flex-1 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const recentTodos = todos.slice(0, 4)
  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="card">
      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-600">
          {completedCount} of {totalCount} completed
        </div>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3 mb-4">
        {recentTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No todos yet</p>
          </div>
        ) : (
          recentTodos.map(todo => (
            <div key={todo.id} className="flex items-start space-x-3 group">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="mt-0.5 text-gray-400 hover:text-primary-600 transition-colors"
              >
                {todo.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(todo.priority)} bg-opacity-10`}>
                    {todo.priority}
                  </span>
                  {todo.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDueDate(todo.dueDate)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Button */}
      <Link 
        href="/todos"
        className="w-full btn-secondary flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add New Todo</span>
      </Link>
    </div>
  )
}

