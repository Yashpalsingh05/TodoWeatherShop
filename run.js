#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Todo Weather Ecommerce App...');
console.log('📦 Using Node.js version:', process.version);

// Set environment variables
process.env.DATABASE_URL = 'file:./dev.db';
process.env.WEATHER_API_KEY = 'demo_weather_api_key';
process.env.NODE_ENV = 'development';
process.env.NEXTAUTH_SECRET = 'your-super-secret-key-change-in-production';
process.env.NEXTAUTH_URL = 'http://localhost:3000';

console.log('🗄️  Setting up database...');

// Step 1: Generate Prisma client
const generate = spawn('npx', ['prisma', 'generate'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  cwd: process.cwd(),
  env: process.env
});

generate.stdout.on('data', (data) => {
  process.stdout.write(data);
});

generate.stderr.on('data', (data) => {
  process.stderr.write(data);
});

generate.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Prisma client generated');
    
    // Step 2: Push database schema
    const push = spawn('npx', ['prisma', 'db', 'push'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: process.cwd(),
      env: process.env
    });

    push.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    push.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    push.on('close', (pushCode) => {
      if (pushCode === 0) {
        console.log('✅ Database schema ready');
        console.log('');
        console.log('🌟 Starting Next.js development server...');
        console.log('📱 Your app will be available at: http://localhost:3000');
        console.log('');
        console.log('✨ Features available:');
        console.log('   📝 Todo Management: http://localhost:3000/todos');
        console.log('   🌤️  Weather Info: http://localhost:3000/weather');
        console.log('   🛒 Shop: http://localhost:3000/shop');
        console.log('   🛍️  Cart: http://localhost:3000/cart');
        console.log('');
        console.log('🔄 To stop the server, press Ctrl+C');
        console.log('');

        // Step 3: Start Next.js development server
        const nextDev = spawn('npx', ['next', 'dev'], {
          stdio: 'inherit',
          cwd: process.cwd(),
          env: process.env
        });

        // Handle Ctrl+C gracefully
        process.on('SIGINT', () => {
          console.log('\n👋 Shutting down server...');
          nextDev.kill('SIGINT');
          process.exit(0);
        });

        nextDev.on('close', (nextCode) => {
          console.log('Server stopped.');
          process.exit(nextCode);
        });

      } else {
        console.error('❌ Failed to set up database');
        process.exit(1);
      }
    });

  } else {
    console.error('❌ Failed to generate Prisma client');
    process.exit(1);
  }
});

