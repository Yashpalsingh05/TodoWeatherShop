#!/bin/bash

echo "🚀 Starting Todo Weather Ecommerce App..."

# Check if nvm is available and activate Node.js 18
if command -v nvm &> /dev/null; then
    echo "🔧 Activating Node.js 18..."
    source ~/.nvm/nvm.sh
    nvm use 18
    if [ $? -ne 0 ]; then
        echo "⚠️  Node.js 18 not found, installing..."
        nvm install 18
        nvm use 18
    fi
else
    echo "⚠️  nvm not found, checking current Node.js version..."
fi

NODE_VERSION=$(node -v)
echo "📦 Using Node.js version: $NODE_VERSION"

# Check if Node.js version is 18 or higher
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $NODE_VERSION"
    echo "Please install Node.js 18+ and try again."
    echo "You can install it with: nvm install 18 && nvm use 18"
    exit 1
fi

echo "✅ Node.js version is compatible"

# Set environment variables
export DATABASE_URL="file:./dev.db"
export WEATHER_API_KEY="demo_weather_api_key"
export NODE_ENV="development"
export NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
export NEXTAUTH_URL="http://localhost:3000"

echo "🗄️  Setting up database..."

# Generate Prisma client
echo "📝 Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
echo "✅ Prisma client generated"

# Push database schema
echo "📊 Setting up database schema..."
npx prisma db push
if [ $? -ne 0 ]; then
    echo "❌ Failed to set up database schema"
    exit 1
fi
echo "✅ Database schema ready"

echo ""
echo "🌟 Starting Next.js development server..."
echo "📱 Your app will be available at: http://localhost:3000"
echo ""
echo "✨ Features available:"
echo "   📝 Todo Management: http://localhost:3000/todos"
echo "   🌤️  Weather Info: http://localhost:3000/weather"
echo "   🛒 Shop: http://localhost:3000/shop"
echo "   🛍️  Cart: http://localhost:3000/cart"
echo ""
echo "🔄 To stop the server, press Ctrl+C"
echo ""

# Start Next.js development server
npx next dev