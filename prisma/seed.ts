import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      id: 'user_1',
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'hashed_password_here', // In real app, this would be properly hashed
    },
  })

  console.log('Created user:', user)

  // Create sample todos
  const todos = await Promise.all([
    prisma.todo.upsert({
      where: { id: 'todo_1' },
      update: {},
      create: {
        id: 'todo_1',
        title: 'Complete project proposal',
        description: 'Write and review the Q1 project proposal document',
        priority: 'high',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        userId: user.id,
      },
    }),
    prisma.todo.upsert({
      where: { id: 'todo_2' },
      update: {},
      create: {
        id: 'todo_2',
        title: 'Review team feedback',
        description: 'Go through the feedback from the last sprint review',
        completed: true,
        priority: 'medium',
        userId: user.id,
      },
    }),
    prisma.todo.upsert({
      where: { id: 'todo_3' },
      update: {},
      create: {
        id: 'todo_3',
        title: 'Update documentation',
        description: 'Update the API documentation for the new endpoints',
        priority: 'low',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        userId: user.id,
      },
    }),
  ])

  console.log('Created todos:', todos)

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'product_1' },
      update: {},
      create: {
        id: 'product_1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
        price: 89.99,
        image: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Headphones',
        category: 'Electronics',
        stock: 15,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product_2' },
      update: {},
      create: {
        id: 'product_2',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration.',
        price: 199.99,
        image: 'https://via.placeholder.com/300x300/10B981/FFFFFF?text=Smart+Watch',
        category: 'Electronics',
        stock: 8,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product_3' },
      update: {},
      create: {
        id: 'product_3',
        name: 'Ergonomic Office Chair',
        description: 'Professional office chair with lumbar support, adjustable height, and premium materials.',
        price: 299.99,
        image: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Office+Chair',
        category: 'Furniture',
        stock: 5,
        featured: false,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product_4' },
      update: {},
      create: {
        id: 'product_4',
        name: 'Portable Power Bank',
        description: '20000mAh portable charger with fast charging support for multiple devices.',
        price: 39.99,
        image: 'https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Power+Bank',
        category: 'Electronics',
        stock: 25,
        featured: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product_5' },
      update: {},
      create: {
        id: 'product_5',
        name: 'Premium Coffee Maker',
        description: 'Programmable coffee maker with built-in grinder and thermal carafe.',
        price: 149.99,
        image: 'https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Coffee+Maker',
        category: 'Home & Garden',
        stock: 12,
        featured: false,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product_6' },
      update: {},
      create: {
        id: 'product_6',
        name: 'Running Shoes',
        description: 'Lightweight running shoes with advanced cushioning and breathable mesh upper.',
        price: 79.99,
        image: 'https://via.placeholder.com/300x300/06B6D4/FFFFFF?text=Running+Shoes',
        category: 'Sports',
        stock: 20,
        featured: true,
      },
    }),
  ])

  console.log('Created products:', products)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

